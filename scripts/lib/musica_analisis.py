"""Analyze candidate music tracks: tempo, energy curve, low-end weight and the biggest drop.
Usage: python musica_analisis.py <folder> [<folder> ...] > out.json
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

SR = 22050


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def analyze(path):
    x = decode(path)
    dur = len(x) / SR
    hop, win = 512, 2048
    n = 1 + (len(x) - win) // hop
    frames = np.lib.stride_tricks.as_strided(x, shape=(n, win), strides=(x.strides[0] * hop, x.strides[0]))
    spec = np.abs(np.fft.rfft(frames * np.hanning(win), axis=1))
    freqs = np.fft.rfftfreq(win, 1 / SR)
    flux = np.maximum(0, np.diff(np.log1p(spec), axis=0)).sum(axis=1)
    flux = (flux - flux.mean()) / (flux.std() + 1e-9)
    fps = SR / hop
    # Tempo: autocorrelation of the onset envelope, 70–180 BPM.
    ac = np.correlate(flux, flux, mode="full")[len(flux) - 1:]
    lags = np.arange(len(ac))
    bpm = 60 * fps / np.maximum(lags, 1)
    ok = (bpm >= 70) & (bpm <= 180)
    lag = lags[ok][np.argmax(ac[ok])]
    tempo = 60 * fps / lag
    # Energy per second and low-end share (kick/808 below 150 Hz).
    rms = np.sqrt((frames ** 2).mean(axis=1))
    per_s = [float(rms[int(i * fps):int((i + 1) * fps)].mean()) for i in range(int(dur))]
    low = spec[:, freqs < 150].sum(axis=1) / (spec.sum(axis=1) + 1e-9)
    sm = np.convolve(per_s, np.ones(2) / 2, mode="same")
    jumps = np.diff(sm)
    drop = int(np.argmax(jumps[:min(len(jumps), 60)]) + 1) if len(jumps) > 2 else 0
    loud_db = 20 * np.log10(np.mean(per_s) + 1e-9)
    return {
        "archivo": path.name, "carpeta": path.parent.name, "duracion": round(dur, 1), "bpm": round(float(tempo), 1),
        "drop_s": drop, "salto_drop": round(float(jumps[drop - 1]) if drop else 0, 4),
        "energia_db": round(float(loud_db), 1), "graves": round(float(low.mean()), 3),
        "energia_por_s": [round(v, 3) for v in per_s],
    }


out = []
for folder in sys.argv[1:]:
    for p in sorted(Path(folder).glob("*.mp3")):
        try:
            out.append(analyze(p))
        except Exception as e:  # keep going: one broken file must not stop the batch
            out.append({"archivo": p.name, "error": str(e)})
json.dump(out, sys.stdout, ensure_ascii=False)
