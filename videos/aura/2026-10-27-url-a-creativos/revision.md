# Revisión (QA) — url-a-creativos

**Marca:** `aura` · **Versión:** v1 · **Fecha:** 2026-10-27 · **Archivo:** `render/url-a-creativos.mp4`

## Checklist (skill `qa-reel`)

### Contenido
- [ ] El gancho se lee en **1,5 s sin sonido** (fotograma 0 y fotograma a 1,5 s).
- [ ] La portada se lee en miniatura (≈ 200 px de ancho).
- [ ] Hay al menos una **cifra concreta** o un **contraste** claro.
- [ ] Una idea por pantalla, ≤ ~7 palabras de texto principal.
- [ ] Ortografía y tildes revisadas en **todos** los textos (voseo rioplatense).
- [ ] Datos de ejemplo rotulados `DATO DE EJEMPLO` mientras se ven.
- [ ] Ningún caso real sin `permiso: confirmado`. Ningún precio.
- [ ] Palabras prohibidas de la marca: ninguna.

### Composición
- [ ] Zonas seguras: nada de texto en y < 220, y > 1500, x > 940.
- [ ] Texto clave (gancho, cifra, CTA) en la banda 220–1330.
- [ ] Tamaños: títulos ≥ 72 px, cuerpo ≥ 44 px, subtítulos ≥ 52 px.
- [ ] Contraste suficiente (`npx hyperframes check --json` sin errores de contraste).
- [ ] Todo color y fuente sale de `tokens.css` (sin hex sueltos en las composiciones).

### Ritmo y movimiento
- [ ] Ningún plano > 4 s sin cambio visual.
- [ ] Gancho más rápido que el resto; respiro antes de la prueba y antes del CTA.
- [ ] Sin parpadeos ni saltos entre cuadros (revisar hoja de contactos y los cortes).
- [ ] Cada elemento entra y sale con movimientos coherentes.
- [ ] Subtítulos sincronizados (si hay voz).

### Técnico
- [ ] Duración dentro del rango (25–45 s; prueba: 15 s).
- [ ] 1080×1920, 30 fps, H.264 High, yuv420p, AAC 48 kHz (`exportar-instagram.sh` verifica).
- [ ] Audio sin clipping: picos ≤ −1 dBTP.
- [ ] Render determinístico (sin `Math.random()` sin semilla, sin timers).

## Hallazgos

| # | Tiempo | Problema | Severidad | Arreglo |
|---|---|---|---|---|
| | | | | |

## Cambios pedidos

| Versión | Pedido | Estado |
|---|---|---|
| v1 | | |

## Versión

- v1 — 2026-10-27 — render inicial.
