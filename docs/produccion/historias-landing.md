# Historias de landing (synx build)

Plantilla de **historias de Instagram para Destacadas** que presentan la landing real de un cliente dentro de dispositivos 3D.
No hay narrativa, música ni voz. Es la plantilla para **todos los clientes de synx build**.

> **Documento vivo.** Se actualiza en cada vuelta: qué cambió, qué se aprendió y qué pidió Laureano.
> Reel de origen: `videos/synx/2026-10-29-historia-manuela-zuluaga/`.

---

## 1. Qué es (versión vigente)

- **Formato:** 1080×1920, 30 fps, sin audio, ~41 s (máximo 60 s, que es el límite de un segmento de historia).
- **Estilo:** cinematográfico y SaaS, construido con el material de React Bits que eligió Laureano. Fuente **Geist**.

### Planos

| Tramo | Qué se ve | Pieza |
|---|---|---|
| Arranque | Túnel de landings de otros clientes, sin repetir, que vuela hacia la cámara | Center Stage `tunel-de-landings-ordenado` |
| Golpe | La MacBook se abre y el **haz LaserFlow** azul cae sobre el borde de la tapa. Entra el titular con el nombre del cliente | LaserFlow, Center Stage `laptop-unfold` |
| Recorrido | La landing **completa**, del hero al footer, con scroll real y 3 tomas de detalle inclinadas con DOF | Center Stage `laptop-studio` |
| Mobile | Laptop y teléfono juntos, y después el teléfono solo (present y drift) | Center Stage `laptop-y-telefono`, `telefono-*` |
| Cierre | Se cierra la tapa, iris a blanco y el ícono de synx se forma con **MetallicPaint**. Queda **quieto** con `synxbuild.com` | MetallicPaint |

- **Siempre visibles:** el badge de vidrio "synx build", con borde MetallicPaint.
- **Fondo de escenario:** **GradientASCII** (desde la v4). Usa Geist Mono 400, porque la 300 no está en `assets/marca/fuentes`.
- **Túnel:** perspectiva CSS de 1478 px (= fov 66 a 1080×1920), cámara en z −2,1256, paredes de 10 tarjetas de 2 unidades separadas cada 2 unidades. Las capturas desktop miden 1440×900 y no tienen scroll vertical: los valores de `scroll` solo se aplican a las mobile.

## 2. Fábrica: muchas historias de una

La v7 quedó congelada como plantilla en `plantillas/historia-landing/`. **Por historia solo cambia la landing**, y la hace un script, no Claude (0 tokens por historia).

```bash
bash scripts/fabrica-historias.sh fabrica/historias-synx.json                  # todas
bash scripts/fabrica-historias.sh fabrica/historias-synx.json --solo slug1,slug2 # algunas
bash scripts/fabrica-historias.sh fabrica/historias-synx.json --fase preparar    # solo grabar
```

