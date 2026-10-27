# grano-gradiente

Gradiente radial con el acento + grano de película animado (semilla que cambia N veces por segundo).

| | |
|---|---|
| Tipo | fondos |
| id de composición | `grano` |
| Bloque(s) de la estructura | Fondo |
| Duración | la del slot (se adapta) |
| Cuándo usarla | Fondo cálido o cinematográfico para cualquier bloque. |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
| `semilla` | number | Semilla | `3` |
| `fps_grano` | number | Cambios de grano por segundo | `12` |

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de `tokens.css` de la marca del reel.

## Cómo montarla en un reel

```html
<div id="grano" data-composition-id="grano" data-composition-src="compositions/grano-gradiente.html"
  data-start="0" data-duration="15" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='{"semilla":3,"fps_grano":12}'></div>
```

- `id`, `data-composition-id` y la clave del timeline son `grano`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- `data-start` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el `data-duration` del host.

## Probarla sola

```bash
bash scripts/laboratorio.sh grano-gradiente --marca personal --duracion 4
```
