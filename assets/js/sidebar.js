/* ===========================================================================
   sidebar.js — builds the collapsible track/lesson navigation.
   AAFS.buildSidebar(rootEl, curriculum, activePath)
   =========================================================================== */
(function () {
  "use strict";
  var AAFS = (window.AAFS = window.AAFS || {});

  var CHEV = '<svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>';
  var CHECK = '<svg class="done" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';

  AAFS.buildSidebar = function (rootEl, curr, activePath) {
    var progress = AAFS.getProgress();
    rootEl.innerHTML = "";

    var search = document.createElement("input");
    search.className = "sidebar-search";
    search.type = "search";
    search.placeholder = "Filter lessons…";
    search.setAttribute("aria-label", "Filter lessons");
    rootEl.appendChild(search);

    var nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Course navigation");

    curr.tracks.forEach(function (track, ti) {
      var tnum = AAFS.leadingNum(track.id);
      var section = document.createElement("div");
      section.className = "track";

      var hasActive = (track.lessons || []).some(function (l) {
        return AAFS.lessonPath(track.id, l.id) === activePath;
      });
      section.setAttribute("aria-expanded", hasActive ? "true" : "false");

      var btn = document.createElement("button");
      btn.className = "track-toggle";
      btn.type = "button";
      btn.innerHTML =
        '<span class="track-num">' + (tnum === null ? "C" : tnum) + "</span>" +
        "<span>" + AAFS.escapeHtml(track.title) + "</span>" + CHEV;
      btn.addEventListener("click", function () {
        section.setAttribute("aria-expanded", section.getAttribute("aria-expanded") === "true" ? "false" : "true");
      });
      section.appendChild(btn);

      var ul = document.createElement("ul");
      ul.className = "track-lessons";
      (track.lessons || []).forEach(function (lesson, li) {
        var path = AAFS.lessonPath(track.id, lesson.id);
        var num = AAFS.lessonNumber(track, li, lesson);
        var li_ = document.createElement("li");
        var a = document.createElement("a");
        a.className = "lesson-link" + (lesson.status !== "published" ? " planned" : "") + (path === activePath ? " active" : "");
        a.href = "lesson.html?path=" + encodeURIComponent(path);
        a.setAttribute("data-search", (num + " " + lesson.title).toLowerCase());
        if (path === activePath) a.setAttribute("aria-current", "page");

        var inner = '<span class="lnum">' + num + "</span><span>" + AAFS.escapeHtml(lesson.title) + "</span>";
        if (lesson.status === "published" && progress[path]) inner += CHECK;
        else if (lesson.status !== "published") inner += '<span class="badge-soon">soon</span>';
        a.innerHTML = inner;
        li_.appendChild(a);
        ul.appendChild(li_);
      });
      section.appendChild(ul);
      nav.appendChild(section);
    });

    rootEl.appendChild(nav);

    // Filter
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      nav.querySelectorAll(".track").forEach(function (section) {
        var any = false;
        section.querySelectorAll(".lesson-link").forEach(function (a) {
          var match = !q || a.getAttribute("data-search").indexOf(q) !== -1;
          a.parentNode.style.display = match ? "" : "none";
          if (match) any = true;
        });
        section.style.display = any ? "" : "none";
        if (q && any) section.setAttribute("aria-expanded", "true");
      });
    });
  };
})();
