# particulas

Partículas con semilla que suben despacio; algunas en el acento.

| | |
|---|---|
| Tipo | fondos |
| id de composición | `particulas` |
| Bloque(s) de la estructura | Fondo |
| Duración | la del slot (se adapta) |
| Cuándo usarla | Fondo con vida para la solución o el CTA. |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
| `semilla` | number | Semilla | `21` |
| `cantidad` | number | Cantidad | `70` |

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de `tokens.css` de la marca del reel.

## Cómo montarla en un reel

```html
<div id="particulas" data-composition-id="particulas" data-composition-src="compositions/particulas.html"
  data-start="0" data-duration="15" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='{"semilla":21,"cantidad":70}'></div>
```

- `id`, `data-composition-id` y la clave del timeline son `particulas`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- `data-start` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el `data-duration` del host.

## Probarla sola

```bash
bash scripts/laboratorio.sh particulas --marca personal --duracion 4
```
