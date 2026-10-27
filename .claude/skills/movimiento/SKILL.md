---
name: movimiento
description: Biblioteca de movimientos con nombre (entradas, salidas, cámara) y sus valores por defecto para los reels del estudio. Usar al escribir o revisar cualquier animación GSAP de una escena, al elegir transiciones o al traducir "que se mueva así" a valores concretos.
---

# movimiento — entradas, salidas y cámara

Todo movimiento se escribe como tween de GSAP con `fromTo` en tiempo absoluto dentro de un timeline pausado (contrato de la skill `hyperframes`). Los easings y duraciones por defecto vienen de `tokens.css` (`--ease-enter|exit|move|spring`, `--dur-*`, `--stagger-word`, `--blur-enter`) vía `Estudio.ease()` / `Estudio.num()`.

## Movimientos con nombre

| Nombre | Qué hace | Valores por defecto | Salida coherente |
|---|---|---|---|
| **rise-blur** | Sube desde desenfoque a nítido. | y +40 a +60 px → 0, blur `--blur-enter` → 0, opacity 0 → 1, 0,45–0,5 s, `--ease-enter`, stagger `--stagger-word` (palabras) | **blur-out**: y −20 px, blur 0 → 10, opacity → 0, 0,22–0,25 s, `--ease-exit` |
| **spring-pop** | Aparece con escala y leve rebote. | scale 0.92–0.94 → 1, opacity 0 → 1, 0,5–0,6 s, `--ease-spring` (≈ `back.out(1.2)`) | **shrink-fade**: scale 1 → 0.96, opacity → 0, 0,2 s, `--ease-exit` |
| **slot-rotate** | Una palabra rota entre opciones como tragamonedas. | cada cambio: y −100 % → 0 en 0,1 s, `power3.out`; 3–5 opciones | La última queda quieta. |
| **mask-reveal** | Se descubre con una máscara (`clip-path: inset`). | `inset(0% 0% 0% 100%)` → `inset(0% 0% 0% 0%)`, 0,6–1,4 s, `--ease-move`. **Mismas unidades en los 4 lados.** | **mask-hide** hacia el lado opuesto, 40 % más corto. |
| **draw-line** | Una línea o trazo SVG se dibuja. | `strokeDashoffset` largo → 0 (o `scaleX` 0 → 1 con `transform-origin` en el inicio), 0,35–0,7 s, `--ease-move` | Se va con su contenedor. |
| **camera-push** | Acercamiento lento de cámara sobre una escena quieta. | scale 1 → 1.03–1.06 (o y −12 px) en todo el hold, `power1.inOut` | Corta o sale con la escena. |
| **zoom-ui** | Zoom estilo Screen Studio a un punto de la UI. | scale 1 → 1.3–1.6 centrado en el punto, 0,6 s, `--ease-move`; vuelta 0,55 s | Vuelta a scale 1. |
| **count-up** | Número que cuenta. | 1,2–1,8 s, `expo.out`, cifras tabulares, miles con punto (`Estudio.formato`) | Queda quieto. |
| **glitch** | Franjas desplazadas a saltos. | 3 ráfagas de 0,1 s, `steps(2)`, offsets con semilla (`Estudio.prng`) | Queda apagado (brightness 0.7). |

## Reglas (verificables)
1. **Cada elemento entra con un movimiento y sale con otro coherente** (columna "Salida coherente"). Nada desaparece de golpe salvo en un corte seco.
2. **Nada se mueve "porque sí".** Cada movimiento tiene una causa: introducir, enfatizar, conectar o salir. Prohibido: títulos que respiran, flotan o laten en loop; escalas lentas que nunca terminan; rebote en UI seria.
3. **Un título aterrizado queda quieto** hasta su salida. El movimiento pasa al siguiente elemento o a la cámara.
4. **La llegada dura más que la salida** (salida = 50–60 % de la entrada).
5. **Superposición:** el siguiente elemento arranca cuando el anterior va 30–50 % de su entrada.
6. **Stagger:** letras 1 cuadro (0,033 s) a 0,045 s; palabras 60–120 ms; ítems de lista 40–80 ms.
7. **Variar entradas dentro de un reel:** no más de 2 escenas seguidas con la misma entrada.
8. **Repeticiones finitas** (`repeat` calculado desde el slot), nunca `repeat: -1`.
9. Nunca tweenear `display`, `visibility` ni `clip-path` directamente sobre un `.clip`: animar un hijo.
10. Transformaciones en `<span>` requieren `display: inline-block`.
11. Dos tweens no pueden animar la misma propiedad del mismo elemento en tiempos que se pisan (`hyperframes lint` lo marca). Usar `tl.set` para posiciones iniciales.

## Transiciones (biblioteca/transiciones/)
| Transición | Causa típica |
|---|---|
| `wipe-mascara` | Cambio de bloque con energía (gancho → promesa, enemigo → solución). |
| `desplazamiento` | Cortes rápidos de montaje o de gancho. |
| `zoom-through` | Atravesar un botón o un elemento hacia lo que sigue (prueba → CTA). |
| `flash` | Golpe de beat, revelación. Con moderación. |

Antes de crear una transición o un efecto nuevo: `npx hyperframes catalog --tag transition --json` y skill `hyperframes-registry`.
