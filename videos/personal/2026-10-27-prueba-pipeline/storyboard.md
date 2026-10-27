# Storyboard — prueba-pipeline

**Marca:** `personal` · **Código:** `A-0` · **Estado:** aprobado automáticamente (reel de prueba)

| # | Escena (id) | Inicio–fin | Visual | Texto en pantalla | Movimiento | Sonido / SFX | Biblioteca o nueva | Origen del dato |
|---|---|---|---|---|---|---|---|---|
| 1 | `gancho` | 0,0–2,8 | Tipografía grande a la izquierda sobre grilla técnica | "Tu landing es linda." / "Y no vende." (acento: "vende.") · etiqueta "A-0" | Línea 1 ya en el fotograma 0 (portada); línea 2 rise-blur por palabra; draw-line del subrayado; blur-out | — | `gancho-tipografico` | — |
| T1 | `wipe` | 2,55–3,05 | Panel azul que barre | — | mask-reveal / mask-hide | — | `wipe-mascara` | — |
| 2 | `enemigo` | 2,8–5,6 | Web genérica gris que se rompe y queda tachada | "Diseño de cartón." / "Podría ser la landing de cualquiera." | spring-pop, glitch ×3 (semilla 13), draw-line de la tacha | — | `enemigo-glitch` | — |
| T2 | `desplazamiento` | 5,4–5,8 | Franjas con desenfoque | — | whip | — | `desplazamiento` | — |
| 3 | `antesdespues` | 5,6–9,6 | Mock ANTES (gris) → barrido → DESPUÉS (landing de la marca) | ANTES / DESPUÉS · "Tu método, a la altura de tu oferta." · `DATO DE EJEMPLO` | spring-pop, mask-reveal 1,4 s, camera-push en el hold | — | `before-after` | Mock de ejemplo |
| R | (respiro) | 9,28–9,6 | Solo el fondo | — | Quieto | — | — | — |
| 4 | `contador` | 9,6–12,3 | Cifra grande + gráfico de línea | "+38 %" · "más clics en el botón principal" · `DATO DE EJEMPLO` | count-up 1,4 s, draw-line, halo | — | `prueba-contador` | `DATO DE EJEMPLO` |
| T3 | `zoomthrough` | 11,95–12,55 | Círculo que atraviesa desde el punto final del gráfico | — | zoom-through | — | `zoom-through` | — |
| 5 | `cta` | 12,3–15,0 | "Comentá" + palabra clave en marco con brillo | "Comentá" / "LANDING" / "y te mando el checklist." | rise-blur, letras con stagger, draw-line del marco, 2 pulsos de brillo | — | `cta-palabra-clave` | — |

## Capas

| z-index | Capa | Pieza |
|---|---|---|
| 1 | Fondo | `grilla-brillo` (0–15 s) |
| 2 | Escenas | `gancho`, `enemigo`, `antesdespues`, `contador`, `cta` |
| 5 | Transiciones | `wipe`, `desplazamiento`, `zoomthrough` |

## Transiciones

| Corte en (s) | Transición | Montaje (start) | Por qué (causa en pantalla) |
|---|---|---|---|
| 2,8 | `wipe-mascara` (acento) | 2,55 | El acento del gancho ("vende") "barre" hacia el problema |
| 5,6 | `desplazamiento` | 5,4 | La web rota se va con el glitch (continuidad de la rotura) |
| 9,6 | Corte con respiro | — | Respiro antes de la prueba (skill `ritmo`) |
| 12,3 | `zoom-through` (x 900, y 990) | 11,95 | Se atraviesa el punto final del gráfico hacia el CTA |

## Control de ritmo (skill `ritmo`)

Planos: 2,8 · 2,8 · 4,0 (con movimiento interno) · 2,7 · 2,7 s → ninguno > 4 s sin cambio. Gancho con cambios cada ~0,4 s. Respiro antes de la prueba (9,28–9,6) y transición antes del CTA. 4 tipos de unión (wipe, whip, corte con respiro, zoom-through).

## Prompts de motion

Las cinco escenas usan piezas de biblioteca con sus valores por defecto; solo cambian las variables de cada host (ver `composicion/index.html`). Prompt de referencia del gancho: `docs/produccion/prompts-motion.md` → Ejemplo 1.
