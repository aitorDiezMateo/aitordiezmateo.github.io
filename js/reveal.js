// Subtle entrance animation for elements with the `.reveal` class.
// No-op if the user prefers reduced motion or IntersectionObserver is unavailable.
(function () {
  function initReveal() {
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = document.querySelectorAll(".reveal:not(.reveal-visible)");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("reveal-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) { observer.observe(el); });
  }

  window.initReveal = initReveal;
  document.addEventListener("DOMContentLoaded", initReveal);
})();
