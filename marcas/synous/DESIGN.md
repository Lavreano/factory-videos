# DESIGN.md — Synous AI

> Fuente: Anexo A.3. El anexo define la **dirección** ("tiene que sentirse como producto e infraestructura: interfaces, paneles, datos, mapas de sistema, distinto de SYNX y de la marca personal") y deja **paleta y tipografías en `TODO:`**. Todos los valores de acá son **PROPUESTA**.

## Concepto visual

**La consola de un sistema que funciona.** Azul petróleo profundo, paneles con datos vivos, nodos conectados y un verde menta que indica "esto está operativo".

## Paleta (PROPUESTA)

| Rol | Token | Valor |
|---|---|---|
| Fondo | `--color-bg` | `#07111A` |
| Superficie (panel) | `--color-surface` | `#0D1B27` |
| Superficie 2 | `--color-surface-2` | `#132636` |
| Borde | `--color-border` | `#1F3447` |
| Texto | `--color-text` | `#E4EEF5` |
| Texto secundario | `--color-text-muted` | `#7E95A8` |
| **Acento (menta "operativo")** | `--color-accent` | `#2EE6A6` |
| Texto sobre acento | `--color-accent-contrast` | `#04140E` |
| Error / aviso | | `#FF6B6B` / `#FFC857` |

`TODO:` paleta oficial.

## Tipografía (PROPUESTA)

| Rol | Familia | Pesos |
|---|---|---|
| Títulos y texto | **IBM Plex Sans** | 400, 500, 600, 700 |
| Datos, etiquetas, código | **IBM Plex Mono** | 400, 600 |

`TODO:` tipografías oficiales.

Escala: hero 138 px · título 100 · h2 74 · cuerpo 46 · subtítulo 56 · etiqueta 30 · número 240.
Tracking de títulos −0,025 em (más abierto que la marca personal: legibilidad de producto). Números siempre tabulares.

## Espaciado

Base 8 px. Layouts de panel: cards de 24 px de radio, gaps de 24–40 px, márgenes de 80 px.

## Radios

8 · 14 · 24 px. Redondeado de producto, consistente.

## Sombras y brillos

Paneles con borde de 1 px + sombra profunda. Brillo menta en el nodo o estado activo (`--shadow-glow`).

## Texturas

Grilla de puntos/líneas muy tenue, mapas de nodos, líneas de conexión que se dibujan, indicadores de estado (●). Grano mínimo.

## Iconografía

Lineal de 1,5 px, estilo sistema (nodos, bases de datos, flujos, usuarios). Herramientas de terceros como **íconos genéricos**, nunca logos.

## Tratamiento 3D

- Materiales: vidrio oscuro, metal azulado, líneas de luz menta.
- Luz: ambiente fría y baja, emisión desde los nodos.
- Cámara: órbita lenta alrededor de un mapa de sistema; push-in a un nodo. Objetos: arquitectura de capas, módulos conectados, un "núcleo" que centraliza.

## Motion

Sistémico y fluido: `power3.out` en entradas, `power2.in` en salidas, líneas que se dibujan (`draw-line`) y datos que se actualizan. Spring `back.out(1.4)` solo en badges de estado.

## Lo que SÍ hacemos

Paneles e interfaces reales · datos en vivo (rotulados si son de ejemplo) · mapas de sistema · antes (parches) / después (plataforma) · fases del método numeradas · Blueprint dibujado.

## Lo que NUNCA hacemos

Robots, cerebros, chispas de "IA mágica" · logos de herramientas de terceros · degradados violeta · la paleta crema/azul de la marca personal · la paleta papel/naranja de SYNX · datos reales de alumnos en pantalla.
