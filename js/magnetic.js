// Subtle magnetic pull for buttons on pointer-capable devices.
// Transform-only, capped displacement, no-op under reduced motion or touch.
(function () {
  function initMagnetic() {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return;

    var els = document.querySelectorAll(".magnetic");
    var strength = 0.28;
    var maxOffset = 10;

    els.forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - (rect.left + rect.width / 2);
        var relY = e.clientY - (rect.top + rect.height / 2);
        var offsetX = Math.max(-maxOffset, Math.min(maxOffset, relX * strength));
        var offsetY = Math.max(-maxOffset, Math.min(maxOffset, relY * strength));
        el.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initMagnetic);
})();