- **Lista:** cada historia es `{ "slug", "nombre", "url" }` (se graba en vivo desktop y mobile, con celular, 39,8 s) o `{ "slug", "nombre", "video" }` (una grabación de pantalla de Chrome ya hecha: se recorta la barra del navegador, se ajusta a 20 s y va **solo en la MacBook, sin celular**, 31,8 s). Opcional: `"telefono": "#hex"` (por defecto, negro). En las de video: `"desde"` y `"hasta"` (segundos del video original) recortan el arranque y el final de la grabación. Mirar el original: tomar `desde` cuando la landing ya cargó completa, no cuando se tipea la URL (ej.: daniel-retiro 37–73, daniel-registro desde 1). Para rehacer una ya hecha: borrar su `scroll-desk.mp4` y renombrar su `-ig.mp4` (la fábrica salta las que ya tienen `-ig.mp4`).
- **Salida:** `videos/synx/historias/<slug>/render/<slug>-ig.mp4` más `<slug>-hoja.jpg` (1 fps). El máster de 200 MB se borra solo.
- **Túnel:** las 60 portadas se mezclan con una semilla distinta por historia (el slug). Ninguna arranca igual.
- **Cámara:** la misma semilla elige qué movimiento usa cada toma de detalle (tilt, pull-back, grúa, órbita 3/4 tipo Center Stage ry 30, travelling lateral). También decide el lado, un corrimiento de hasta ±0,4 s y los ángulos de los planos abiertos. Ninguna historia repite la coreografía. El arranque bajo el haz se queda frontal y quieto.
- **Center Stage no se puede usar literal:** no está en la librería abierta de React Bits (llms.txt). El mockup 3D de React Bits es "Device", un componente Pro. Si Laureano tiene Pro, se puede portar su modelo en lugar de la laptop CSS-3D.
- **Titular:** si el nombre no entra en 960 px, corta en " & " a dos líneas y achica la letra hasta 56 px como mínimo.
- **Temporales en D:** C está casi lleno, así que el wrapper manda TEMP/TMP a `.tmp-fabrica/`.
- **Es reanudable:** saltea lo que ya está grabado o renderizado.
- **Tandas largas: siempre `bash scripts/fabrica-historias-fondo.sh <lista>`.** Corre como un proceso de Windows aparte, minimizado. Los procesos de fondo de Claude mueren cuando se cierra la sesión: la tanda 2 se cortó así a las 05:12. Progreso en `.tmp-fabrica/tanda.log`.
- **Grabación rápida (modo `pagina`, el que se usa por defecto):** una sola captura de la página completa y el scroll armado recortándola (`scripts/lib/scroll-desde-captura.py`). Vale porque `reducedMotion` deja la página quieta. Pasa de 6 a 15 min a ~1 min por landing. Contra: los elementos fijos (header sticky) aparecen una sola vez, arriba de todo, en vez de acompañar el scroll. Con `MODO_GRABACION=cuadros` se vuelve a la captura cuadro por cuadro.
- **El watchdog del grabador es de 40 min.** Las landings publicadas pesadas tardan unos 1,5 s por captura, y con 9 min fallaban 10 de 16.
- **Tiempos medidos:** grabar en vivo, unos 4 min (desktop + mobile); render, unos 6 min. Una historia desde video lleva unos 6 min.
- **Problemas resueltos al armarla:**
  - El grabador no terminaba porque el watchdog dejaba vivo al proceso: se agregó `process.exit`.
  - libx264 exige alto par: se usa 1124, no 1125.
  - La ruta del estudio tiene un espacio: el render usa una salida relativa.
  - Sin celular, el clip `rec-m` tiene que terminar antes que la raíz.
  - Un intento fallido deja archivos vacíos: se verifica el tamaño.

## 3. Cómo hacer una para un cliente nuevo (a mano)

1. **Levantar la landing.** Copiar el código del cliente al scratchpad (las carpetas de clientes son **solo lectura**), compilar y servir con `next start`.
   - No grabar el dominio público si puede estar caído o en "Deployment Paused".
2. **Grabar desktop y mobile** con `scripts/lib/grabar-landing.cjs`:
   ```bash
   node scripts/lib/grabar-landing.cjs <ruta-a-playwright> <salida> <url> desktop 20 30
   node scripts/lib/grabar-landing.cjs <ruta-a-playwright> <salida> <url> mobile 8 30
   ```
   Graba cuadro por cuadro (screenshot por cuadro). El scroll es una función del tiempo: continuo y más lento cerca de cada sección. Después se codifica a 30 fps exactos.
3. **Duplicar la composición** y editar solo el objeto `CONFIG`:
   - el nombre del titular;
   - los tiempos de inicio y duración del scroll y del mobile;
   - las tomas de detalle (`t`, `d`, `lado`);
   - la lista de portadas del túnel;
   - el color del teléfono;
   - las props de LaserFlow y MetallicPaint.
   - Además, ajustar los `src`, `data-start` y `data-duration` de los `<video>` y de `#rec-fin`.
