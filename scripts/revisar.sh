#!/usr/bin/env bash
# revisar.sh — Abre el revisor de un reel: video cuadro por cuadro + notas con tiempo y posición.
#
# Uso:
#   bash scripts/revisar.sh <carpeta-del-reel> [video.mp4]
#
#   Sin [video], usa el MP4 más reciente de render/ (prefiere los "-ig.mp4").
#   Crea <reel>/render/revisor.html y lo abre en el navegador. Las notas quedan guardadas en el navegador;
#   el botón "Copiar para Claude" las copia listas para pegar en el chat.
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"

ayuda() { sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac

REEL="$(cd "$1" && pwd)"
RENDER="$REEL/render"
if [ -n "${2:-}" ]; then
  VIDEO="$(basename "$2")"
else
  VIDEO="$(ls -t "$RENDER"/*-ig.mp4 2>/dev/null | head -n 1 || true)"
  [ -z "$VIDEO" ] && VIDEO="$(ls -t "$RENDER"/*.mp4 2>/dev/null | head -n 1 || true)"
  [ -z "$VIDEO" ] && { echo "✗ No hay ningún MP4 en $RENDER. Renderizá primero." >&2; exit 1; }
  VIDEO="$(basename "$VIDEO")"
fi
[ -f "$RENDER/$VIDEO" ] || { echo "✗ No existe $RENDER/$VIDEO" >&2; exit 1; }

NOMBRE="$(basename "$REEL")"
sed -e "s|{{VIDEO}}|$VIDEO|g" -e "s|{{REEL}}|$NOMBRE|g" "$RAIZ/plantillas/revisor.html" > "$RENDER/revisor.html"
echo "✓ Revisor: ${RENDER#$RAIZ/}/revisor.html (video: $VIDEO)"
case "$(uname -s)" in
  MINGW*|MSYS*|CYGWIN*) cmd //c start "" "$(cygpath -w "$RENDER/revisor.html")" ;;
  Darwin) open "$RENDER/revisor.html" ;;
  *) xdg-open "$RENDER/revisor.html" >/dev/null 2>&1 || true ;;
esac
