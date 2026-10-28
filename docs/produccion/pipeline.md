# Pipeline de producción

El pipeline de `CLAUDE.md` en detalle: qué se hace en cada paso, con qué comando o skill y qué tiene que quedar escrito.

> Todos los comandos se corren desde la raíz del estudio, en **Git Bash** (la terminal por defecto del Bash de VS Code en Windows). Los scripts cargan `scripts/_entorno.sh`, que deja ffmpeg y Node 22 en el PATH.

## Paso 0 — Crear el proyecto

```bash
bash scripts/nuevo-reel.sh <marca> <slug>
# ej: bash scripts/nuevo-reel.sh personal landing-linda-no-vende
```

Crea `videos/<marca>/AAAA-MM-DD-<slug>/` con:

```
brief.md  guion.md  storyboard.md  revision.md
composicion/
  index.html              ← root de HyperFrames (monta las escenas)
  compositions/           ← escenas copiadas de biblioteca/ (se editan acá)
  assets/marca/           ← tokens.css + fuentes de la marca (sincronizado)
  assets/lib/             ← gsap, three, estudio.js (helpers determinísticos)
  assets/media/           ← imágenes, clips, audio de este reel
  estudio.json            ← marca del reel
  package.json            ← HyperFrames fijado a una versión exacta
muestras/  render/
```

## Paso 1 — Brief

Archivo: `brief.md` (ya trae la marca cargada). Campos obligatorios: marca, código de pilar, tema, ¿usa la app?, objetivo, seguidor ideal, dolor, promesa, palabra del CTA, recurso que se entrega, duración.

Si **usa la app**: pedirle a Laureano `/add-dir <ruta de contexto-app.md>` y leer lo que indica ese archivo.

## Paso 2 — Guion → **esperar aprobación**

Skill: `guion-reel`. Entrega en `guion.md`:
- 3 ganchos alternativos (con tipo de gancho).
- Tabla de 7 bloques con tiempos, voz/texto, texto en pantalla e intención.
- Palancas de la ecuación de valor que mueve.
- Puntaje 1–10 (piscina, cercanía a la oferta, fuerza del contraste o la cifra).

## Paso 3 — Storyboard → **esperar aprobación**

Archivo: `storyboard.md`. Una fila por escena: inicio–fin, visual, texto en pantalla, movimiento, sonido/SFX, escena de biblioteca o nueva, **origen del dato** si sale de la app o de una prueba real.
Para cada fila compleja, la skill `prompt-motion` escribe el prompt de motion (formato de `prompts-motion.md`) debajo de la tabla.

## Paso 4 — Muestra del gancho → **esperar aprobación**

```bash
bash scripts/render.sh videos/<marca>/<carpeta> --muestra 4
```

- Renderiza solo los primeros N segundos en calidad `draft` a `muestras/`.
- Extrae 6 fotogramas repartidos y arma una hoja de contactos (`muestras/muestra-hoja.jpg`).
- Claude **mira** los fotogramas (gancho legible en 1,5 s, zonas seguras, nada cortado) antes de mostrarlos.

Para iterar sin render: `cd videos/<marca>/<carpeta>/composicion && npx hyperframes preview --background` (Studio en el navegador) y `npx hyperframes snapshot --at 0.5,1.5,3`.

## Paso 5 — Render completo

```bash
bash scripts/render.sh videos/<marca>/<carpeta>
```

Antes de renderizar, el script sincroniza los tokens de la marca y corre `npx hyperframes lint`. Después verifica la duración con `ffprobe`, extrae un fotograma por segundo y arma `render/hoja-contactos.jpg`.

Opciones: `--calidad draft|looks|delivery` (por defecto `delivery`), `--marca <otra>` (render de prueba con otros tokens), `--salida <archivo>`.

## Paso 6 — QA

Skill: `qa-reel`. Completa `revision.md` (checklist de `plantillas/ficha-revision.md`). Incluye medir picos de audio, revisar la hoja de contactos y el `check --json` de HyperFrames.

## Paso 7 — Exportar

```bash
bash scripts/exportar-instagram.sh render/<reel>.mp4 render/<reel>-ig.mp4
```

## Paso 8 — Reutilizar

Si se creó una escena nueva y buena:
1. Sacarle todo lo específico del reel (texto, colores sueltos) y pasarlo a variables (`data-composition-variables`) y tokens.
2. Moverla a `biblioteca/escenas/<nombre>/escena.html` con su `README.md` y `preview.png`.
3. Sumarla a `biblioteca/catalogo.md`.

---

## Problemas conocidos

