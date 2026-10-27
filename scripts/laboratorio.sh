#!/usr/bin/env bash
# laboratorio.sh — Prueba una pieza de la biblioteca sola, con los tokens de una marca.
# Arma biblioteca/_laboratorio/ (proyecto HyperFrames descartable), toma fotogramas
# y, con --preview, guarda la vista previa en la carpeta de la pieza.
#
# Uso:
#   bash scripts/laboratorio.sh <pieza> [opciones]
#
# Opciones:
#   --marca <slug>       Marca cuyos tokens se usan (por defecto: personal)
#   --duracion <seg>     Duración del montaje (por defecto: 4)
#   --en "<t1,t2,...>"   Segundos a fotografiar (por defecto: 0.5,1.5,2.5,3.5)
#   --vars '<json>'      Valores de variables de la pieza (objeto JSON)
#   --fondo <pieza>      Monta un fondo de biblioteca/fondos/ debajo
#   --preview <seg>      Guarda el fotograma de ese segundo como <pieza>/preview.png
#   --render <archivo>   Además renderiza un MP4 draft
#
# Ejemplo:
#   bash scripts/laboratorio.sh before-after --marca synx --en 1,2.5,3.8
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere node npx ffmpeg

ayuda() { sed -n '2,22p' "$0" | sed 's/^# \{0,1\}//'; }
[ $# -lt 1 ] && { ayuda; exit 1; }
case "$1" in -h|--help) ayuda; exit 0 ;; esac

PIEZA="$1"; shift
MARCA="personal"; DUR="4"; EN="0.5,1.5,2.5,3.5"; VARS=""; FONDO=""; PREVIEW=""; RENDER=""
while [ $# -gt 0 ]; do
  case "$1" in
    --marca) MARCA="$2"; shift 2 ;;
    --duracion) DUR="$2"; shift 2 ;;
    --en) EN="$2"; shift 2 ;;
    --vars) VARS="$2"; shift 2 ;;
    --fondo) FONDO="$2"; shift 2 ;;
    --preview) PREVIEW="$2"; shift 2 ;;
    --render) RENDER="$2"; shift 2 ;;
    *) echo "✗ Opción desconocida: $1" >&2; ayuda; exit 1 ;;
  esac
done

LAB="$RAIZ/biblioteca/_laboratorio"
mkdir -p "$LAB"
MARCA="$MARCA" node "$RAIZ/scripts/lib/proyecto.mjs" laboratorio "$LAB" "$PIEZA" "$DUR" "${VARS:-{\}}" "$FONDO"

cd "$LAB"
npx --yes "hyperframes@0.8.209" lint 2>&1 | tail -n 4

# Fotogramas
SALIDA_SNAP="$(npx --yes "hyperframes@0.8.209" snapshot --at "$EN" 2>&1)" || { echo "$SALIDA_SNAP"; exit 1; }
# La ruta puede tener espacios: se toma la carpeta de snapshots más reciente.
CARPETA="$(ls -td .hyperframes/artifacts/snapshots/*/ 2>/dev/null | head -n 1 || true)"
[ -z "$CARPETA" ] && { echo "$SALIDA_SNAP"; echo "✗ No se generaron fotogramas" >&2; exit 1; }
DEST="$LAB/fotogramas/$PIEZA-$MARCA"
rm -rf "$DEST"; mkdir -p "$DEST"
cp "$CARPETA"/*.png "$DEST/" 2>/dev/null || true
[ -f "$CARPETA/contact-sheet.jpg" ] && cp "$CARPETA/contact-sheet.jpg" "$DEST/hoja.jpg"
echo "✓ Fotogramas en biblioteca/_laboratorio/fotogramas/$PIEZA-$MARCA/"

if [ -n "$PREVIEW" ]; then
  DIR_PIEZA="$(dirname "$(ls "$RAIZ"/biblioteca/*/"$PIEZA"/escena.html | head -n 1)")"
  npx --yes "hyperframes@0.8.209" snapshot --at "$PREVIEW" >/dev/null 2>&1
  ULT="$(ls -td .hyperframes/artifacts/snapshots/*/ | head -n 1)"
  # Vista previa liviana: 540×960
  ffmpeg -loglevel error -y -i "$ULT"/frame-00-*.png -vf scale=540:960 "$DIR_PIEZA/preview.png"
  echo "✓ Vista previa: ${DIR_PIEZA#$RAIZ/}/preview.png"
fi

if [ -n "$RENDER" ]; then
  npx --yes "hyperframes@0.8.209" render --quality draft --output "$RENDER"
fi
