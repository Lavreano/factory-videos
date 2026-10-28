# Guion — caso-mce-metodologia-sistema

**Marca:** `synous` · **Código:** `M-01` · **Duración:** 33 s · **Estado:** borrador → **esperando aprobación**

## 3 ganchos alternativos

| # | Gancho (≤ 7 palabras en pantalla) | Tipo | Cifra o contraste | ¿Sin sonido en 1,5 s? |
|---|---|---|---|---|
| A | **"Tu metodología no cabe en WhatsApp."** | Contraste | Metodología ↔ chat | Sí: 5 palabras, se lee de un golpe |
| B | "38 pantallas. Una sola metodología." | Resultado con cifra | 38 pantallas reales (MCE 2.0) | Sí, pero sin contexto la cifra no le dice nada todavía |
| C | "La construimos dos veces." | Lo poco conocido | 1.0 → 2.0 | Sí: genera curiosidad, pero no nombra el dolor |

**Elegido: A.** Le habla directo al dolor del seguidor ideal: la metodología repartida en chats y planillas. Tiene que pensar "eso me pasa a mí" antes de ver el caso. B queda como gancho de la prueba (bloque 5). C sirve para un segundo reel sobre la evolución 1.0 → 2.0.

## Guion (estructura de 7 pasos)

Solo texto en pantalla, sin voz.

| # | Bloque | Tiempo | Texto en pantalla | Visual | Intención |
|---|---|---|---|---|---|
| 1 | Gancho | 0–2,2 s | "Tu metodología **no cabe** en WhatsApp." | Tipografía grande sobre el void navy, con la aurora de fondo | Romper el patrón: nombrar el dolor |
| 2 | Promesa | 2,2–4,5 s | Etiqueta `CASO · CONSCIENCIA MCE` + "Mirá en qué la convertimos." | Wipe al caso, con el logo de MCE | Dar una razón para quedarse |
| 3 | Enemigo común | 4,5–9 s | "Chats. Planillas. PDFs. Llamadas." → "Cada alumno nuevo **suma trabajo**." | Íconos genéricos, enredados en gris, que se rompen (sin logos de marcas) | "Eso me pasa a mí" |
| 4 | Solución con nombre propio | 9–18,5 s | `SISTEMA OPERATIVO DIGITAL` → "Un portal para cada alumno." → "**Atlas**: una IA que conoce el método." → "Mapas, hábitos, salud, comunidad." | Pantallas reales de app.conscienciamce.com en el monitor del mockup: inicio → Atlas → mapa energético → hábitos | El método con nombre, y el producto funcionando |
| — | Respiro | 18,5–19 s | — | Fondo quieto | Antes de la prueba |
| 5 | Prueba | 19–26 s | "**38** pantallas" (contador) → "22 para el alumno. 16 para el equipo." → "Versión 2.0: reconstruida desde cero." | Contador + grilla de pantallas que se llena + etiqueta `v1.0 → v2.0` | Hacerlo creíble con números del código |
| 6 | Valor + objeción | 26–30 s | "No es una plantilla." → "Es **su** método, convertido en sistema." | `nosotros-vs-otros`: "adaptás tu negocio a la herramienta" ↔ "el sistema se adapta a tu método" | Recolocar el valor y desarmar "uso Skool / Circle" |
| — | Respiro | 30–30,3 s | — | Corte limpio | Antes del CTA |
| 7 | Urgencia + CTA | 30,3–33 s | "Comentá **SISTEMA**" + "y te mando las 7 señales de que tu operación ya te queda chica." | `cta-palabra-clave` | Una sola acción |

## Palabra clave del CTA

`SISTEMA` → recurso: **"7 señales de que tu operación ya te queda chica"** (diagnóstico de una página).

`TODO:` el recurso no existe. Lo armo antes de publicar y lo anoto en `marcas/synous/ctas.md`.

## Ecuación de valor

| Palanca | ¿La mueve? | Dónde (bloque) |
|---|---|---|
| ↑ Resultado deseado | Sí: la metodología convertida en una plataforma propia, con IA | 4 |
| ↑ Probabilidad percibida | Sí: caso real con nombre, pantallas reales y cifras del código | 2, 4, 5 |
| ↓ Tiempo | No: los plazos de MCE no son un dato de entrega, así que no se usan | — |
| ↓ Esfuerzo | Sí: "el sistema se adapta a tu método", sin forzar el negocio dentro de una herramienta | 6 |

## Puntaje de la idea (1–10)

| Criterio | Puntaje | Por qué |
|---|---|---|
| Interés para la piscina | 8 | Cualquier coach o academia con la operación en chats y planillas se identifica en el gancho. |
| Cercanía a la oferta | 9 | Es literalmente el "Sistema Operativo Digital", mostrado con un caso. |
| Fuerza del contraste o la cifra | 7 | El contraste del gancho es claro. "38 pantallas" es concreto, pero no es un resultado de negocio. Ajuste posible: sumar "+70 alumnos activos" **cuando se confirme en la base**; subiría a 8–9. |

## Datos usados

| Dato | Origen | ¿Real con permiso o `DATO DE EJEMPLO`? |
|---|---|---|
| Caso Consciencia MCE (nombre y marca) | `marcas/synous/pruebas-reales.md` | Real, `permiso: confirmado` (Laureano, 2026-10-27) |
| 38 pantallas: 22 del alumno y 16 del admin | `MCE 2.0/frontend/src/app` (conteo de `page.tsx`) | Real, medido en el código |
| Versión 2.0 reconstruida desde cero (1.0 en React + Express → 2.0 en Next.js) | `MCE 2.0/CLAUDE.md`, `docs/HISTORIAL.md` | Real |
| Atlas, una IA con memoria del método | `MCE 2.0/backend/src/modules/atlas/` | Real |
| "Chats, planillas, PDFs, llamadas" | Dolor genérico del seguidor ideal (`audiencia.md`) | No es un dato: describe al espectador, **no** afirma cómo operaba MCE antes |
| +70 alumnos activos | `MCE 2.0/CLAUDE.md` (11-09-2026) | **No se usa** hasta verificarlo en la base |

**Palabras prohibidas revisadas:** no aparece "IA" como adorno (Atlas tiene una función concreta), ni "te hacemos una app", ni features infinitas.