4. **Portadas del túnel:** salen de `D:\Laureano\Desktop\1. Synx Build\Negocio\Capturas landings\` (una subcarpeta por cliente, más `resumen.json`).
   - Variadas entre clientes y **nunca repetidas**.
   - Como máximo una de "Laureano Sierra (yo)".
   - Excluir al propio cliente de la historia.
5. **Verificar:** `npx hyperframes lint` y `check --json`, `snapshot` en los tiempos clave, render, `exportar-instagram.sh` y la hoja de 1 fps. **Mirar los fotogramas antes de entregar.**
6. **Revisión:** abrir `bash scripts/revisar.sh <reel>`. Laureano marca notas con tiempo y posición y las pega con "Copiar para Claude". Se corrige mirando snapshots y se renderiza **una sola vez** al final.

## 4. Reglas fijas que pidió Laureano

- La URL del browser es **siempre `synxbuild.com`**, con candado y en Geist.
- Se muestra la **landing entera**, sin importar cuánto dure.
- **Sin mockups en PNG.** Los dispositivos se arman en CSS-3D con el look de Center Stage: aluminio negro, bisel, notch, sombra de contacto.
- **Sin grilla ni marca de agua grande.** Las portadas no ocupan una franja fija: viven solo en el túnel y se funden con el fondo, sin bordes cortados ni sombras internas a la vista.
- **Cierre sin animación continua.** Nada de logo flotando: una transición decisiva y después quieto.
- **Sin textos de relleno** ("Diseño y desarrollo", "Landing de…").
- **Sin resultados inventados.** Solo se muestran cifras que estén en `pruebas-reales.md`.
- **Micro-animaciones sutiles en todo,** pero lo que importa es **ver la landing**.

- **Portadas del túnel: solo desktop.** Las mobile se rompen en las tarjetas 16:10. Si no alcanzan las capturas, se sacan secciones nuevas de landings publicadas (otras alturas de la misma página). **Nunca capturas con precios.**
- **Transición del túnel:** corta (1,5 s) y entrando al hueco negro del centro. Sin destello blanco.
- **Bajo el haz LaserFlow, la laptop va frontal y quieta.** El haz es un efecto 2D sobre el rectángulo de la tapa: si la cámara rota, no encaja.
- **Nunca `opacity` sobre un padre CSS-3D** (`#lapwrap`, `#telwrap`): aplana la escena y desaparece el teclado. Para sacar un dispositivo, deslizarlo fuera del cuadro y ocultarlo cuando ya no se ve.
- **El haz no se desvanece:** se retira al revés, de abajo hacia arriba.
- **No tocar el derrame del shader LaserFlow** para alargarlo: forma una losa de luz. Para "luz que baja hasta la base", usar filos CSS en los bordes del dispositivo.
- **Mobile:** primero sale la laptop y después entra el teléfono solo, con un único encuadre, sin cortes de cámara. Puede pasar por delante del nombre, pero no del badge.

## 5. Piezas de React Bits y cómo se portan

Las fuentes originales están guardadas sin tocar en `referencias/synx/react-bits/`. Las tomas de Center Stage, en JSON, están en `referencias/synx/react-bits/center-stage/`.

| Pieza | Para qué | Port (en `composicion/assets/lib/`) |
|---|---|---|
| LaserFlow | Haz azul que cae sobre la tapa. Props: color #3847ff, intensity 1.8, flare 1.5, spread 1.5, spill 1, fog 0.2, dust 1.6, beamPosition 0.6 | `laserflow.js`: el shader y los tintes son los originales. `uTime` y `introTime` salen del timeline. La superficie es el rectángulo real de la tapa |
| MetallicPaint | Borde del badge y logo final. Props: density 2.6, dispersion 0.45, distortion 0.22, edgeBend 0.92, scale 1 | `metallic.js`: los shaders y el procesado Poisson son los originales. Solo `u_time` y `u_reveal` vienen del timeline |
| GradientASCII | Fondo de escenario. Props: colors #0015ff #f6f8ff #a5d8ff #38bdf8, horizon, characters " =+xX0S8#@", cellSize 18, density 0.8 | `gradient-ascii.js` (v4): sin rAF ni mouse; el reloj sale del timeline |
| Center Stage | Tomas de cámara y dispositivos: unfold, studio, laptop + teléfono, teléfono present/drift, túnel | Se recrean en CSS-3D con un rig de cámara en GSAP |

