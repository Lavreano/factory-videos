# DESIGN.md — Synous AI

> **Fuentes:**
>
> - **Anexo A.3.** Define la dirección: "tiene que sentirse como producto e infraestructura: interfaces, paneles, datos, mapas de sistema".
> - **Identidad real**, leída el 2026-10-27 de `D:\Laureano\Desktop\2. Synous AI\Synous-AI` (detalle de rutas en `contexto-app.md`):
>   - la superficie pública de propuestas del CRM (`apps/admin/app/portal/_brand/brand-tokens.css` y `components/proposal/*`);
>   - los logos de `apps/admin/public/brand/`.
>
> Las variables están en `tokens.css` y llevan los mismos nombres en todas las marcas.

## Superficie canónica

El repo tiene dos estéticas:

| Superficie | Estética | Uso |
|---|---|---|
| **Propuesta pública** (`/p/[token]`) | Navy oscuro, aurora y grano | **Es la marca.** De acá salen los tokens. |
| **CRM interno** (admin) | Monocromo, estilo Resend (blanco/negro, Inter, radio de 12 px) | Solo aparece **como pantalla** dentro de un mockup: muestra el producto funcionando. |

## Concepto visual

**Infraestructura en calma.** Un vacío navy, paneles de producto que flotan con sombra profunda y una aurora azul detrás. Encima, un celeste pálido que marca lo que importa. Se siente como un sistema operativo que ya funciona: sereno, preciso, sin estridencias.

## Paleta

| Rol | Token | Valor | Origen (`brand-tokens.css`) |
|---|---|---|---|
| Fondo (void) | `--color-bg` | `#010511` | void |
| Superficie | `--color-surface` | `#030520` | surface |
| Superficie 2 | `--color-surface-2` | `#090D1D` | surface-raised (high: `#171D33`) |
| Borde | `--color-border` | `#1C2542` | bordes (`#181D31` / `#1A1D29` / `#1C2542`) |
| Texto | `--color-text` | `#DADFF5` | texto (títulos: `#D5E5F9`) |
| Texto secundario | `--color-text-muted` | `#93A1B4` | muted-dim (7,76:1) |
| **Acento (celeste)** | `--color-accent` | `#96C0FF` | acento (10,94:1) |
| Texto sobre acento | `--color-accent-contrast` | `#010511` | — |
| Acentos extra | — | `#669CFF` (bright) · `#1C73CA` (deep) | Usar solo dentro de piezas de UI |
| **Aurora** | `--color-glow` / `--shadow-glow` | `#181BA2` · `#99C0FE` · `#383CFF` | `proposal-landing.tsx` |
| Éxito / error / aviso | | `#4ADE80` / `#F87171` / `#FBBF24` | PROPUESTA (badges del CRM) |

**Logo:** gradiente del isotipo de `#090909` a `#535353` y a `#BEE6FF`, con el wordmark en blanco.

**Uso del acento:**

- Una sola palabra o elemento por pantalla.
- La aurora va **detrás**, como luz, nunca como fondo plano.

**Diferencia con synx build.** Las dos marcas comparten el void `#010511`. Para que no se confundan:

| | Synous | synx build |
|---|---|---|
| Acento | Celeste pálido `#96C0FF` | Azul eléctrico `#5073FF` |
| Luz | Aurora multicolor azul y celeste | Halo eléctrico de un solo color |
| Tipografía | **Plus Jakarta Sans** (redondeada) | **Geist** (técnica) |
| Contenido | Producto con paneles de software | Landings con mockup de navegador |

## Tipografía

| Rol | Familia | Pesos | Token |
|---|---|---|---|
| Títulos | **Plus Jakarta Sans** | 600 (300 para la bajada) | `--font-display` |
| Texto | **Plus Jakarta Sans** | 400, 600 | `--font-body` |
| Etiquetas y datos | **JetBrains Mono** | 400, 500, 600 | `--font-mono` |

Origen: `--font-proposal-sans` + JetBrains Mono, en las páginas públicas.

**Escala (1080×1920):**

| Uso | Tamaño |
|---|---|
| Hero | 140 px |
| Título | 100 px |
| h2 | 74 px |
| Cuerpo | 46 px |
| Subtítulo | 56 px |
| Etiqueta | 28 px |
| Número | 240 px |

- **Títulos:** tracking de −0,04 em.
- **Etiquetas:** en mono, mayúsculas, con tracking de +0,14 em. Ejemplos: `01 CONTEXTO`, `02 ARQUITECTURA`.

**Nombre:**

- Se escribe **"Synous AI"**.
- "Synous" a secas solo dentro del copy.
- Nunca "SYNOUS".

## Espaciado y radios

- **Espaciado:** base de 8 px. Márgenes de 80 px.
- **Radios:** 8 · 12 · 24 px, más pastilla. Los 12 px son el radio del CRM.

## Texturas (en `assets/synous/imagenes/texturas/`)

| Archivo | Qué es |
|---|---|
| `GRID.webp` | Grilla de fondo. |
| `dots.svg` · `MASKDOT.svg` | Patrón de puntos y máscara. |
| `MeshGradient.webp` · `light2-4.webp` | Luces y mesh de la aurora. |

**Grano de película:** un punto de 1 px cada 3 px, al 4,5 %, con `plus-lighter`. Es el `--grain-opacity` de los tokens.

## Producto en pantalla

En `assets/synous/imagenes/mockups/` hay mockups de monitor con plataformas reales: Consciencia MCE, CASC y Aura Studio.

- Es el formato de prueba de la marca: el sistema funcionando dentro de un monitor oscuro.
- ⚠️ Revisar `pruebas-reales.md` antes de usarlos: los permisos están pendientes.

## Tratamiento 3D

- **Materiales:** vidrio y metal oscuro.
- **Luz:** la aurora (`#383CFF` y `#99C0FE`) de contraluz.
- **Objetos:** paneles de UI apilados en capas, nodos y conectores de un mapa de sistema.
- **Cámara:** lenta, con órbitas suaves.

## Motion

- **Ritmo:** calmo y arquitectónico. La referencia es el scroll suave de Lenis.
- **Entradas:** `expo.out` con blur de 12 px.
- **Salidas:** `power2.in`.
- **Movimientos:** `power3.inOut`. Duraciones más largas que en synx build (base de 0,7 s).
- **Paneles:** se deslizan en capas, con parallax leve.

## Lo que SÍ hacemos

- interfaces y paneles reales;
- mapas de sistema (nodos y flujos);
- la aurora como luz;
- etiquetas mono con fases;
- datos con contexto;
- mucho aire y calma.

## Lo que NUNCA hacemos

- robots, cerebros ni chispas de "IA mágica";
- logos de herramientas de terceros;
- degradados violeta;
- el azul eléctrico de synx build como acento;
- datos reales de alumnos o clientes en pantalla;
- la estética de las referencias ajenas (FrontPackPro, Framer) copiada tal cual.
