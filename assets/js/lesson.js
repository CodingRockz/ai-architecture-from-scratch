/* ===========================================================================
   lesson.js — controller for lesson.html. Reads ?path=, fetches the Markdown,
   renders it with widgets/diagrams, and builds meta, sources, progress, pager.
   =========================================================================== */
(function () {
  "use strict";
  var AAFS = window.AAFS;

  var contentEl = document.getElementById("lesson-content");

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function state(html) { contentEl.innerHTML = '<div class="state">' + html + "</div>"; }

  function icon(p) {
    var paths = {
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
      tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7" cy="7" r="1.5"/>'
    };
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + paths[p] + "</svg>";
  }

  function sourceLink(s) {
    // "Title — https://url"  or plain text
    var m = /^(.*?)[—-]\s*(https?:\/\/\S+)$/.exec(s);
    if (m) return '<a href="' + AAFS.escapeHtml(m[2]) + '" target="_blank" rel="noopener noreferrer">' + AAFS.escapeHtml(m[1].trim()) + "</a>";
    var u = /(https?:\/\/\S+)/.exec(s);
    if (u) return '<a href="' + AAFS.escapeHtml(u[1]) + '" target="_blank" rel="noopener noreferrer">' + AAFS.escapeHtml(s) + "</a>";
    return AAFS.escapeHtml(s);
  }

  function buildMeta(data, flatItem) {
    var bits = [];
    if (flatItem) bits.push('<span class="meta-chip">' + icon("tag") + " " + flatItem.trackTitle + " · " + flatItem.number + "</span>");
    if (data.readingTime) bits.push('<span class="meta-chip">' + icon("clock") + " " + AAFS.escapeHtml(data.readingTime) + " min read</span>");
    if (data.lastReviewed) bits.push('<span class="meta-chip reviewed">' + icon("check") + " Reviewed " + AAFS.escapeHtml(data.lastReviewed) + "</span>");
    if (data.prerequisites && data.prerequisites.length) {
      var pre = Array.isArray(data.prerequisites) ? data.prerequisites.join(", ") : data.prerequisites;
      bits.push('<span class="meta-chip">Prereqs: ' + AAFS.escapeHtml(pre) + "</span>");
    }
    return bits.join("");
  }

  function pagerHtml(flat, idx) {
    var prev = flat[idx - 1], next = flat[idx + 1];
    var h = "";
    if (prev) h += '<a class="prev" href="lesson.html?path=' + encodeURIComponent(prev.path) + '"><span class="dir">← Previous</span><span class="ptitle">' + AAFS.escapeHtml(prev.title) + "</span></a>";
    else h += "<span></span>";
    if (next) h += '<a class="next" href="lesson.html?path=' + encodeURIComponent(next.path) + '"><span class="dir">Next →</span><span class="ptitle">' + AAFS.escapeHtml(next.title) + "</span></a>";
    return h;
  }

  function render(curr, path) {
    var flat = AAFS.flatten(curr);
    var idx = flat.findIndex(function (l) { return l.path === path; });
    var item = idx >= 0 ? flat[idx] : null;

    // Sidebar
    var side = document.getElementById("sidebar-nav");
    if (side) AAFS.buildSidebar(side, curr, path);

    if (item && item.status !== "published") {
      document.title = item.title + " · AI Architecture From Scratch";
      state(
        '<div class="eyebrow">' + AAFS.escapeHtml(item.trackTitle) + " · " + item.number + "</div>" +
        "<h1>" + AAFS.escapeHtml(item.title) + "</h1>" +
        "<p>" + AAFS.escapeHtml(item.summary) + "</p>" +
        '<p><strong>This lesson is coming soon.</strong> We\'re building the full course before launch — ' +
        'see the <a href="roadmap.html">roadmap</a>, or <a href="contribute.html">suggest what to prioritise</a>.</p>' +
        '<div class="pager">' + pagerHtml(flat, idx) + "</div>"
      );
      return;
    }

    fetch(path, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    }).then(function (text) {
      var fm = AAFS.parseFrontmatter(text);
      var data = fm.data;
      var title = data.title || (item && item.title) || "Lesson";
      document.title = title + " · AI Architecture From Scratch";

      var html = "";
      html += '<nav class="breadcrumb"><a href="index.html">Home</a> › <a href="catalog.html">Catalog</a>';
      if (item) html += " › " + AAFS.escapeHtml(item.trackTitle);
      html += "</nav>";
      html += '<h1 class="lesson-title">' + AAFS.escapeHtml(title) + "</h1>";
      if (data.summary) html += '<p class="lesson-summary">' + AAFS.escapeHtml(data.summary) + "</p>";
      html += '<div class="lesson-meta">' + buildMeta(data, item) + "</div>";
      html += '<div class="prose" id="prose"></div>';

      // Sources
      if (data.sources && data.sources.length) {
        var list = (Array.isArray(data.sources) ? data.sources : [data.sources]).map(function (s) {
          return "<li>" + sourceLink(s) + "</li>";
        }).join("");
        html += '<section class="lesson-sources"><h2>Sources</h2><ol>' + list + "</ol></section>";
      }

      // Actions (mark complete)
      var done = AAFS.isDone(path);
      html += '<div class="lesson-actions">' +
        '<button class="btn ' + (done ? "done" : "btn-primary") + '" id="mark-done">' +
        (done ? "✓ Completed" : "Mark as complete") + "</button>" +
        '<a class="btn" href="contribute.html">Suggest an improvement</a>' +
        "</div>";

      html += '<div class="pager">' + pagerHtml(flat, idx) + "</div>";
      html += '<p class="disclaimer-note">Education, not legal or professional advice. ' +
        "Guidance is general and sector-aware, not jurisdiction-definitive — verify against the primary sources above.</p>";

      contentEl.innerHTML = html;

      AAFS.renderLessonBody(document.getElementById("prose"), fm.body);
      AAFS.linkGlossary(document.getElementById("prose"));

      var btn = document.getElementById("mark-done");
      if (btn) btn.addEventListener("click", function () {
        var nowDone = !AAFS.isDone(path);
        AAFS.setDone(path, nowDone);
        btn.classList.toggle("done", nowDone);
        btn.classList.toggle("btn-primary", !nowDone);
        btn.textContent = nowDone ? "✓ Completed" : "Mark as complete";
        if (side) AAFS.buildSidebar(side, curr, path);
      });

      window.scrollTo(0, 0);
    }).catch(function (err) {
      state(
        "<h1>Lesson not found</h1>" +
        "<p>We couldn't load this lesson (<code>" + AAFS.escapeHtml(path || "no path") + "</code>, error " + AAFS.escapeHtml(err.message) + ").</p>" +
        '<p><a class="btn btn-primary" href="catalog.html">Browse the catalog</a></p>'
      );
    });
  }

  // Re-render diagrams on theme change (so Mermaid matches light/dark).
  document.addEventListener("aafs:themechange", function () {
    var path = qs("path");
    if (path) AAFS.getCurriculum().then(function (c) { render(c, path); });
  });

  var path = qs("path");
  if (!path) {
    state('<h1>No lesson selected</h1><p><a class="btn btn-primary" href="catalog.html">Browse the catalog</a></p>');
    return;
  }
  state('<div class="spinner"></div><p>Loading lesson…</p>');
  AAFS.getCurriculum().then(function (curr) { render(curr, path); }).catch(function () {
    state("<h1>Something went wrong</h1><p>Could not load the curriculum.</p>");
  });
})();