**Regla para portar:** todo componente que anima en tiempo real se reescribe. Se sacan el rAF, el mouse, `matchMedia` y `ResizeObserver`; el tiempo entra como uniform desde el timeline y se renderiza en cada seek.

## 6. Problemas resueltos (no repetir)

- **La landing se veía "bugeada".**
  - **Por qué pasaba:** la grabación por screencast daba timestamps desordenados y saltos de más de 60 ms. Además, `window.scrollTo` peleaba con Lenis y las animaciones Reveal saltaban.
  - **Arreglo:** grabar con `reducedMotion: 'reduce'`, que apaga Lenis y las transiciones, sacar un screenshot por cuadro y hacer el scroll como función continua del tiempo.
  - **Costo:** las animaciones de aparición de la landing no se ven.
- **El grabador colgado y el disco lleno.** `window.lenis` solo expone `{version}`, así que `lenis.scrollTo` tira error. No usarlo.
- **Landing con desborde horizontal (laureanosierra.com/servicio).**
  - **Qué pasaba:** la captura de página completa salió de 32.909 px de ancho. En escritorio ffmpeg la rechazó ("Picture size invalid"). En móvil el screenshot se pasó de los 30 s.
  - **Arreglo:** el grabador recorta la captura al ancho de la ventana (`clip` + timeout de 120 s). `scroll-desde-captura.py` toma la escala de `y.json` (`dsf`) y recorta al ancho de la ventana.
- **Celular negro a mitad del scroll (pilar-bootcamp-v2).**
  - **Por qué pasaba:** Chrome deja en negro todo lo que pasa de ~16.384 px de dispositivo en una sola captura. Una página móvil de 8.366 px a dsf 2 lo supera.
  - **Arreglo:** si la página pasa de 15.000 px de dispositivo, el grabador la captura en tramos (`pagina-0.png`, `-1`…) y `scroll-desde-captura.py` los apila.
- **Landings con animaciones que valen la pena (pilar-registro).** Se graban a mano y van como `"video"` junto con la `"url"`: el video manda en la MacBook y la url sigue alimentando el celular. Si la grabación es del celu (vertical, con la landing en una franja), pasar `"recorte": "crop=W:H:X:Y"` con proporción 1440:844 (registro: `crop=1080:633:0:708`, sacado con `cropdetect`).
- **Landing cuyo atractivo es una animación (pilar-diagnostico, túnel de cuadrícula en la hero).** La captura rápida congela la página y la pierde.
  - **Arreglo:** `"vivo": { "hero": 6 }` en la lista. Usa `scripts/lib/grabar-vivo.cjs`: congela el reloj de la página (Playwright `clock`: Date, timers, rAF), pausa las animaciones CSS (`document.getAnimations()`) y en cada cuadro avanza las dos cosas 1/30 s, scrollea y captura. Dura `hero` s quieta en la hero y después scrollea hasta completar 20 s.
  - **Costo:** ~1 s por cuadro, unos 8 min la grabación.
  - **No sirve:** el screencast de Chrome. En páginas pesadas dio ~3 fps y tiempos desordenados.
  - **Con reloj falso,** `networkidle` nunca llega (usar `load` + espera) y `pauseAt` necesita un margen (+1,5 s) o tira "Cannot fast-forward to the past".
- **Un SVG que no cargaba en la cola de render.** El ícono final se dibuja como path directo en canvas.
- **Una copia de `index.html` con extensión `.html`.** El lint la toma como segundo punto de entrada. Los respaldos van como `index-vN.html.bak`.
- **El PNG de la MacBook** (1080 px) se veía blando en los acercamientos y tenía la sombra horneada dentro de la pantalla. Por eso se pasó a CSS-3D.
- **El túnel de la v3** quedó desordenado: tarjetas sueltas, con huecos y chico en el cuadro.
  - **Objetivo:** paredes continuas de tarjetas pegadas que llenen todo el 9:16, con fuga al centro y las cercanas desenfocadas.
  - **Referencias:** `referencias/tunel-objetivo-center-stage.png` (lo que se busca) y `tunel-v3-actual-mal.png` (lo que salió mal).

## 7. Historial de versiones

