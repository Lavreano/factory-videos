# desplazamiento

Corte con desplazamiento (whip): franjas con semilla cruzan con desenfoque y un velo tapa el corte.

| | |
|---|---|
| Tipo | transiciones |
| id de composición | `desplazamiento` |
| Bloque(s) de la estructura | Transición |
| Duración | 0.4 s por defecto |
| Cuándo usarla | Cortes rápidos dentro del ritmo del gancho o de un montaje. Montar en `corte − 0.2`. |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
| `semilla` | number | Semilla | `5` |
| `sentido` | enum | Sentido | `izquierda` |

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de `tokens.css` de la marca del reel.

## Cómo montarla en un reel

```html
<div id="desplazamiento" data-composition-id="desplazamiento" data-composition-src="compositions/desplazamiento.html"
  data-start="0" data-duration="0.4" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='{"semilla":5,"sentido":"izquierda"}'></div>
```

- `id`, `data-composition-id` y la clave del timeline son `desplazamiento`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- `data-start` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el `data-duration` del host.

## Probarla sola

```bash
bash scripts/laboratorio.sh desplazamiento --marca personal --duracion 0.4
```
