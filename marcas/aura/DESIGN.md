# DESIGN.md — Aura Studio

> `TODO:` el Anexo A no define el diseño de Aura Studio. **Todo lo de este archivo es PROPUESTA**, pensada para diferenciarse a simple vista de las otras tres marcas (personal: negro/azul técnico · SYNX: papel/naranja de grilla · Synous: petróleo/menta de producto).

## Concepto visual (PROPUESTA)

**Luz de estudio al atardecer.** Fondos marrón casi negro, serif editorial, un coral cálido y grano de película: producción visual con IA que se siente artesanal, no sintética.

## Paleta (PROPUESTA)

| Rol | Token | Valor |
|---|---|---|
| Fondo | `--color-bg` | `#140F0D` |
| Superficie | `--color-surface` | `#1F1815` |
| Superficie 2 | `--color-surface-2` | `#2A211D` |
| Borde | `--color-border` | `#3A2E28` |
| Texto | `--color-text` | `#F4EADF` |
| Texto secundario | `--color-text-muted` | `#A8968A` |
| **Acento (coral)** | `--color-accent` | `#FF8A5C` |

## Tipografía (PROPUESTA)

| Rol | Familia | Pesos |
|---|---|---|
| Títulos | **Fraunces** (serif editorial; itálica para la palabra clave) | 400, 700, 400 itálica |
| Texto | **Outfit** | 400, 600, 700 |
| Etiquetas | **JetBrains Mono** | 400 |

Escala: hero 156 px · título 112 · h2 80 · cuerpo 48 · subtítulo 58 · etiqueta 28. Etiquetas con tracking muy abierto (+0,2 em).

## Espaciado · Radios · Sombras

Base 8 px. Radios generosos (10 · 18 · 32 px). Sombras amplias y suaves; brillo coral difuso (`--shadow-glow`).

## Texturas

Grano de película marcado (`--grain-opacity` 11 %), viñeta suave, luz cálida lateral.

## Iconografía

`TODO:` Propuesta: mínima; preferir imagen y tipografía.

## Tratamiento 3D (PROPUESTA)

Materiales orgánicos (cerámica, tela, vidrio esmerilado), luz cálida de ventana, cámara lenta con profundidad de campo.

## Motion (PROPUESTA)

Suave y orgánico: `expo.out` con blur alto (16 px) en entradas, `sine.inOut` en movimientos de cámara. Duraciones más largas que el resto de las marcas.

## Lo que SÍ hacemos

`TODO:`

## Lo que NUNCA hacemos

`TODO:` (propuesta: estética "IA genérica" brillante, cromados, robots, neones violetas).
