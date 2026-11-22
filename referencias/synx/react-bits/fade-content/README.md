# FadeContent (React Bits) — referencia que pasó Laureano (2026-11-14)

Hace aparecer el contenido con uno de 6 efectos:
- `fade`
- `focus`: sale del desenfoque
- `develop`: sale del gris lavado
- `dissolve`: grano fino
- `mist`: niebla que se disuelve
- `pixel`: bloques

Usa GSAP. El original corre con ScrollTrigger y con `Math.random()` para la semilla del ruido.

## Cómo portarlo a HyperFrames

Hay que hacerlo determinístico:
- **Ruido**: semilla fija en `feTurbulence`, en lugar de `Math.random()`.
- **Progreso**: el `progress` de la máscara se maneja desde el tiempo del slide con `ganchos` y `fase(t)`, sin ScrollTrigger ni `timeline.play()`.
- **Cuadro 0**: tiene que quedar completo. Si un texto aparece con `mist` al inicio del loop, en la costura del loop desaparece. Por eso conviene usarlo en elementos que entran y salen dentro del loop (chips, notificaciones, segundas capas), o en piezas que no se repiten en loop (reels).

**Usos que encajan**:
- `mist` para chips o tarjetas que aparecen ("Registro confirmado", "Te uniste al grupo");
- `focus` para cifras que entran;
- `pixel` para revelar una captura antes/después.
