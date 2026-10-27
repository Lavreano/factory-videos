# DESIGN.md — SYNX BUILD

> Fuente: Anexo A.2. El anexo define la **dirección** (sans geométrica, editorial minimalista, grilla precisa, fuerte contraste, énfasis en "SYNX", la X como cruce) y deja **colores y familias exactas en `TODO:`**. Todo valor concreto de acá es **PROPUESTA** hasta que Laureano lo confirme.
> Tiene que diferenciarse a simple vista de la marca personal: por eso la propuesta es **clara** (papel), con acento **naranja señal** y radios casi nulos.

## Concepto visual

**Precisión de imprenta para lanzamientos.** Papel claro, tinta negra, una grilla que se ve y una X naranja donde se cruzan diseño, tecnología y conversión.

## Paleta (PROPUESTA)

| Rol | Token | Valor |
|---|---|---|
| Fondo (papel) | `--color-bg` | `#EEEDE8` |
| Superficie | `--color-surface` | `#FFFFFF` |
| Superficie 2 | `--color-surface-2` | `#E3E1DA` |
| Borde | `--color-border` | `#CFCCC3` |
| Texto (tinta) | `--color-text` | `#0A0A0A` |
| Texto secundario | `--color-text-muted` | `#6B6A66` |
| **Acento (naranja señal)** | `--color-accent` | `#FF4A1C` |
| Texto sobre acento | `--color-accent-contrast` | `#0A0A0A` |
| Éxito / error / aviso | | `#12A150` / `#D7263D` / `#E0A100` |
| Lo feo (enemigo) | `--color-ugly-*` | grises medios |

`TODO:` colores oficiales de SYNX BUILD.

## Tipografía (PROPUESTA)

| Rol | Familia | Pesos |
|---|---|---|
| Títulos | **Sora** (sans geométrica) | 500, 800 |
| Texto | **Manrope** | 400, 600, 700 |
| Etiquetas | **JetBrains Mono** | 400, 600 |

`TODO:` familias oficiales (o tipografía propia).

Escala: hero 146 px · título 104 · h2 76 · cuerpo 46 · subtítulo 58 · etiqueta 30 · número 250.
Títulos muy apretados: tracking −0,045 em, interlineado 0,94. Etiquetas mono en mayúsculas, tracking +0,16 em.

**Logotipo en pantalla:** "SYNX" en `--weight-display` (800) y "BUILD" en `--weight-display-light` (500) y `--color-text-muted`: énfasis visual en SYNX, jerarquía secundaria en BUILD. La **X** puede ir en `--color-accent` como símbolo de cruce.

## Espaciado

Base 8 px. **Grilla de 12 columnas visible** en fondos (`--grid-color`). Todo alineado a la grilla; márgenes de 80 px.

## Radios

0 · 2 · 4 px. Esquinas rectas: precisión, no amabilidad.

## Sombras

Sombra "de imprenta": línea dura de 2 px debajo + sombra suave (`--shadow-card`). Brillo: anillo naranja sólido, no difuso.

## Texturas

Grilla fina, marcas de corte y registro de imprenta, numeración de fases (`01 CONTEXTO`, `02 ARQUITECTURA`…). Grano mínimo.

## Iconografía

Lineal de 3 px, geométrica. La X como recurso recurrente (cruces, intersecciones de grilla).

## Tratamiento 3D

- Materiales: papel, cartón blanco, acrílico; un elemento naranja mate.
- Luz: de estudio, suave y alta; sombras definidas.
- Cámara: movimientos cortos y precisos (encuadres frontales, dolly de 10–15 %). Objetos: bloques de landing que encastran en una grilla, la X en 3D.

## Motion

Seco y rápido: `power4.out` en entradas, `power3.in` en salidas, barridos `power4.inOut`. Blur bajo (6 px). Movimientos alineados a la grilla (entran por columnas). Nada flota.

## Lo que SÍ hacemos

Grilla visible · fases numeradas · antes/después de landings · contraste fuerte · una X naranja como cruce · capturas reales de landings funcionando · tiempos concretos (3–7 días, 24–48 h).

## Lo que NUNCA hacemos

Templates con el logo arriba · estética de agencia de publicidad · "ventas garantizadas" en pantalla · degradados · sombras difusas de SaaS · radios grandes y redondeados · mezclar el negro/azul de la marca personal.
