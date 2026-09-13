// Nav goes solid once the user scrolls past the hero's top edge.
// Mobile menu auto-closes on link tap. Uses IntersectionObserver, no scroll listener.
//
// Anchor scrolling is handled manually rather than relying on the browser's native
// fragment-scroll + CSS scroll-margin-top: in testing, native fragment navigation
// landed targets only ~4px below the fixed nav regardless of scroll-margin-top or
// scroll-behavior settings, visually hugging/overlapping the navbar. Computing and
// applying the offset ourselves is deterministic and reproducible everywhere.
(function () {
  function navHeight() {
    var nav = document.querySelector("nav");
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  // offsetTop reflects an element's position in normal layout flow and, unlike
  // getBoundingClientRect(), is unaffected by CSS transforms/transitions. This
  // matters because reveal-on-scroll sections start at transform:
  // translateY(20px) until an IntersectionObserver marks them visible, and that
  // transform animates out over 640ms. Measuring via getBoundingClientRect()
  // (even right after forcing the reveal class) can capture a mid-transition
  // position, so the resting position ends up ~20px closer to the nav than
  // intended once the transition finishes. Walking offsetTop/offsetParent
  // instead always reflects the final resting position, regardless of any
  // in-flight animation.
  function documentTop(el) {
    var top = 0;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  }

  function scrollOffsetFor(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    if (el.classList.contains("reveal")) el.classList.add("reveal-visible");
    var pad = 24;
    var top = documentTop(el) - (navHeight() + pad);
    return Math.max(0, top);
  }

  function scrollToId(id, smooth) {
    var top = scrollOffsetFor(id);
    if (top === null) return false;
    window.scrollTo({ top: top, behavior: smooth ? "smooth" : "auto" });
    return true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector("nav");
    var sentinel = document.getElementById("hero-sentinel");
    if (nav && sentinel && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            nav.classList.toggle("nav-solid", !entry.isIntersecting);
          });
        },
        { rootMargin: "-1px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(sentinel);
    }

    var toggle = document.getElementById("nav-toggle");
    var menuLinks = document.querySelectorAll(".nav-menu a");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (toggle) toggle.checked = false;
      });
    });

    var hashLinks = document.querySelectorAll('a[href^="#"]');
    hashLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        if (!id || !document.getElementById(id)) return;
        e.preventDefault();
        scrollToId(id, true);
        if (history.pushState) history.pushState(null, "", "#" + id);
      });
    });

    if (location.hash) {
      var initialId = location.hash.slice(1);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          scrollToId(initialId, false);
        });
      });
    }

    window.addEventListener("hashchange", function () {
      var id = location.hash.slice(1);
      if (id) scrollToId(id, true);
    });
  });
})();
