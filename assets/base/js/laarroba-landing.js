(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.getElementById("main-nav");
  var backToTop = document.getElementById("back-to-top");
  var currentYear = document.getElementById("current-year");

  function updateScrollState() {
    var hasScrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", hasScrolled);
    if (backToTop) {
      var isBackToTopVisible = window.scrollY > 560;
      backToTop.classList.toggle("is-visible", isBackToTopVisible);
      backToTop.setAttribute("aria-hidden", String(!isBackToTopVisible));
      backToTop.tabIndex = isBackToTopVisible ? 0 : -1;
    }
  }

  function syncMenuAccessibility() {
    if (!menuToggle || !mainNav) return;
    var isMobile = window.matchMedia && window.matchMedia("(max-width: 820px)").matches;
    var isOpen = menuToggle.classList.contains("is-open");
    var isHidden = isMobile && !isOpen;
    mainNav.setAttribute("aria-hidden", String(isHidden));
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.tabIndex = isHidden ? -1 : 0;
    });
  }

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-is-open");
    syncMenuAccessibility();
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      mainNav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("menu-is-open", isOpen);
      syncMenuAccessibility();
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", syncMenuAccessibility);
    syncMenuAccessibility();
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  var smartDownloadLinks = document.querySelectorAll("[data-smart-download]");
  var userAgent = navigator.userAgent || "";
  var isMobileDevice = /Android|iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);

  if (isMobileDevice) {
    smartDownloadLinks.forEach(function (link) {
      link.href = "https://www.laelipasiqueflipa.com/app";
    });
  }

  var navLinks = mainNav ? mainNav.querySelectorAll("a[href^='#']") : [];
  var navSections = [];

  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  navLinks.forEach(function (link) {
    var section = document.getElementById(link.getAttribute("href").slice(1));
    if (!section) return;
    navSections.push(section);
    link.addEventListener("click", function () {
      setActiveNav(section.id);
      closeMenu();
    });
  });

  if (navSections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { threshold: 0, rootMargin: "-30% 0px -58%" });
    navSections.forEach(function (section) { navObserver.observe(section); });
  }

  var faqList = document.querySelector(".faq-list");
  var faqItems = document.querySelectorAll(".faq-item");
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var faqAnimationDuration = reducedMotion ? 0 : 380;

  if (faqList && faqItems.length) {
    faqItems.forEach(function (item) {
      var answer = item.querySelector(".faq-answer");
      if (item.open && answer) answer.style.maxHeight = answer.scrollHeight + "px";
    });

    faqList.classList.add("is-animated");

    faqItems.forEach(function (item) {
      var summary = item.querySelector("summary");
      var answer = item.querySelector(".faq-answer");
      if (!summary || !answer) return;

      summary.addEventListener("click", function (event) {
        event.preventDefault();

        if (item.classList.contains("is-closing")) {
          window.clearTimeout(item.faqCloseTimer);
          window.cancelAnimationFrame(item.faqAnimationFrame);
          item.classList.remove("is-closing");
          answer.style.maxHeight = answer.scrollHeight + "px";
          return;
        }

        if (!item.open) {
          item.open = true;
          answer.style.maxHeight = "0px";
          item.faqAnimationFrame = window.requestAnimationFrame(function () {
            answer.style.maxHeight = answer.scrollHeight + "px";
          });
          return;
        }

        if (!faqAnimationDuration) {
          item.open = false;
          answer.style.removeProperty("max-height");
          return;
        }

        item.classList.add("is-closing");
        item.faqAnimationFrame = window.requestAnimationFrame(function () {
          answer.style.maxHeight = "0px";
        });
        item.faqCloseTimer = window.setTimeout(function () {
          item.open = false;
          item.classList.remove("is-closing");
          answer.style.removeProperty("max-height");
        }, faqAnimationDuration);
      });
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  var featureData = {
    shops: {
      image: "assets/base/img/laarroba/shop-discovery.webp",
      alt: "Elipón junto a un comercio local",
      index: "01 / 04",
      caption: "Descubre comercios cercanos y sus ofertas puntuales."
    },
    events: {
      image: "assets/base/img/laarroba/community-optimized.jpg",
      alt: "Elipón en una actividad del barrio",
      index: "02 / 04",
      caption: "Sé la primera persona en enterarte de las iniciativas del barrio."
    },
    elipis: {
      image: "assets/base/img/laarroba/elipis.webp",
      alt: "Elipis de La Arroba junto al dragón de La Elipa",
      index: "03 / 04",
      caption: "Acumula Elipis por consumir local y consigue regalos y ventajas."
    },
    community: {
      image: "assets/base/img/laarroba/shop-story-optimized.jpg",
      alt: "Comercio participante de La Arroba",
      index: "04 / 04",
      caption: "Forma parte de una comunidad que hace barrio cada día."
    }
  };

  var featureImage = document.getElementById("feature-image");
  var featureIndex = document.getElementById("feature-index");
  var featureCaption = document.getElementById("feature-caption");
  var featureTabs = document.querySelectorAll(".feature-tab");
  var featureShowcase = featureImage ? featureImage.closest(".feature-showcase") : null;
  var featureSwapTimer = null;
  var featureRequestId = 0;

  featureTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var feature = featureData[tab.getAttribute("data-feature")];
      if (!feature || !featureImage) return;

      featureTabs.forEach(function (item) {
        var isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      if (featureSwapTimer) window.clearTimeout(featureSwapTimer);
      featureImage.classList.add("is-swapping");
      if (featureShowcase) featureShowcase.setAttribute("aria-busy", "true");

      var requestId = ++featureRequestId;
      var nextImage = new Image();
      var applyFeature = function () {
        if (requestId !== featureRequestId) return;
        featureImage.src = feature.image;
        featureImage.alt = feature.alt;
        featureIndex.textContent = feature.index;
        featureCaption.textContent = feature.caption;
        featureImage.classList.remove("is-swapping");
        if (featureShowcase) featureShowcase.removeAttribute("aria-busy");
      };

      nextImage.onload = applyFeature;
      nextImage.onerror = applyFeature;
      nextImage.src = feature.image;

      featureSwapTimer = window.setTimeout(function () {
        if (featureImage.classList.contains("is-swapping")) applyFeature();
      }, 700);
    });
  });
})();
