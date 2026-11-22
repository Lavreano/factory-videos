# Análisis del corpus prompt-motion (234 videos)

Fuente: `videos/prompt-motion/catalogo.json` (234 entradas), 30 hojas de contacto (`frames/hoja-01..30.jpg`, 3 fotogramas por video) y el texto completo de cada prompt. Todo lo que dice "no se ve en la hoja" es una limitación de 3 fotogramas por pieza. Nada se descartó: las 234 están en el índice (sección 6).

Marcas: **Aura** (creativos de anuncios con IA, claro, rojo #E02A14), **Synous** (sistemas para coaches/academias, navy + sky + aurora), **synx build** (landings / launch partner, azul-negro #010511, azul eléctrico).

---

## 1. Resumen

### Qué es el corpus
Galería de videos de motion graphics generados por Claude (Opus 5.5) a partir de un prompt, hechos en código (HTML + seek(t), Remotion, HyperFrames, three.js, canvas, Manim, ffmpeg). Es el mismo género que hacemos nosotros, pero en su mayoría en 16:9 y 10-30 s.

### Conteos
Categorías (una pieza puede tener varias; suman más de 234):

- product-ui: 103
- kinetic-type: 96
- music: 49
- particles: 43
- shapes: 42
- charts: 34
- diagrams: 31
- characters: 27
- photos: 23
- phone: 22
- code: 21

Formato: 201 horizontales (H), 19 verticales (V), 14 cuadrados (1:1). O sea: el corpus es casi todo horizontal. **Solo 19 son verticales 9:16** (009, 026, 047, 057, 089, 110, 115, 137, 147, 150, 167, 173, 196, 201, 208, 221, 229, 230, 233) y 14 son 1:1 (002, 005, 010, 037, 041, 092, 100, 103, 114, 127, 186, 191, 206, 231). Para reels 9:16 hay que reinterpretar la composición, no copiarla.

Modelo: las 234 dicen "Opus 5.5". Solo 3 listan una skill: 013 (`taste-skill`), 018 (`Leonxlnx/cinetic`), 073 (`heygen-com/hyperframes-community-skills --skill session-story`). Esas tres tienen el campo prompt vacío en el catálogo (013, 018, 025 y 073 no traen texto).

### Dos poblaciones de prompts
1. **Prompt de una línea** ("make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are... go all out"), decenas de entradas, muchas casi idénticas (001, 003, 004, 042, 053, 063, 065, 075, 112, 121, 158, 170, 171, 172, 174, 179, 189, 192-198...). Resultado: el "showreel Claude" de siempre: fondo oscuro o naranja #FF4A1C, tipografía grotesca gigante (MOTION, EASING, TIMING), marcos HUD en las esquinas, disco que inunda la pantalla, curvas bezier dibujadas. Funciona como pieza de portfolio de motion pero **no es publicidad B2B**.
2. **Prompt-spec largo** (002, 005, 006, 011/037, 015, 027, 028, 041, 055, 100, 103, 107, 129, 136, 180), de 1.500 a 15.000 caracteres, con `<inputs> <direction> <structure> <build> <gotchas> <start>`. Son las piezas más pulidas del corpus (011/037, 005, 055, 015, 041, 006): son también las más cercanas a lo que necesitamos.

### Qué separa lo top de lo mediocre (concreto)
- **Una sola cámara continua + elementos que se transforman** (002, 005, 011, 027, 028, 055, 100): ninguna escena corta, cada una "crece" de la anterior (la forma es el mismo elemento en estados distintos). Lo mediocre usa cortes y fades entre slides.
- **Densidad con jerarquía**: lo top mezcla 3 capas (fondo de color/foto, UI o tipografía principal, 1-2 detalles pequeños: cursor, chips, pill). Lo mediocre es una palabra centrada sobre color plano con marco HUD (muchos showreels 003, 004, 043, 064...).
- **UI real o casi real construida en código**: cursor con clics, tipeo, cards con sombras (011, 055, 015, 041, 069, 107, 101). Producto como componentes, no screenshot crudo (035 lo pide explícito: "avoid using screenshots as raw; instead, break them down into components/icons").
- **Cámara y profundidad**: zoom screen-studio hacia cada momento (005, 011, 055, 028), fly-over 3D con profundidad de campo (006), carruseles 3D con reflejo (015), cards 3D en perspectiva (099, 106, 136, 162, 038). Lo plano no pasa de "diapositiva animada".
- **Luz y materiales**: glass líquido con refracción (005, 041), glow conic iridiscente (055), halo/luz rasante (034), glow dorado (107). Los prompts que lo piden lo logran; los que no, caen en degradé genérico.
- **Tipografía**: un solo par de fuentes (Geist/Inter + un serif itálico como acento: 130, 163, 191, 222, 102, 110), palabra clave resaltada con color/itálica/highlighter (096, 163, 215), tachado de la palabra equivocada y reemplazo (162, 184, 196, 097). Sin puntos finales en pantalla (015, 041).
- **Ritmo**: "algo pasa en cada beat" (002, 005, 011, 055), cortes duros solo en el drop, una idea cada 1,5-2 s (129), hold máximo 1 s (005, 055). Tiempos expresados en beats/frames, no en segundos sueltos.
- **Sonido**: en los specs buenos hay música con drop medido (numpy/beat grid), un SFX por evento ubicado por su pico medido, ducking de música bajo voz, loudnorm -14 LUFS (002, 005, 011, 015, 041, 055, 129). Las piezas sin sonido planificado no se distinguen en la hoja (no se ve en la hoja), pero los prompts cortos casi nunca lo piden.
- **Anti-lista explícita** ("Banned: crossfades, glows, particle bursts, bouncy easing, templates, dead time") aparece en todos los specs buenos. Sirve más que cualquier adjetivo.
- **Loop**: último frame = primer frame (002, 005, 027, 028, 100).
- **Verificación**: render de un frame por beat y escaneo de saltos de un solo frame antes del render final (002, 005, 011, 055, 100).

Lo mediocre en concreto: showreels de una línea con tipografía enorme y naranja (parecen iguales entre sí), HUD con timecode en las esquinas (el 066/217 pide evitarlo: "Avoid the frames and texts on the corners which are typical ai made giveaways"), escenas con 3D "estilo Blender" sin pulido (049, 126), pixel art/juegos (123, 132, 182) que son demos técnicas, no publicidad.

---

## 2. Catálogo de técnicas

Convención de build en nuestro stack (HyperFrames + GSAP pausado + `hf-seek` para canvas/three.js): todo estado es función de `t`. Los resortes del corpus son "step responses de forma cerrada"; en GSAP equivalen a `ease: "elastic.out"` bajo o `CustomEase`; para sumar resortes por cambio de objetivo conviene calcular el valor en un `onUpdate` del timeline pausado (suma de un resorte por cambio). Nada de `setTimeout/rAF/Math.random` (usar `mulberry32`).

### A. Interfaz y producto

**T01. UI construida en código con cursor, clics y zoom de cámara**
- Qué: componentes (botón, input, card) que reaccionan a un cursor SVG que se desplaza, escala al hover y "aprieta"; la cámara hace zoom a cada momento.
- Ejemplos: 002 Shape morphing, 005 Photo print app, 011/037 Frame by Frame, 015 UGC ad generator, 100 Morphing UI, 114 Website analyzer, 207 GenVizu.
- Cómo: `div#world` con todos los componentes; un timeline GSAP anima `x,y,scale` del mundo (zoom en espacio log: `scale = 2^z`). Cursor = SVG con timeline propio (posición con `fromTo`, escala 1→1.55 hover, 0.85 en press). Clics: pulso del botón + anillo. Nada de CSS transitions.
- Marcas: Aura, Synous, synx (base de casi todos los reels de producto).

**T02. Una sola forma que morfea por estados (button, loader, player, slider, toggle, chart, ⌘K, toast)**
- Ejemplos: 002, 100 (idénticos), 005 (negro que inunda y se contrae), 027, 055 (botón que se expande a página).
- Cómo: un `div` con `width/height/borderRadius/background` animados por GSAP; el contenido interno cambia con micro-blur (`filter: blur(6px)` 0.12 s) en dos hijos que se cruzan con `fromTo`. Borde líder y trailing de un indicador con eases distintos para el efecto "líquido".
- Marcas: Synous, synx (demuestra "sistema"), Aura (de botón a resultado).

**T03. Prompt bar / composer con texto tipeado**
- Ejemplos: 013, 020, 041, 055 (glow conic), 114, 169, 207, 018, 131 (campo de upload).
- Cómo: tipeo = `chars = floor(progress*len)` computado dentro del tween (`onUpdate`) con línea fija; caret con parpadeo derivado de `t`. Glow iridiscente: `conic-gradient` rotando por `rotate` del timeline + `filter: blur(18px)`.
- Marcas: Aura (pedir un creativo), Synous (pedirle al sistema), synx.

**T04. Teléfono flotante con pantallas que cambian**
- Ejemplos: 055, 161, 173 (vertical), 147, 108, 115, 145, 167, 008.
- Cómo: marco CSS (radio, bisel 11 px, isla) con `overflow:hidden`; pantallas como capas dentro con `clip-path` o `x` animado; inclinación leve con `rotateY/rotateX` + `perspective`. Cards que "salen" del teléfono con z + sombra.
- Marcas: Aura, Synous.

**T05. Menu bar / ventana de macOS y glass prompt box**
- Ejemplos: 011/037, 005 (isla dinámica que pasa a ventana Mac), 190 (tiling de ventanas).
- Cómo: barra con SVG de íconos; caja de vidrio = copia blur+aclarada del fondo recortada a la forma (`backdrop-filter` solo si el motor lo soporta; si no, dos capas: fondo duplicado con `filter: blur(14px) brightness(1.1)` dentro del contenedor con `overflow:hidden`).
- Marcas: synx, Synous.

**T06. Liquid glass con refracción**
- Ejemplos: 005 (SVG feDisplacementMap con clon de la escena detrás), 041 (canvas con blur + banda magnificada ×1.06), 011 (títulos de vidrio esmerilado).
- Cómo: avisan que `backdrop-filter: url()` falla en Chromium; clonar el fondo detrás de cada elemento de vidrio y aplicar `feDisplacementMap` x3 con escalas levemente distintas (bordes cromáticos) + rim light. Caro; usar solo en 1-2 elementos.
- Marcas: Aura (toque premium), Synous (aurora).

**T07. Bento grid / grilla de cards que se reordena**
- Ejemplos: 005 (grilla se despliega "como un mapa de papel" y se reordena en bento), 038 (muro de capturas), 119 (grilla de thumbnails con scan), 159 (12 ads), 223.
- Cómo: tiles absolutos con `x,y,scale` calculados de una grilla; stagger con `from:"center"`. Scan line = barra con `x` lineal y cada tile se resalta cuando la barra lo cruza (se calcula el instante por posición).
- Marcas: Aura (muchos creativos), Synous, synx (secciones de landing).

**T08. Cards 3D en perspectiva (muros, carruseles, pilas)**
- Ejemplos: 015 (carrusel 3D con reflejo de piso), 099 (PDFs apilados), 106, 136 (cards de Reddit en perspectiva), 162 (docs cayendo a videos), 071 (nube de páginas), 038.
- Cómo: CSS 3D (`perspective`, `rotateX/Y`, `translateZ`) o three.js con planos y `hf-seek`. Aviso del corpus: no poner opacity/filter en un elemento `preserve-3d` (se aplana); fadear el wrapper.
- Marcas: Aura (carrusel de creativos), Synous, synx.

**T09. Fly-over 3D de una landing real con profundidad de campo**
- Ejemplo: 006 (spec de 15.000 caracteres: captura con Playwright, quads WebGL2, DoF por pixel, cámara con curva de velocidad). Relacionado: 214, 130, 223 (capturas del sitio propio).
- Cómo: capturar secciones como PNG, texturas en three.js con mipmaps + anisotropía, cámara con curva de velocidad integrada (no keys de posición), DoF con post-proceso (bokeh de 40 taps o `BokehPass`). Render a GPU real. Es caro pero es el plano "wow" para synx build.
- Marcas: synx (principal), Aura.

**T10. Dashboard / gráfico que se dibuja y contador que sube**
- Ejemplos: 094 (contador a 1.284.302 con anillo), 117 (1→568), 107 (dashboard oscuro 3D con línea oro), 093, 019 (globo con contador), 195 (histograma de puntos), 200, 231, 013.
- Cómo: `stroke-dashoffset` para líneas; contador = tween sobre un objeto `{v:0}` con `onUpdate` formateando con `Intl.NumberFormat` (no `Date.now`). Curvas de datos con ruido seeded.
- Marcas: Synous (resultados del cliente), Aura, synx.

**T11. Terminal / código que se tipea**
- Ejemplos: 018 (chips `<FadeIn>`, `<Parallax>`), 122, 125, 035 (`# Write` a serif), 076, 187, 176 (pixel que se disuelve en código), 127, 051.
- Cómo: mismo tipeo por `onUpdate`; resaltado de sintaxis precomputado con spans; caret determinístico.
- Marcas: synx (devs/landing), Synous.

**T12. Mapa de nodos / diagrama que conecta**
- Ejemplos: 058 (cards neo-brutalistas unidas por líneas), 118 (100+ LLMs a ONE API), 213 (líneas con glow y saldos por modelo), 079, 067/120 (data center isométrico con anotaciones), 080 (ventanas a multi-escala), 134.
- Cómo: SVG con `path` + `stroke-dashoffset` y nodos con stagger; zoom por `scale` del mundo; pulsos que viajan con `motionPath`/`getPointAtLength` (sin `repeat:-1`, repetir con cantidad fija de tweens).
- Marcas: Synous (arquitectura "sistema"), synx.

**T13. Notificaciones, chips y pills flotantes**
- Ejemplos: 028 (tarjetas que entran en el beat), 148, 116 (post-its), 106, 135 (chips de keywords), 144 (íconos de apps flotando), 186 (logos flotando), 152.
- Cómo: stagger con rebote bajo + `y` flotante calculado con seno de `t` (no loop infinito: `sin(t*ω)` dentro de `onUpdate`). Sombras suaves.
- Marcas: las tres.

### B. Tipografía

**T14. Kinetic type con máscaras (texto que sube de una línea)**
- Ejemplos: 005 y 055 ("text rises out of a mask line"), 015 (hook palabra a palabra), 092, 138, 193, 040 (Email), 170 (MOTION → EMOTION).
- Cómo: cada palabra/letra en `overflow:hidden` + `yPercent:110→0`; stagger 0,04-0,06 s. Medir texto con `document.fonts.ready`. Rotación por letra con `transformOrigin`.
- Marcas: las tres (es la base del gancho en 9:16).

**T15. Palabra que se tacha y se reemplaza / texto que cambia una palabra**
- Ejemplos: 097 ("Tell a friend" tachado), 162 ("Stop sending documents." → "Start sending videos."), 184 ("Stop bounces"), 196 ("Stop retyping." tachado), 116 ("prompting" tachado → "context"), 130, 220, 143.
- Cómo: línea de tachado con `scaleX 0→1`; palabra nueva entra con máscara; acento de color en la palabra clave.
- Marcas: Aura (antes/después), Synous, synx. **Gancho de contraste ideal.**

**T16. Serif itálico como acento dentro de grotesca**
- Ejemplos: 130, 163, 191, 222 ("You're in your *database*"), 110, 158, 154, 106, 144, 102.
- Cómo: dos fuentes cargadas en tokens (grotesca + serif), la palabra clave en `font-style:italic` y color de acento. Sin dependencia de animación.
- Marcas: Synous (editorial, elegante), synx; Aura menos (DM Sans).

**T17. Highlighter / marcador que barre una frase**
- Ejemplos: 215 ("Just ask your AI." con barra lima), 180 (acento rojo-naranja), 079 (bottleneck), 036 (resaltados de colores en el texto), 129 (notas a mano).
- Cómo: `div` detrás del texto con `scaleX 0→1` (`transformOrigin:left`). Aviso del corpus (041): una caja de selección detrás de la palabra "parece una selección de Windows"; usarlo como barra sólida con padding.
- Marcas: Aura (acento rojo), Synous, synx.

**T18. Tipografía gigante con eco / ghost / outline repetido**
- Ejemplos: 042, 044, 121, 153, 170, 198, 228, 203, 088, 219, 138.
- Cómo: N copias del mismo texto (CSS `-webkit-text-stroke`, opacidad decreciente) desplazadas con `y` en stagger. Cuidado con densidad: una sola idea por pantalla.
- Marcas: synx (portadas de sección), Aura (contraste).

**T19. Glitch / RGB split / distorsión de tipografía**
- Ejemplos: 087 (NEVER), 174, 179, 044 (corte por tiras), 205 (WRONG WAY).
- Cómo: tres capas con `mix-blend-mode`, offset en x con `onUpdate` seeded; tiras con `clip-path: inset()`. El corpus de 015 lo prohíbe ("RGB split") para el look minimalista; usar con parquedad.
- Marcas: synx (energía), Aura (poco: su estética es limpia).

**T20. Letras individuales con física (rebote, squash, rotación)**
- Ejemplos: 007/054 (MOVE cae), 092 (I CAN SQUASH), 112, 189, 043 (MOVE rotando), 121.
- Cómo: letras en spans; `y` con `bounce.out` bajo + `scaleY` squash en el contacto. Para física real: calcular con integrador de paso fijo seeded.
- Marcas: synx, Aura.

**T21. Texto que se dibuja a mano (handwriting)**
- Ejemplos: 129 (Caveat con `stroke-dashoffset`), 052, 085, 081/010 (recetas), 061.
- Cómo: SVG de glifos como `path` + `stroke-dashoffset` (o la fuente Caveat con máscara `clip-path` que barre). 
- Marcas: Aura (humano, "notas del dueño"), Synous.

**T22. Contadores / cifras gigantes**
- Ejemplos: 093 (5.699 GAMES PLAYED), 094, 117, 063 (cuenta 3), 200 ("173 backlinks"), 143 (barra 11%).
- Cómo: tween numérico + `fontVariantNumeric: tabular-nums` para que no tiemble el ancho.
- Marcas: las tres (cifra concreta obligatoria en nuestros reels; rotular `DATO DE EJEMPLO`).

**T23. Texto orbitando / espiral de palabras**
- Ejemplos: 047 (vertical, palabras en espiral con wireframe), 027 (palabras que orbitan el punto), 210 (texto circular alrededor de foto).
- Cómo: cada palabra con `rotation` + posición polar calculada de `t`; radios con stagger.
- Marcas: Synous (ecosistema), synx.

### C. Formas, flood y transiciones

**T24. Flood de color (una forma inunda la pantalla y se contrae en la siguiente escena)**
- Ejemplos: 005, 055 (lima desde el wok), 027, 001/065 (disco naranja), 043, 143, 194, 192, 171, 012, 210.
- Cómo: círculo con `scale` hasta cubrir las 4 esquinas (sobredimensionar), 0,3-0,35 s; el contenido nuevo vive dentro de la forma o aparece al contraerse. Regla del corpus: z-index explícito y que cubra la esquina más lejana.
- Marcas: las tres (la transición "sin corte" más fácil de reutilizar).

**T24b. Match cut / elemento compartido entre escenas**
- Ejemplos: 015 (una palabra del hook se vuelve la UI), 055 (la burbuja lleva sus palabras), 180 (el reel se encoge a su tile), 027.
- Cómo: medir posiciones en runtime (`getBoundingClientRect` dentro del seek) y animar el elemento de A a B con `fromTo`.
- Marcas: las tres.

**T25. Iris / máscara geométrica**
- Ejemplos: 005 (6 aspas), 015 (círculo se abre del botón), 084 (grilla de formas).
- Cómo: `clip-path: circle()` animado, o seis polígonos con `rotate`.
- Marcas: synx, Aura.

**T26. Figuras geométricas que se convierten una en otra**
- Ejemplos: 027, 084, 053, 070 (círculo, FORM), 174, 062 (Fibonacci con cuadrados).
- Cómo: mismo `div` con `borderRadius` animado (círculo→cuadrado→pill) y `rotate`; o SVG `path` con morph (GSAP MorphSVG o interpolar puntos).
- Marcas: synx, Synous.

**T27. Gráficos que se dibujan (curvas de easing, bezier con handles)**
- Ejemplos: 033, 042, 060, 064, 168, 154, 112, 203, 059, 129.
- Cómo: `path` con `stroke-dashoffset`; el punto sigue la curva con la misma función (el corpus advierte: la curva y el punto deben salir de la misma función o el resorte "se siente falso").
- Marcas: synx (poco, es "jerga de animador"; 129 prohíbe esa jerga en pantalla).

**T28. Pelota/bola guía que recorre la escena**
- Ejemplos: 028 (bola blanca por toggle, slider, cards, teclado), 129 (bola con onion skin), 027 (punto naranja), 230, 192.
- Cómo: una ruta única (spline) para la bola, con squash en cada impacto; el estado de la UI se calcula de la posición de la bola.
- Marcas: Synous, synx (hilo conductor entre pasos del sistema).

### D. Partículas y 3D

**T29. Partículas que forman logo, silueta o archivo**
- Ejemplos: 022 (malla low-poly), 039 (nube con silueta), 131 (puntos que forman un archivo), 134 (corazón pixel), 176, 187 (mano pixel), 031, 216 (nebulosa), 113.
- Cómo: posiciones objetivo de una máscara de imagen/SVG (muestreo en canvas), partículas con `lerp` de posición dispersa a objetivo, dispersión con `mulberry32`. Canvas dentro de `hf-seek`.
- Marcas: synx (logo reveal), Synous.

**T30. Halftone / campo de puntos que responde**
- Ejemplos: 027, 044, 139 (ojo halftone), 051 (halftone rosa), 194, 188.
- Cómo: grilla de círculos cuyo radio = función de distancia a un punto + `t`; en canvas 2D. Barato y muy distintivo.
- Marcas: synx, Synous.

**T31. Esfera / wireframe 3D de puntos**
- Ejemplos: 121 (esfera de puntos), 047 (wireframe), 080 (globo), 019.
- Cómo: three.js `Points`/`LineSegments`; rotación por `t`; `hf-seek` actualiza la cámara.
- Marcas: Synous.

**T32. Objeto 3D "producto-héroe" (laptop, badge, ícono) con luz**
- Ejemplos: 191 (laptop con pantalla), 108 (badge sólido que se inclina hacia el cursor), 107 (ícono + dashboard), 099 (teclado), 105.
- Cómo: three.js con `MeshPhysicalMaterial`, HDRI chico, sombras suaves, una luz de borde; cámara con ease. Cuidado con peso de render.
- Marcas: synx (producto/launch), Aura.

**T33. Luz rasante, glow, partículas doradas de lujo**
- Ejemplos: 034 (luz diagonal), 050 (partículas doradas), 107, 019 (halo naranja), 125 (destello).
- Cómo: gradientes radiales + `mix-blend-mode:screen`; partículas seeded.
- Marcas: Synous (aurora), synx.

### E. Ritmo, fotos y vídeo

**T34. Corte a beat con música y SFX medido**
- Ejemplos: 002, 005, 011, 015, 041, 055, 069, 101 (todo corte "lands on a beat or drop"), 049.
- Cómo: pre-calcular grilla de beats con numpy; guardar en un `timeline.ts`/JSON los instantes en beats; cada SFX posicionado por su pico, no por el inicio del archivo. `loudnorm -14 LUFS`.
- Marcas: las tres. Para nosotros: música opcional (Instagram), pero SFX sobre cada golpe sirve.

**T35. Edición con fotos reales: collage, flashes en 16avos, ráfaga de imágenes**
- Ejemplos: 041 (120 imágenes que explotan y forman un logo), 015 (muro de clips reales con scan y 3 ganadores), 009 (fotos de archivo con pintura encima), 146, 209.
- Cómo: secuencias JPEG por clip (ffmpeg) y cambiar `src` por frame dentro de seek; o `<video muted>` con seek por `currentTime` (más frágil). Disponible solo con material propio real.
- Marcas: Aura (salidas del producto), Synous (capturas reales de la app).

**T36. Teléfono + cursor + "foto que se revela"**
- Ejemplos: 005 (foto a "hero de una landing"), 164 (imagen insertada en el email), 207, 169.
- Marcas: Aura.

**T37. Scroll vertical de una página con blur direccional (whip-tilt)**
- Ejemplos: 011/037 (tilt hacia arriba con flash celeste), 104 (secciones scroll), 006.
- Cómo: `y` con ease out exponencial + `feGaussianBlur stdDeviation="0 8"` según velocidad (derivar blur de la derivada del `y`).
- Marcas: synx, Synous.

**T38. Motion blur real por subframes**
- Ejemplos: 002, 005, 011, 015, 041, 055 (4-16 subframes por frame mezclados con `ffmpeg tmix` a 60 fps).
- Cómo: en nuestro pipeline, render a 30 fps con subframes por `hf-seek`; requiere lógica de render propia (verificar con `hyperframes-cli` si el motor lo soporta).
- Marcas: las tres.

**T39. Loop perfecto (último frame = primero)**
- Ejemplos: 002, 005, 027, 028, 100, 177 (ciclo de vida, corta lista para loop).
- Marcas: Aura/Synous/synx (reels de feed en loop).

**T40. Explainer con dibujo de línea (vaso, pizarra, doodle)**
- Ejemplos: 010, 081 (recetas), 085, 090, 052, 061.
- Cómo: SVG por `stroke-dashoffset`, onion skin con copias de baja opacidad (129).
- Marcas: Synous (educar a coaches).

**T41. Ilustración/escena de personaje, claymation, pixel art, anime**
- Ejemplos: 073, 097, 155, 221 (escena 3D de mascota), 123, 132, 182, 185, 128, 133, 150, 177, 201, 229.
- Dato: es un subgénero artístico fuera de nuestras marcas B2B; sirve solo como mascota puntual (097, 221 usan mascota de marca).
- Marcas: ninguna directa (Aura: posible mascota).

**T42. Grilla densa de íconos o ruido de fondo como contexto**
- Ejemplos: 008 (grilla de íconos morados), 178 (matriz de código), 038 (muro de capturas), 088 (líneas de texto fantasma).
- Cómo: grilla estática con un solo foco animado (reduce costo). 
- Marcas: Synous, synx.

**T43. Reveal de logo con construcción**
- Ejemplos: 022, 031, 083 (anillos), 115 (flecha construye logo vertical), 134, 167 (blur → app), 211, 011 (cierre con wordmark brillando).
- Cómo: logo como SVG con piezas animadas (trazar logo a SVG para animar, lo dice 136); cierre con halo y encogimiento.
- Marcas: las tres (CTA / cierre).

**T44. Texto sobre fondo con efecto de "diapositiva en perspectiva" (plano inclinado naranja)**
- Ejemplos: 053 (PLANE), 075, 043.
- Cómo: `rotate/skew` de un plano de color y texto dentro con `overflow:hidden`.
- Marcas: synx.

**T45. Marcas de tiempo / HUD en esquinas (TC, BPM, fps)**
- Ejemplos: 001, 003, 004, 033, 053, 063, 188 y la mayoría de showreels Claude.
- Nota: el propio corpus lo marca como "giveaway de IA" (066, 217, 129: "No chrome (scrubber, timecode, fps, headers)"). **No usar en nuestros reels.**

**T46. Sello / stamp y "papel" sobre cards**
- Ejemplos: 099 ("UNREAD"), 109 ("MADE IT UP"), 129 (notas pegadas), 116.
- Cómo: sello con `scale 1.6→1` + rotación + opacidad rápida (0,15 s) y sacudida mínima; textura de papel con SVG noise estático.
- Marcas: Aura (humor práctico), synx.

---

## 3. Patrones de prompt

### Lo que tienen en común los prompts que dieron mejor resultado
1. **Estructura por bloques con etiquetas**: `<inputs>` (qué pedirle al usuario y defaults), `<direction>` (estilo + baneos), `<structure>` (línea de tiempo en beats), `<build>` (reglas técnicas numeradas), `<gotchas>` (trampas ya conocidas), `<start>` (qué hacer primero: pedir inputs, mostrar beat map y 4 stills antes de renderizar). Aparece en 002, 005, 006, 011/037, 015, 027, 028, 041, 055, 100, 180.
2. **Largo y especificidad**: 1.500-15.000 caracteres, con coordenadas, hex, duraciones en frames/beats (011: "f0-71", "x474-1063").
3. **Anti-lista concreta**: "Banned: crossfades, blur-ins, 3D, particles... holds longer than 1s... anything that looks like a template".
4. **Un lenguaje de cámara único**: "one continuous camera... never two camera moves at once", "never zoom in and out consecutively".
5. **Regla de determinismo explícita**: "Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames". Es el mismo contrato que usamos nosotros.
6. **Verificación obligatoria**: "show me the beat map and 4 stills before writing the full film", "scan for single-frame pops".
7. **Entradas reales**: pedir logo, capturas, fotos, canción y copy en vez de inventar ("Real footage only, never placeholder cards").
8. **Sonido como parte del diseño**: BPM, drop, SFX por evento, LUFS.
9. **Esfuerzo**: los prompts cortos usan "go all out" (la mayoría); los de 009 piden "Feel free to work 10+ hours"; 046 "puedes dedicarle un día"; 153 "question your strategy and plan, if it doesn't feel like done by a pro designer, start over". Ninguno indica explícitamente un nivel de esfuerzo técnico; no se ve en el catálogo el campo de reasoning/effort.
10. **Skills mencionadas**: solo 3 (ver sección 5). Los prompts largos referencian `/hyperframes` (183), HyperFrames + GSAP (129), Remotion (107, 130, 136, 214).
11. **Referencias**: 009 y 052 adjuntan un video de referencia ("Study the reference closely: smoothness, timing, shot durations, fonts, elements... change the design overall"); 107 apunta a repos reales (tokens CSS, wordmark) como fuente de verdad; 136 dice "first read my landing page and codebase to pull the real story, copy, colors, font and logo".

### Prompts citados (verbatim)

**#009 (Engraving-style Claude ad)**
> Make a fast-paced ad for Claude, about 10–15 s (closer to 15). Reference video attached. 1. research: - Study Claude's earlier brand designs first. - Find every photo and asset that fits: artistic, editorial, whatever the idea needs. 2. design/direction - An art reimagine: bold, light mode. - Clean and perfect: no beige "artsy" look, no eyebrow labels. - Paint elements on top of the images. - Above all: fast-paced and very creative. 3. rules - No slop. Study the reference closely: smoothness, timing, shot durations, fonts, elements. - Take some inspiration and borrow techniques, but change the design overall, it should look like something you did completely on yourself with your own taste - Every morph has to be perfect. ideas: (since everything moves fast) - Clean, varied Claude SVG animations - Images small, bigger, several at once - Morphing text - Clean 3D animation - Zooms extra notes: - Feel free to work 10+ hours - Give me the final video, ending on the Claude logo.

**#129 (Paper-style product launch film)**, plantilla casi lista para nosotros (HyperFrames + GSAP):
> Create a 15s motion-graphics film explaining {{PRODUCT}}. HyperFrames + GSAP, no voiceover, no footage. Style: paper-light canvas, marker notes that draw on, real physics, huge kinetic type, hard light/dark switches, a new idea every 1.5–2 s, a sound on every hit. COPY: read {{POSITIONING_DOCS}} first. {{ONE_LINER}} For {{AUDIENCE}}. {{WHAT_IT_DOES}} Name what the product learns, never the abstraction. RULES - No chrome (scrubber, timecode, fps, headers). No animator jargon on screen ("squash", "stagger", "easing"...). Every word speaks to the buyer. - No invented results: no %, multipliers, customer names or figures. - Never use: {{BANNED_WORDS}}. - Logo: real mark {{LOGO_FILE}} + "{{PRODUCT}}" in {{WORDMARK_FONT}}; never a boxed logo file. CRAFT - Colours {{COLOR_CANVAS}} / {{COLOR_INK}} / {{COLOR_ACCENT_1}} / {{COLOR_ACCENT_2}}; notes in the accents; dark mode = charcoal matching the palette. - Fonts {{BRAND_FONTS}}; Anton for kinetic type; Caveat handwriting via stroke-dashoffset. - Real easing, squash/stretch, stagger, overlap, onion skin, smear, follow-through. Check the HyperFrames registry first. Set every from-state at t=0 (seek-safe); never cover an exit. One primary move per transition; no generic push/slide/rotate-swing. - Music in sections: drums drop on the dark switch and while the ball is airborne, slam back on the type and the logo. SFX: pops, pen scribbles, whooshes, logo sub-hit. CC0 or generated only; log sources. Master -14 LUFS, -2 dBTP, re-measured after AAC encode.

**#136 (SaaS launch video)**
> Act as a senior motion designer and build a 30-second launch video for [product] in Remotion, entirely in code so I can edit and re-render it: first read my landing page and codebase to pull the real story, copy, colors, font and logo file (trace the logo to SVG so it stays sharp and can be animated), then write the video as one story (why the market matters, why it's painful today, how [product] fixes it, what you get) in 4 to 5 scenes with one short title each, animate everything like a premium product film (kinetic typography word by word, spring easing, smooth camera pushes and pans, depth and glow, elements that build in on the beat instead of just appearing), keep each scene on screen long enough to read, add one soft sound effect for every element that appears and silence otherwise, and end on a memorable animated logo reveal with the tagline and URL, then render it, check the frames yourself and fix anything that overlaps, clips or feels rushed before showing me the result.

**#027 (Orange dot motion system), `<direction>`**
> A 2D motion design film in 16:9. Use a warm off-white canvas, near-black backgrounds, bold typography and one vivid orange accent. The orange dot connects every scene: it starts in the UI, becomes the dot over a letter, traces a spring graph, grows into a shape and returns on the end card. A cursor makes the opening click feel real. Keep the motion sharp and controlled, with small spring overshoots and no dead time. Banned: stock footage, gradients, glows, particle bursts, random transitions and motion that isn't connected to an element already on screen.

**#015 (UGC ad generator promo), `<direction>`**
> High-end minimal. One idea per shot, lots of empty space, one accent color, one clean sans (Geist or Inter) with tight tracking. Masked type reveals, match cuts, one smooth camera language. Real footage only, never placeholder cards. No full stops in on-screen text. Banned: shockwave rings, particle bursts, RGB split, camera shake, lens flares, neon glows, grid floors, flashing backgrounds, bouncy easing.

**#055 (Food craving launch film), `<gotchas>`**
> Four subframes leave ghost copies on fast moves, so render 8 and slow the move down. The flood must reach the farthest corner and take about 0.35s, or it looks like a flash. Set z-index on every layer so the cards don't float above the flood. Keep the typed request on fixed lines so the camera never has to follow a wrapping cursor. Declare every variable before the first seek() call.

**#041 (Ora 2), `<gotchas>`**
> A [warmly] opener can sound whispered, while [excited] can feel fake. A highlight box behind a word looks like a Windows text selection. If the camera resets to 1.0 during a handoff, the zoom snaps. A 0.05s fade looks like an instant pop-in.

**#035 (mdfor.dev), pedido de producción (una línea larga)**
> Use actual product screenshot/logo/assets Must have music and motion must match the music Do it like a real professional production video, not like a demo or prototype. Add more animation and motion design; avoid using screenshots as raw; instead, break them down into components/icons so we can animate those too. Make the motions more juicy. Use the best motion design techniques you can.

### Plantilla reutilizable (español, para nuestro estudio)

```
<marca>: [personal | synx | synous | aura]  (leer marcas/<marca>/ primero)

<inputs> Preguntame (si falta): palabra clave del CTA, 1 cifra concreta o contraste
(rotular DATO DE EJEMPLO si no es real), 3 a 5 momentos de UI/producto con la
carpeta de la app, logo SVG, canción (opcional) con drop claro. </inputs>

<direction> Reel vertical 1080x1920, 30 fps, [duración] s. Marca: tokens.css de la
marca (colores, fuentes, easings, radios; nada suelto). Una cámara continua: un solo
movimiento de cámara por escena; las escenas crecen una de otra (flood de color,
match cut, forma que morfea); sin crossfades. Una idea por pantalla, máx ~7 palabras
de texto principal. Gancho que se entiende sin sonido en 1,5 s. Contraste o cifra
concreta. Zonas seguras de Instagram.
Prohibido: [lista de baneos de la marca], glows genéricos, easing rebotón, tiempo
muerto, precios, jerga de animador en pantalla, HUD/timecode en esquinas,
cualquier cosa que parezca template. </direction>

<structure> Tiempos en beats o frames (BPM xx): 7 pasos de estructura-reel.md.
Por escena: qué elemento persiste, qué se transforma, qué hace el cursor, dónde
cae el corte duro (solo en el drop). </structure>

<build> HyperFrames + GSAP pausado (window.__timelines), hf-seek para canvas/three.js.
Todo estado = f(t). Sin setTimeout/rAF/Date.now/Math.random (mulberry32).
Fuentes con document.fonts.ready; timeline registrado al final. fromTo, nunca from.
IDs únicos prefijados por escena. Resortes de forma cerrada. Verificar: lint,
check --json, un fotograma por beat, buscar saltos de 1 frame. </build>

<gotchas> will-change rompe el texto bajo escala de cámara; no opacity/filter en
preserve-3d; el flood debe pasar las 4 esquinas en ~0,35 s; último frame = primero
si es loop. </gotchas>

<start> Mostrame el beat map y 4 stills (gancho, UI, prueba, CTA) antes del render
completo. </start>
```

---

## 4. Top 25 para nuestras marcas

Criterio: vertical B2B de 15-30 s con UI real, contraste y cifras. Los pesos de formato (casi todo es horizontal) se compensan recomponiendo para 9:16. Entre paréntesis, lo que NO copiar.


### Aura

| # | n | Título | URL | Técnica | Por qué |
|---|---|---|---|---|---|
| 1 | 015 | UGC ad generator promo | https://prompt-motion.com/twoclipping-6dd14e | UI con cursor + hook palabra a palabra + carrusel 3D de clips reales + stats en push cuts | Es literalmente un generador de anuncios UGC: el mismo arco (pegar link, ver variantes, elegir ganadoras) sirve para Aura. Tiene hook, UI, prueba y cierre en bares de 2 s. |
| 2 | 055 | Food craving launch film | https://prompt-motion.com/ultimaxbt-2ddf1e | Composer con glow conic, flood de color, cards de resultado, teléfono | Pedir en lenguaje natural y ver resultados en cards: es el flujo de Aura. El flood lima se reemplaza por rojo #E02A14. |
| 3 | 011 | Launch video remake comparison | https://prompt-motion.com/notdwd-c2037d | Remake launch Apple: header, ícono orbitando, menu bar, prompt de vidrio, cards con título de vidrio | El spec más detallado del corpus (cuadro por cuadro). Sirve de manual de cámara/blur/tiempos; Aura = claro, vidrio y acento rojo (su paleta ya es clara). |
| 4 | 041 | Ora 2 image model launch film | https://prompt-motion.com/rossaxbt-3085b7 | Collage de imágenes, caption tipeado, controles glass, 120 imágenes que explotan y forman logo | Producto que genera imágenes: muestra lo creado a ritmo de 16avos. Usar solo salidas reales de Aura. |
| 5 | 159 | QuickDesign brand promo | https://prompt-motion.com/quickdesignio-dd93d0 | Grilla de ads que se llena: One brief. Twelve ads. | Mensaje de Aura en una imagen: 1 brief a 12 creativos. Cifra y contraste en un plano. |
| 6 | 169 | Quetzal social app reel | https://prompt-motion.com/miskinho-443898 | Input de texto a card de imagen con blur-in | Versión mínima y limpia de 'escribí y sale el creativo', ideal para 9:16. |
| 7 | 099 | DistilBook product explainer | https://prompt-motion.com/sudo-kiran-6609ed | PDFs 3D apilados con sello UNREAD; luego video de producto | Contraste problema/solución con objetos físicos en perspectiva; sirve para 'nadie lee el brief, todos miran el anuncio'. |
| 8 | 196 | ocrX app launch video | https://prompt-motion.com/mehul4795-4a7007 | Vertical: Stop retyping tachado, app icon | Único gancho vertical de producto B2B del corpus: tachar el hábito viejo y revelar el producto. |
| 9 | 129 | Paper-style product launch film | https://prompt-motion.com/ik-builds-b8bdcf | Papel claro, notas a mano que se dibujan, bola con física, switches claro/oscuro, HyperFrames + GSAP | Prompt ya escrito para nuestro motor. Aura es la marca clara: las notas manuscritas en rojo funcionan como contraste visual. |

### Synous

| # | n | Título | URL | Técnica | Por qué |
|---|---|---|---|---|---|
| 10 | 107 | Taxtello bookkeeping app film | https://prompt-motion.com/daniel-haida-8691d4 | Ícono, dashboard 3D oscuro con acento, 'Alles im Blick', film premium de producto financiero | Cómo presentar un sistema serio con paleta oscura y un solo acento (nuestro navy + sky). Spec con cámara, cards y números. |
| 11 | 080 | Sahi trading terminal reveal | https://prompt-motion.com/dale-vaz-cc612a | Punto, ventanas (charts, posiciones, watchlist) con zoom a multi-escala, cámara retrocede hasta ser un punto | Muestra 'un sistema con muchas piezas' (CRM, agenda, pagos) y el zoom final hacia un solo dato; aplica a plataformas de academias. |
| 12 | 191 | Lidlezz app promo | https://prompt-motion.com/cansincengiz-me-cf68dd | Laptops 3D con serif itálico: 'Your agent is two hours in', se cierra la tapa | Narración con un objeto 3D, texto serif elegante; sirve para 'el sistema trabaja mientras vos dormís'. |
| 13 | 213 | AgentHud project motion video | https://prompt-motion.com/jazzen-chen-4542ae | Líneas con glow que descienden con labels por modelo/saldo | Muestra varias fuentes conectadas a un sistema central sin screenshots (útil para integraciones). |
| 14 | 118 | LiteLLM promo reel | https://prompt-motion.com/misbahsy-80eaec | Código flotante a ONE API, esfera que absorbe, titular grande | 'Muchas herramientas, un sistema'. Estructura clara de 3 beats. |
| 15 | 094 | Flexprice motion showreel | https://prompt-motion.com/sudeepsd-1a3485 | Contador a 1.284.302 con anillo y partículas, cierra en 118% | Cifra gigante que sube: el 'dato concreto' obligatorio (rotular DATO DE EJEMPLO). |
| 16 | 173 | Parenting app hype video | https://prompt-motion.com/francoxavier33-d2dfd2 | Vertical: tipo serif + teléfono con UI de agenda + card flotante, 'AI helpers for busy parents' | Mismo problema de Synous (organizar el día): vertical, claro, UI real, serif cálida. |
| 17 | 184 | Email verification tool promo | https://prompt-motion.com/kmasiff-cc72cb | Tachado de 'bounces' y wipe circular a UI de verificación | Contraste problema/solución con transición wipe: gancho de 3 s. |

### synx build

| # | n | Título | URL | Técnica | Por qué |
|---|---|---|---|---|---|
| 18 | 006 | Landing page 3D scroll | https://prompt-motion.com/twoclipping-d89be5 | Fly-over 3D de la landing con profundidad de campo y cards que se levantan | El plano más 'wow' para un estudio de landings: mostrar la página trabajada. Requiere WebGL (ver T09). |
| 19 | 076 | Browser automation skill launch | https://prompt-motion.com/hqmank-7c61f1 | Hero de README: GIVE A SITE. WRITE A GOAL. JEV CLICKS. con cursor y halo | Gancho tipográfico de 3 líneas con acento de color y cursor; perfecto para 'una landing, un objetivo, un lanzamiento'. |
| 20 | 019 | Dub promo video | https://prompt-motion.com/steventey-0d20e4 | URL tipeada, pill con glow, globo de partículas con contador | Producto web que mide resultados: URL, pill, cifra en tiempo real; paleta oscura con acento. |
| 21 | 122 | Studio1 intro showreel | https://prompt-motion.com/astrodevil-3f2054 | Terminal tipeando y titular grande 'We turn devtools into developer favorites' | Mensaje de agencia/partner en una frase con palabra clave en acento; sobre oscuro. |
| 22 | 134 | FundMyCompute platform overview | https://prompt-motion.com/jayscambler-3f8889 | Logo hecho de puntos, luego screenshot de la web con 'Get supported for your ideas' | Transición de logo de partículas a landing real. Se adapta a mostrar el sitio entregado. |
| 23 | 018 | Cinetic skill launch film | https://prompt-motion.com/lexnlin-6161a6 | Texto tipeado con chips de componentes <SlideUp> <FadeIn> <Stagger> | Explica 'landings con animación' con chips de componentes; fondo claro, simple. |
| 24 | 027 | Orange dot motion system | https://prompt-motion.com/ultimaxbt-bbebf5 | Punto naranja que conecta toggle, spring graph, halftone y end card; loop | Hilo narrativo con un elemento (nuestro punto en #0000FF/#5073FF); aprender el método de handoff. |
| 25 | 101 | Supademo launch video | https://prompt-motion.com/jhylee95-e1152f | Palabras gigantes (click/blur/zoom) con hotspot UI y cierre de producto | Muestra capacidades de producto web con una palabra por beat; ritmo ágil y marca clara. |


---

## 5. Skills mencionadas

Solo tres entradas traen skill en el catálogo (sus campos `prompt` están vacíos, así que no sabemos qué se le pidió).

| Skill | Entrada | Para qué sirve (lo que se ve) | Vale evaluar |
|---|---|---|---|
| `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` (taste-skill) | 013 TasteSkill dashboard showcase | Skill de criterio de diseño frontend. En la hoja: un prompt tipeado ("A portfolio tracker for long-t...") que luego "builds dashboards" con UI limpia, acento naranja, fondo claro con cuadrícula fina. No se ve en la hoja cómo se usa. | **Sí, evaluar**: es el equivalente de nuestras skills `estilo`/`composicion`; comparar su guía contra las nuestras antes de adoptar nada. |
| `npx skills add Leonxlnx/cinetic` (cinetic) | 018 Cinetic skill launch film | Skill de animación de UI/tipografía por componentes. En la hoja: "Your agent writes code." con caret y chips `<SlideUp> <FadeIn> <Stagger> <Typewriter> <Parallax> <Marquee> <ZoomIn>` que se apilan abajo, fondo gris-azulado claro. Sugiere biblioteca de componentes de animación con nombres. | **Sí, evaluar** como inspiración de presets de entrada (SlideUp/Stagger/Typewriter). Ojo: si anima en tiempo real hay que reescribirla con timelines (regla nuestra). |
| `npx skills add heygen-com/hyperframes-community-skills --skill session-story` | 073 Animated agent session story | Skill de la comunidad HyperFrames. En la hoja: escena ilustrada 2D (habitación con escritorio, monitor, guitarra) con un personaje-bloque "Jake's favorite agent" que se duerme (zzz) y la pantalla cambia. Convierte una sesión de agente en una historia animada con personaje. | **Sí, evaluar con prioridad**: corre sobre HyperFrames (nuestro motor) y es el único del corpus con ese origen. No lo instalamos; revisarlo y ver si sirve para reels de "caso de cliente" narrados. |

Otros nombres mencionados en prompts que no son skills del catálogo: `/hyperframes` (183, ya la tenemos), `/brag` (095, "product demo... using /brag skill", no se sabe qué es), "Lemo-Opuscar skill" (090), "Check the HyperFrames registry first" (129, equivale a `hyperframes-registry`).

---

## 6. Índice completo (234 entradas)

Formato: H = horizontal, V = vertical 9:16, 1:1 = cuadrado. "Útil para": A = Aura, S = Synous, X = synx build, — = no aplica. La técnica principal es lo que se ve en las 3 hojas y lo que dice el prompt; cuando la hoja no permite saber más, la descripción es corta.

| n | Título | Categorías | Fmt | Técnica principal | Útil para |
|---|---|---|---|---|---|
| 001 | Claude motion designer showreel | kinetic-type, shapes, music | H | Showreel: estrella, disco naranja que inunda, CLAUDE con máscara | synx |
| 002 | Shape morphing through UI states | product-ui, charts, music | 1:1 | Una forma que morfea por estados UI con cursor | Aura, Synous, synx |
| 003 | Bold kinetic type showreel | kinetic-type, shapes, particles | H | Showreel kinetic type naranja/negro, EVERY | synx |
| 004 | Abstract motion design reel | kinetic-type, shapes, music | H | Kinetic type con marcos HUD, puntos naranjas | synx |
| 005 | Photo print app launch film | product-ui, phone, photos, music | 1:1 | Lanzamiento app: wordmark a pill a foto, cursor | Aura, Synous |
| 006 | Landing page 3D scroll | product-ui, kinetic-type | H | Fly-over 3D de landing con profundidad de campo | Aura, synx |
| 007 | Motion designer showreel | diagrams, kinetic-type, particles | H | Showreel de easing con anotaciones, MOVE | synx |
| 008 | Enxovaly baby app promo | product-ui, phone | H | Grilla densa de íconos de producto, serif encima | Synous |
| 009 | Engraving-style Claude ad | kinetic-type, photos | V | Anuncio con grabados/archivo, morphs, pintura sobre imágenes | — |
| 010 | Negroni recipe animation | diagrams | 1:1 | Receta animada con vaso de línea fina | — |
| 011 | Launch video remake comparison | product-ui, photos, music | H | Remake launch Apple: header, ícono orbitando, menu bar, prompt glass | Aura, Synous, synx |
| 012 | Travel visa service promo | product-ui, kinetic-type, photos | H | Ticket/UI, flood azul, texto en pill | Synous |
| 013 | TasteSkill dashboard showcase | product-ui, charts | H | Prompt tipeado que construye un dashboard | Aura, Synous, synx |
| 014 | Distilbook product video | product-ui | H | Texto + barras de color que caen, logo final | Synous, synx |
| 015 | UGC ad generator promo | product-ui, phone, photos, music | H | Hook palabra a palabra, UI con cursor, carrusel 3D de clips | Aura |
| 016 | ViralGrow product promo | product-ui, phone, photos | H | Texto con avatares inline y píldora | Aura, Synous |
| 017 | Recursion explained in genres | characters, code | H | Mismo tema en estilos radicalmente distintos, UI de video | — |
| 018 | Cinetic skill launch film | product-ui, code | H | Texto tipeado con chips de componentes de código | synx |
| 019 | Dub promo video | product-ui, charts | H | URL tipeada, pill con glow, globo de partículas con contador | Synous, synx |
| 020 | Animated business explainer | diagrams | H | Pantalla de chat tipeando un prompt largo | — |
| 021 | Shin Majin-shiki promo | kinetic-type | H | Kanji gigante con gota, tipografía vertical | — |
| 022 | TypingMind logo reveal | shapes | H | Malla low-poly que se ensambla en logo | synx |
| 023 | AjustaCV Pro pricing promo | product-ui | H | Cards apiladas, tabla y cifra grande (muestra precios) | Synous |
| 024 | Talking-head clip edit | photos | H | Talking head con stickers, subtítulos y búsqueda UI | — |
| 025 | Reddit marketing tool launch video | product-ui, characters | H | Mascota pixel con partículas | — |
| 026 | Lightspark social promo video | kinetic-type, code | V | Social vertical: tipo grande, grid sutil, claro/oscuro | Aura, Synous, synx |
| 027 | Orange dot motion system | kinetic-type, shapes, music | H | Punto naranja que conecta escenas: toggle, graph spring, halftone | Synous, synx |
| 028 | White ball UI motion loop | product-ui, music | H | Bola blanca recorre toggle, slider, notificaciones, teclado | Synous, synx |
| 029 | Four seasons train window | (sin categoría) | H | Ilustración 2D de tren por estaciones | — |
| 030 | Derivative concept explainer | charts, diagrams | H | Manim, derivadas (chino) | — |
| 031 | Branding agency showreel | kinetic-type, photos | H | Logo asterisco, ASCII, app icon sobre color plano | synx |
| 032 | History of AI timeline | diagrams, kinetic-type, particles | H | Línea de tiempo oscura con partículas | — |
| 033 | Claude motion reel | charts, kinetic-type, particles | H | Curva de easing, TIMING, contador | synx |
| 034 | SuperX feature release teaser | product-ui | H | Teaser con luz rasante y logo | synx |
| 035 | mdfor.dev product intro video | product-ui, code | H | Markdown tipeado a serif, partículas, screenshots descompuestos | Synous, synx |
| 036 | Distilbook motion showreel | product-ui, kinetic-type, particles, music | H | Libro 3D con highlights de texto y blur | Synous |
| 037 | Frame by Frame launch video | product-ui, music | 1:1 | Igual que 011 (formato 1:1) | Aura, Synous, synx |
| 038 | MotionSites one million visitors | product-ui, charts, code | H | Muro 3D de miniaturas en perspectiva + texto | Synous, synx |
| 039 | Drone Emprit showreel | charts, particles | H | Nube de partículas que forma silueta, contador | Synous |
| 040 | Email tool promo reel | product-ui, kinetic-type | H | Wordmark Email gigante con máscara y punto rojo | synx |
| 041 | Ora 2 image model launch film | product-ui, photos, music | 1:1 | Collage de imágenes, caption tipeado, controles glass | Aura |
| 042 | Claude motion design reel | kinetic-type, shapes, particles, music | H | Showreel: bezier, disco naranja, DESIGN con eco | synx |
| 043 | Claude motion design showreel | kinetic-type, shapes, particles | H | Anillos orbitales, flood de color, letras que rotan | synx |
| 044 | Motion techniques showreel | kinetic-type, shapes, particles | H | Halftone que forma POINT, glitch por tiras | synx |
| 045 | Porco Rosso sunset dogfight | (sin categoría) | H | Escena 3D web con avión, serif | — |
| 046 | Pelican riding a bicycle | characters | H | Escena 3D de atardecer con pelícano | — |
| 047 | Overthinking motion study | kinetic-type | V | Vertical: palabras en espiral alrededor de wireframe | Synous |
| 048 | Starry Night cat-spotting game | characters | H | Juego 3D sobre una pintura | — |
| 049 | Beat-synced bouncing 3D ball | music | H | Bola 3D que rebota al beat con luces | — |
| 050 | Distilbook promo showreel | particles | H | Páginas con partículas doradas | — |
| 051 | Jev engineering showreel | product-ui, kinetic-type, music | H | Card terminal sobre halftone rosa, texto grande | Synous, synx |
| 052 | Distilbook motion showreel | shapes, particles | H | Doodles sobre papel con trazos y flechas dibujadas | Synous |
| 053 | Claude motion design showreel | kinetic-type, shapes, particles, music | H | Punto a plano naranja rotado, grid HUD | synx |
| 054 | Motion principles showreel | diagrams, kinetic-type, particles | H | Easing anotado, MOVE con rebote | synx |
| 055 | Food craving launch film | product-ui, kinetic-type, photos, music | H | Composer con glow conic, flood lima, cards, teléfono | Aura, Synous |
| 056 | Psychedelic hypnotic eye showreel | shapes | H | Ojo psicodélico de líneas concéntricas | — |
| 057 | Chaotic Claude POV video | kinetic-type, code | V | Vertical caótico, tipo gigante con ruido | — |
| 058 | Celld job ownership explainer | diagrams | H | Cards neo-brutalistas conectadas por líneas | Synous |
| 059 | Mathematics motion showreel | charts, diagrams | H | Círculo unidad y seno dibujados | — |
| 060 | Motion designer showreel | kinetic-type, particles | H | Línea, ANTICIPATE, OVERSHOOT | synx |
| 061 | DeFi Saver stop-motion explainer | charts, diagrams | H | Stop-motion dibujado sobre papel | — |
| 062 | Lism CSS 1.0 release video | product-ui, code | H | Espiral de Fibonacci dibujada con cuadrados | Synous, synx |
| 063 | Motion designer showreel | charts, kinetic-type, shapes, music | H | Contador, confeti, CLAUDE con sombra desplazada | synx |
| 064 | Particle sphere motion reel | kinetic-type, particles | H | Pelota con curva, MOTION IS ALL TIMING | synx |
| 065 | Easing and morphing showreel | kinetic-type, shapes, music | H | Estrella, disco, CLAUDE (variante de 001) | synx |
| 066 | Claude self-intro motion graphic | kinetic-type, shapes | H | Signo de pregunta, garabato, palabra final | — |
| 067 | AI data centre 3D tour | diagrams | H | Data center isométrico 3D con anotaciones | Synous, synx |
| 068 | What is Git explainer | diagrams, code | H | Explainer Git con voz (chino) | — |
| 069 | Spotify product film | product-ui, music | H | Stage oscuro redondeado, covers, UI de player | Synous |
| 070 | Poster breaking its frame | kinetic-type, shapes, music | H | Póster que rompe su marco, FORM con círculo | synx |
| 071 | DistilBook motion explainer | product-ui, diagrams | H | Nube 3D de páginas con contador | Synous |
| 072 | Motion designer résumé reel | shapes, particles | H | SHOW subrayado, triángulo coral | — |
| 073 | Animated agent session story | characters | H | Escena ilustrada con personaje animado | — |
| 074 | Pixelup Labs studio showreel | product-ui, photos | H | Showreel con pixel, Brands, screenshots con blur | synx |
| 075 | Claude motion reel | kinetic-type, shapes | H | Flood naranja, bloque borroso, INTENT con grid | synx |
| 076 | Browser automation skill launch | product-ui, music, code | H | Hero de README: tipo bold tipeado, cursor con halo | Synous, synx |
| 077 | founder.page launch video | product-ui, charts | H | Logo, input de handle, UI de claim | Aura, Synous |
| 078 | What day is it | kinetic-type, music | H | Caret naranja tipeando japonés | — |
| 079 | Alan agent platform promo | product-ui, diagrams | H | Texto con highlight, embudo/reloj de arena, logo | Synous |
| 080 | Sahi trading terminal reveal | product-ui, phone, charts, particles | H | Punto, ventanas multi-escala con zoom out a punto | Synous, synx |
| 081 | White Russian recipe animation | diagrams | H | Receta con vaso de línea | — |
| 082 | ODATANO Cardano hype edit | kinetic-type, particles | H | Edit hype: SAP/CARDANO con polvo | — |
| 083 | AI Arena product promo | product-ui, code | H | Ícono con anillos y subtítulo | — |
| 084 | Motion design showreel | kinetic-type, shapes | H | MOTION con O roja, grilla de formas geométricas | synx |
| 085 | Replica symmetry breaking whiteboard | diagrams | H | Pizarra con trazo a mano | — |
| 086 | Full Stop figure sequence | shapes, particles | H | Punto a línea, figuras en serif | — |
| 087 | Stock analysis app promo | product-ui, charts | H | Ticker, NEVER con RGB split, screenshot | Aura, Synous |
| 088 | Visual guides library launch | product-ui, diagrams, code | H | Tipo gigante sobre líneas de texto fantasma | Synous, synx |
| 089 | GravityDEX anime hype edit | kinetic-type | V | Anime hype vertical con trazos | — |
| 090 | Whiteboard skill tutorial | product-ui, diagrams | H | Tutorial de pizarra con galerías | — |
| 091 | Moroccan political history timeline | charts, kinetic-type | H | Tipo árabe con cambio de color | — |
| 092 | Kinetic type showreel | kinetic-type, shapes | 1:1 | HI, punto naranja, I CAN SQUASH | synx |
| 093 | Tennis game launch video | product-ui, phone | H | Cifras gigantes sobre foto de cancha | Aura, Synous |
| 094 | Flexprice motion showreel | charts, particles | H | Contador a 1.284.302, anillo 118% | Synous, synx |
| 095 | Tally product demo | product-ui, kinetic-type | H | Marcas de conteo, texto One job. | Aura, Synous |
| 096 | Sherwood agentic hedge fund explainer | product-ui, kinetic-type, photos | H | Texto con acento color sobre glow verde | Synous |
| 097 | Mascot referral program promo | product-ui, characters | H | Mascota 3D con sticker | Aura |
| 098 | Steam new releases news recap | charts | H | Cards numeradas en japonés | — |
| 099 | DistilBook product explainer | product-ui, diagrams | H | PDFs 3D apilados con sello, teclado | Aura, Synous |
| 100 | Morphing UI states loop | product-ui, music | 1:1 | Morph de forma por estados UI en loop | Aura, Synous, synx |
| 101 | Supademo launch video | product-ui, kinetic-type, music | H | Palabra gigante (click/blur/zoom) + hotspot UI | Aura, Synous, synx |
| 102 | Norilu product launch video | product-ui | H | Serif editorial que se escribe línea a línea | Synous |
| 103 | Speech built as architecture | kinetic-type | 1:1 | Tipografía que construye arquitectura | — |
| 104 | Five scroll-based sections | product-ui, photos | H | Secciones scroll: lista + foto editorial | Synous, synx |
| 105 | fal motion design showreel | kinetic-type, photos | H | Tipo con textura líquida sobre oscuro | synx |
| 106 | Trezio app motion reel | product-ui, kinetic-type | H | Cards flotantes 3D alrededor del texto | Aura, Synous |
| 107 | Taxtello bookkeeping app film | product-ui, charts | H | Ícono, dashboard 3D oscuro con oro | Synous, synx |
| 108 | Badge unlock screen animation | product-ui, phone, particles | H | Badge 3D en teléfono con partículas | Aura |
| 109 | Prompting mistakes video tutorial | diagrams | H | Cards con sello MADE IT UP | — |
| 110 | Motion designer portrait showreel | kinetic-type, shapes, particles | V | Retrato: glitch, texto outline, serif itálico | synx |
| 111 | Kinetic type motion showreel | kinetic-type, particles | H | MOTION con disco naranja | synx |
| 112 | Claude motion design showreel | kinetic-type, shapes | H | Curva de rebote, I MAKE THINGS MOVE | synx |
| 113 | Product intro synced to music | product-ui, particles, music | H | Partículas, intro de producto serif | Synous |
| 114 | Website analyzer product promo | product-ui | 1:1 | Input de URL, análisis, card resultado | Aura |
| 115 | Ondefica app motion reel | product-ui, phone, charts, kinetic-type | V | Vertical: flecha gigante que construye el logo | Aura, synx |
| 116 | Second brain service promo | product-ui, code | H | Notas post-it con texto con acento | Aura, Synous |
| 117 | AIsa API key promo | product-ui | H | Naranja DATA, contador 1 a 568 con ruido | Synous, synx |
| 118 | LiteLLM promo reel | diagrams, music, code | H | Código flotante, 100+ LLMs, ONE API | Synous, synx |
| 119 | Chunku product promo | product-ui, kinetic-type | H | Grilla de miniaturas con scan | Aura |
| 120 | AI data centre 3D film | diagrams | H | Data center 3D (variante de 067) | Synous, synx |
| 121 | Bold typographic motion showreel | charts, kinetic-type, shapes | H | MOTI rotando, EVERY FRAME MATTERS, esfera de puntos | synx |
| 122 | Studio1 intro showreel | charts, kinetic-type | H | Terminal a titular grande con acento | Synous, synx |
| 123 | Chuseok pixel night scene | characters | H | Pixel art nocturno | — |
| 124 | Ren app launch video | product-ui, phone, charts | H | Pastillas y confeti de partículas con texto | Aura |
| 125 | Personal research intro reel | kinetic-type, particles, code | H | Terminal, destello, partículas | — |
| 126 | Three.js Skyraider aircraft model | product-ui | H | Modelo 3D three.js con panel | — |
| 127 | UK dubstep track with ASCII visuals | music, code | 1:1 | Live coding de música | — |
| 128 | Anime maid dance showreel | kinetic-type, characters, music | H | Anime con tipo de fondo repetido | — |
| 129 | Paper-style product launch film | charts, diagrams, music | H | Papel claro: bola con onion skin, notas a mano | Aura, Synous, synx |
| 130 | Developer portfolio site showreel | product-ui, music | H | Serif itálico que cambia palabra | Synous |
| 131 | Flowdrive motion showreel | shapes, particles | H | Puntos que forman archivo, barra de progreso | Aura |
| 132 | Pixel wizard crypto animation | characters | H | Pixel art con mago | — |
| 133 | Fiery samurai kata | particles, characters | H | Samurái con fuego | — |
| 134 | FundMyCompute platform overview | product-ui, diagrams | H | Logo pixel desde puntos, luego screenshot web | Synous, synx |
| 135 | Bold Pilot SEO promo | product-ui, charts, kinetic-type | H | Chips de keywords flotantes sobre rojo | Aura, synx |
| 136 | SaaS launch video | product-ui, music | H | Cards de Reddit 3D en perspectiva | Aura, Synous |
| 137 | Step race app promo | product-ui | V | Punto lima, hora grande, texto | — |
| 138 | Type, form, space showreel | kinetic-type, shapes | H | Ficha CV a TYPE con eco | synx |
| 139 | Reflex brand motion reel | kinetic-type, music | H | Ojo halftone, palabra cambia | synx |
| 140 | Sotto reading app explainer | product-ui, phone | H | Texto + página con barras que se llenan | Synous |
| 141 | Animated space cartoon episode | characters | H | Escena espacial cartoon | — |
| 142 | Animated short about a bug | characters, code | H | Corto de personaje frente a monitor | — |
| 143 | Dubz Up motion showreel | product-ui, phone, kinetic-type, characters | H | Texto + barra de progreso, flood naranja | Aura, Synous |
| 144 | Muse connector tracker promo | product-ui | H | Logo, íconos flotantes, texto con acento | Aura, Synous |
| 145 | Fitters Bible app promo | product-ui, phone, diagrams | H | Tipo con chispas, líneas, gráfico azul | Synous |
| 146 | Studio website showreel | product-ui, photos | H | Foto con texto serif que revela | Synous |
| 147 | PicTwin AI app ad | product-ui, photos | V | Teléfono con grilla de selfies + título | Aura |
| 148 | Supasito launch video | product-ui | H | Notificaciones flotando sobre blanco | Aura, Synous |
| 149 | Indian civilisation history film | diagrams | H | Punto, sánscrito, logotipo | — |
| 150 | Anime robot combining sequence | characters | V | Mecha anime 3D | — |
| 151 | YouTube transcript product ad | product-ui, kinetic-type | H | Barra de URL y texto con serif | Aura |
| 152 | Bento.surf product video | product-ui, phone | H | Cards flotando, cifra grande (muestra precios) | Aura |
| 153 | Portfolio motion reel | product-ui, kinetic-type, particles | H | COMPLEX con eco, wipes de color | synx |
| 154 | EyezOn 100 users thank-you | kinetic-type, shapes, music | H | Bezier, one hundred serif, triángulo | synx |
| 155 | Clay-style music video | characters, music | H | Claymation | — |
| 156 | Tengwang Pavilion moonlit river | (sin categoría) | H | Atardecer 3D con ciudad | — |
| 157 | The Last Light animated short | characters | H | Corto espacial | — |
| 158 | Kinetic type and particle showreel | kinetic-type, particles, music | H | Punto, EVERY, with serif itálico | synx |
| 159 | QuickDesign brand promo | product-ui, kinetic-type, music | H | Grilla de ads: One brief. Twelve ads. | Aura |
| 160 | Black hole time story | (sin categoría) | H | Agujero negro, espacio oscuro | — |
| 161 | Claude self-promo spot | product-ui, phone, kinetic-type | H | Formas + teléfono con burbujas de chat | Aura, Synous |
| 162 | DistilBook product explainer | product-ui | H | Documentos cayendo a videos, cards 3D | Aura, Synous |
| 163 | SaaS product launch video | product-ui | H | Francés con acento naranja serif | Synous |
| 164 | Tented image gen product video | product-ui, photos | H | UI con imagen generada insertada en email | Aura |
| 165 | Deliberately terrible motion showreel | characters | H | Parodia de showreel | — |
| 166 | Voice agent SaaS launch | product-ui, charts | H | Card de llamada perdida y texto | Synous |
| 167 | Matra caption app promo | product-ui, phone, photos | V | Logo blur a app, texto | Aura, Synous |
| 168 | Swiss-style motion showreel | kinetic-type, shapes | H | EASE IN/OUT con curva | synx |
| 169 | Quetzal social app reel | product-ui, photos | H | Input a card de imagen | Aura |
| 170 | Motion designer showreel | kinetic-type, shapes, particles, music | H | Línea, MOTION máscara, EMOTION repetido | synx |
| 171 | Claude motion designer showreel | kinetic-type, particles | H | Esfera, flood, EASING | synx |
| 172 | Blue editorial motion showreel | kinetic-type, shapes, music | H | Grilla de cuadrados, frase en capas | synx |
| 173 | Parenting app hype video | product-ui, phone, kinetic-type | V | Vertical: tipo + teléfono + card flotante | Aura, Synous |
| 174 | Kinetic type showreel | kinetic-type, shapes, music | H | Círculos, SHAPE con RGB, RHYTHM glitch | synx |
| 175 | Motion designer showreel | product-ui, phone, charts, kinetic-type | H | Letra con canguro que salta | — |
| 176 | org2html product showreel | product-ui, code | H | Pixel disuelto a código, Write in Org | Synous, synx |
| 177 | Cycle of life animation | characters | H | Ciclo de vida 2D ilustrado | — |
| 178 | Gene Spectra promo | product-ui | H | Matriz de código y serif | Synous |
| 179 | Motion design principles reel | kinetic-type, shapes, particles, music | H | Círculo, Mo, MOTION con glitch | synx |
| 180 | Prompt Motion site promo | product-ui, music | H | UI real de grilla de previews con cursor | — |
| 181 | Photo retouch app promo | product-ui, photos | H | EVERY PHOTO, rostro, teléfono | Aura |
| 182 | Pixel art card battle game | characters | H | Juego de cartas pixel | — |
| 183 | Motion designer showreel | product-ui, charts, kinetic-type | H | Texto portugués y mapa de rutas | Synous |
| 184 | Email verification tool promo | product-ui | H | Tachado de palabra + wipe a UI | Synous |
| 185 | Pixel art LLM history | diagrams, characters | H | Pixel art de historia de LLMs | — |
| 186 | AllInvestView product promo | product-ui, phone, charts | 1:1 | Logos flotando, ETFs., One view | Synous |
| 187 | Nohandslabs brand promo | kinetic-type, particles, code | H | Terminal, línea lima, texto con manita pixel | Synous, synx |
| 188 | Motion designer showreel | kinetic-type, shapes, particles | H | MOTION con curvas, bola con squash, puntos | synx |
| 189 | Claude motion designer showreel | charts, kinetic-type, shapes, music | H | Pelota, MAKE MOVE | synx |
| 190 | Commotion app showreel | product-ui, phone, code | H | Logo comm, tiling de ventanas con cards | Synous, synx |
| 191 | Lidlezz app promo | product-ui | 1:1 | Laptops 3D con texto serif itálico | Synous, synx |
| 192 | Claude motion design reel | kinetic-type, shapes, music | H | Pelota, flood naranja, THINGS outline | synx |
| 193 | Code-only motion design reel | kinetic-type, shapes | H | Disco, MOTION design con radial | synx |
| 194 | Geometric motion designer showreel | kinetic-type, shapes | H | Disco borroso sobre azul, design | synx |
| 195 | Crux motion design showreel | product-ui, charts, kinetic-type, music | H | Pulso ECG, titular, histograma de puntos | Aura, Synous |
| 196 | ocrX app launch video | product-ui | V | Vertical: Stop retyping tachado a app icon | Aura |
| 197 | Motion design showreel | kinetic-type, shapes, particles | H | Bola, I MAKE PIXELS, MOVE con eco | synx |
| 198 | 3D motion design showreel | kinetic-type, shapes, music | H | MOTION con eco rojo repetido | synx |
| 199 | Sketchbook animals come alive | characters | H | Cuaderno con animales | — |
| 200 | Backlink audit data promo | charts, kinetic-type | H | Cifras y cambio de tema oscuro/claro | Aura, Synous |
| 201 | Shadow theatre home story | characters | V | Teatro de sombras vertical | — |
| 202 | Collision-driven music machine | particles, music | H | Máquina musical por colisiones | — |
| 203 | Keyframe motion design reel | kinetic-type, particles, music | H | Línea con handles, MOTION, MEANING | synx |
| 204 | First \u0026 10 yellow line explainer | diagrams | H | Football 3D táctico | — |
| 205 | Photon journey from the Sun | kinetic-type, particles | H | Partículas bokeh, WRONG WAY con glitch | — |
| 206 | Recipe brand 20th anniversary | particles | 1:1 | Aniversario con confeti y rayos | — |
| 207 | GenVizu product launch | product-ui, photos | H | Barra de prompt a imagen | Aura |
| 208 | sweetRegret app update reel | product-ui, phone, characters | V | Update de app vertical, pills, dark mode | Aura, Synous |
| 209 | Handwoven textiles brand explainer | kinetic-type, photos | H | Serif sobre foto de textil | — |
| 210 | Recruiter self-intro reel | charts, kinetic-type, particles | H | Presentación: tipo, flood naranja, foto con texto orbitando | Synous |
| 211 | Amazon wholesale pitch video | product-ui, kinetic-type | H | Logo con glow, YOUR BRAND, card de precio | Synous, synx |
| 212 | Personal skills showreel | product-ui, particles, characters | H | Estética arcade pixel | — |
| 213 | AgentHud project motion video | product-ui, code | H | Líneas con glow y labels por modelo | Synous |
| 214 | CloudJoi search showcase | product-ui, photos | H | Barra de búsqueda con muro de portadas | Synous |
| 215 | Brieform product presentation | product-ui | H | Pregunta + highlighter en frase | Aura, Synous |
| 216 | What happens in one second | kinetic-type, particles | H | Punto a nebulosa de partículas | — |
| 217 | Kinetic type self-portrait | kinetic-type | H | Hi. gigante, I read every word | synx |
| 218 | Chain.wtf pitch video | kinetic-type | H | Botón azul con cursor, foto | — |
| 219 | Motion designer showreel | diagrams, kinetic-type, shapes | H | Abanico de líneas, I MAKE THINGS MOVE con ticker | synx |
| 220 | FigPad product promo | product-ui | H | Pregunta con palabra que cambia | Synous |
| 221 | Shop chatbot mascot promo | characters | V | Escena 3D de mascota | — |
| 222 | Database client launch video | product-ui, code | H | Serif itálico con acento, Open a URL | Synous, synx |
| 223 | Design portfolio video reel | product-ui, phone | H | Logo K a grilla de portfolio | — |
| 224 | Lead Notifi product ad | diagrams, kinetic-type, shapes | H | Punto lima a anillo de puntos, titular | Aura, Synous |
| 225 | Risograph studio intro | diagrams, kinetic-type | H | Disco rosa con Hangul | — |
| 226 | Oscilloscope-style studio motion graphic | charts, kinetic-type | H | Estilo osciloscopio verde | — |
| 227 | Synced lyrics motion video | kinetic-type, music | H | Lyrics sincronizados | — |
| 228 | Kinetic shapes showreel | kinetic-type, shapes, particles | H | Anillos concéntricos, MOVE con ticker | synx |
| 229 | Scrabble tile character story | characters | V | Fichas de Scrabble vertical | — |
| 230 | Ball escaping twelve rings | shapes, music | V | Bola que escapa de anillos vertical | Synous |
| 231 | Token bucket rate limiter | charts, diagrams | 1:1 | Canvas explicativo de token bucket | — |
| 232 | Datagran ChatGPT ads explainer | product-ui, phone, charts | H | Texto con subrayado verde: Be the answer | Synous |
| 233 | Festival lineup promo reel | kinetic-type | V | Vertical: tipo y formas lineales | Aura |
| 234 | Lighthouse keeper silent short | characters | H | Corto sin diálogo | — |
