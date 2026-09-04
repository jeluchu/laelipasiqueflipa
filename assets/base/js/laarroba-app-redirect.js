(function () {
  "use strict";

  var playStoreAppUrl = "market://details?id=com.jeluchu.laarroba";
  var playStoreWebUrl = "https://play.google.com/store/apps/details?id=com.jeluchu.laarroba";
  var appStoreUrl = "https://apps.apple.com/es/app/la-arroba-comercio-y-usuarios/id1570044504";
  var websiteUrl = "https://www.laelipasiqueflipa.com/";
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

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  if (isAndroid) {
    setStatus("Abriendo Google Play…");
    if (primaryLink) primaryLink.href = playStoreWebUrl;
    window.location.replace(playStoreAppUrl);
    window.setTimeout(function () {
      if (document.visibilityState === "visible") window.location.replace(playStoreWebUrl);
    }, 1200);
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
