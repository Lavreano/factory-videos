#!/usr/bin/env bash
# sincronizar-marca.sh — Copia tokens.css y fuentes de la marca a la composición de un reel
# (composicion/assets/marca/). Correr después de cambiar marcas/<marca>/tokens.css.
#
# Uso:
#   bash scripts/sincronizar-marca.sh <carpeta-del-reel> [marca]
#
#   Sin [marca], usa la del estudio.json del reel. Con [marca], la cambia (y lo anota).
#   Opcional: --piezas  vuelve a copiar las piezas de biblioteca/ que falten en compositions/
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
requiere node

ayuda() { sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'; }
case "${1:-}" in -h|--help|"") ayuda; [ -z "${1:-}" ] && exit 1 || exit 0 ;; esac

REEL="$(cd "$1" && pwd)"; shift
COMP="$REEL/composicion"
[ -f "$COMP/estudio.json" ] || { echo "✗ $REEL no parece un reel del estudio (falta composicion/estudio.json)." >&2; exit 1; }

MARCA=""; PIEZAS=0
for a in "$@"; do
  case "$a" in --piezas) PIEZAS=1 ;; *) MARCA="$a" ;; esac
done
[ -z "$MARCA" ] && MARCA="$(node -p "require(process.argv[1]).marca" "$COMP/estudio.json")"

node "$RAIZ/scripts/lib/proyecto.mjs" marca "$COMP" "$MARCA"
node -e "const f=process.argv[1],j=require(f);j.marca=process.argv[2];require('fs').writeFileSync(f,JSON.stringify(j,null,2))" "$COMP/estudio.json" "$MARCA"
[ "$PIEZAS" = 1 ] && node "$RAIZ/scripts/lib/proyecto.mjs" piezas "$COMP"
exit 0
