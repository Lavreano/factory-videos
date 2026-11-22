#!/usr/bin/env bash
# fabrica-historias.sh — Batch synx landing stories from a list (see scripts/fabrica-historias.mjs).
#
# Uso:
#   bash scripts/fabrica-historias.sh fabrica/historias-synx.json [--fase preparar|render|todo] [--solo slug1,slug2]
set -euo pipefail
source "$(dirname "$0")/_entorno.sh"
cd "$RAIZ"
# C: is nearly full: keep every temporary file (Chrome, ffmpeg, HyperFrames) on D:
mkdir -p "$RAIZ/.tmp-fabrica"
export TEMP="$(cygpath -w "$RAIZ/.tmp-fabrica" 2>/dev/null || echo "$RAIZ/.tmp-fabrica")" TMP="$TEMP" TMPDIR="$RAIZ/.tmp-fabrica"
node scripts/fabrica-historias.mjs "$@"
