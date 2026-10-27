# Perfil — Aura Studio

> Fuentes:
> - la carpeta de la marca, `D:\Laureano\Desktop\3. Aura Studio™` (app y carpeta Negocio), leída el 2026-10-27;
> - el reposicionamiento que pidió Laureano ese mismo día.
>
> Lo que figura como **PROPUESTA** sale de mí y espera confirmación.

| Campo | Valor |
|---|---|
| Slug | `aura` |
| Nombre | **Aura Studio™** (el logotipo va en minúscula: "aura studio") |
| Instagram | **@ai.aurastudio** |
| TikTok | @aurastudioai |
| LinkedIn | linkedin.com/in/aura-studio-ai |
| Web | aurastudio.com.ar |
| Qué es | Plataforma web que toma la **URL de una marca o un producto** y genera **creativos de anuncios fieles a esa marca**. Saca el logo, los colores y las tipografías, arma ángulos de venta y perfiles de cliente, y entrega imágenes listas para Meta Ads en el formato que se pida (4:5, 1:1, 9:16…). |

## Posicionamiento (desde el 2026-10-27)

**Antes (la landing actual).** Promete "creativos para anuncios listos para vender, en minutos". Le habla al emprendedor que pauta solo y le ofrece "dejar de depender de diseñadores".

**Ahora.** Aura es **el estudio creativo con IA de quienes hacen creativos para otros**: diseñadores, agencias creativas y agencias de marketing. Funciona como **una fábrica de creativos que respeta la marca de cada cliente**:

- un workspace por cliente;
- el kit de marca sale de la URL;
- volumen de variaciones para testear, sin perder la identidad.

La marca que pauta por su cuenta sigue siendo público.

**Referencias de posicionamiento:**

- **Higgsfield Marketing Studio.** Dice "Turn any product into ready to post content" y ordena sus plantillas por tipo: product shot, UGC, ads.
- **Limora.** Dice "On-brand assets, generated in minutes" y "Designed. Not Generated.", con un solo kit de marca para todo.

**Frase de trabajo (PROPUESTA):** "Tu fábrica de creativos, fiel a cada marca."

> ⚠️ **Choque con la landing actual.** El subtítulo de la landing dice "sin depender de diseñadores". Si ahora el público son diseñadores y agencias, en los reels **Aura nunca reemplaza al diseñador: lo multiplica.** Habría que alinear la landing, pero eso queda fuera de este estudio.

## Qué se puede prometer y qué no (regla dura)

Verificado en el código de la app el 2026-10-27, con el repo actualizado al commit `514ee4b`. El detalle y las rutas están en `contexto-app.md`.

| ✅ Se puede mostrar o prometer (ya funciona para los usuarios) | ✅ Por API o MCP (Laureano confirmó el 2026-10-27 que está activo en producción) | ⛔ Ningún reel lo promete todavía |
|---|---|---|
| Pegar una URL y que la app saque la marca (logo, colores, tipografías) | **Imagen y video** con el conector **@AuraStudio** en Claude Code o Cursor, usando API Key | **Video dentro de la app** (sigue en "Coming Soon") |
| Creativos en imagen, fieles a la marca, en varios formatos | **UGC por MCP**: 30 modos, con borrador gratis y generación paga | **UGC Studio, avatares y Aura Canvas en la app** (solo admin) |
| Ángulos de venta y perfiles de cliente (ICP) | API REST de imagen y video, con pago por uso | **Publicar** en Meta, TikTok o LinkedIn Ads, publicación orgánica y calendario (solo admin; Meta sin App Review; TikTok en privado) |
| Varios workspaces (uno por cliente), según el plan | | Conectarse desde Claude.ai, ChatGPT o Gemini (el portal dice "próximamente") |
| Galería de referencias (planes pagos) | | Funnels o sitios generados · UGC por REST (no existe) |
| Plan gratis: **3 créditos sin tarjeta** · 1 crédito = 1 imagen · créditos compartidos entre la app y el MCP | | "Anuncios ganadores" garantizados, ventas, ROAS · "detecta ganadores" |
| | | Cifras sin respaldo: 27.000 creadores, 4,9/5, 135+ usuarios, +10.000 anuncios |

**La visión ya está construida.** La fábrica de creativos (imagen, video, UGC, canvas y publicación automática) existe en el código, siguiendo el modelo de Higgsfield (`docs/developer-platform/HIGGSFIELD_*.md`). Pero casi todo está **cerrado para admin**. El reel cuenta cada pieza **a medida que se abre a usuarios**.

