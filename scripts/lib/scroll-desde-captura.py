"""Builds the scroll video from one full-page capture (grabar-landing.cjs ... pagina).

Usage: python scripts/lib/scroll-desde-captura.py <capture dir> <out.mp4>
Reads pagina.png + y.json (scroll position per frame in CSS px) and pipes the cropped frames to ffmpeg.
"""
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
carpeta, salida = Path(sys.argv[1]), sys.argv[2]
datos = json.loads((carpeta / "y.json").read_text())
tramos = sorted(carpeta.glob("pagina-*.png"), key=lambda f: int(f.stem.split("-")[1]))
if tramos:  # tall page captured in strips: stack them
    partes = [Image.open(f).convert("RGB") for f in tramos]
    pagina = Image.new("RGB", (partes[0].width, sum(t.height for t in partes)))
    y0 = 0
    for t in partes:
        pagina.paste(t, (0, y0)); y0 += t.height
else:
    pagina = Image.open(carpeta / "pagina.png").convert("RGB")
ancho, alto_pagina = pagina.size
escala = datos["dsf"]  # device scale of the capture
# a page with horizontal overflow makes the full-page capture wider than the viewport: keep the viewport only
ancho_vista = int(round((390 if escala >= 2 else 1440) * escala))
alto = int(round(datos["vh"] * escala)) // 2 * 2
ancho_par = min(ancho, ancho_vista) // 2 * 2
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{ancho_par}x{alto}",
                       "-r", str(datos["fps"]), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17",
                       "-preset", "slow", "-movflags", "+faststart", salida], stdin=subprocess.PIPE)
for y in datos["y"]:
    top = min(max(0, int(round(y * escala))), alto_pagina - alto)
    ff.stdin.write(pagina.crop((0, top, ancho_par, top + alto)).tobytes())
ff.stdin.close()
sys.exit(ff.wait())
