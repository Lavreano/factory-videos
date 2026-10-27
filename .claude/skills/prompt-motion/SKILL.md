---
name: prompt-motion
description: Convierte una fila del storyboard en un prompt de motion preciso (layout, motion numerado, estilo, timing, determinismo). Usar antes de escribir o modificar una escena, cuando una fila del storyboard es ambigua, o cuando Laureano describe un movimiento con palabras.
---

# prompt-motion

## Entrada
Una fila de `storyboard.md` (escena, inicio–fin, visual, texto, movimiento, sonido, pieza) + la marca del reel.

## Proceso
1. Leer `docs/produccion/prompts-motion.md` (formato y glosario de easings) y los `tokens.css` / `DESIGN.md` de la marca.
2. Si la fila usa una pieza de biblioteca, leer su `README.md`: el prompt solo describe lo que **cambia** (variables, slot, tiempos) y lo que se agrega.
3. Escribir el prompt con las 5 secciones obligatorias:
   1. **LAYOUT** — cada elemento con posición en px (1080×1920) dentro de la zona segura.
   2. **MOTION** — pasos numerados `[t s] elemento — movimiento con nombre — distancia — duración — easing — stagger`. Tiempos absolutos desde el inicio de la escena. Entrada **y** salida de cada elemento.
   3. **ESTILO** — tokens usados y dónde va el acento (uno).
   4. **TIMING GLOBAL** — duración, punto de corte, último fotograma, transición de salida.
   5. **DETERMINISMO** — semilla (si hay aleatoriedad), qué se mide antes de animar, fuentes requeridas.
4. Validar contra las skills `movimiento` (nombres y valores), `ritmo` (≤ 4 s sin cambio) y `composicion` (capas y zonas).

## Reglas
- Nada de adjetivos sin número: "rápido" → "0,3 s"; "suave" → "`power2.inOut`"; "grande" → "150 px".
- Los movimientos usan los nombres de la skill `movimiento` (rise-blur, spring-pop, slot-rotate, mask-reveal, draw-line, camera-push, zoom-ui, count-up, glitch).
- Cada paso del motion tiene que poder escribirse como **un** tween.
- El prompt se pega debajo de la tabla del storyboard, en "Prompts de motion".
