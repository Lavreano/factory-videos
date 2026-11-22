#!/usr/bin/env bash
# fabrica-historias-fondo.sh — Runs the factory as an independent Windows process (survives closing Claude / VS Code).
# Uso: bash scripts/fabrica-historias-fondo.sh fabrica/historias-synx.json [opciones]   → log en .tmp-fabrica/tanda.log
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$RAIZ/.tmp-fabrica"
# a launcher file avoids quoting problems when PowerShell hands the command to bash
printf 'cd "%s"\nbash scripts/fabrica-historias.sh %s > .tmp-fabrica/tanda.log 2>&1\n' "$RAIZ" "$*" > "$RAIZ/.tmp-fabrica/lanzar.sh"
BASH_EXE="$(cygpath -w "$(command -v bash)")"
LANZAR="$(cygpath -w "$RAIZ/.tmp-fabrica/lanzar.sh")"
powershell -NoProfile -Command "Start-Process -WindowStyle Minimized -FilePath '$BASH_EXE' -ArgumentList '\"$LANZAR\"'"
echo "✓ Fábrica corriendo en una ventana aparte. Progreso: .tmp-fabrica/tanda.log"
