# DESIGN.md — Aura Studio

> Sistema de diseño legible por IA.
> **Fuentes:** la app (`frontend/tailwind.config.cjs`, `src/styles/tailwind.css`), los logos de `Negocio/Identidad/` y las campañas del 11-04 y del 18-04.
> Los PDFs `Identidad visual*.pdf` no se usan. La fuente es la app o la web (decisión de Laureano del 2026-10-27).
> Las variables están en `tokens.css`, con los mismos nombres en todas las marcas.

## Concepto visual

**Un estudio de producción a plena luz.** Fondo claro y limpio, titulares negros muy pesados y un solo rojo Aura que marca la palabra que vende. Se ve productivo y prolijo. Nunca se ve sintético.

Se distingue de las otras marcas a primera vista:

| Marca | Rasgos |
|---|---|
| Personal | Negro y azul técnico |
| Synous | Petróleo y menta |
| synx build | Negro azulado y azul eléctrico |
| **Aura** | **Claro, con negro tinta y rojo** |

## Paleta

| Rol | Token | Valor | Origen |
|---|---|---|---|
| Fondo | `--color-bg` | `#F7F7F7` | app (`neutral`) |
| Superficie | `--color-surface` | `#FFFFFF` | app |
| Superficie 2 | `--color-surface-2` | `#ECECEC` | app |
| Borde | `--color-border` | `#E5E5E6` | app (`muted`) |
| Texto | `--color-text` | `#121212` | app (`secondary`) |
| Texto secundario | `--color-text-muted` | `#545454` | app (gris) |
| **Acento (rojo Aura)** | `--color-accent` | `#E02A14` | El oficial es `#EA3019`; se oscureció apenas para que el texto blanco encima llegue a 4,5:1 (con `#EA3019` da 4,25:1) |
| Texto sobre acento | `--color-accent-contrast` | `#FFFFFF` | app |
| Acento suave | `--color-accent-soft` | `rgba(234,48,25,0.10)` | app (`accent` al 8 %) |
| Éxito / aviso | `--color-success` / `--color-warning` | `#17BF63` / `#F7B928` | app |
| Error | `--color-danger` | `#800000` | Bordó del logo. Va distinto del acento para que "error" no se lea como "marca" |
| Lo feo (enemigo) | `--color-ugly-*` | grises | PROPUESTA |

Bordó del logo: `#A91D0B` y `#800000`. Solo aparece en el logo.

**Uso del acento:**

- **Una palabra o un elemento por pantalla.** Puede ser la palabra clave del titular o el botón: los dos a la vez, no.
- Nunca un fondo entero rojo, salvo el CTA final.
- Nunca un degradado rojo → violeta.

**Variante oscura.** Las campañas también usan fondo negro (`#121212` → `#000`, como en el degradado de la app) con texto blanco y el mismo rojo. Ya existe como `tokens-oscuro.css`. Se usa con `--marca aura.oscuro` (`nuevo-reel.sh`, `render.sh`, `laboratorio.sh`) y solo cambia los colores:

- fondo `#0A0A0A`, superficie `#1A1A1A` y texto blanco;
- acento `#FA351D`, el rojo claro de la app (5,27:1 sobre el fondo);
- texto oscuro sobre el acento, porque el blanco da 3,76:1.

## Tipografía

| Rol | Familia | Pesos | Token |
|---|---|---|---|
| Títulos | **DM Sans** | 800 (500 para la bajada) | `--font-display` |
| Texto | **DM Sans** | 400, 700 | `--font-body` |
| Etiquetas y datos | **DM Mono** | 400, 500 | `--font-mono` |

- **DM Sans** es la tipografía de la app. En 800, con tracking de −0,045 em, se parece a los titulares de las campañas.
- **DM Mono** es una PROPUESTA: la app no usa monoespaciada y DM Mono es de la misma familia.
- **Averia Serif Libre Italic**, la de los títulos de la web, **no está en los tokens**:
  - **Opción A** (la de hoy): reels en sans pesada, como los anuncios que venden.
  - **Opción B**: la serif itálica para una sola palabra firma. Necesita un token nuevo (`--font-accent`) en todas las marcas.

Escala para 1080×1920:

| Uso | Tamaño |
|---|---|
| Hero | 150 px |
| Título | 110 px |
| h2 | 80 px |
| Cuerpo | 48 px |
| Subtítulo | 58 px |
| Etiqueta | 28 px |
| Número | 260 px |

Interlineado: 1,0 en títulos y 1,3 en el cuerpo. Las etiquetas van en mono, en mayúsculas, con tracking de +0,1 em.

**Patrón de las campañas:** titular negro en dos líneas, con la segunda (o la cifra) en rojo. Ejemplo: "Lanzá tu campaña en / **5 minutos, no en 5 días.**"

## Espaciado y radios

- **Espaciado:** base de 8 px (8 · 16 · 24 · 40 · 64 · 96). Márgenes laterales de 80 px.
- **Radios** (los de la app, base 1 rem): 8 · 16 · 28 px.
- **Botones:** siempre pastilla (`--radius-pill`), en rojo con texto blanco y en mayúsculas.

## Sombras y texturas

- **Tarjetas:** blancas, con sombra suave y amplia (`--shadow-card`) y borde de 1,5 px casi invisible.
- **Brillo rojo** (`--shadow-glow`): solo en el elemento con acento y en el momento clave.
- **Ondas finas:** línea gris por detrás del CTA, como en el creativo 2 del 18-04 y en `WaveCanvas.jsx`.
- **Grano:** casi nada (4 %). Fondo limpio.

## Imágenes de la marca (en `assets/aura/imagenes/`)

| Carpeta | Qué hay | Uso |
|---|---|---|
| `mascota/` | Robot con hoodie rojo | Guía que señala. Una vez por reel, como máximo, y nunca encima del texto clave. |
| `manos/` | Brazo humano y brazo robot ("Human Touch, AI Powered") | El concepto de trabajar con la IA: la mano humana dirige. |
| `fondos/` | Fondos de la web: IA/humano, paisaje de montaña, creativos, CTA | Fondo del gancho o del CTA. |
| `iconos/` | Isotipo, Meta Ads, cursor, chatbot | Escenas de mockup. |
| `creativos-app/` | 40 creativos reales generados por la app | Muro o grilla de resultados. ⚠️ Tienen marcas de terceros: ver `pruebas-reales.md`. |

## Iconografía

Lineal y redondeada, en negro. El logo de Meta Ads aparece solo cuando el tema es la pauta. Sin emojis en pantalla.

## Tratamiento 3D

Por ahora no se usa. Si hace falta, PROPUESTA:

- tarjetas de creativos flotando en capas, con profundidad;
- luz blanca de estudio y sombras suaves.

## Motion

- **Ritmo:** rápido y seco, el de "productividad".
- **Entradas:** `expo.out` con un blur leve.
- **Salidas:** `power3.in`, cortas.
- **Escena firma (PROPUESTA, nueva):** "muro de creativos". Una pieza se multiplica en una grilla que se llena con escalonado, mientras un contador sube.

## Lo que SÍ hacemos

- fondos claros y limpios;
- titulares negros pesados con una sola palabra en rojo;
- la interfaz real de la app;
- grillas de creativos;
- antes y después (IA genérica contra kit de marca);
- comparaciones cotidianas (el mate, el café);
- la mascota como guía.

## Lo que NUNCA hacemos

- degradados de IA en violeta;
- cerebros digitales;
- pantallas llenas de texto;
- logos de marcas de terceros sin permiso;
- mostrar video o UGC como función disponible;
- precios;
- el rojo en más de un elemento por pantalla;
- el logo recoloreado.
