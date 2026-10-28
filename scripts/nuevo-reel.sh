#!/usr/bin/env bash
# nuevo-reel.sh — Crea el proyecto de un reel nuevo.
#
# Uso:
#   bash scripts/nuevo-reel.sh <marca> <slug> [codigo]
#
#   marca   slug de una carpeta de marcas/ (personal, synx, synous, aura, …).
#           Con variante: <marca>.<variante> (ej. aura.oscuro) usa además tokens-<variante>.css
#   slug    nombre corto en minúsculas con guiones (ej. landing-linda-no-vende)
#   codigo  código de pilar opcional (ej. A-3); queda cargado en el brief
#
# Crea videos/<marca>/AAAA-MM-DD-<slug>/ con brief, guion, storyboard y revisión
# (desde plantillas/), y en composicion/ un proyecto HyperFrames inicializado con
# `hyperframes init` y enlazado a los tokens.css de la marca.
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere node npx

ayuda() { sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac
[ $# -lt 2 ] && { ayuda; exit 1; }

MARCA="$1"; SLUG="$2"; CODIGO="${3:-TODO}"
BASE="${MARCA%%.*}"   # "aura.oscuro" → carpeta y textos de "aura"; los tokens llevan la variante

# 1. Validaciones
if [ ! -f "$RAIZ/marcas/$BASE/tokens.css" ] || [ "${BASE#_}" != "$BASE" ]; then
  echo "✗ La marca '$MARCA' no existe. Marcas válidas: $(marcas_validas | tr '\n' ' ')" >&2
  exit 1
fi
if ! [[ "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "✗ Slug inválido: '$SLUG'. Usá minúsculas, números y guiones (ej. landing-linda-no-vende)." >&2
  exit 1
fi

FECHA="$(date +%Y-%m-%d)"
DIR="$RAIZ/videos/$BASE/$FECHA-$SLUG"
if [ -e "$DIR" ]; then
  echo "✗ Ya existe $DIR. No piso nada: elegí otro slug." >&2
  exit 1
fi

# 2. Documentos desde plantillas (con la marca ya cargada)
mkdir -p "$DIR/muestras" "$DIR/render"
reemplazar() {
  sed -e "s|{{MARCA}}|$BASE|g" -e "s|{{SLUG}}|$SLUG|g" -e "s|{{FECHA}}|$FECHA|g" -e "s|{{CODIGO}}|$CODIGO|g" "$1" > "$2"
}
reemplazar "$RAIZ/plantillas/brief.md" "$DIR/brief.md"
reemplazar "$RAIZ/plantillas/guion.md" "$DIR/guion.md"
reemplazar "$RAIZ/plantillas/storyboard.md" "$DIR/storyboard.md"
reemplazar "$RAIZ/plantillas/ficha-revision.md" "$DIR/revision.md"

# 3. Composición HyperFrames
( cd "$DIR" && npx --yes "hyperframes@0.8.209" init composicion --resolution portrait --non-interactive --skip-skills >/dev/null )
node "$RAIZ/scripts/lib/proyecto.mjs" preparar "$DIR/composicion" "$MARCA"
reemplazar "$RAIZ/plantillas/composicion-index.html" "$DIR/composicion/index.html"

echo "✓ Reel creado: videos/$BASE/$FECHA-$SLUG/"
echo "  Siguiente: completar brief.md → skill guion-reel (esperar aprobación)."
echo "  Preview:   cd \"videos/$BASE/$FECHA-$SLUG/composicion\" && npx hyperframes preview --background"
