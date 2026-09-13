// Animated signal-trace background for the hero.
// Draws layered waveforms reminiscent of load-forecasting / signal curves.
// Cheap: single canvas, requestAnimationFrame, pauses when hidden or reduced-motion.
(function () {
  function initHeroCanvas() {
    var canvas = document.querySelector(".hero-canvas");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var width = 0, height = 0;
    var pointerX = 0.5, pointerY = 0.5;
    var targetPointerX = 0.5, targetPointerY = 0.5;
    var t = 0;
    var rafId = null;
    var visible = true;

    var layers = [
      { amp: 0.09, freq: 1.6, speed: 0.10, phase: 0.0, color: "255, 122, 26", width: 2, alpha: 0.6, y: 0.66, dots: true },
      { amp: 0.055, freq: 2.4, speed: -0.07, phase: 1.4, color: "79, 184, 201", width: 1.25, alpha: 0.4, y: 0.38, dots: false },
      { amp: 0.04, freq: 3.1, speed: 0.05, phase: 3.1, color: "243, 241, 234", width: 1, alpha: 0.16, y: 0.78, dots: false }
    ];

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawLayer(layer, elapsed) {
      var pointsX = [];
      var pointsY = [];
      var steps = Math.max(40, Math.floor(width / 14));
      var driftY = (pointerY - 0.5) * 22;
      var driftAmp = 1 + (pointerX - 0.5) * 0.35;

      ctx.beginPath();
      for (var i = 0; i <= steps; i++) {
        var xNorm = i / steps;
        var x = xNorm * width;
        var y =
          layer.y * height +
          driftY * (layer.dots ? 1 : 0.4) +
          Math.sin(xNorm * Math.PI * 2 * layer.freq + elapsed * layer.speed + layer.phase) *
            layer.amp * driftAmp * height;
        pointsX.push(x);
        pointsY.push(y);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(" + layer.color + ", " + layer.alpha + ")";
      ctx.lineWidth = layer.width;
      ctx.lineJoin = "round";
      ctx.stroke();

      if (layer.dots) {
        for (var d = 4; d < steps; d += 9) {
          ctx.beginPath();
          ctx.arc(pointsX[d], pointsY[d], 2.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + layer.color + ", " + (layer.alpha * 0.9) + ")";
          ctx.fill();
        }
      }
    }

    function frame() {
      if (!visible) return;
      t += 1;
      pointerX += (targetPointerX - pointerX) * 0.04;
      pointerY += (targetPointerY - pointerY) * 0.04;

      ctx.clearRect(0, 0, width, height);
      var elapsed = t * 0.016;
      for (var i = 0; i < layers.length; i++) drawLayer(layers[i], elapsed);

      if (!reduceMotion) rafId = requestAnimationFrame(frame);
    }

    function onPointerMove(e) {
      var rect = canvas.parentElement.getBoundingClientRect();
      targetPointerX = (e.clientX - rect.left) / rect.width;
      targetPointerY = (e.clientY - rect.top) / rect.height;
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", function () {
      visible = !document.hidden;
      if (visible && !reduceMotion && !rafId) frame();
    });

    resize();
    if (reduceMotion) {
      frame();
    } else {
      frame();
    }
  }

  document.addEventListener("DOMContentLoaded", initHeroCanvas);
})();
