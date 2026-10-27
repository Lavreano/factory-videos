# Revisión (QA) — prueba-pipeline

**Marca:** `personal` · **Versión:** v3 · **Fecha:** 2026-10-27 · **Archivo:** `render/prueba-pipeline.mp4` → exportado `render/prueba-pipeline-ig.mp4`

## Checklist (skill `qa-reel`)

### Contenido
- [x] El gancho se lee en **1,5 s sin sonido** — `render/qa/qa-01.50.png`: "Tu landing es linda. / Y no vende." completo (7 palabras).
- [x] La portada se lee en miniatura — `render/portada-200.png` (200 px): "Tu landing es linda." legible.
- [x] Hay contraste claro (linda ↔ no vende) y una cifra (+38 %, de ejemplo).
- [x] Una idea por pantalla, ≤ 7 palabras de texto principal.
- [x] Ortografía y tildes revisadas en todos los textos (Comentá, Diseño de cartón, botón, más). Voseo correcto.
- [x] Datos de ejemplo rotulados `DATO DE EJEMPLO` en el before/after y en el contador mientras se ven.
- [x] Ningún caso real (todos `permiso: pendiente`, ninguno usado). Ningún precio.
- [x] Palabras prohibidas de la marca: ninguna.

### Composición
- [x] Zonas seguras: el texto clave queda entre y ≈ 330 y y ≈ 1440, x 80–940 (hoja de contactos).
- [x] Texto clave (gancho, cifra, CTA) en la banda 220–1330.
- [x] Tamaños ≥ mínimos (el menú y el badge del mock subieron de 22 a 28 px tras el primer `check`).
- [x] Contraste: `npx hyperframes check --json` → `ok: true`, 0 errores, 0 warnings (v2).
- [x] Todo color y fuente sale de `tokens.css`.

### Ritmo y movimiento
- [x] Ningún plano > 4 s sin cambio (planos de 2,8 · 2,8 · 4,0 con barrido interno · 2,7 · 2,7 s).
- [x] Gancho más rápido que el resto; respiro antes de la prueba (9,28–9,6 s) y antes del CTA (≈ 12,0–12,4 s).
- [x] Sin parpadeos ni saltos: fotogramas a ±1 cuadro de cada corte (`render/qa-cortes.jpg`). En v1 y v2 había un punto y un halo sueltos antes del gráfico; corregido en v3.
- [x] Cada elemento entra y sale con movimientos coherentes.
- [x] Subtítulos: no aplica (reel sin voz).

### Técnico
- [x] Duración 15,00 s (reel de prueba).
- [x] 1080×1920, 30 fps, H.264 High, yuv420p, AAC 48 kHz (verificado por `exportar-instagram.sh`).
- [x] Audio: pista silenciosa agregada en la exportación; pico −inf dBTP (≤ −1).
- [x] Render determinístico: timelines GSAP pausados, glitch y franjas con semilla, 3D desde `hf-seek`.

## Hallazgos

| # | Tiempo | Problema | Severidad | Arreglo |
|---|---|---|---|---|
| 1 | 4,17 s | `check`: superposición de textos y contraste bajo en la web fea del enemigo (las copias del glitch) | baja (es ilustración a propósito) | `data-layout-ignore` en la web y en las franjas (biblioteca) |
| 2 | 7,5 s | `check`: el ANTES queda tapado por el DESPUÉS | baja (es la mecánica de la escena) | `data-layout-ignore` en la capa ANTES |
| 3 | 7,5 s | Botón del DESPUÉS con contraste de 4,11:1 | **media** | Acento propuesto `#3B6CFF` → `#4775FF` y texto sobre acento `#0B0B0B` (`marcas/personal/tokens.css`) |
| 4 | 7 s | Menú y badge del mock a 22 px (mínimo 28) | media | Subidos a 28 px (biblioteca) |
| 5 | 13,1 s | La última línea del CTA dura 1,9 s (mínimo 2 s) | media | El "y te mando…" entra 0,25 s antes (biblioteca) |
| 6 | 9,6 s | Punto y halo del gráfico visibles antes de que se dibuje la línea | media | El punto aparece con la línea y el halo queda invisible hasta su momento (biblioteca) |
| 7 | 12,0–12,4 s | El zoom-through pasa cuando el contador ya se fue: se lee como respiro, no como "atravesar" | baja | Aceptado para la prueba. En un reel real: sacar el contador más tarde o montar el zoom 0,3 s antes |

## Cambios pedidos

| Versión | Pedido | Estado |
|---|---|---|
| v1 | Render inicial | QA: hallazgos 1–6 |
| v2 | Arreglos 1–5 | `check` en verde; aparece el hallazgo 6 en la revisión visual |
| v3 | Arreglo 6 | **Listo para exportar** (solo queda el 7, de severidad baja) |

## Versión

- v1 — 2026-10-27 — render inicial.
- v2 — 2026-10-27 — arreglos de layout, contraste y CTA.
- v3 — 2026-10-27 — punto y halo del contador. Exportado: `render/prueba-pipeline-ig.mp4`.
