#!/usr/bin/env bash
# Render carousel slides (one HyperFrames project per slide) and export them for Instagram (1080x1350, H.264, silent AAC).
# usage: bash scripts/render-carrusel.sh <carousel folder> <prefix> <n:slug> [n:slug ...]
#   e.g. bash scripts/render-carrusel.sh videos/synx/2026-11-14-carrusel-caso-manuela manuela 1:portada 6:resultado
# Slide 1 lives in composicion/, slide N in composicion-sN/. Output: render/<prefix>-0N-<slug>-ig.mp4
set -u
P="$1"; PRE="$2"; shift 2
source "$(dirname "$0")/_entorno.sh" >/dev/null 2>&1
cd "$P" || exit 1
mkdir -p render
for it in "$@"; do
  n="${it%%:*}"; slug="${it##*:}"; d=composicion; [ "$n" -gt 1 ] && d=composicion-s$n; base="$PRE-0$n-$slug"
  (cd "$d" && npx --yes hyperframes@0.8.221 render --quality delivery --output "../render/$base.mp4" 2>&1 | grep -E "rror")
  ffmpeg -v error -y -i "render/$base.mp4" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 -map 0:v -map 1:a -shortest \
    -vf "scale=1080:1350,fps=30,format=yuv420p" -c:v libx264 -profile:v high -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart \
    "render/$base-ig.mp4" && rm -f "render/$base.mp4"
  echo "ok $base"
done
