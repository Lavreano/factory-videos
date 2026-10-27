---
name: ritmo
description: Criterio de cortes, duración de planos y respiros de un reel. Usar al armar el storyboard, al asignar tiempos a cada escena, al alinear cortes con la voz o el beat y al revisar si un reel "se cae" o "corre demasiado".
---

# ritmo — cortes y respiros

## Reglas (verificables)

1. **Cambio visual cada 1,5–3 s.** Un cambio es: corte, entrada de un elemento nuevo, cambio de cámara o de estado de la UI.
2. **Nunca más de 4 s sin cambio.** Verificación: en la hoja de contactos (1 fotograma por segundo), no puede haber 5 fotogramas seguidos iguales. En el storyboard, ninguna fila > 4 s sin un movimiento interno anotado.
3. **El gancho es lo más rápido del reel:** cambios cada 0,4–1 s en los primeros 2–3 s (palabra por palabra, un corte por línea).
4. **Respiros:** 0,3–0,75 s con menos elementos y el fondo quieto **antes de la prueba** (bloque 5) y **antes del CTA** (bloque 7). En el storyboard se anotan como fila "respiro".
5. **Cortes alineados:**
   - Con voz: el corte cae en el **inicio de la palabra** que cambia de idea (usar la transcripción por palabra de `scripts/transcribir.py`), nunca en medio de una palabra.
   - Con música: el corte cae **en el beat** (`npx hyperframes beats` o cálculo: cuadros por beat = fps × 60 / BPM, calculado por índice y redondeado, nunca acumulado).
6. **Lectura:** una línea que hay que leer se sostiene **0,5 s + 0,3 s por palabra** antes de irse. La última línea del reel (CTA) se sostiene ≥ 2 s.
7. **Tipos de corte:** como máximo un tercio de las uniones entre bloques son cortes secos; el resto con transición con causa (skill `movimiento`). Máximo 3–5 tipos de transición por reel.
8. **Duración total:** 25–45 s (reels de prueba: 15 s). La prueba (bloque 5) nunca después del segundo 30.
9. **Contraste de velocidades:** al menos un tramo rápido (gancho, montaje) y uno sostenido (prueba, demo de UI de 3–5 s con movimiento interno).

## Cómo aplicarla al storyboard

| Paso | Qué revisar |
|---|---|
| 1 | Sumar duraciones: total dentro del rango. |
| 2 | Marcar cada fila > 3 s: ¿tiene movimiento interno? |
| 3 | Insertar los dos respiros. |
| 4 | Si hay voz: alinear cada inicio de fila a una palabra de la transcripción. |
| 5 | Contar tipos de transición (≤ 5) y cortes secos (≤ 1/3). |

## Señales de que el ritmo está mal
- "Se siente lento": planos de 4–5 s sin movimiento → partir o agregar un movimiento interno.
- "Se siente un PowerPoint": todas las escenas entran igual → variar entradas (skill `movimiento`).
- "No se llega a leer": la línea no cumple la regla 6.
