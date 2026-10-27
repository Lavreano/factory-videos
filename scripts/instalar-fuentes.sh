#!/usr/bin/env bash
# instalar-fuentes.sh — Copia los .woff2 de cada marca desde node_modules/@fontsource
# a marcas/<marca>/fuentes/, según lo que pide marcas/<marca>/fuentes/fuentes.txt.
#
# Uso:
#   bash scripts/instalar-fuentes.sh            # todas las marcas
#   bash scripts/instalar-fuentes.sh synx       # una sola
#
# Formato de fuentes.txt (una familia por línea):
#   <paquete-fontsource> <peso> <peso> ...    (sufijo "i" = itálica, ej. 400i)
# Si falta el paquete: npm install --save-dev @fontsource/<paquete>
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"

ayuda() { sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'; }
[ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] && { ayuda; exit 0; }

if [ $# -ge 1 ]; then MARCAS="$1"; else MARCAS="$(marcas_validas) _plantilla"; fi

for marca in $MARCAS; do
  lista="$RAIZ/marcas/$marca/fuentes/fuentes.txt"
  [ -f "$lista" ] || { echo "· $marca: sin fuentes.txt, salteo"; continue; }
  destino="$RAIZ/marcas/$marca/fuentes"
  n=0
  while read -r paquete pesos; do
    [ -z "${paquete:-}" ] && continue
    case "$paquete" in \#*) continue ;; esac
    origen="$RAIZ/node_modules/@fontsource/$paquete/files"
    if [ ! -d "$origen" ]; then
      echo "  ✗ Falta @fontsource/$paquete → npm install --save-dev @fontsource/$paquete" >&2
      exit 1
    fi
    for p in $pesos; do
      estilo="normal"; peso="$p"
      case "$p" in *i) estilo="italic"; peso="${p%i}" ;; esac
      archivo="$paquete-latin-$peso-$estilo.woff2"
      if [ -f "$origen/$archivo" ]; then
        cp "$origen/$archivo" "$destino/"
        n=$((n + 1))
      else
        echo "  ✗ No existe $archivo en @fontsource/$paquete (¿peso no disponible?)" >&2
        exit 1
      fi
    done
  done < "$lista"
  echo "✓ $marca: $n archivos de fuente en marcas/$marca/fuentes/"
done
