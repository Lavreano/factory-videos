---
name: composicion
description: Reglas de capas, profundidad, marcos y zonas seguras para el index.html de un reel y para cada escena. Usar al montar escenas en la composición raíz, al decidir qué va adelante o atrás, al ubicar 3D, UI o texto, y al revisar zonas seguras.
---

# composicion — capas, profundidad y marcos

## Orden de capas (z-index en el index.html del reel)

| z-index | Capa | Qué va | Track |
|---|---|---|---|
| 0 | Base | `#base` con `--color-bg` (siempre) | — |
| 1 | **Fondo** | `biblioteca/fondos/*` o clip de `assets/<marca>/3d/` | `graphics` |
| 2 | **Escena** | La escena del bloque (`biblioteca/escenas/*`) | `graphics` |
| 3 | **UI** | Mockups, ventanas, capturas que van sobre la escena | `graphics` |
| 4 | **Texto** | Títulos que se superponen a una escena 3D o de UI | `graphics` |
| 5 | **Transiciones** | `biblioteca/transiciones/*` centradas en el corte | `graphics` |
| 8 | **Subtítulos** | Un solo host de captions | `captions` |
| 9 | **Overlays** | Rótulos permanentes (`DATO DE EJEMPLO`), grano global | `graphics` |

Regla: el orden de pintado lo define **`z-index`**; `data-track-index` es solo el carril de Studio.

## Reglas (verificables)
1. **Zonas seguras** (`docs/produccion/especificaciones.md`): ningún texto en y < 220, y > 1500 ni x > 940. Texto clave (gancho, cifra, palabra del CTA) en la banda **220–1330**. Verificación: snapshot + `npx hyperframes check --json` (layout) y revisión visual con la grilla de zonas.
2. **Un sujeto por pantalla**, centrado o alineado a la izquierda en x = 80 (margen de la marca). Nada de paneles lado a lado de formato horizontal: se reconstruyen en secuencia vertical.
3. **3D: protagonista o fondo, nunca compitiendo con el texto.**
   - Protagonista: ocupa la mitad superior (y 220–950); el texto va debajo sobre un velo (`linear-gradient` a `--color-bg`), como en `solucion-reveal-3d`.
   - Fondo: desenfocado u oscurecido (opacity ≤ 0.5), sin detalle fino detrás del texto.
4. **Profundidad:** máximo 3 planos de profundidad simultáneos (fondo, sujeto, texto). La sombra (`--shadow-card`) y el desenfoque marcan qué está adelante.
5. **Marcos:** las UI (ventanas, landings) se enmarcan con `--radius-lg` y `--shadow-card`, y dejan ≥ 80 px de aire a los lados.
6. **Contenido dentro del 90 % (action-safe) y texto dentro del 80 % (title-safe)**; Studio dibuja las guías, no agregarlas al video.
7. **Escenas 3D:** el host necesita `data-start` **numérico** (el evento `hf-seek` trae tiempo global y la escena lo pasa a local con `Estudio.tiempoLocal`).
8. **Hosts:** `id` = `data-composition-id` = clave del timeline de la escena. Ids únicos en todo el reel. La misma escena dos veces → duplicar el archivo con otro id.
9. **Fondo continuo:** un fondo puede cubrir todo el reel (un host) o cambiar por bloque, pero nunca hay un cuadro sin fondo (siempre está `#base`).

## Plantilla de host
```html
<div id="<id>" data-composition-id="<id>" data-composition-src="compositions/<pieza>.html"
  data-start="<seg>" data-duration="<seg>" data-track-index="<carril>" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: <capa>"
  data-variable-values='{"var":"valor"}'></div>
```
