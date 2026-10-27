#!/usr/bin/env bash
# hoja-contactos.sh — Arma una grilla con todos los fotogramas de una carpeta en una sola imagen.
#
# Uso:
#   bash scripts/hoja-contactos.sh <carpeta-frames> [salida.jpg] [columnas]
#
#   salida    por defecto: <carpeta-frames>/../hoja-contactos.jpg
#   columnas  por defecto: 6 (cada miniatura mide 270×480)
#
# Usa el filtro `tile` de ffmpeg. Los fotogramas se ordenan por nombre.
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere ffmpeg

ayuda() { sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac

DIR="$(cd "$1" && pwd)"
SALIDA="${2:-$(dirname "$DIR")/hoja-contactos.jpg}"
COLS="${3:-6}"

# Lista ordenada de imágenes (png/jpg), para el demuxer concat de ffmpeg.
LISTA="$(mktemp)"
trap 'rm -f "$LISTA"' EXIT
N=0
while IFS= read -r f; do
  printf "file '%s'\n" "$(cygpath -m "$f" 2>/dev/null || echo "$f")" >> "$LISTA"
  N=$((N + 1))
done < <(find "$DIR" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' \) ! -iname 'hoja*' | sort)

[ "$N" -eq 0 ] && { echo "✗ No hay fotogramas en $DIR" >&2; exit 1; }
[ "$N" -lt "$COLS" ] && COLS="$N"
FILAS=$(( (N + COLS - 1) / COLS ))

ffmpeg -loglevel error -y -f concat -safe 0 -i "$LISTA" \
  -vf "scale=270:480:force_original_aspect_ratio=decrease,pad=270:480:(ow-iw)/2:(oh-ih)/2:color=0x111111,tile=${COLS}x${FILAS}:padding=6:margin=6:color=0x222222" \
  -frames:v 1 -q:v 3 "$SALIDA"
echo "✓ Hoja de contactos ($N fotogramas, ${COLS}×${FILAS}): $SALIDA"
