# Cómo escribir un prompt de motion

Un prompt de motion es la especificación de **una escena** (una fila del storyboard) lo bastante precisa para que la composición salga bien en el primer intento. "Que entre con onda" no es un prompt. "Sube 60 px desde blur 12 px en 0,5 s con `expo.out`, stagger 80 ms" sí lo es.

La skill `prompt-motion` convierte una fila del storyboard en este formato.

## Formato obligatorio

```
ESCENA: <id> — <bloque de la estructura> — <escena de biblioteca o "nueva">

1. LAYOUT
   Qué hay en pantalla y dónde (px desde arriba/izquierda en 1080×1920, siempre dentro de la zona segura).

2. MOTION (numerado, en orden)
   N. [t = inicio s] elemento — movimiento con nombre — distancia (px) — duración (s) — easing — stagger — notas.

3. ESTILO
   Tokens de la marca usados (--color-*, --font-*, --text-*, --radius-*, --shadow-*).
   Dónde va el acento (una sola palabra o elemento por pantalla).

4. TIMING GLOBAL
   Duración de la escena, punto de corte, qué queda en pantalla en el último fotograma, transición de salida.

5. DETERMINISMO
   Semilla si hay aleatoriedad (mulberry32), qué se mide antes de animar, fuentes requeridas.
```

Reglas del formato:

- Todos los tiempos **absolutos** desde el inicio de la escena (así se escriben los tweens: `tl.fromTo(el, a, b, 0.4)`).
- Distancias en px, duraciones en s o ms, easing con nombre de GSAP o del glosario de abajo.
- Cada elemento declara **entrada y salida** (skill `movimiento`).
- Una línea por paso. Si un paso necesita dos tweens, son dos pasos.

---

## Ejemplo 1 — Gancho tipográfico

```
ESCENA: gancho — Bloque 1 (Gancho) — biblioteca/escenas/gancho-tipografico

1. LAYOUT
   Fondo --color-bg con fondo `grilla-brillo` al 40 %.
   Bloque de texto alineado a la izquierda, x = 80 px, centrado verticalmente en y ≈ 760 px (banda 220–1330).
   Línea 1: "Tu landing es linda." — --text-title (110 px), --color-text-muted.
   Línea 2: "Y no vende." — --text-hero (150 px), --color-text; la palabra "vende" en --color-accent.
   Subrayado bajo "vende": línea de 8 px, --color-accent, ancho = ancho de la palabra.
   Etiqueta arriba: "A-0" en --font-mono, --text-label, --color-text-muted, y = 560 px.

2. MOTION
   1. [0.00 s] Línea 1, palabra por palabra — rise-blur — sube 40 px, blur 12 → 0, opacity 0 → 1 — 0.45 s — expo.out — stagger 80 ms.
      (En el fotograma 0 la primera palabra ya está al 40 %: la portada nunca está vacía.)
   2. [0.55 s] Línea 2, palabra por palabra — rise-blur — sube 60 px, blur 14 → 0 — 0.5 s — expo.out — stagger 90 ms.
   3. [1.15 s] Subrayado — draw-line — scaleX 0 → 1 desde la izquierda — 0.4 s — power3.inOut.
   4. [1.15 s] Etiqueta — fade — opacity 0 → 1 — 0.3 s — power2.out.
   5. [1.60 s → 2.30 s] Hold: todo quieto (el título aterrizado no se mueve).
   6. [2.30 s] Salida de las dos líneas — blur-out — opacity 1 → 0, blur 0 → 10, y −20 px — 0.25 s — power3.in — stagger 40 ms.

3. ESTILO
   --font-display, --weight-display, --tracking-display, --leading-display.
   Acento solo en "vende" y en su subrayado.

4. TIMING GLOBAL
   Duración: 2.6 s. Corte en 2.55 s al bloque siguiente con transición `wipe-mascara`.
   Último fotograma: pantalla limpia con el fondo.

5. DETERMINISMO
   Sin aleatoriedad. Fuentes: display de la marca (700). Timeline registrado después de document.fonts.ready.
```

## Ejemplo 2 — Before/after de una landing