Cuando se libere algo (cambio de rol, `CANVAS_PUBLIC=true`, App Review de Meta, `TIKTOK_APP_AUDITED=true`):

1. actualizar esta tabla y `contexto-app.md`;
2. recién entonces, producir reels sobre eso.

**Ángulo con potencial:** "Aura dentro de tu asistente de IA" (@AuraStudio en Claude Code o Cursor). Limora también lo usa ("Generate on-brand assets inside your AI tools"), y a diseñadores y agencias les interesa. **Está activo.**

Reglas para estos reels:

- **Decir siempre por dónde se hace.** Si el reel muestra video o UGC, aclara que es "con @AuraStudio en Claude Code o Cursor". Nunca puede dar a entender que está dentro de la app.
- **Solo material de Aura.** Lo que se muestra se genera con Aura (grabación real del MCP y su salida). Nunca se usan los videos de ejemplo de Higgsfield.

## Oferta principal

- **Planes:** Free, Starter, Growth y Scale. Cambian en la cantidad de créditos y de workspaces (`plans.config.js`).
- **Pago:** único, sin mensualidad ("Sin mensualidades. Sin compromisos.").
- **Puerta de entrada:** probarlo gratis, con 3 créditos y sin tarjeta.

> **Nunca mostrar precios en un reel.**

## Tono de voz

**Hoy, en la landing y en las campañas de abril.** El tono es:

- directo, urgente y competitivo, en voseo;
- con comparaciones de todos los días ("en lo que tardás en cebarte un mate");
- con miedo a que la competencia te gane.

**Para el público nuevo (PROPUESTA).**

- Se mantiene: lo directo, el voseo y las comparaciones cotidianas.
- Se baja: el miedo y la exageración.
- Por qué: el diseñador y la agencia compran criterio y margen, no "imperios".

**3 adjetivos:** directo · productivo · con criterio.

**3 cosas que nunca decimos:**

1. "Reemplazá a tu diseñador" o "sin diseñadores".
2. "Anuncios ganadores garantizados", "campaña millonaria" o "imperio de anuncios".
3. Cualquier función que todavía no está abierta a los usuarios (video, UGC, avatares) contada como si ya existiera.

**Palabras propias:**

- volumen creativo · capacidad creativa;
- ángulo · variaciones · testear;
- fiel a la marca · kit de marca;
- workspace / cliente;
- "pegá tu link" · "gana quien testea más".

**Palabras a evitar:**

- imperio · millonaria · mágico · garantizado;
- "ganador" usado como promesa;
- "tu competencia te va a sacar del mercado";
- "slop" (es la palabra de Limora);
- "próximamente" para funciones sin fecha.

## Frases de marca

| Frase | Origen |
|---|---|
| "En Meta Ads gana quien testea más, no quien tiene la mejor idea." | landing |
| "El problema no es la falta de ideas… es la falta de volumen para probarlas." | landing |
| "Esto no es diseño automático. Es creatividad orientada a conversión." | landing |
| "Menos estética vacía. Más anuncios que venden." | landing |
| "Human Touch, AI Powered." | piezas de la web |

## Pilares y códigos (PROPUESTA)

| Código | Pilar | De qué trata |
|---|---|---|
| `V-` | Volumen | Gana quien testea más: variaciones, formatos y ritmo de testeo. |
| `M-` | Marca | Respetar la marca: de la URL al kit de marca, frente a la IA genérica que no respeta logos ni colores. |
| `E-` | Estrategia | El ángulo antes que la estética: ángulos de venta, perfiles de cliente y referencias que funcionan. |
| `P-` | Producto por dentro | Demos reales de la app: pegar el link, el kit de marca, la grilla de creativos. |
| `A-` | Agencias | El trabajo con varios clientes: un workspace por cliente, más entregas sin más horas. |

## Mascota

Un robot de cara negra con ojos rojos y un hoodie rojo camuflado con el logo (`assets/aura/imagenes/mascota/mascota.png`).

Hace de guía o presentador: entra y señala. Nunca tapa el producto ni el texto clave.

## Relación con las otras marcas

- `TODO:` confirmar si Aura es un producto propio de Laureano y si puede aparecer como caso en la marca personal.
- Los públicos son distintos. Aura le habla a diseñadores y agencias, y la marca personal **nunca** le habla a diseñadores, así que los temas no se cruzan.
