#!/usr/bin/env bash
# analizar-referencia.sh — Desarma un video de referencia: metadatos, cortes, fotogramas,
# audio, transcripción con tiempos por palabra y hoja de contactos.
#
# Uso:
#   bash scripts/analizar-referencia.sh <marca|general> <video> [--umbral 0.3] [--modelo small] [--sin-transcripcion]
#
# Guarda todo en referencias/<marca>/analisis/<nombre-del-video>/:
#   metadatos.json, metadatos.txt   duración, resolución, fps (ffprobe)
#   cortes.txt                      tiempos de corte detectados (umbral configurable)
#   frames/                         un fotograma por corte (c_*) + uno por segundo (s_*)
#   audio.wav                       mono 16 kHz
#   transcripcion.json / .srt       faster-whisper con tiempos por palabra
#   hoja-contactos.jpg              grilla de fotogramas
#   resumen.txt                     números clave para la ficha de análisis
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere ffmpeg ffprobe node

ayuda() { sed -n '2,17p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac
[ $# -lt 2 ] && { ayuda; exit 1; }

MARCA="$1"; VIDEO="$2"; shift 2
UMBRAL="0.3"; MODELO="small"; TRANSCRIBIR=1
while [ $# -gt 0 ]; do
  case "$1" in
    --umbral) UMBRAL="$2"; shift 2 ;;
    --modelo) MODELO="$2"; shift 2 ;;
    --sin-transcripcion) TRANSCRIBIR=0; shift ;;
    *) echo "✗ Opción desconocida: $1" >&2; ayuda; exit 1 ;;
  esac
done

[ -d "$RAIZ/referencias/$MARCA" ] || { echo "✗ No existe referencias/$MARCA/ (usá general o una marca)." >&2; exit 1; }
[ -f "$VIDEO" ] || { echo "✗ No existe el video: $VIDEO" >&2; exit 1; }

NOMBRE="$(basename "${VIDEO%.*}" | tr ' ' '-' | tr -cd '[:alnum:]_.-')"
OUT="$RAIZ/referencias/$MARCA/analisis/$NOMBRE"
mkdir -p "$OUT/frames"

# 1. Metadatos
echo "▸ 1/6 Metadatos"
ffprobe -v error -print_format json -show_format -show_streams "$VIDEO" > "$OUT/metadatos.json"
DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")"
RES="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$VIDEO")"
FPS="$(ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of csv=p=0 "$VIDEO")"
printf "duracion=%s\nresolucion=%s\nfps=%s\n" "$DUR" "$RES" "$FPS" > "$OUT/metadatos.txt"

# 2. Cortes de escena
echo "▸ 2/6 Cortes (umbral $UMBRAL)"
ffmpeg -nostats -i "$VIDEO" -vf "select='gt(scene,$UMBRAL)',showinfo" -an -f null - 2>&1 \
  | grep -o 'pts_time:[0-9.]*' | cut -d: -f2 > "$OUT/cortes.txt" || true
N_CORTES="$(wc -l < "$OUT/cortes.txt" | tr -d ' ')"

# 3. Fotogramas: uno por corte + uno por segundo
echo "▸ 3/6 Fotogramas"
rm -f "$OUT"/frames/*.png
ffmpeg -loglevel error -y -ss 0.05 -i "$VIDEO" -frames:v 1 -vf "scale=540:-2" "$OUT/frames/c_000.00.png"
while read -r t; do
  [ -z "$t" ] && continue
  ts="$(node -e 'console.log((+process.argv[1]+0.05).toFixed(2))' "$t")"
  ffmpeg -loglevel error -y -ss "$ts" -i "$VIDEO" -frames:v 1 -vf "scale=540:-2" "$OUT/frames/c_$(printf '%06.2f' "$t").png"
done < "$OUT/cortes.txt"
ffmpeg -loglevel error -y -i "$VIDEO" -vf "fps=1,scale=540:-2" "$OUT/frames/s_%03d.png"

# 4. Audio
echo "▸ 4/6 Audio"
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$VIDEO" | grep -q .; then
  ffmpeg -loglevel error -y -i "$VIDEO" -vn -ac 1 -ar 16000 "$OUT/audio.wav"
  TIENE_AUDIO=1
else
  echo "  · El video no tiene audio."
  TIENE_AUDIO=0
fi

# 5. Transcripción
echo "▸ 5/6 Transcripción"
if [ "$TRANSCRIBIR" = 1 ] && [ "$TIENE_AUDIO" = 1 ]; then
  "$PY" "$RAIZ/scripts/transcribir.py" "$OUT/audio.wav" --modelo "$MODELO" --salida "$OUT/transcripcion"
else
  echo "  · Salteada."
fi

# 6. Hoja de contactos (solo fotogramas por corte, más legible)
echo "▸ 6/6 Hoja de contactos"
TMP="$OUT/.cortes-tmp"; rm -rf "$TMP"; mkdir -p "$TMP"
cp "$OUT"/frames/c_*.png "$TMP/"
bash "$RAIZ/scripts/hoja-contactos.sh" "$TMP" "$OUT/hoja-contactos.jpg" 6 >/dev/null
rm -rf "$TMP"

# Resumen
node -e '
  const fs=require("fs"); const [out,dur,res,fps,n]=process.argv.slice(1);
  const cortes=fs.readFileSync(out+"/cortes.txt","utf8").split("\n").filter(Boolean).map(Number);
  const t=[0,...cortes,+dur]; const planos=t.slice(1).map((x,i)=>x-t[i]);
  const prom=planos.reduce((a,b)=>a+b,0)/planos.length; const max=Math.max(...planos);
  let pal=0; try{const j=JSON.parse(fs.readFileSync(out+"/transcripcion.json","utf8"));pal=j.segmentos.reduce((a,s)=>a+s.palabras.length,0)}catch{}
  const r=`duracion_s=${(+dur).toFixed(2)}\nresolucion=${res}\nfps=${fps}\ncortes=${n}\nplanos=${planos.length}\nduracion_promedio_plano_s=${prom.toFixed(2)}\nplano_mas_largo_s=${max.toFixed(2)}\npalabras_transcriptas=${pal}\npalabras_por_segundo=${(pal/(+dur)).toFixed(2)}\n`;
  fs.writeFileSync(out+"/resumen.txt",r); process.stdout.write(r);' "$OUT" "$DUR" "$RES" "$FPS" "$N_CORTES"

echo "✓ Análisis en ${OUT#$RAIZ/}/"
echo "  Siguiente: skill analizar-referencia → completar referencias/$MARCA/analisis/$NOMBRE.md"
