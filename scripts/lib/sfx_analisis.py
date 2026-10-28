"""Measure SFX: duration, peak time (what lands on the event), low-end share, spectral centroid.
Usage: python sfx_analisis.py <folder>  -> JSON list
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

SR = 22050
out = []
for p in sorted(Path(sys.argv[1]).rglob("*.mp3")):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32)
    if len(x) < 512:
        continue
    env = np.convolve(np.abs(x), np.ones(220) / 220, mode="same")
    peak_i = int(np.argmax(env))
    above = np.where(env > env.max() * 0.1)[0]
    spec = np.abs(np.fft.rfft(x * np.hanning(len(x))))
    f = np.fft.rfftfreq(len(x), 1 / SR)
    out.append({
        "archivo": str(p.relative_to(sys.argv[1])).replace("\\", "/"),
        "duracion": round(len(x) / SR, 3),
        "pico_s": round(peak_i / SR, 3),
        "cuerpo_s": round((above[-1] - above[0]) / SR, 3) if len(above) else 0,
        "graves": round(float(spec[f < 150].sum() / (spec.sum() + 1e-9)), 3),
        "centroide": int((f * spec).sum() / (spec.sum() + 1e-9)),
        "pico_db": round(float(20 * np.log10(np.abs(x).max() + 1e-9)), 1),
    })
json.dump(out, sys.stdout, ensure_ascii=False, indent=0)
