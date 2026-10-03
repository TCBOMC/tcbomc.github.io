/* 主逻辑：项目卡片渲染 / 分组筛选 / 预览懒加载 / 滚动导航高亮 */

(function () {
  "use strict";

  /* ---------- 项目卡片 ---------- */
  const grid = document.getElementById("project-grid");

  function badgeHtml(p) {
    if (p.npm) return '<span class="proj-badge badge-npm">npm 包</span>';
    if (p.status === "open") return '<span class="proj-badge badge-open">开源</span>';
    return '<span class="proj-badge badge-close">未开源</span>';
  }

  function linksHtml(p) {
    const parts = [];
    if (p.demo) parts.push('<a class="plink" target="_blank" rel="noopener" href="' + p.demo + '">↗ 在线访问</a>');
    if (p.repo) parts.push('<a class="plink" target="_blank" rel="noopener" href="' + p.repo + '">⌥ 源码仓库</a>');
    if (parts.length === 0) parts.push('<span class="plink muted">未公开 · 欢迎交流</span>');
    return '<div class="proj-links">' + parts.join("") + "</div>";
  }

  function cardHtml(p, i) {
    return (
      '<article class="float-panel proj-card reveal" data-group="' + p.group + '" style="transition-delay:' + (i % 8) * 40 + 'ms">' +
        '<div class="proj-top">' +
          '<div class="proj-icon">' + p.icon + "</div>" +
          '<div class="proj-name">' + p.name + "</div>" +
          badgeHtml(p) +
        "</div>" +
        '<p class="proj-desc">' + p.desc + "</p>" +
        '<div class="tag-row">' + p.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") + "</div>" +
        linksHtml(p) +
      "</article>"
    );
  }

  grid.innerHTML = PROJECTS.map(cardHtml).join("");

  /* ---------- 统计数字 ---------- */
  document.getElementById("stat-all").textContent = PROJECTS.length;
  document.getElementById("stat-open").textContent = PROJECTS.filter(function (p) { return p.status === "open"; }).length;

  /* ---------- 分组筛选 ---------- */
  const filterBox = document.getElementById("filters");
  filterBox.innerHTML = GROUPS.map(function (g, i) {
    return '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-group="' + g.id + '" role="tab">' + g.label + "</button>";
  }).join("");

  filterBox.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBox.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    const g = btn.dataset.group;
    grid.querySelectorAll(".proj-card").forEach(function (card) {
      card.classList.toggle("hidden", g !== "all" && card.dataset.group !== g);
    });
  });

  /* ---------- 预览懒加载 ---------- */
  const previewGrid = document.getElementById("preview-grid");
  previewGrid.innerHTML = PREVIEWS.map(function (pv) {
    return (
      '<div class="float-panel preview-card">' +
        '<div class="preview-head"><b>' + pv.name + "</b>" +
          '<a class="plink" target="_blank" rel="noopener" href="' + pv.url + '">↗ 新窗口打开</a>' +
          '<a class="plink" target="_blank" rel="noopener" href="' + pv.repo + '">⌥ 源码</a>' +
        "</div>" +
        '<div class="preview-frame" data-url="' + pv.url + '">' +
          '<div class="preview-load"><span>' + pv.note + "</span><button type=\"button\">加载预览</button></div>" +
        "</div>" +
      "</div>"
    );
  }).join("");

  previewGrid.addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;
    const frame = btn.closest(".preview-frame");
    if (!frame || frame.querySelector("iframe")) return;
    const iframe = document.createElement("iframe");
    iframe.src = frame.dataset.url;
    iframe.loading = "lazy";
    iframe.allow = "fullscreen; xr-spatial-tracking";
    iframe.title = frame.closest(".preview-card").querySelector("b").textContent;
    frame.appendChild(iframe);
    btn.closest(".preview-load").remove();
  });

  /* ---------- 滚动导航高亮 ---------- */
  const navItems = document.querySelectorAll(".nav-item");
  const sections = ["home", "projects", "preview", "about"].map(function (id) { return document.getElementById(id); });

  function highlight() {
    const pos = window.scrollY + 120;
    let current = sections[0].id;
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
    navItems.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", highlight, { passive: true });
  highlight();

  /* ---------- 入场动画 ---------- */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); observer.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
})();
