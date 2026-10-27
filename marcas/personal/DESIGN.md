# DESIGN.md — Marca personal (Laureano Sierra)

> Sistema de diseño legible por IA. Fuente: Anexo A. Los valores marcados **PROPUESTA** no vienen del anexo y esperan confirmación.
> Variables: `tokens.css` (mismos nombres en todas las marcas).

## Concepto visual

**Backstage. Arquitectura. Expansión.** Un documento técnico cinematográfico: fondo negro, texto crema, un solo azul que marca la palabra que importa.

Dirección: dark / editorial / tech / arquitectónica / minimalista / cinematográfica.

## Paleta

| Rol | Token | Valor | Origen |
|---|---|---|---|
| Fondo | `--color-bg` | `#0B0B0B` | Anexo A |
| Superficie | `--color-surface` | `#161616` | Anexo A |
| Superficie 2 | `--color-surface-2` | `#1F1F1F` | PROPUESTA |
| Borde | `--color-border` | `#2A2A2A` | PROPUESTA |
| Texto | `--color-text` | `#F4F1EA` | Anexo A |
| Texto secundario | `--color-text-muted` | `#8A8A8A` | Anexo A |
| **Acento (azul)** | `--color-accent` | `#4775FF` | **PROPUESTA — `TODO:` hex exacto** |
| Texto sobre acento | `--color-accent-contrast` | `#0B0B0B` | PROPUESTA (el crema sobre este azul da < 4.5:1) |
| Éxito / error / aviso | `--color-success` / `--color-danger` / `--color-warning` | `#3DD68C` / `#FF5A4E` / `#F5B841` | PROPUESTA |
| Lo feo (enemigo) | `--color-ugly-*` | grises `#D9D9D9`, `#EFEFEF`, `#6E6E6E` | PROPUESTA |

Uso del acento: **una sola palabra o elemento por pantalla.** Nunca fondos completos en azul. Nunca degradados azul → violeta.

## Tipografía

| Rol | Familia | Pesos | Token |
|---|---|---|---|
| Títulos | **Space Grotesk** | 500, 700 | `--font-display` |
| Texto | **Inter** | 400, 600, 700 | `--font-body` |
| Detalles técnicos y etiquetas | **JetBrains Mono** (alternativa: IBM Plex Mono) | 400, 600 | `--font-mono` |

Escala (1080×1920): hero 150 px · título 110 · h2 80 · cuerpo 48 · subtítulo 58 · etiqueta 30 · número 260.
Interlineado títulos 0,98; cuerpo 1,3. **Tracking de títulos cinéticos:** −0,035 em (apretado, arquitectónico). Etiquetas en mono, mayúsculas, tracking +0,12 em.

## Espaciado

Base 8 px: 8 · 16 · 24 · 40 · 64 · 96. Márgenes laterales de pantalla: 80 px (dentro de la zona segura). Mucho aire: **nunca pantallas llenas de texto.**

## Radios

Chicos y técnicos: 6 · 12 · 20 px. Pill solo para badges.

## Sombras y brillos

- Cards: sombra profunda + borde de 1 px casi invisible (`--shadow-card`).
- Brillo azul (`--shadow-glow`) solo en el elemento con acento, y solo en el momento clave.

## Texturas

- Grilla técnica fina (`--grid-color`, 6 % de opacidad), líneas, nodos y diagramas simples.
- Grano sutil (`--grain-opacity` 7 %).
- Estética de documento técnico: etiquetas mono tipo `A-0 / VIDRIERA / 01`.

## Iconografía

Lineal, trazo de 2 px, geométrica. Nodos, flechas, conectores. Nada ilustrado ni con relleno de color. Sin emojis.

## Tratamiento 3D

- **Materiales:** metal oscuro mate, vidrio ahumado, wireframe crema. Un solo elemento con emisión azul.
- **Luz:** clave lateral fría y dura, relleno muy bajo; mucho negro.
- **Cámara:** lenta y arquitectónica (dolly-in, órbita de 3–5° por segundo). Objetos: estructuras, grillas, módulos que encastran, planos de una "construcción".

## Motion

Entradas `expo.out` con blur (rise-blur), salidas `power3.in` más cortas, barridos `power3.inOut`. Spring solo `back.out(1.2)`. Ritmo seco, cinematográfico, sin rebotes.

## Lo que SÍ hacemos

Fondos oscuros · pantallas e interfaces reales · antes/después de landings · wireframes · diagramas simples · líneas, nodos y grillas · mapas de sistemas · textos grandes tipo manifiesto · estética de documento técnico · fotos reales trabajando.

## Lo que NUNCA hacemos

Degradados IA azul/violeta · robots · cerebros digitales · SaaS demasiado colorido · emojis · plantillas de infoproductor · Canva evidente · dorado luxury · espiritualidad visual obvia · mockups falsos demasiado perfectos · pantallas llenas de texto sin aire.
