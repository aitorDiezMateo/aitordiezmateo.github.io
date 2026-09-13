// Renders an editorial project list from window.PROJECTS (see js/projects-data.js).
// Hovering / focusing / tapping a row updates a shared preview panel: either the
// project's real image, or a deterministic generated signal-pattern unique to it.
(function () {
  function hashString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function drawPattern(canvas, seedStr) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    var width = rect.width, height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    var seed = hashString(seedStr);
    var rand = function (n) { return ((seed * (n + 7)) % 97) / 97; };

    var colors = [
      "255, 122, 26",
      "79, 184, 201",
      "243, 241, 234"
    ];

    for (var layer = 0; layer < 3; layer++) {
      var freq = 1.2 + rand(layer * 3 + 1) * 2.6;
      var amp = (0.12 + rand(layer * 5 + 2) * 0.16) * height;
      var phase = rand(layer * 11 + 3) * Math.PI * 2;
      var yBase = height * (0.3 + layer * 0.22);
      var alpha = layer === 0 ? 0.9 : 0.35;
      var lw = layer === 0 ? 2 : 1;

      ctx.beginPath();
      var steps = 64;
      for (var i = 0; i <= steps; i++) {
        var xNorm = i / steps;
        var x = xNorm * width;
        var y = yBase + Math.sin(xNorm * Math.PI * 2 * freq + phase) * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(" + colors[layer % colors.length] + ", " + alpha + ")";
      ctx.lineWidth = lw;
      ctx.stroke();

      if (layer === 0) {
        for (var d = 3; d < steps; d += 8) {
          var xn = d / steps;
          var px = xn * width;
          var py = yBase + Math.sin(xn * Math.PI * 2 * freq + phase) * amp;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + colors[0] + ", 0.9)";
          ctx.fill();
        }
      }
    }
  }

  function createTag(text) {
    var span = document.createElement("span");
    span.className = "tech-tag";
    span.textContent = text;
    return span;
  }

  function createRow(project, index, total, onActivate) {
    var row = document.createElement("article");
    row.className = "project-row";
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-label", "Preview " + project.name);

    var idx = document.createElement("span");
    idx.className = "project-index";
    idx.textContent = pad(index + 1);
    row.appendChild(idx);

    var main = document.createElement("div");
    main.className = "project-row-main";

    var title = document.createElement("h3");
    title.className = "project-name";
    title.textContent = project.name;
    main.appendChild(title);

    if (project.tags && project.tags.length) {
      var tagRow = document.createElement("div");
      tagRow.className = "project-tags";
      project.tags.forEach(function (tag) {
        tagRow.appendChild(createTag(tag));
      });
      main.appendChild(tagRow);
    }
    row.appendChild(main);

    var desc = document.createElement("p");
    desc.className = "project-row-desc";
    desc.textContent = project.description;
    row.appendChild(desc);

    var arrow = document.createElement("span");
    arrow.className = "project-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    row.appendChild(arrow);

    function activate() { onActivate(project, index, total); }

    row.addEventListener("mouseenter", activate);
    row.addEventListener("focus", activate);
    row.addEventListener("click", function () {
      activate();
      var preview = document.getElementById("projects-preview");
      if (preview) {
        var rect = preview.getBoundingClientRect();
        var offscreen = rect.top < 0 || rect.top > window.innerHeight * 0.5;
        if (offscreen) preview.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    return row;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("projects-list");
    if (!list || !window.PROJECTS) return;

    var previewEl = document.getElementById("projects-preview");
    var canvas = document.getElementById("preview-canvas");
    var image = document.getElementById("preview-image");
    var indexEl = document.getElementById("preview-index");
    var nameEl = document.getElementById("preview-name");
    var descEl = document.getElementById("preview-desc");
    var tagsEl = document.getElementById("preview-tags");
    var linkEl = document.getElementById("preview-link");

    var total = window.PROJECTS.length;
    var rows = [];

    function setActive(project, index) {
      rows.forEach(function (r, i) {
        r.classList.toggle("is-active", i === index);
      });

      if (project.image) {
        image.src = project.image;
        image.alt = project.imageAlt || project.name;
        image.style.objectPosition = project.imagePosition || "";
        image.style.display = "block";
        canvas.style.display = "none";
      } else {
        image.style.display = "none";
        canvas.style.display = "block";
        drawPattern(canvas, project.folder || project.name);
      }

      indexEl.textContent = pad(index + 1) + " / " + pad(total);
      nameEl.textContent = project.name;
      descEl.textContent = project.description;

      tagsEl.innerHTML = "";
      (project.tags || []).forEach(function (tag) {
        tagsEl.appendChild(createTag(tag));
      });

      if (project.link) {
        linkEl.href = project.link;
        linkEl.style.display = "inline-block";
      } else {
        linkEl.style.display = "none";
      }
    }

    window.PROJECTS.forEach(function (project, i) {
      var row = createRow(project, i, total, setActive);
      rows.push(row);
      list.appendChild(row);
    });

    if (total > 0) setActive(window.PROJECTS[0], 0);

    window.addEventListener("resize", function () {
      var active = list.querySelector(".project-row.is-active");
      var idx = active ? rows.indexOf(active) : 0;
      var project = window.PROJECTS[idx] || window.PROJECTS[0];
      if (project && !project.image) drawPattern(canvas, project.folder || project.name);
    });

    if (window.initReveal) window.initReveal();
  });
})();
