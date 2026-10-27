# Estructura del reel: fórmula de 7 pasos

Fórmula base para todas las marcas. **Duración objetivo: 25 a 45 segundos.** Para reels más cortos (15–20 s) se comprimen los bloques 2, 4 y 6 (ver "Versión corta").

## La fórmula

| # | Bloque | Tiempo aprox. | Función | Traducción visual | Escenas de biblioteca |
|---|---|---|---|---|---|
| 1 | **Gancho** | 0–2 s | Romper el patrón | Tipografía grande y movimiento fuerte | `gancho-tipografico` |
| 2 | **Promesa** | 2–5 s | "Te voy a mostrar cómo" | Texto + transición | `gancho-tipografico` (1 línea), transición `wipe-mascara` |
| 3 | **Enemigo común** | 5–10 s | "Eso me pasa a mí" | Escena "fea": web genérica, gris, rota | `enemigo-glitch` |
| 4 | **Solución con nombre propio** | 10–20 s | El método | Reveal 3D / sistema con nombre | `solucion-reveal-3d`, `mockup-ui-cursor` |
| 5 | **Prueba** | 20–30 s | Hacerlo creíble | Números animados, before/after, proceso en vivo | `prueba-contador`, `before-after`, `mockup-ui-cursor` |
| 6 | **Valor + objeción** | 30–35 s | Recolocar valor, quitar excusas | Comparativa, "sin X, sin Y" | `nosotros-vs-otros` |
| 7 | **Urgencia + CTA** | 35–40 s | Acción | Palabra clave grande en pantalla | `cta-palabra-clave` |

### Qué tiene que lograr cada bloque

1. **Gancho.** Se entiende sin sonido en 1,5 s. Lleva una cifra o un contraste. El fotograma 0 ya tiene texto (es la portada): nunca negro, nunca un logo.
2. **Promesa.** Le dice al espectador qué se lleva si se queda: "En 30 segundos te muestro por qué…". Es corta.
3. **Enemigo común.** Nombra lo que el seguidor ideal hace hoy y no le funciona. Tiene que generar "eso me pasa a mí". Visualmente es lo "feo": gris, genérico, roto.
4. **Solución con nombre propio.** El método o el sistema con **nombre** (ej. "Sistema Landing de Autoridad"). Se revela: es el momento de más producción visual.
5. **Prueba.** Lo que lo hace creíble: un número, un antes/después, el proceso en vivo. Solo pruebas reales con permiso, o `DATO DE EJEMPLO` rotulado.
6. **Valor + objeción.** Recoloca el valor ("no es una landing, es…") y desarma la objeción típica del nicho ("sin X, sin Y").
7. **Urgencia + CTA.** Una sola acción: "Comentá PALABRA". La palabra clave ocupa la pantalla.

### Respiros

Antes de la **prueba** (bloque 5) y antes del **CTA** (bloque 7) va un respiro de 0,3–0,75 s: menos elementos en pantalla, el fondo quieto, un corte limpio. Ver skill `ritmo`.

## Versión corta (15–20 s)

| # | Bloque | Tiempo |
|---|---|---|
| 1 | Gancho (con la promesa implícita) | 0–3 s |
| 3 | Enemigo | 3–6 s |
| 4+5 | Solución mostrada como prueba (before/after) | 6–10 s |
| 5 | Prueba con cifra | 10–12,5 s |
| 7 | CTA | 12,5–15 s |

## La ecuación de valor aplicada a cada reel

> **Valor percibido = (Resultado deseado × Probabilidad percibida de lograrlo) ÷ (Tiempo × Esfuerzo)**

Cada reel tiene que mover **al menos dos** de las cuatro palancas:

| Palanca | Qué hacer en el reel | Bloque donde vive |
|---|---|---|
| ↑ **Resultado deseado** | Mostrar el resultado concreto que quiere el seguidor ideal (no la herramienta). | Gancho, Solución |
| ↑ **Probabilidad percibida** | Prueba real, proceso visible, método con nombre, antes/después. | Prueba, Solución |
| ↓ **Tiempo** | Plazos concretos ("en 3–7 días hábiles", "en 48 h ves algo"). | Promesa, Valor |
| ↓ **Esfuerzo** | "Nos pasás el material, nosotros…", "sin X, sin Y". | Valor + objeción |

En el `guion.md` de cada reel se anota qué palancas mueve y en qué bloque.

## Cómo se traduce en escenas

1. El guion define los 7 bloques con tiempos.
2. El storyboard asigna **una escena de biblioteca (o nueva) por bloque**, y dentro de cada bloque hay cambios visuales cada 1,5–3 s (skill `ritmo`).
3. Las transiciones entre bloques se eligen con causa (skill `movimiento` y `biblioteca/transiciones/`): no más de 3–5 tipos por reel.
