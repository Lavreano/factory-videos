#!/usr/bin/env bash
# render.sh — Renderiza un reel (o solo su muestra), verifica la duración y extrae fotogramas.
#
# Uso:
#   bash scripts/render.sh <carpeta-del-reel> [opciones]
#
# Opciones:
#   --muestra <seg>     Renderiza solo los primeros <seg> segundos en draft (paso 4 del pipeline)
#   --calidad <q>       draft | looks | delivery (por defecto: delivery; con --muestra: draft)
#   --marca <slug>      Renderiza con los tokens de OTRA marca, en una copia (no toca el reel)
#   --salida <archivo>  Ruta del MP4 (por defecto: render/<slug>.mp4 o muestras/muestra-<seg>s.mp4)
#
# Siempre: sincroniza los tokens de la marca, corre lint, verifica la duración con ffprobe
# y arma una hoja de contactos con los fotogramas.
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere node npx ffmpeg ffprobe

ayuda() { sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac

REEL="$(cd "$1" && pwd)"; shift
COMP="$REEL/composicion"
[ -f "$COMP/index.html" ] || { echo "✗ No encuentro $COMP/index.html" >&2; exit 1; }
SLUG="$(basename "$REEL" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')"

MUESTRA=""; CALIDAD=""; MARCA=""; SALIDA=""
while [ $# -gt 0 ]; do
  case "$1" in
    --muestra) MUESTRA="$2"; shift 2 ;;
    --calidad) CALIDAD="$2"; shift 2 ;;
    --marca) MARCA="$2"; shift 2 ;;
    --salida) SALIDA="$2"; shift 2 ;;
    *) echo "✗ Opción desconocida: $1" >&2; ayuda; exit 1 ;;
  esac
done
[ -z "$CALIDAD" ] && { [ -n "$MUESTRA" ] && CALIDAD="draft" || CALIDAD="delivery"; }

# Tokens de la marca propia del reel, siempre al día.
bash "$RAIZ/scripts/sincronizar-marca.sh" "$REEL" >/dev/null

# Muestra u otra marca: se trabaja sobre una copia para no tocar la composición real.
TRABAJO="$COMP"
if [ -n "$MUESTRA" ] || [ -n "$MARCA" ]; then
  TRABAJO="$REEL/muestras/_trabajo"
  rm -rf "$TRABAJO"; mkdir -p "$TRABAJO"
  (cd "$COMP" && tar --exclude=./.hyperframes --exclude=./renders --exclude=./node_modules -cf - .) | (cd "$TRABAJO" && tar -xf -)
  [ -n "$MARCA" ] && node "$RAIZ/scripts/lib/proyecto.mjs" marca "$TRABAJO" "$MARCA" >/dev/null
  if [ -n "$MUESTRA" ]; then
    # La muestra corta el reel bajando el data-duration del root (lo que pasa de ahí no se renderiza).
    node -e '
      const fs=require("fs"),f=process.argv[1],n=process.argv[2];
      let h=fs.readFileSync(f,"utf8");
      h=h.replace(/(<div[^>]*id="root"[^>]*data-duration=")([\d.]+)(")/s,(m,a,b,c)=>a+n+c);
      fs.writeFileSync(f,h);' "$TRABAJO/index.html" "$MUESTRA"
  fi
fi

if [ -z "$SALIDA" ]; then
  if [ -n "$MUESTRA" ]; then SALIDA="$REEL/muestras/muestra-${MUESTRA}s${MARCA:+-$MARCA}.mp4"
  elif [ -n "$MARCA" ]; then SALIDA="$REEL/muestras/$SLUG-$MARCA.mp4"
  else SALIDA="$REEL/render/$SLUG.mp4"; fi
fi
mkdir -p "$(dirname "$SALIDA")"

DUR_ESPERADA="$(node -e '
  const h=require("fs").readFileSync(process.argv[1],"utf8");
  const m=h.match(/<div[^>]*id="root"[^>]*data-duration="([\d.]+)"/s); console.log(m?m[1]:"0");' "$TRABAJO/index.html")"

echo "▸ Lint"
(cd "$TRABAJO" && npx --yes "hyperframes@0.8.209" lint 2>&1 | tail -n 3)

echo "▸ Render ($CALIDAD, ${DUR_ESPERADA}s${MARCA:+, marca $MARCA}) → ${SALIDA#$RAIZ/}"
(cd "$TRABAJO" && npx --yes "hyperframes@0.8.209" render --quality "$CALIDAD" --output "$SALIDA" 2>&1 | tail -n 4)

# Verificación: archivo no vacío y duración correcta (±0.1 s).
[ -s "$SALIDA" ] || { echo "✗ El render no generó archivo." >&2; exit 1; }
DUR_REAL="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SALIDA")"
node -e 'const [a,b]=process.argv.slice(1).map(Number); if(Math.abs(a-b)>0.1){console.error(`✗ Duración ${a}s ≠ esperada ${b}s`);process.exit(1)} console.log(`✓ Duración ${a.toFixed(2)}s (esperada ${b}s)`)' "$DUR_REAL" "$DUR_ESPERADA"

# Fotogramas para revisar: muestra = 6 repartidos; completo = 1 por segundo.
BASE="${SALIDA%.mp4}"
FRAMES="$BASE-frames"
rm -rf "$FRAMES"; mkdir -p "$FRAMES"
if [ -n "$MUESTRA" ]; then
  node -e 'const d=+process.argv[1];for(let i=0;i<6;i++)console.log((0.1+i*(d-0.2)/5).toFixed(2))' "$DUR_REAL" | while read -r t; do
    ffmpeg -loglevel error -y -ss "$t" -i "$SALIDA" -frames:v 1 "$FRAMES/f_${t}s.png"
  done
else
  ffmpeg -loglevel error -y -i "$SALIDA" -vf fps=1 "$FRAMES/f_%03d.png"
fi
bash "$RAIZ/scripts/hoja-contactos.sh" "$FRAMES" "$BASE-hoja.jpg" >/dev/null
echo "✓ Fotogramas: ${FRAMES#$RAIZ/}/"
echo "✓ Hoja de contactos: ${BASE#$RAIZ/}-hoja.jpg"
rm -rf "$REEL/muestras/_trabajo"
