"""Beat grid for one track window: tempo, beat phase and measured kick hits.
Usage: python beats.py <track.mp3> <start_s> <dur_s>
Prints JSON with tempo, the beat grid (in reel time, 0 = start_s) and kick peaks.
"""
import json
import subprocess
import sys

import numpy as np

path, start, dur = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
SR = 22050
raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(start), "-t", str(dur), "-i", path, "-ac", "1", "-ar", str(SR),
                      "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, dtype=np.float32)
hop, win = 256, 2048
n = 1 + (len(x) - win) // hop
fr = np.lib.stride_tricks.as_strided(x, shape=(n, win), strides=(x.strides[0] * hop, x.strides[0]))
spec = np.abs(np.fft.rfft(fr * np.hanning(win), axis=1))
freqs = np.fft.rfftfreq(win, 1 / SR)
fps = SR / hop
t = np.arange(n) / fps


def onset(band):
    e = np.log1p(spec[:, band].sum(axis=1))
    o = np.maximum(0, np.diff(e, prepend=e[0]))
    return o / (o.max() + 1e-9)


full = onset(freqs > 0)
kick = onset(freqs < 150)
snare = onset((freqs > 1500) & (freqs < 5000))

# Tempo search 60–180 BPM in 0.1 steps, phase by comb alignment with the full onset.
best = (0, 0, 0)
for bpm in np.arange(60, 180, 0.1):
    period = 60 / bpm
    for ph in np.linspace(0, period, 48, endpoint=False):
        grid = np.arange(ph, dur, period)
        idx = np.clip((grid * fps).astype(int), 0, n - 1)
        s = full[idx].mean()
        if s > best[0]:
            best = (s, bpm, ph)
_, bpm, ph = best
period = 60 / bpm


def peaks(o, thr):
    p = []
    for i in range(1, len(o) - 1):
        if o[i] > thr and o[i] >= o[i - 1] and o[i] >= o[i + 1]:
            if not p or t[i] - p[-1] > 0.12:
                p.append(round(float(t[i]), 3))
    return p


print(json.dumps({
    "bpm": round(float(bpm), 2), "fase": round(float(ph), 3), "periodo": round(period, 4),
    "beats": [round(float(b), 3) for b in np.arange(ph, dur, period)],
    "kicks": peaks(kick, 0.35), "snares": peaks(snare, 0.4),
}))