| Versión | Qué fue | Reacción de Laureano |
|---|---|---|
| v1 | Cascada de pantallas, un monitor y scroll parcial, 15 s | "No me gustó para nada", demasiado simple |
| v2 | Layout de su referencia vertical, MacBook PNG, collage de fondo, badge de vidrio y brillo en el titular, 31 s | "Me encantó", con 7 notas: sin PNG, URL synxbuild.com, sin grilla ni marca de agua, portadas más chicas, otro cierre |
| v3 | Túnel, LaserFlow, laptop CSS-3D, laptop y teléfono, cierre MetallicPaint, 41 s | "Qué brutalidad", con notas: túnel ordenado, fondo GradientASCII, tomas de teléfono solo |
| v4 | Túnel Center Stage con paredes continuas (60 capturas distintas, sin la clienta), fondo GradientASCII (cierre en lightMode al 60 % sobre blanco, `CONFIG.cierreAscii`), teléfono solo present (31–36 s) y drift (36–40 s), color del teléfono en `CONFIG.telefono.color`; 45 s | "Un par de errores": 7 notas (portadas solo desktop, transición más corta hacia el hueco negro, laptop quieta bajo el haz, nombre más chico, sacar la laptop antes del teléfono, mantener badge y nombre, un solo encuadre del teléfono) |
| v5 | Túnel solo con capturas **desktop**: las 24 mobile se reemplazaron por secciones de landings publicadas, capturadas en vivo a 1440×900 con `reducedMotion`, sin capturas con precios. Crucero 0–2,6 s, después caída de 1,5 s al **hueco negro**, que crece hasta tapar todo (sin destello blanco). Laptop **frontal y quieta** bajo el haz hasta 8,8 s. Nombre en 104 px. La laptop sale primero (26,8 s) y después el teléfono solo, centrado, **un único encuadre** "present" (27,2–35,8 s), por delante del nombre y con el badge visible. 40,8 s. Hecho por Claude directo, sin agente: ~25 min | 7 notas: portal más corto, haz hasta la base, aparición sutil de la landing, haz que se retire al revés, bug del teclado al salir la laptop, celular más chico, celular sale antes que el badge |
| v6 | Portal de 2,9 s: crucero de 2 s y caída de 0,9 s al hueco. **Haz que baja por los costados hasta la base** de la laptop (en `laserflow.js` el pour se estira ×2,2: `f = fall * 0.45`; el canvas mide 1500 px). La landing aparece en 1,6 s con `sine.inOut`. **El haz se retira al revés:** `introTime` va de 3 a 0 en 1,2 s y se recoge de abajo hacia arriba. La laptop sale deslizándose entera, **sin opacity**. El celular queda en escala 2,2 y en el cierre sale primero hacia abajo, después se van el badge y el nombre, y por último el iris. 39,8 s | "Quedó muy mal": estirar el derrame del shader formó una losa de luz alrededor y debajo de la laptop, con corte duro en el borde del canvas y los dos lados de distinto color |
| v7 | Se volvió al shader LaserFlow original (`laserflow-v5.js.bak`). La bajada hasta la base ahora la hacen **dos filos de luz CSS** (`.filo`), pegados a los bordes de la tapa: caen con `scaleY` 0→1 después del impacto y se recogen hacia arriba cuando se retira el haz. El canvas del haz tiene una máscara de degradado abajo, sin cortes duros | — |

## 8. Archivos

- Composición: `videos/synx/2026-10-29-historia-manuela-zuluaga/composicion/index.html`. Las versiones anteriores están en `index-v2.html.bak`, `index-v3.html.bak` e `index-v4.html.bak`.
- Portadas del túnel: `composicion/assets/media/v4/tun/` (60 desktop distintas, con su origen en `_fuentes.json`).
- **Lección de costo:** los ajustes puntuales los hace Claude directo sobre la composición (~25 min). Un agente nuevo tiene que releer todo y tarda 4 veces más.
- Notas de cada revisión: `notas-v2.md` y `notas-v3.md` en la carpeta del reel.
- Grabador: `scripts/lib/grabar-landing.cjs`.
- Referencias visuales: `videos/synx/2026-10-29-historia-manuela-zuluaga/referencias/`.
