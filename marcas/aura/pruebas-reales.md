# Pruebas reales — Aura Studio

> **Regla:** un caso con nombre propio solo se usa en un reel si figura con `permiso: confirmado`.

| Caso | Dato | Origen | Uso típico | Permiso |
|---|---|---|---|---|
| Creativos generados por la app | 40 piezas reales que salieron del producto | `assets/aura/imagenes/creativos-app/` (copiadas de `Negocio/Redes sociales/Instagram/Ig 19-04/Posts`) | Muro de creativos, grilla de resultados | `permiso: confirmado` por Laureano para el carrusel de Synous (2026-11-01). Las piezas ya se publicaron en el Instagram de Aura |
| Demo del MCP | `TODO:` grabar la pantalla pidiéndole a Claude Code un creativo y un UGC con @AuraStudio, y guardar el video que sale | Todavía no se grabó. Va a ir a `assets/aura/grabaciones/` | Reels de "Aura dentro de tu IA" | — |
| Tiempo real de generación | `TODO:` grabar la pantalla durante una generación completa y cronometrarla | Todavía no se grabó. Va a ir a `assets/aura/grabaciones/` | Gancho con cifra | — |

> ⚠️ **Las 40 piezas usan marcas de terceros** (Felfort, Gymshark y otras). No se muestran logos ni marcas reconocibles sin autorización. Hay dos salidas: desenfocarlos o, mejor, generar piezas nuevas con marcas propias o de demostración.

## Datos que NO se usan (no tienen respaldo)

| Dato | Dónde aparece | Problema |
|---|---|---|
| "+135 usuarios activos", "4,9/5" (el JSON-LD dice 4,8) | `HeroTrustBadge.jsx`, `Home.jsx` | No tiene una fuente verificable. |
| "Confiado por más de 27.000 creadores" | `es.json` → `home.hero.trustedBy` | Contradice los 135 usuarios y no tiene fuente. |
| "+10.000 anuncios creados" | `es.json` → `isometricSection.stat` | No tiene fuente. |
| "4.9/5 de 135+ usuarios" | Portal de developers (`features/open/pages/Landing.jsx:112`) | Está escrito a mano en el código, sin fuente de datos detrás. |

## Videos que NO se pueden usar

- **Videos de ejemplo de los modos de UGC** (`frontend/src/shared/ugcModeVideos.js`, `FlowVideo.jsx`). Son de **Higgsfield** (`static.higgsfield.ai`, `cdn.higgsfield.ai`, CloudFront). Son de terceros y **nunca van en un reel**.
- **El único video propio** es el del hero de la home (`HeroSection.jsx:13`, en Vercel Blob `video-landing.mp4`). `TODO:` descargarlo a `referencias/aura/videos/` si se va a usar como referencia.
| "30 anuncios en 60 segundos", "100 creativos en un café", "50 variaciones antes de que se enfríe el café" | Campañas del 11-04 y del 18-04 | Son promesas de marketing, nunca se midieron. |

Para usar una de estas cifras:

1. medirla en la app, con una grabación;
2. anotar el origen en este archivo;
3. pasarla a la primera tabla.
