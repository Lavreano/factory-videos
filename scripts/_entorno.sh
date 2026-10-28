#!/usr/bin/env bash
# _entorno.sh — se carga con `source` desde los demás scripts.
# Deja disponibles: RAIZ (raíz del estudio), ffmpeg/ffprobe en el PATH,
# Node 22 (HyperFrames lo exige) y el Python del .venv.

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export RAIZ

# ffmpeg instalado con winget queda en WinGet/Links (no siempre está en el PATH de la sesión).
if ! command -v ffmpeg >/dev/null 2>&1 && [ -n "${LOCALAPPDATA:-}" ]; then
  _links="$(cygpath "$LOCALAPPDATA" 2>/dev/null || echo "$LOCALAPPDATA")/Microsoft/WinGet/Links"
  [ -x "$_links/ffmpeg.exe" ] && export PATH="$_links:$PATH"
fi

# HyperFrames necesita Node >= 22. Si el Node activo es más viejo, se busca uno con fnm.
_node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$_node_major" -lt 22 ] && command -v fnm >/dev/null 2>&1; then
  _n22="$(fnm exec --using=22 node -e "console.log(require('path').dirname(process.execPath))" 2>/dev/null || true)"
  if [ -n "$_n22" ]; then
    export PATH="$(cygpath "$_n22" 2>/dev/null || echo "$_n22"):$PATH"
  fi
fi

# Python del proyecto (.venv), con fallback al del sistema.
if [ -x "$RAIZ/.venv/Scripts/python.exe" ]; then
  PY="$RAIZ/.venv/Scripts/python.exe"
elif [ -x "$RAIZ/.venv/bin/python" ]; then
  PY="$RAIZ/.venv/bin/python"
else
  PY="$(command -v python3 || command -v python)"
fi
export PY

# Verifica que exista un comando; si no, corta con un mensaje claro.
requiere() {
  for c in "$@"; do
    command -v "$c" >/dev/null 2>&1 || { echo "✗ Falta '$c'. Ver README.md → Requisitos." >&2; exit 1; }
  done
}

# Lista de marcas válidas (carpetas de marcas/ que no empiezan con _).
marcas_validas() {
  for d in "$RAIZ"/marcas/*/; do
    n="$(basename "$d")"
    [ "${n#_}" = "$n" ] && echo "$n"
  done
}

# Python prints UTF-8 (✓, tildes) even on a cp1252 Windows console.
export PYTHONIOENCODING=utf-8
