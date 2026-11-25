(function () {
  "use strict";

  var playStoreAppUrl = "market://details?id=com.jeluchu.laarroba";
  var playStoreWebUrl = "https://play.google.com/store/apps/details?id=com.jeluchu.laarroba";
  var appStoreUrl = "https://apps.apple.com/es/app/la-arroba-comercio-y-usuarios/id1570044504";
  var websiteUrl = "https://www.laelipasiqueflipa.com/";
  var host = "www.laelipasiqueflipa.com";
  var packageName = "com.jeluchu.laarroba";
  var userAgent = navigator.userAgent || "";
  var isAndroid = /Android/i.test(userAgent);
  var isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent)
    || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);
  var status = document.getElementById("app-redirect-status");
  var primaryLink = document.getElementById("app-primary-link");
  var googleLink = document.getElementById("app-google-link");
  var appleLink = document.getElementById("app-apple-link");

  if (googleLink) googleLink.href = playStoreWebUrl;
  if (appleLink) appleLink.href = appStoreUrl;

  // The link being opened: the page's own path, or the one a 404 handed over in ?to= (e.g. /comercios/<tienda>).
  function targetPath() {
    var requested = new URLSearchParams(window.location.search).get("to") || window.location.pathname;
    return /^\/(app|comercios|invitacion)(\/[A-Za-z0-9._~-]*)*$/.test(requested) ? requested : "/app";
  }

  // On Android an intent URL opens the app on that very path when it is installed and, when it is not,
  // falls back to its Play Store page. A page cannot tell whether the app is installed, so this is the way.
  function androidIntentUrl(path) {
    return "intent://" + host + path + "#Intent;scheme=https;package=" + packageName
      + ";S.browser_fallback_url=" + encodeURIComponent(playStoreWebUrl) + ";end";
  }

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  if (isAndroid) {
    var intentUrl = androidIntentUrl(targetPath());
    setStatus("Abriendo La Arroba…");
    if (primaryLink) primaryLink.href = intentUrl;
    window.location.replace(intentUrl);
    window.setTimeout(function () {
      if (document.visibilityState === "visible") {
        setStatus("Si no se ha abierto, instálala desde Google Play.");
        window.location.replace(playStoreAppUrl);
      }
    }, 1500);
    return;
  }

  if (isAppleMobile) {
    setStatus("Abriendo App Store…");
    if (primaryLink) primaryLink.href = appStoreUrl;
    window.location.replace(appStoreUrl);
    return;
  }

  setStatus("Continúa desde la web…");
  if (primaryLink) primaryLink.href = websiteUrl;
  window.location.replace(websiteUrl);
})();
