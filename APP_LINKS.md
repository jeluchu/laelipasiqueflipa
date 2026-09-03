# Enlace inteligente de la aplicación

La URL pública de descarga y apertura de La Arroba es:

```text
https://www.laelipasiqueflipa.com/app
```

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
