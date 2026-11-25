# Enlace inteligente de la aplicación

La URL pública de descarga y apertura de La Arroba es:

```text
https://www.laelipasiqueflipa.com/app
https://www.laelipasiqueflipa.com/app/cuenta
https://www.laelipasiqueflipa.com/app/cine-verano
https://www.laelipasiqueflipa.com/app/fiestas
https://www.laelipasiqueflipa.com/app/stickers
https://www.laelipasiqueflipa.com/app/cultura
https://www.laelipasiqueflipa.com/comercios/<tienda>
```

`/comercios/<tienda>` es el enlace que genera la aplicación al compartir una
tienda. GitHub Pages no tiene una página por tienda, así que `404.html` envía
cualquier `/comercios/...` al enlace inteligente (`/app/?to=<ruta>`), y
`comercios/index.html` cubre `/comercios`. En Android el enlace inteligente
intenta abrir la app en esa misma ruta y, si no está instalada, cae a Google
Play. Con la app instalada, Android App Links e iOS Universal Links abren la
tienda directamente sin pasar por la web.

Los enlaces de destino abren directamente Cine de verano, la programación de
las fiestas, los stickers de Elipón, la agenda cultural de Ciudad Lineal o la pantalla de cuenta cuando la aplicación está instalada. Sin la aplicación se
mantiene la derivación a la tienda correspondiente y desde escritorio se
redirige a la portada web.

`/app/cuenta` debe interpretarse en la aplicación como una intención de acceso
a la cuenta: mostrar la pantalla que permite iniciar sesión o registrarse.
La futura solicitud de alta de una tienda debería tener una ruta distinta,
por ejemplo `/app/comercio/nueva`, para abrir directamente ese formulario sin
confundirlo con el acceso de usuarios o comercios existentes.

El comportamiento esperado es:

- Android con la app instalada: Android App Links abre La Arroba.
- iPhone/iPad con la app instalada: Universal Links abre La Arroba.
- Android sin la app: la página estática redirige a Google Play.
- iPhone/iPad sin la app: la página estática redirige a App Store.
- Escritorio: la página estática redirige a la portada del sitio.

Los ficheros de `/.well-known` se sirven desde este mismo repositorio de
GitHub Pages. No se usa PHP ni `.htaccess` para este enlace.

## Publicación

1. Mantener `CNAME` con `www.laelipasiqueflipa.com`.
2. Publicar `app/index.html` y los dos ficheros de `.well-known`.
3. Añadir la huella SHA-256 de Google Play App Signing a
   `.well-known/assetlinks.json` si no coincide con la huella de release local.
4. Comprobar que las siguientes URL responden por HTTPS:

   - `https://www.laelipasiqueflipa.com/app`
   - `https://www.laelipasiqueflipa.com/.well-known/assetlinks.json`
   - `https://www.laelipasiqueflipa.com/.well-known/apple-app-site-association`

La asociación nativa debe validarse en dispositivos físicos con las
aplicaciones instaladas. La redirección de la página solo se ejecuta cuando el
sistema operativo no ha entregado el enlace a la aplicación.

## Invitaciones de alta para comercios

`https://www.laelipasiqueflipa.com/invitacion/<token>` es el enlace de un solo uso que una persona
administradora genera desde la app para un comercio sin asignar. El token tiene 32 caracteres
(`A-Z a-z 0-9 - _`). Igual que `/comercios/...`, no hay página estática: `404.html` lo manda al
enlace inteligente (`/app/?to=<ruta>`), que abre la app en esa ruta o lleva a la tienda de apps.
En Android el filtro del manifiesto cubre `/invitacion`, y en iOS el AASA incluye `/invitacion/*`.
