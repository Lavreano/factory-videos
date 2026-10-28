# Casos de estudio — Synous AI

> Ideas que Laureano fue pasando desde el 2026-10-27. Se actualiza a medida que suma más.
> **Objetivo:** mostrar todo el trabajo hecho en cada plataforma, en reels de Synous AI.
> **Permisos:** confirmados por Laureano el 2026-10-27. Ver `pruebas-reales.md`.
> **Datos personales:** nunca se ven en pantalla (alumnos, leads, mails, teléfonos), aunque el cliente haya dado el OK.

| # | Caso | Qué es | Carpeta (solo lectura) | Qué mostrar | Estado del material |
|---|---|---|---|---|---|
| 1 | **Consciencia MCE** (Santiago Gómez) | Plataforma del programa de transformación: portal del alumno, admin, onboarding, contenido, calendario, reportes e IA contextual ("Atlas"). Empezó con una landing y creció hasta el sistema | `D:\Laureano\Desktop\Consciencia MCE\` (`MCE 1.0`, `MCE 2.0`, `conscienciamce-web`, `Moodboard`) | Todo el trabajo hecho en la app de Santiago: la evolución de la 1.0 a la 2.0, Atlas, el portal del alumno y el admin | Mockups `mce1` y `mce2` en `assets/synous/imagenes/mockups/`. `TODO:` explorar la carpeta y grabar la app |
| 2 | **CASC** (Cámara Argentina de Shopping Centers) | **Sitio institucional + plataforma privada de socios** en un solo Next 16 (Clerk, Supabase con RLS, Upstash, reCAPTCHA, WebGL). Dos roles: admin (la comisión) y socio (cada shopping). Además, **Shopping Fest**: la landing del evento nacional, migrada de WordPress a Next 16 | `D:\Laureano\Desktop\5. Wonder Digital Agency\CLIENTES\CASC\` y `CLIENTES\Shopping Fest\` | Ver la ficha de abajo | Capturas en `assets/synous/imagenes/casos/casc/`: home pública y 2 del panel admin. Mockups `casc1` y `casc2` |
| 3 | **synx build — Sistema Operativo** (caso propio) | Panel interno: clientes, proyectos, cotizaciones, finanzas, horas, lanzamientos y portal de clientes | `D:\Laureano\Desktop\1. Synx Build\Sistema Operativo\` · app.synxbuild.com · clientes.synxbuild.com | Cómo opera una agencia con su propio sistema: el panel y el portal de clientes | `TODO:` grabar (las pestañas del navegador ya están abiertas para iniciar sesión) |
| 4 | **Aura Studio** (producto propio) | SaaS de creativos con IA, con API y MCP | `D:\Laureano\Desktop\3. Aura Studio™\` · app.aurastudio.com.ar | De la URL al kit de marca y a los creativos, más el MCP | Mockups `aura1` y `aura2`. `TODO:` grabar |

## Notas

- Los casos 3 y 4 son **propios**: "construimos nuestras propias plataformas" funciona como prueba de que el método se usa adentro.
- El caso de Consciencia MCE también lo comparte la marca personal (la relación empezó en una landing y creció hasta la plataforma).
- **Lo que no se abre:** `fathom_transcripts/` de Consciencia MCE (transcripciones con datos personales).

## Ficha — Consciencia MCE

**Online:**

- conscienciamce.com (web de marketing)
- app.conscienciamce.com (la app)
- api.conscienciamce.com

**La evolución, que es el corazón del caso:**

| | MCE 1.0 | MCE 2.0 (Atlas) | Web |
|---|---|---|---|
| Qué es | Primera plataforma en producción | Reescritura completa | Marketing migrado de WordPress |
| Stack | React + Vite + Express | Next.js 15 en todo el stack, Supabase con pgvector, Drizzle, Trigger.dev, Sentry | Next.js 15 |
| Commits | 169 (mayo a julio de 2026) | **812** (de junio de 2026 a hoy, sigue activo) | 52 |
| Código | ~62.000 líneas | **~137.000 líneas** TS/TSX · 174 tests · 357 componentes | 10 secciones |
| Datos | ~47 tablas con parches sueltos | **72 tablas** y 89 migraciones versionadas | — |
| Pantallas | ~28 | **38**: 22 del alumno y 16 del admin | — |
| Backend | +50 rutas Express | 200 rutas API en 69 módulos · 19 jobs en segundo plano | — |

Fuente: git y conteo de archivos. Son números reales.

**Pantallas del alumno (2.0):**

- inicio con dashboard;
- activación diaria y check-in;
- **Atlas** (chat con la IA);
- calendario con Google Calendar;
- hábitos, rutinas, prioridades y modo foco;
- salud: comidas por foto, entrenamientos y sueño;
- notas, ideas e identidad;
- mapas energéticos: carta astral, Diseño Humano y Kin Maya;
- contenido con progreso;
- comunidad y ranking;
- reportes.

**Pantallas del admin (2.0):**

- panel y ficha de cada alumno;
- programas: ediciones Club y Círculo;
- finanzas, permisos y cola de prioridad;
- registro de auditoría y errores;
- **costos de IA mes a mes**.

**Atlas, la IA:**

- **Modelos:** Claude (Sonnet para conversar, Haiku para tareas baratas).
- **Memoria:** vectorial por alumno, con RAG sobre la doctrina de Santiago.
- **Voz:** con ElevenLabs, hasta 60 min por mes por alumno.
- **Acciones reales:** guarda notas, crea tareas, eventos y hábitos, y registra comidas y entrenamientos.

**Alumnos:**

- Lo seguro para decir: **"más de 70 alumnos activos"** (70 con membresía activa al 11-09-2026, según `MCE 2.0/CLAUDE.md`).
- Ese dato está escrito en un documento, pero no se verificó contra la base. Para confirmarlo, correr la query de `CLAUDE.md` §1.
- "Casi 80" **no está confirmado** en ningún lado.

**Antes y después de UX** (`mejoras-ux-mce.txt`, 7 de julio): análisis de comidas.

- Al subir la foto, poder sumar un texto o un audio con lo que lleva.
- Poder corregir las entradas aunque ya se haya llegado al objetivo de calorías.
- `TODO:` verificar si en la 2.0 quedó resuelto, antes de usarlo como "lo que mejoramos".

**Identidad del cliente:**

- **Colores:** fondo oscuro `#080808` / `#0D0D10`; acento `#003DC7` y azul de texto `#4D83FF`.
- **Tipografía:** Inter.
- **Logos de MCE y de Atlas:** `assets/synous/imagenes/casos/mce/`.