```
ESCENA: antes-despues — Bloque 5 (Prueba) — biblioteca/escenas/before-after

1. LAYOUT
   Dos mockups de landing apilados en la misma caja: 840 × 1100 px, x = 80, y = 300, --radius-lg, --shadow-card.
   ANTES (abajo en z): web genérica gris (--color-ugly-*), hero centrado con stock, 3 botones iguales, texto chico.
   DESPUÉS (arriba en z, recortado con clip-path): landing de la marca, titular grande, un CTA, jerarquía clara.
   Divisor vertical: 6 px, --color-accent, con perilla circular de 64 px en el centro.
   Etiquetas: "ANTES" arriba a la izquierda, "DESPUÉS" arriba a la derecha, --font-mono, --text-label.
   Rótulo inferior y = 1440: "DATO DE EJEMPLO" (si no es un caso real con permiso).

2. MOTION
   1. [0.00 s] Caja completa — spring-pop — scale 0.92 → 1, opacity 0 → 1 — 0.6 s — back.out(1.2).
   2. [0.30 s] Etiqueta ANTES — fade — 0.3 s — power2.out.
   3. [0.90 s] Divisor + clip-path del DESPUÉS — barrido — de x = 100 % a x = 0 % — 1.4 s — power2.inOut.
   4. [1.10 s] Mockup ANTES — desaturar + oscurecer — brightness 1 → 0.7 — 1.2 s — power1.inOut.
   5. [2.30 s] Etiqueta DESPUÉS — rise-blur — sube 20 px — 0.4 s — expo.out.
   6. [2.40 s] Titular del DESPUÉS — slot-rotate de 1 palabra — 0.3 s — power3.out.
   7. [2.70 s → 3.60 s] Hold con camera-push suave: scale 1 → 1.03 en toda la caja — 0.9 s — power1.inOut.
   8. [3.60 s] Salida — zoom-through del CTA del DESPUÉS hacia la siguiente escena — 0.35 s — power3.in.

3. ESTILO
   DESPUÉS: --color-surface, --color-text, --font-display; CTA en --color-accent con texto --color-accent-contrast.
   ANTES: solo --color-ugly-* (nunca tokens de la marca: es "lo feo").
   Acento: divisor y CTA del DESPUÉS.

4. TIMING GLOBAL
   Duración: 4.0 s. Corte en 3.95 s con `zoom-through`.
   Último fotograma: el DESPUÉS completo, sin divisor.

5. DETERMINISMO
   Sin aleatoriedad. El clip-path se tweenea como inset(0 0 0 X%). Sin medición de texto.
```

---

## Glosario de easings

| Nombre | GSAP | Sensación | Para qué |
|---|---|---|---|
| `ease-out-expo` | `expo.out` | Llega rápido y aterriza muy suave, con cola larga. Premium, cinematográfico. | Entradas de títulos y palabras. **La entrada por defecto.** |
| `ease-out-quart` | `power4.out` | Firme y decidida, con cola larga. | Entradas de UI, cards, números. |
| `ease-out-cubic` | `power3.out` | Natural, rápida, sin drama. | Entradas secundarias, etiquetas. |
| `ease-out-quad` | `power2.out` | Suave y neutra. Usada en todo se vuelve genérica. | Fades cortos. Con moderación. |
| `ease-in-cubic` | `power3.in` | Acelera y se va. | **Salidas** y zoom-through. |
| `ease-in-out-cubic` | `power3.inOut` | Arranca y frena con control. | Barridos, divisores, draw-line. |
| `ease-in-out-quad` | `power2.inOut` | Movimiento de cámara amable. | Camera-push, inundación de color. |
| `spring con leve overshoot` | `back.out(1.2)` | Se pasa un poquito y vuelve. Vivo pero serio. | Pop de cards, badges, botones. |
| `spring juguetón` | `back.out(1.8)` o `elastic.out(1, 0.5)` | Rebota. Lúdico. | Casi nunca en marcas serias. Solo si el brief lo pide. |
| `lineal` | `none` | Mecánica, constante. | Rotaciones, barras de progreso, contadores que deben verse constantes. |
| `steps(n)` | `steps(n)` | A saltos, digital. | Glitch, tipeo, parpadeo de cursor. |

Regla: **la llegada dura más que la salida** (las salidas son 40–50 % más cortas) y nunca se usa el mismo easing para todo. Cada marca define sus easings por defecto en `tokens.css` (`--ease-enter`, `--ease-exit`, `--ease-move`, `--ease-spring`).
