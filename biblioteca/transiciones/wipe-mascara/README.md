# wipe-mascara

Panel que entra barriendo con clip-path, tapa el corte y sale hacia el otro lado.

| | |
|---|---|
| Tipo | transiciones |
| id de composición | `wipe` |
| Bloque(s) de la estructura | Transición |
| Duración | 0.5 s por defecto |
| Cuándo usarla | Cambio de bloque con energía. Montar en `corte − 0.25`. |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
| `color` | enum | Color del panel | `acento` |
| `direccion` | enum | Dirección | `izquierda` |

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de `tokens.css` de la marca del reel.

## Cómo montarla en un reel

```html
<div id="wipe" data-composition-id="wipe" data-composition-src="compositions/wipe-mascara.html"
  data-start="0" data-duration="0.5" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='{"color":"acento","direccion":"izquierda"}'></div>
```

- `id`, `data-composition-id` y la clave del timeline son `wipe`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- `data-start` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el `data-duration` del host.

## Probarla sola

```bash
bash scripts/laboratorio.sh wipe-mascara --marca personal --duracion 0.5
```
