#!/usr/bin/env bash
# exportar-instagram.sh — Exportación final optimizada para Instagram Reels.
#
# Uso:
#   bash scripts/exportar-instagram.sh <entrada.mp4> <salida.mp4>
#
# H.264 High, yuv420p, CRF 18, preset slow, 1080×1920 @ 30 fps, AAC 192 kbps 48 kHz,
# -movflags +faststart. Si la entrada no tiene audio, agrega una pista silenciosa.
# Al final verifica el resultado con ffprobe y mide el pico de audio (dBTP).
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere ffmpeg ffprobe

ayuda() { sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac
[ $# -lt 2 ] && { ayuda; exit 1; }

ENTRADA="$1"; SALIDA="$2"
[ -f "$ENTRADA" ] || { echo "✗ No existe $ENTRADA" >&2; exit 1; }
[ "$(cd "$(dirname "$ENTRADA")" && pwd)/$(basename "$ENTRADA")" = "$(cd "$(dirname "$SALIDA")" 2>/dev/null && pwd)/$(basename "$SALIDA")" ] && { echo "✗ La salida no puede pisar la entrada." >&2; exit 1; }

VIDEO="scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p"
TIENE_AUDIO="$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$ENTRADA" | head -n 1)"

if [ -n "$TIENE_AUDIO" ]; then
  ffmpeg -loglevel error -stats -y -i "$ENTRADA" -vf "$VIDEO" \
    -c:v libx264 -profile:v high -preset slow -crf 18 \
    -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$SALIDA"
else
  echo "· La entrada no tiene audio: agrego una pista silenciosa."
  ffmpeg -loglevel error -stats -y -i "$ENTRADA" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
    -map 0:v:0 -map 1:a:0 -shortest -vf "$VIDEO" \
    -c:v libx264 -profile:v high -preset slow -crf 18 \
    -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$SALIDA"
fi

echo "▸ Verificación (ffprobe)"
V="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,r_frame_rate -of default=nw=1 "$SALIDA")"
A="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate -of default=nw=1 "$SALIDA")"
D="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SALIDA")"
echo "$V" | sed 's/^/  /'; echo "$A" | sed 's/^/  /'; echo "  duration=$D"

OK=1
echo "$V" | grep -q "codec_name=h264" || OK=0
echo "$V" | grep -q "profile=High" || OK=0
echo "$V" | grep -q "width=1080" || OK=0
echo "$V" | grep -q "height=1920" || OK=0
echo "$V" | grep -q "pix_fmt=yuv420p" || OK=0
echo "$V" | grep -q "r_frame_rate=30/1" || OK=0
echo "$A" | grep -q "codec_name=aac" || OK=0
echo "$A" | grep -q "sample_rate=48000" || OK=0

PICO="$(ffmpeg -nostats -i "$SALIDA" -af ebur128=peak=true -f null - 2>&1 | awk '/True peak:/{f=1} f&&/Peak:/{print $2; exit}')"
echo "  pico de audio (dBTP)=${PICO:-n/d}  (debe ser ≤ -1.0)"

if [ "$OK" = 1 ]; then
  echo "✓ Exportado y verificado: $SALIDA"
else
  echo "✗ El archivo no cumple las especificaciones (ver arriba)." >&2
  exit 1
fi
