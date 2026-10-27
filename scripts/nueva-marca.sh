#!/usr/bin/env bash
# nueva-marca.sh — Suma una marca nueva al estudio desde marcas/_plantilla/.
#
# Uso:
#   bash scripts/nueva-marca.sh <slug>
#
# Crea marcas/<slug>/ (copia de la plantilla) y sus carpetas en
# referencias/<slug>/{videos,analisis}, assets/<slug>/{3d,imagenes,grabaciones} y videos/<slug>/.
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"

ayuda() { sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac

SLUG="$1"
if ! [[ "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "✗ Slug inválido: '$SLUG'. Usá minúsculas, números y guiones." >&2
  exit 1
fi
[ -e "$RAIZ/marcas/$SLUG" ] && { echo "✗ La marca '$SLUG' ya existe. No piso nada." >&2; exit 1; }

cp -r "$RAIZ/marcas/_plantilla" "$RAIZ/marcas/$SLUG"
# Reemplaza el marcador del slug en los documentos copiados.
for f in "$RAIZ/marcas/$SLUG"/*.md "$RAIZ/marcas/$SLUG/tokens.css"; do
  sed -i -e "s|<slug>|$SLUG|g" -e "s|--brand-slug: \"TODO\"|--brand-slug: \"$SLUG\"|" "$f"
done

mkdir -p "$RAIZ/referencias/$SLUG/videos" "$RAIZ/referencias/$SLUG/analisis" \
  "$RAIZ/assets/$SLUG/3d" "$RAIZ/assets/$SLUG/imagenes" "$RAIZ/assets/$SLUG/grabaciones" \
  "$RAIZ/videos/$SLUG"
for d in referencias/$SLUG/videos referencias/$SLUG/analisis assets/$SLUG/3d assets/$SLUG/imagenes assets/$SLUG/grabaciones videos/$SLUG; do
  touch "$RAIZ/$d/.gitkeep"
done

echo "✓ Marca '$SLUG' creada."
echo "  Siguiente:"
echo "  1. Completar marcas/$SLUG/perfil.md, audiencia.md y DESIGN.md (todo lo que dice TODO:)."
echo "  2. Definir valores en marcas/$SLUG/tokens.css (sin cambiar nombres de variables)."
echo "  3. Listar fuentes en marcas/$SLUG/fuentes/fuentes.txt y correr: bash scripts/instalar-fuentes.sh $SLUG"
echo "  4. Probar: bash scripts/laboratorio.sh before-after --marca $SLUG"
