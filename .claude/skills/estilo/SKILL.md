---
name: estilo
description: Criterio de color, tipografía y clima para cualquier pantalla de un reel del estudio. Usar al diseñar o revisar una escena, al elegir dónde va el acento, al decidir tamaños de texto o al verificar que una composición use solo tokens de la marca.
---

# estilo — color, tipografía y clima

Fuente de verdad: `marcas/<marca>/DESIGN.md` y `tokens.css` de la marca del reel. Esta skill dice **cómo** usarlos.

## Reglas (verificables)

### Tokens, siempre
1. **Cero valores sueltos.** En `compositions/*.html` no puede haber hex (`#…`), `rgb(`, familias tipográficas ni radios en px fuera de `var(--…)`. Excepción: los mocks "feos" usan `--color-ugly-*` (también tokens) y `Arial` en el ANTES. Verificación: `grep -nE "#[0-9a-fA-F]{3,8}\b|rgb\(" compositions/*.html` no devuelve nada fuera de comentarios.
2. Los nombres de variables son los del contrato (`--color-bg`, `--color-surface`, `--color-surface-2`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-contrast`, `--color-accent-soft`, `--color-glow`, `--color-success|danger|warning`, `--color-ugly-*`, `--font-display|body|mono`, `--weight-*`, `--tracking-*`, `--leading-*`, `--text-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--dur-*`, `--safe-*`). No inventar variables nuevas en una escena; si hace falta una, se agrega a **todas** las marcas.

### Jerarquía tipográfica (1080×1920)
| Rol | Token | Mínimo |
|---|---|---|
| Hero (la frase del gancho) | `--text-hero` | 110 px |
| Título | `--text-title` | 72 px |
| Subtítulo de pantalla | `--text-h2` | 64 px |
| Cuerpo | `--text-body` | 44 px |
| Subtítulos (captions) | `--text-caption` | 52 px |
| Etiqueta / rótulo | `--text-label` | 28 px |

3. Máximo **3 niveles** de jerarquía por pantalla.
4. Títulos con `--font-display`, `--weight-display`, `--tracking-display` y `--leading-display`. Etiquetas en `--font-mono` y `--case-label`.
5. Máximo **~7 palabras** de texto principal en pantalla. Si no entra, se corta texto, nunca se achica la letra.

### El acento
6. **Una sola palabra o elemento con acento por pantalla** (la palabra clave). El acento nunca es fondo completo, salvo en una transición (`wipe-mascara`).
7. La palabra clave en el acento comunica significado: es la que el espectador tiene que recordar.
8. El brillo (`--shadow-glow`) solo acompaña al elemento con acento y solo en su momento.

### Contraste
9. Cuerpo y subtítulos ≥ **4.5:1** contra su fondo; títulos ≥ 72 px ≥ **3:1**. Verificación: `npx hyperframes check --json` (auditoría de contraste, trae `suggestedColor`).
10. Texto sobre `--color-accent` usa `--color-accent-contrast`.

### Clima
11. El clima sale del concepto visual de `DESIGN.md` (personal: backstage técnico; SYNX: imprenta y grilla; Synous: consola de sistema; Aura: estudio cálido). Una escena que se ve igual con dos marcas distintas está mal: revisar que use los tokens de textura (`--grid-color`, `--grain-opacity`) y de motion.
12. Respetar "lo que NUNCA hacemos" de la marca. En la marca personal: nada de degradados IA azul/violeta, robots, cerebros, emojis, dorado luxury.

## Checklist rápida
- [ ] Sin valores sueltos.
- [ ] Un acento por pantalla.
- [ ] Tamaños ≥ mínimos.
- [ ] `check --json` sin errores de contraste.
- [ ] Nada de la lista "NUNCA" de la marca.
