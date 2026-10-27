# Pruebas reales — synx build

> **Regla:** un caso con nombre propio solo se usa en un reel si figura con `permiso: confirmado`.

## Casos

| Caso | Dato | Origen | Material visual | Permiso |
|---|---|---|---|---|
| **Pilar Sousa** (metafísica y espiritualidad) | Landing de lanzamiento: +6.000 registros, conversión cercana al 50 % | Anexo A.5 (en `contexto/pilar-sousa.md` la cifra figura "sin confirmar") | Proyecto Next.js: `Clientes/Pilar Sousa/Landings/` | `permiso: pendiente` |
| **Aida Qui — Academia** | Antes y después de la landing | Anexo A.5 | `Clientes/Aida Qui/` (4 landings: registro y venta) | `permiso: pendiente` |
| **Daniel Camero** (y Daniel & Talita) | Antes y después de la landing | Anexo A.5 | `resultados/danielcamero-*.jpg` · videos `danielcamero-*.mp4`, `danieltalita-registro.mp4`, `danielytalita-checkout.mp4` | `permiso: pendiente` |
| Ailen Carmejo | Landing de venta | — | `resultados/ailencamejo-ventas.jpg` · video `ailencamejo.mp4` | `permiso: pendiente` |
| Alex Morales | Landing de captura | — | `resultados/alex.jpg` | `permiso: pendiente` |
| Cielo Rogora | Landing de venta (La Biblia Pastelera) | — | `resultados/cielo.jpg` | `permiso: pendiente` |
| Morgan Freeman (marca "mf") | Landing | — | `resultados/morganfreeman.jpg` | `permiso: pendiente` |
| Santiago Gómez (Consciencia MCE) | Landing de VSL (3 versiones) | — | `resultados/santiago*.jpg` | `permiso: pendiente` |
| Manuela Zuluaga | Landing en producción: landing-omega-one-60.vercel.app | — | — | `permiso: pendiente` |

**Métricas reales:** fuera del dato de Pilar Sousa, no se encontró ninguna cifra de conversión ni de ventas en la carpeta de la marca.

## Material

- **Piezas de resultado (mockups):** `assets/synx/imagenes/resultados/` (11 JPG, copiados de `Negocio/Redes sociales/Resultados/`).
- **Videos de las landings funcionando (scroll):** quedan en origen, no se copiaron (son unos 185 MB). Están en `D:\Laureano\Desktop\1. Synx Build\Negocio\Resultados - Landing pages\1776828049758\`:
  - ailencamejo.mp4
  - danielcamero-checkout-2.mp4
  - danielcamero-registro.mp4
  - danielcamero-retiro.mp4
  - danielkcamero-operacionpuntociego.mp4
  - danieltalita-registro.mp4
  - danielytalita-checkout.mp4
  - landing-serviciios.mp4 *(la propia)*
  - laureano.mp4 *(la propia)*

  Cuando un reel use uno, se copia a `assets/media/` de ese reel.
- **Testimonios:** hay carpetas en `Clientes/Alex Morales/Testimonios/` y `Clientes/Lucas Foscaldi/Testimonios/`. **No se copiaron**: son capturas con datos personales de terceros.

## ⚠️ Antes de usar cualquier pieza

1. **Permiso del cliente**, que hoy está pendiente en todos los casos.
2. **Precios.** Varias landings muestran el precio del programa del cliente (por ejemplo, "$897 USD" en `danielcamero-ventas`). En el reel se desenfocan o se recortan.
3. **Marca vieja.** Las piezas de resultados llevan el logo anterior, "laureano sierra · web design". Para un reel de synx build se rehace el marco con el logo actual o se recorta el encabezado.
4. **Casos ajenos.** Las landings de clientes de Pilar Sousa las desarrolla Bruno, y la de Mariela Crappuzi, Cielo. Son trabajo del equipo y se presentan como trabajo del equipo ("construimos").
