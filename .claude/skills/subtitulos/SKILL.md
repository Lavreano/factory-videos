---
name: subtitulos
description: Reglas de subtítulos estilo karaoke por palabra para reels con voz. Usar cuando un reel tiene voz en off o habla a cámara, al generar los subtítulos desde la transcripción, o al revisar su sincronía y posición.
---

# subtitulos — karaoke por palabra

## Fuente de tiempos
1. Transcribir siempre con `scripts/transcribir.py` (faster-whisper, `word_timestamps`): `.venv/Scripts/python.exe scripts/transcribir.py audio.wav --idioma es`. Se usa el JSON (`segmentos[].palabras[]`), nunca tiempos a ojo.
2. Corregir a mano la ortografía de la transcripción (nombres propios, marcas, voseo) **sin tocar los tiempos**.

## Reglas (verificables)
3. **2–4 palabras por bloque.** Un bloque nunca cruza un punto ni una pausa > 0,35 s.
4. **Karaoke:** la palabra que suena pasa de `--color-text-muted` (o `--color-text` al 60 %) a `--color-text` en su `inicio`; la **palabra clave** del bloque se resalta con `--color-accent`. Una palabra clave por bloque como máximo.
5. **Sincronía:** el resaltado de cada palabra arranca entre −2 y +1 cuadro de su `inicio` en el JSON. El bloque aparece 0,1 s antes de su primera palabra y se va 0,15 s después de la última.
6. **Posición:** dentro de la zona segura, banda **y 1180–1460**, centrados, ancho máximo 860 px (x 110–970). **Nunca** tapan el texto principal ni la cara: si la escena usa esa banda, los subtítulos suben a y 300–420.
7. **Tipografía:** `--font-body` o `--font-display`, `--text-caption` (≥ 52 px), peso ≥ 600, con contraste ≥ 4.5:1 (si el fondo es complejo: caja `--color-bg` al 70 % con `--radius-sm`, o trazo).
8. **Movimiento:** el bloque entra con `spring-pop` corto (scale 0.92 → 1, 0,15 s, `--ease-spring`) o sin movimiento; nunca con slide largo. Sale con fade de 0,1 s.
9. **Un solo host** de subtítulos en el `index.html` con `data-track-kind="captions"` y `z-index: 8`; cada grupo es un elemento con `class="clip"` y su `data-start`/`data-duration`.
10. Antes de escribir a mano un estilo de subtítulos, buscar en el registro: `npx hyperframes catalog --tag captions --json` (y la referencia `captions.md` de la skill `hyperframes`).

## Checklist
- [ ] Tiempos desde el JSON de la transcripción.
- [ ] 2–4 palabras por bloque.
- [ ] Palabra clave en el acento (≤ 1 por bloque).
- [ ] En la banda 1180–1460 sin tapar la escena.
- [ ] Snapshot en 3 momentos con voz: la palabra resaltada coincide con lo que suena.
