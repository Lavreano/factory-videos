# flash

Destello corto.

| | |
|---|---|
| Tipo | transiciones |
| id de composición | `flash` |
| Bloque(s) de la estructura | Transición |
| Duración | 0.35 s por defecto |
| Cuándo usarla | Golpe de beat o corte seco. Montar en `corte − 0.06`. Con moderación. |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
| `color` | enum | Color | `texto` |
| `intensidad` | number | Opacidad pico | `0.85` |

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de `tokens.css` de la marca del reel.

## Cómo montarla en un reel

```html
<div id="flash" data-composition-id="flash" data-composition-src="compositions/flash.html"
  data-start="0" data-duration="0.35" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='{"color":"texto","intensidad":0.85}'></div>
```

- `id`, `data-composition-id` y la clave del timeline son `flash`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- `data-start` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el `data-duration` del host.

## Probarla sola

```bash
bash scripts/laboratorio.sh flash --marca personal --duracion 0.35
```
