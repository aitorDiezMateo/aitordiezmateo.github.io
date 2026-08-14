// Renders project cards from window.PROJECTS (see js/projects-data.js) into #projects-grid.
(function () {
  function createTag(text) {
    var span = document.createElement("span");
    span.className = "tech-tag";
    span.textContent = text;
    return span;
  }

  function createCard(project) {
    var card = document.createElement("article");
    card.className = "project-card";

    if (project.image) {
      var imageWrap = document.createElement("div");
      imageWrap.className = "project-image";
      var img = document.createElement("img");
      img.src = project.image;
      img.alt = project.name;
      img.loading = "lazy";
      imageWrap.appendChild(img);
      card.appendChild(imageWrap);
    }

    var content = document.createElement("div");
    content.className = "project-content";

    var title = document.createElement("h3");
    title.textContent = project.name;
    content.appendChild(title);

    var description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description;
    content.appendChild(description);

    if (project.tags && project.tags.length) {
      var tagRow = document.createElement("div");
      tagRow.className = "project-tech";
      project.tags.forEach(function (tag) {
        tagRow.appendChild(createTag(tag));
      });
      content.appendChild(tagRow);
    }

    if (project.link) {
      var linkRow = document.createElement("div");
      linkRow.className = "project-links";
      var link = document.createElement("a");
      link.className = "project-link";
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View Code";
      linkRow.appendChild(link);
      content.appendChild(linkRow);
    }

    card.appendChild(content);
    return card;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("projects-grid");
    if (!grid || !window.PROJECTS) return;

    window.PROJECTS.forEach(function (project) {
      grid.appendChild(createCard(project));
    });

    if (window.initReveal) window.initReveal();
  });
})();
