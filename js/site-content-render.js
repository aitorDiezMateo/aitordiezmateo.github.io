// Injects copy from js/site-content.js into the DOM.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (!window.SITE_CONTENT) return;

    var heroDesc = document.getElementById("hero-desc");
    if (heroDesc && window.SITE_CONTENT.hero && window.SITE_CONTENT.hero.description) {
      heroDesc.textContent = window.SITE_CONTENT.hero.description;
    }
  });
})();
