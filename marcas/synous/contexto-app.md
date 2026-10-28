# Contexto de app — Synous AI

| Campo | Valor |
|---|---|
| Carpeta de la marca | `D:\Laureano\Desktop\2. Synous AI` (subcarpetas `Synous-AI\`, `Diseño\`, `Clientes\`) |
| Monorepo | `Synous-AI\`: pnpm + Turborepo. API en Fastify, Drizzle y PostgreSQL; admin en Next 14 con Tailwind y shadcn; login con Clerk |
| **CRM (interno)** | `apps\admin`. Es la herramienta propia de Synous, **no se vende**. Dominio: app.synous.ai. Estado: "pendiente de terminar" |
| **Página de cotización** | La landing pública de propuesta dentro del CRM: `/p/[token]` por lead y `/portal/propuesta` como plantilla (propuesta.synous.ai) |
| Portal de cliente | `app\portal\(app)` (cliente.synous.ai). Entregables, documentos, formularios, facturas, marca y pedidos |
| Sitio público | **En construcción**: "Synous AI — Sitio en construcción" |
| Revisado | 2026-10-27 |

## Qué tiene el CRM (para mostrar como producto funcionando)

Pantallas (`apps\admin\app\admin\(dashboard)\`):

- **Comercial:** dashboard, pipeline (kanban), deals, leads, contactos, empresas, clientes, propuestas.
- **Proyectos:** proyectos, tareas, seguimientos, calendario.
- **Administración:** finanzas, facturas, reportes, operaciones.
- **Otras:** biblioteca, onboarding, pedidos de cambio, equipo.

Funciones:

- agenda tipo Calendly (`app\book`);
- propuestas con IA exportables a PDF;
- finanzas en USD y ARS, con MRR;
- notificaciones en tiempo real;
- tracking de emails;
- webhook de Fathom;
- onboarding de 8 pasos.

> **No hay capturas del CRM en la carpeta.** Para un reel hay que levantarlo en local (`pnpm dev`, puertos 3000/3001), grabarlo con **datos de demostración** y guardarlo en `assets/synous/grabaciones/`.

## Qué leer

- `Synous-AI\README.md`, `CLAUDE.md`, `docs\ARCHITECTURE.md`, `docs\CRM_SYNOUS_DOCS.md`.
- **Copy de marca:** `apps\admin\app\portal\propuesta\proposal-content.ts` y `docs\PROPUESTA-UIRTUS.md`.
  - Nunca se copian los precios de la sección 6.
- **Identidad:**
  - `apps\admin\app\portal\_brand\brand-tokens.css`;
  - `components\proposal\*`;
  - `apps\admin\public\brand\`;
  - `Diseño\` (moodboards y logos).
- **Posicionamiento y estado:** `D:\Laureano\Desktop\1. Synx Build\Sistema Operativo\contexto\synous-ai\_unidad.md` y `proyectos\*.md`.

## Qué ignorar

- `node_modules`, `.next`, `.turbo`, `apps\client-portal` (obsoleto).
- **Cualquier `.env*`**.
- **Referencias ajenas:** `apps\frontpackpro.com\` y `apps\refe-quotes\`. Son espejos de FrontPackPro y de una plantilla de Framer: sirven como inspiración, **nunca como material de reel**.
- `Clientes\`: hay transcripciones de reuniones con datos personales (por ejemplo, `fathom-kathe.txt`). No se abren ni se usan.

## Cómo se usa

1. `/add-dir "D:\Laureano\Desktop\2. Synous AI"`.
2. Leer solo lo indicado y citar `origen: <archivo>` en el storyboard.
3. **Solo lectura.** Nunca modificar, borrar ni commitear nada ahí.
4. Si no está accesible, avisar. No inventar.