**Material:**

- GIFs de la interfaz: `portal-2.0.gif` y `miperfil-2.0.gif`.
- `referencia-ui-1.0.png` (1.0).
- Mockups `mce1` y `mce2`.
- **No hay grabaciones.** Hay que grabar app.conscienciamce.com con una **cuenta de demostración**, porque con datos reales aparecerían nombres de alumnos.

**Mensajes para los reels:**

- "De 169 a 812 commits: la misma plataforma, construida dos veces y mejor."
- "Una IA que conoce la doctrina de Santiago y la agenda de cada alumno."
- "Convertimos una metodología en un sistema." *(frase de la propuesta de Synous)*

## Ficha — CASC

**Online:**

- casc.org.ar (200)
- plataforma.casc.org.ar (200)
- shoppingfest.com.ar

**Números medibles** (salen del código, son reales):

| Dato | Valor | Fuente |
|---|---|---|
| Commits | 178 (del 2026-07-06 al 2026-10-23) | git |
| Páginas | 51 | `page.tsx` |
| Migraciones SQL | 27 | `supabase/migrations` |
| Logos de asociados | ~119 | `public/` |
| Shoppings en Shopping Fest | 69, por región | `src/data/shoppings.ts` |

**Pantallas para un reel:**

- **Sitio público:** home con carrusel, marquesina de logos y contador; mapa interactivo de delegaciones regionales; directorio filtrable de asociados; actividades, noticias y bolsa de trabajo con carga de CV; galería "dome".
- **Panel admin:** dashboard, webinars, informes, noticias, newsletter, blog, actividades, beneficios, socios, solicitudes, bolsa de trabajo y encuesta.
- **Panel del socio:** home, webinar con video embebido, informes, newsletter, beneficios y encuesta.

**Identidad del cliente:**

- tipografía Inter;
- navy `#0B2535` · `#113B55` · `#19557B`, y celeste `#8DA9C4`;
- logos en `CASC/public/brand/` y `marca/`.
- ⚠️ El cliente pidió **no usar corchetes** en el sitio, aunque son el motivo de su marca.

**Mensaje para el reel:**

- "De un sitio viejo en Laravel a una plataforma propia." *(`MIGRACION.md`. Del primer al último commit pasaron menos de 4 meses, pero el proyecto sigue vivo: no conviene venderlo como "plazo de entrega".)*
- "Un panel para la comisión. Un portal para cada shopping."

**Cuidado al grabar:**

- La plataforma tiene datos reales de socios y de candidatos de la bolsa de trabajo.
- Opciones: grabar en local con `pnpm seed` (datos de ejemplo), o tapar todo dato personal.

> ⚠️ **Crédito.** El trabajo lo hizo Laureano como **proveedor de desarrollo de Wonder Digital Agency**. Los 178 commits son de Laureano Sierra y no hay ningún archivo que vincule CASC con Synous AI.
> En un reel de Synous, la forma segura es "desarrollado por nuestro equipo para CASC". `TODO:` Laureano confirma si se menciona a Wonder.

## Ideas de reels (a medida que lleguen)

- 
