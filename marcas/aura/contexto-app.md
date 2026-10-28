# Contexto de la app — Aura Studio

| Campo | Valor |
|---|---|
| Carpeta de la marca | `D:\Laureano\Desktop\3. Aura Studio™` |
| App (frontend y backend) | `D:\Laureano\Desktop\3. Aura Studio™\Aura Studio App` |
| Material de negocio (identidad, campañas, redes) | `D:\Laureano\Desktop\3. Aura Studio™\Negocio` |
| Stack | React + Vite (frontend); Express + Prisma + Postgres (backend); Clerk (login); Trigger.dev (procesos en segundo plano) |
| Revisado | 2026-10-27, commit `514ee4b` (repo actualizado) |

## Qué hace hoy, según el código

| Función | Estado | Origen |
|---|---|---|
| Pegar la URL y sacar la marca (logo, colores, tipografías) | ✅ Disponible | `backend/src/trigger/scrape-brand.ts`, `generate-workspace.ts`, `src/services/firecrawl.service.js` |
| Generar creativos en imagen (4:5, 1:1, 9:16, 3:4…) | ✅ Disponible | `backend/src/routes/creatives.route.js`, `src/services/llm.service.js` |
| Ángulos de venta, perfiles de cliente (ICP), base de conocimiento, productos, favoritos | ✅ Disponible | `frontend/src/locales/es.json` (sidebar), rutas del backend |
| Galería de referencias para partir de anuncios ganadores | ✅ Solo en planes pagos | `es.json` |
| Créditos (1 crédito = 1 imagen; vencen a los 30 días; se devuelven si la generación falla) | ✅ Disponible | `backend/src/services/credits.service.js` |
| Planes y workspaces (Free 1 · Starter 3 · Growth 5 · Scale sin límite) | ✅ Disponible | `backend/src/config/plans.config.js` |
| Chatbot de soporte "Juba" | ✅ Disponible | `es.json` → `chatbot` |
| Video en la app | ⛔ "Coming Soon" (el backend responde 501) | `CreativePromptBar.jsx:1525-1528`, `creatives.controller.js:2649-2677` |
| **Imagen y video por API REST o MCP** (`@AuraStudio`, API Key en Claude Code o Cursor; portal `open.aurastudio.com.ar`) | ✅ Activo en producción (lo confirmó Laureano el 2026-10-27). La API Key gasta saldo en USD; con OAuth se gastan los créditos del plan | `docs/developer-platform/MCP.md`, `CONSOLE_API.md`, `VIDEO_PROVIDERS.md`, `IMAGE_PROVIDERS.md` |
| **UGC por MCP** (`aura_draft_ugc` gratis → `aura_generate_ugc` pago; 30 modos) | ✅ Activo, solo por MCP (no hay UGC por REST) | `docs/developer-platform/MCP.md:94`, `frontend/public/llms.txt` |
| UGC Studio y avatares en la app | ⛔ Solo admin | `WorkspaceSidebar.jsx:590`, `routes/ugcBuilder.route.js:15`, `ugcAvatars.route.js:8` |
| Aura Canvas (editor de nodos) y elementos o links para compartir | ⛔ Solo admin, salvo con `CANVAS_PUBLIC=true` | `routes/canvas.route.js:13`, `referenceElements.route.js:13` |
| Conectores: Meta, TikTok y LinkedIn Ads (campañas que salen pausadas); publicación orgánica en Instagram, Facebook, Threads, LinkedIn y TikTok; calendario | ⛔ Solo admin en la interfaz. Meta todavía no pasó el App Review y en TikTok los posts quedan privados (`SELF_ONLY`) hasta `TIKTOK_APP_AUDITED=true` | `Workspace.jsx:627-630`, `docs/developer-platform/META_ADS.md`, `platform/tiktok/config.js:38` |
| Conectarse desde Claude.ai, ChatGPT o Gemini | ⛔ "Próximamente" en el portal | `frontend/src/features/open/pages/Landing.jsx:207` |
| Funnels o sitios generados | ⛔ Sin interfaz | `backend/src/routes/funnels.route.js` |

**Modelos (para saber, no para el gancho):**

- **Imagen:** nano-banana-pro (Vertex), nano-banana-2.1 y gpt-image-2.5.
- **Video:** Seedance 2.0 y 2.5, Kling 2.6 motion, Wan motion y MiniMax H3.
- **Registro de modelos:** `platform/models/registry.js`.

**Los 30 modos de UGC** (`MCP.md:94`):

ugc, product_review, tutorial, unboxing, ugc_virtual_try_on, pro_virtual_try_on, tv_spot, talking_head, product_showcase, hyper_motion, wild_card, shopping, at_home, delivery, before_after, giant_figure, unboxing_try_on, unboxing_asmr, sneaker_try_on, crush_test, mystery_box, reboxing, ugc_addiction, gadget_saved_me, couple_at_home, selfie_testimonial, secret_hack, camera_pov, classic_vs_modern, mess_to_fresh.

**Portal para developers:**

- **Copy:** "Creativos publicitarios, por API." · "Pedíselo a tu asistente: @AuraStudio" · "Saldo en USD, sin suscripción".
- ⚠️ **Inconsistencia:** el lead del portal dice "videos UGC con una sola request", pero el UGC solo existe por MCP.

**Posicionamiento declarado en el repo:** Higgsfield como modelo, en `docs/developer-platform/HIGGSFIELD_RESEARCH.md` y `HIGGSFIELD_PORTAL_PATTERNS.md`.

## Qué leer

- **Todo el copy** (landing, precios, sidebar, chatbot): `frontend/src/locales/es.json`.
- **Landing:** `frontend/src/pages/Home.jsx` y `frontend/src/features/home/components/*`.
- **Precios:** `frontend/src/pages/Pricing.jsx`. Solo para conocer los planes: **nunca se muestran precios**.
- **Lo que ve el usuario:**
  - `frontend/src/features/workspace/components/WorkspaceSidebar.jsx`;
  - `CreativePromptBar.jsx`.
- **Identidad:**
  - `frontend/tailwind.config.cjs`;
  - `frontend/src/styles/tailwind.css`;
  - `Negocio/Identidad/` (los PDFs `Identidad visual*.pdf` **no se usan**: la identidad sale de la app o de la web, por decisión de Laureano del 2026-10-27).
- **Campañas de referencia:** `Negocio/Campañas/Campaña 11-04` y `Campaña 18-04`.
- **Material ya copiado al estudio:**
  - `assets/aura/imagenes/`: mascota, manos humano/IA, fondos, íconos y creativos de la app;
  - `marcas/aura/logos/`;
  - `referencias/aura/videos/reel-bienvenida.mp4`.

## Qué ignorar

- `node_modules/`, `dist/`, `build/`, `.git/`, `__MACOSX/`;
- **cualquier `.env*`**;
- las claves de API (fal.ai, Vertex, Firecrawl, MercadoPago, Clerk, Nango);
- los datos de usuarios.

## Cómo se usa

1. Sumar la carpeta con `/add-dir "D:\Laureano\Desktop\3. Aura Studio™"`, o con `--add-dir`.
2. Leer solo lo que indica este archivo y citar `origen: <archivo>` en el storyboard.
3. **Solo lectura:** nunca modificar, borrar ni commitear nada en esa carpeta.
4. Si una función cambia de estado (por ejemplo, se libera el video), actualizar la tabla de arriba y la de `perfil.md` antes de producir el reel.
