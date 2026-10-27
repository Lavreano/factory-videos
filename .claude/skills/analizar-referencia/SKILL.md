---
name: analizar-referencia
description: Analiza un video de referencia de referencias/<marca>/videos/ (cortes, fotogramas, transcripción) y completa la ficha de análisis evaluándolo contra el perfil y la audiencia de esa marca. Usar cuando Laureano suma una referencia, pide "analizá este reel" o quiere saber qué copiar, adaptar o descartar de un video.
---

# analizar-referencia

## Entrada
- Marca (o `general`). Si no está clara, preguntar.
- Un video en `referencias/<marca>/videos/` (o `referencias/general/videos/`).

## Proceso
1. Correr:
   ```bash
   bash scripts/analizar-referencia.sh <marca|general> referencias/<marca>/videos/<archivo>
   ```
   (opciones: `--umbral 0.3`, `--modelo small`, `--sin-transcripcion`)
2. **Mirar** `hoja-contactos.jpg` y los fotogramas de `frames/` (c_* por corte, s_* por segundo). No describir lo que no se vio.
3. Leer `resumen.txt` y `transcripcion.json` (texto y tiempos por palabra).
4. Copiar `plantillas/analisis-referencia.md` a `referencias/<marca>/analisis/<nombre>.md` y completarla:
   - Números: duración, cantidad de cortes, duración promedio por plano, plano más largo, palabras por segundo.
   - Estructura del guion **mapeada a los 7 pasos** con tiempos.
   - Gancho: texto exacto, tipo, si funciona sin sonido, qué hay en el fotograma 0.
   - Visual: tipografías probables, paleta, movimientos (con los nombres de la skill `movimiento`), transiciones, 3D, subtítulos, sonido.
   - **Stack probable** (código, After Effects, Spline, CapCut, etc.) con el indicio que lo sugiere.
   - **Evaluación contra la marca** (`perfil.md`, `audiencia.md`, `DESIGN.md`): ¿le habla a su seguidor ideal? ¿choca con "lo que NUNCA hacemos"?
   - **Qué copiamos, qué adaptamos y qué no.**
   - Qué piezas de `biblioteca/` lo resuelven y cuáles habría que construir.

## Reglas
- La referencia se evalúa **contra la marca indicada**, no en abstracto. Algo bueno para SYNX puede ser malo para Synous.
- No copiar textos, marcas ni assets ajenos: se toma estructura, ritmo y criterio.
- Nunca borrar videos ni análisis de `referencias/` sin preguntar.