| # | Problema | Causa | Solución |
|---|---|---|---|
| 1 | `HyperFrames requires Node.js >= 22` | El Node del sistema es 20; el 22 está instalado con fnm pero no está en el PATH de la terminal. | `scripts/_entorno.sh` busca Node 22 con `fnm exec --using=22` y lo pone primero en el PATH. Archivo `.node-version` en la raíz. |
| 2 | `ffmpeg: command not found` justo después de instalarlo | winget lo deja en `%LOCALAPPDATA%\Microsoft\WinGet\Links`, que la terminal abierta todavía no tiene en el PATH. | `_entorno.sh` agrega esa carpeta. O reiniciar VS Code. |
| 3 | `npx skills add … \| head` no instala nada | Cortar la salida con `head` mata el proceso antes de que escriba los archivos. | Correrlo sin pipes (o redirigiendo a un archivo). |
| 4 | El scaffold de `hyperframes init` carga GSAP desde un CDN | Dependencia de red en el render. | `nuevo-reel.sh` copia `gsap.min.js` y `three` a `assets/lib/` y el `index.html` los carga en local. |
| 5 | `hyperframes render` no tiene opción de rango (para la muestra) | La duración la define el `data-duration` del root. | `render.sh --muestra N` copia la composición a una carpeta temporal, baja el `data-duration` del root a N y renderiza esa copia. |
| 6 | Una escena no encuentra sus propias variables ni su slot (`V = {}`, la salida no se calcula) | Al montar, el runtime **renombra `data-composition-src` → `data-composition-file`** en el host y **le quita `id` y `data-composition-id` al root interno** (lo marca con `data-hf-inner-root`). | `Estudio.vars()`, `slot()` e `inicio()` buscan el host por cualquiera de los dos atributos y el root interno dentro del host. No depender de `getVariables()` (solo está acotado mientras corre el script). |
| 7 | Escena 3D correcta sola pero desfasada dentro del reel | El evento `hf-seek` entrega el tiempo **global** del reel, no el de la escena. | `Estudio.tiempoLocal(id, t)` resta el `data-start` del host. Los hosts de escenas 3D llevan `data-start` numérico. |
| 8 | Un barrido con `clip-path` no se ve | GSAP no interpola entre unidades distintas (`inset(0px 0px 0px 100%)` → `inset(0px 0px 0px 0px)`). | Usar las mismas unidades en los 4 lados (`inset(0% 0% 0% 100%)` → `inset(0% 0% 0% 0%)`). Y animar un **hijo** del `.clip`, nunca el `.clip`. |
| 9 | Un elemento aparece antes de tiempo (punto y halo del gráfico) | Un `fromTo` dentro de un timeline aplica su estado inicial apenas se crea. | `tl.set(el, {opacity: 0}, 0)` y `immediateRender: false` en el tween que llega más tarde. |
| 10 | `fitTextFontSize` devolvió un tamaño muy chico para la palabra del CTA | Comportamiento no documentado con fuentes propias. | `cta-palabra-clave` mide la palabra a 100 px (con la fuente cargada) y escala a ~760 px de ancho. |
| 11 | `npx hyperframes check` devuelve un JSON vacío | Se corrió con el Node 20 del sistema. | Correr siempre con `source scripts/_entorno.sh` antes (los scripts del estudio ya lo hacen). |
| 12 | Un script de bash no encuentra los fotogramas | La ruta del estudio tiene un espacio ("Factory Studio"). | Nunca parsear rutas desde la salida de un comando; tomar la carpeta más reciente con `ls -td` y citar siempre las rutas. |
| 13 | El acento azul propuesto no pasaba el contraste en botones | Crema sobre `#3B6CFF` = 4,11:1. | Acento propuesto `#4775FF` con texto oscuro `#0B0B0B` (≈ 4,9:1). Pendiente el hex oficial. |
| 14 | La exportación sube el pico real del audio de −1,2 a −0,3 dBTP | `exportar-instagram.sh` recodificaba en AAC un audio que ya era AAC: la segunda codificación genera picos entre muestras. | Si la entrada ya es AAC de 48 kHz en estéreo, el script copia el audio (`-c:a copy`). La mezcla final lleva `loudnorm` y después `alimiter`. |
| 15 | `hyperframes lint` da error `gsap_non_transform_motion` | Se animaba `left`, `top`, `width`, `height` o `fontSize`: el render por cuadro los redondea a píxeles enteros y la animación salta. | Usar solo transforms (`x`, `y`, `scale`) y `clip-path` para cambiar proporciones. Ver el cambio de formato en `videos/aura/2026-10-27-url-a-creativos`. |
| 16 | Un corte por coincidencia o el recorrido del cursor apuntan a cualquier lado | `getBoundingClientRect` se llamaba después de crear tweens que ya movían el elemento, o sobre capas que todavía no arrancaron, que miden 0. | Medir solo lo que está visible en t=0 y **antes** de crear cualquier tween. El resto se calcula con la geometría fija del CSS. |
| 17 | La música no calza con los cortes | La grilla supuesta (120 BPM) no era la de la pista. El análisis rápido de tempo también falló: estimó ~117 cuando la pista va a 87. | Medir la pista con `scratchpad/beats.py`: tempo, fase y kicks del tramo exacto que usa el reel. En la composición definir `B(k) = fase + k × período` y poner cada evento en `B(k)` o en sus subdivisiones. |
