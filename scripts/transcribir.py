"""transcribir.py — Transcripción con tiempos por palabra (JSON + SRT) usando faster-whisper.

Uso:
    .venv/Scripts/python.exe scripts/transcribir.py <audio> [--modelo small] [--idioma auto]
                                                    [--salida <base>] [--dispositivo auto]

Genera:
    <base>.json  {idioma, duracion, segmentos: [{inicio, fin, texto, palabras: [{palabra, inicio, fin, prob}]}]}
    <base>.srt   subtítulos por segmento
Por defecto <base> es la ruta del audio sin extensión + "-transcripcion".

La primera vez descarga el modelo (Hugging Face) a la caché del usuario.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def tiempo_srt(seg: float) -> str:
    """Segundos → HH:MM:SS,mmm."""
    ms = int(round(seg * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def main() -> int:
    p = argparse.ArgumentParser(description="Transcribe un audio con tiempos por palabra (faster-whisper).")
    p.add_argument("audio", help="Archivo de audio (idealmente WAV mono 16 kHz)")
    p.add_argument("--modelo", default="small", help="tiny | base | small | medium | large-v3 (por defecto: small)")
    p.add_argument("--idioma", default="auto", help="Código de idioma (es, en, …) o 'auto' para autodetectar")
    p.add_argument("--salida", default=None, help="Ruta base de salida (sin extensión)")
    p.add_argument("--dispositivo", default="auto", help="auto | cpu | cuda")
    a = p.parse_args()

    audio = Path(a.audio)
    if not audio.is_file():
        print(f"✗ No existe {audio}", file=sys.stderr)
        return 1

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("✗ Falta faster-whisper. Instalar: uv pip install --python .venv/Scripts/python.exe faster-whisper", file=sys.stderr)
        return 1

    base = Path(a.salida) if a.salida else audio.with_name(audio.stem + "-transcripcion")
    compute = "int8"
    modelo = WhisperModel(a.modelo, device=a.dispositivo, compute_type=compute)
    # Decode with ffmpeg (16 kHz mono float32) instead of letting faster-whisper use PyAV:
    # some PyAV versions break its decoder (open() got an unexpected keyword 'metadata_errors').
    import subprocess

    import numpy as np

    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(audio), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    segmentos, info = modelo.transcribe(
        np.frombuffer(pcm, dtype=np.float32),
        language=None if a.idioma == "auto" else a.idioma,
        word_timestamps=True,
        vad_filter=True,
        beam_size=5,
    )

    datos = {"idioma": info.language, "prob_idioma": round(info.language_probability, 3), "duracion": round(info.duration, 3), "modelo": a.modelo, "segmentos": []}
    lineas_srt: list[str] = []
    for i, s in enumerate(segmentos, start=1):
        palabras = [
            {"palabra": w.word.strip(), "inicio": round(w.start, 3), "fin": round(w.end, 3), "prob": round(w.probability, 3)}
            for w in (s.words or [])
        ]
        datos["segmentos"].append({"inicio": round(s.start, 3), "fin": round(s.end, 3), "texto": s.text.strip(), "palabras": palabras})
        lineas_srt += [str(i), f"{tiempo_srt(s.start)} --> {tiempo_srt(s.end)}", s.text.strip(), ""]

    base.parent.mkdir(parents=True, exist_ok=True)
    base.with_suffix(".json").write_text(json.dumps(datos, ensure_ascii=False, indent=2), encoding="utf-8")
    base.with_suffix(".srt").write_text("\n".join(lineas_srt), encoding="utf-8")
    n_pal = sum(len(s["palabras"]) for s in datos["segmentos"])
    print(f"✓ Transcripción ({datos['idioma']}, {len(datos['segmentos'])} segmentos, {n_pal} palabras): {base}.json / .srt")
    return 0


if __name__ == "__main__":
    sys.exit(main())
