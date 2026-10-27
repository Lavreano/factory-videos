# Catálogo de la biblioteca

> Generado por `node scripts/lib/catalogo.mjs` a partir del código de cada pieza. No editar a mano: editar la pieza (o la descripción en `scripts/lib/catalogo.mjs`) y regenerar.

Todas las piezas son **sin marca**: toman colores, fuentes, radios, sombras, easings y duraciones de `tokens.css`. Se prueban solas con `bash scripts/laboratorio.sh <pieza> --marca <slug>`.

## Escenas

| Pieza | id | Duración | Bloque | Parámetros | Cuándo usarla |
|---|---|---|---|---|---|
| [`before-after`](escenas/before-after/README.md) | `antesdespues` | 4 s | 5 Prueba · 4 Solución | `etiqueta_antes`, `etiqueta_despues`, `marca_web`, `badge`, `titular`, `clave`, `bajada`, `cta`, `rotulo` | La prueba más fuerte para landings. Con un caso real: reemplazar los mocks por capturas en `assets/media/`. |
| [`cta-palabra-clave`](escenas/cta-palabra-clave/README.md) | `cta` | 3 s | 7 Urgencia + CTA | `filtro`, `pre`, `palabra`, `detalle`, `pulsos` | Siempre en el cierre. |
| [`enemigo-glitch`](escenas/enemigo-glitch/README.md) | `enemigo` | 3 s | 3 Enemigo común | `titulo`, `sub`, `clave`, `url`, `titulo_web`, `boton_web`, `semilla`, `tachar` | Para nombrar la práctica que el seguidor ideal hace hoy y no le funciona. |
| [`gancho-tipografico`](escenas/gancho-tipografico/README.md) | `gancho` | 2.6 s | 1 Gancho · 2 Promesa | `etiqueta`, `linea1`, `linea2`, `linea3`, `clave`, `portada`, `centrado`, `arriba` | Siempre en el gancho. También para la promesa (una sola línea). |
| [`mockup-ui-cursor`](escenas/mockup-ui-cursor/README.md) | `mockup` | 5 s | 4 Solución · 5 Prueba (proceso en vivo) | `url`, `titulo`, `bajada`, `etiqueta`, `tipeo`, `boton`, `exito`, `zoom` | Mostrar el producto funcionando, un flujo de la app o un clic→éxito. |
| [`nosotros-vs-otros`](escenas/nosotros-vs-otros/README.md) | `comparativa` | 4 s | 6 Valor + objeción | `titulo`, `clave`, `col_otros`, `col_nosotros`, `filas` | Desarmar la objeción típica ("lo hago con IA", "otro cobra menos"). |
| [`prueba-contador`](escenas/prueba-contador/README.md) | `contador` | 3 s | 5 Prueba | `etiqueta`, `valor`, `desde`, `decimales`, `prefijo`, `sufijo`, `texto`, `clave`, `serie`, `rotulo`, `conteo` | Resultado con cifra. Solo datos reales con permiso o rotulados. |
| [`solucion-reveal-3d`](escenas/solucion-reveal-3d/README.md) | `reveal3d` | 4.5 s | 4 Solución con nombre propio | `etiqueta`, `nombre`, `clave`, `semilla`, `modulos` | El momento de más producción: revelar el método o sistema con nombre. Alternativa: reemplazar el `<canvas>` por un `<video muted>` exportado de Spline/Unicorn a `assets/<marca>/3d/`. |

## Transiciones

Se montan **encima** de las escenas (z-index alto), centradas en el corte.

| Pieza | id | Duración | Bloque | Parámetros | Cuándo usarla |
|---|---|---|---|---|---|
| [`desplazamiento`](transiciones/desplazamiento/README.md) | `desplazamiento` | 0.4 s | Transición | `semilla`, `sentido` | Cortes rápidos dentro del ritmo del gancho o de un montaje. Montar en `corte − 0.2`. |
| [`flash`](transiciones/flash/README.md) | `flash` | 0.35 s | Transición | `color`, `intensidad` | Golpe de beat o corte seco. Montar en `corte − 0.06`. Con moderación. |
| [`wipe-mascara`](transiciones/wipe-mascara/README.md) | `wipe` | 0.5 s | Transición | `color`, `direccion` | Cambio de bloque con energía. Montar en `corte − 0.25`. |
| [`zoom-through`](transiciones/zoom-through/README.md) | `zoomthrough` | 0.6 s | Transición | `x`, `y` | Atravesar un botón o un elemento hacia la escena siguiente. Montar en `corte − 0.35` con `x`/`y` en el elemento. |

## Fondos

Se montan **debajo** de las escenas, ocupando todo el reel o un bloque.

| Pieza | id | Duración | Bloque | Parámetros | Cuándo usarla |
|---|---|---|---|---|---|
| [`grano-gradiente`](fondos/grano-gradiente/README.md) | `grano` | slot | Fondo | `semilla`, `fps_grano` | Fondo cálido o cinematográfico para cualquier bloque. |
| [`grilla-brillo`](fondos/grilla-brillo/README.md) | `grilla` | slot | Fondo | `intensidad` | Fondo por defecto de marcas técnicas (personal, synx build, Synous). |
| [`particulas`](fondos/particulas/README.md) | `particulas` | slot | Fondo | `semilla`, `cantidad` | Fondo con vida para la solución o el CTA. |

## Mapa por bloque de la estructura (7 pasos)

| # | Bloque | Piezas |
|---|---|---|
| 1 | Gancho | `gancho-tipografico`, `prueba-contador` (gancho con cifra), `before-after` (gancho de contraste) |
| 2 | Promesa | `gancho-tipografico` (1 línea) + `wipe-mascara` |
| 3 | Enemigo común | `enemigo-glitch` |
| 4 | Solución con nombre propio | `solucion-reveal-3d`, `mockup-ui-cursor` |
| 5 | Prueba | `prueba-contador`, `before-after`, `mockup-ui-cursor` |
| 6 | Valor + objeción | `nosotros-vs-otros` |
| 7 | Urgencia + CTA | `cta-palabra-clave` |

## Lenguaje de motion de UI para 9:16 (pendientes como escenas propias)

Del lenguaje visual del nicho (landings que venden). Varias ya están cubiertas; el resto se construye cuando un reel lo necesite (pipeline paso 8):

| Motion | Estado |
|---|---|
| Hero reveal | Cubierto por `before-after` (DESPUÉS) y `gancho-tipografico` |
| Contadores | `prueba-contador` |
| Cursor tour / clic→éxito | `mockup-ui-cursor` |
| Before/after | `before-after` |
| Comparativa | `nosotros-vs-otros` |
| Process draw | Parcial: `draw-line` en `solucion-reveal-3d` y `prueba-contador`. `TODO:` escena propia (fases numeradas que se dibujan) |
| Rotador de palabras | `TODO:` (slot-rotate de una palabra) |
| Notificaciones de venta | `TODO:` (toasts apilados; datos siempre DATO DE EJEMPLO) |
| Bento grid | `TODO:` |
| Precios tipo odómetro | No aplica: **nunca se muestran precios** en un reel. Reutilizable para otras cifras con `prueba-contador`. |
