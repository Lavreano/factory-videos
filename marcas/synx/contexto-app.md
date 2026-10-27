# Contexto de app — synx build

| Campo | Valor |
|---|---|
| Carpeta de la marca | `D:\Laureano\Desktop\1. Synx Build` |
| Panel interno ("Sistema Operativo") | `D:\Laureano\Desktop\1. Synx Build\Sistema Operativo`. Next 16, Clerk y Supabase. Es privado (app.synxbuild.com) y **no** es un sitio público. |
| Proyectos de clientes | `D:\Laureano\Desktop\1. Synx Build\Clientes\` (13 clientes) |
| Material de negocio | `D:\Laureano\Desktop\1. Synx Build\Negocio\` |
| Sitio público | No hay una landing de synx build en la carpeta. `TODO:` ruta del sitio synxbuild.com, si existe. |
| Revisado | 2026-10-27 |

## Qué leer

- **Posicionamiento y decisiones:**
  - `Sistema Operativo/contexto/landing-pages/_unidad.md`;
  - `contexto/equipo.md`;
  - `Negocio/Negocio - Interno/Enfoque de negocio.txt`;
  - `Negocio/Negocio - Interno/Mi analisis de negocio.txt`.
- **Identidad:**
  - `Sistema Operativo/app/css/default.css` y `dark.css` (escala del azul);
  - `components/auth/login.css` (fondos);
  - `lib/email/marca.ts`;
  - `public/brand/`.
- **Piezas de resultado:**
  - `Negocio/Redes sociales/Resultados/` (ya copiadas a `assets/synx/imagenes/resultados/`);
  - `Negocio/Redes sociales/Landings/` (SVG y PNG, 412 MB: no se copiaron).
- **Videos de landings funcionando:** `Negocio/Resultados - Landing pages/1776828049758/` (ver `pruebas-reales.md`).
- **Componentes animados** (referencia para escenas de mockup): `Negocio/Componentes - Código/`.
  - Contenido: carruseles 3D, marquesina de logos, notificaciones con contador, cards con blur, botón animado.
  - ⚠️ Animan en tiempo real. Para usarlos en un reel hay que **reescribirlos** con timelines.
- **Fotos de Laureano:**
  - `Negocio/Redes sociales/Fotos yo/` (sesión 2025);
  - `Negocio/Fotos IA/Yo/` (11 retratos con IA).
  - Son de la marca personal, no de synx build.

## Qué ignorar

- `node_modules/`, `.next/`, `dist/`, `build/`, `.vercel/`, `.git/`;
- **cualquier `.env*`** (hay `.env.local` en proyectos de clientes);
- claves y SQL de carga al panel;
- datos de clientes (fotos personales, testimonios con datos, cotizaciones);
- el stack de cada cliente (GoHighLevel, MailerLite, Stripe).

## Cómo se usa

1. `/add-dir "D:\Laureano\Desktop\1. Synx Build"`.
2. Leer solo lo indicado y citar `origen: <archivo>` en el storyboard.
3. **Solo lectura.** Nunca modificar, borrar ni commitear nada ahí.
4. Si no está accesible, avisar. No inventar.
