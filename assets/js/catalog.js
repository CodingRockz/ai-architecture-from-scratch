/* catalog.js — renders the full lesson index grouped by track. */
(function () {
  "use strict";
  var AAFS = window.AAFS;
  var root = document.getElementById("catalog");
  var statEl = document.getElementById("catalog-stats");
  if (!root) return;

  AAFS.getCurriculum().then(function (curr) {
    if (statEl) {
      var s = AAFS.progressStats(curr);
      statEl.textContent = curr.tracks.length + " tracks · " + s.total + " lessons · " +
        s.published + " published · " + s.completed + " completed by you";
    }

    var html = "";
    curr.tracks.forEach(function (track) {
      var tnum = AAFS.leadingNum(track.id);
      html += '<section class="catalog-track">';
      html += "<h2><span class=\"track-num\">" + (tnum === null ? "C" : tnum) + "</span>" + AAFS.escapeHtml(track.title) + "</h2>";
      if (track.summary) html += '<p class="tdesc">' + AAFS.escapeHtml(track.summary) + "</p>";
      html += '<ul class="catalog-list">';
      (track.lessons || []).forEach(function (lesson, li) {
        var path = AAFS.lessonPath(track.id, lesson.id);
        var num = AAFS.lessonNumber(track, li, lesson);
        var published = lesson.status === "published";
        var done = AAFS.isDone(path);
        var open = '<a href="lesson.html?path=' + encodeURIComponent(path) + '">';
        html += "<li>";
        html += '<span class="lnum">' + num + "</span>";
        html += '<span class="ltext">' + (published ? open : "") +
          AAFS.escapeHtml(lesson.title) + (published ? "</a>" : "") +
          (lesson.summary ? "<small>" + AAFS.escapeHtml(lesson.summary) + "</small>" : "") + "</span>";
        if (done) html += '<span class="status-pill status-published">✓ done</span>';
        else if (published) html += '<span class="status-pill status-published">Read →</span>';
        else html += '<span class="status-pill status-planned">soon</span>';
        html += "</li>";
      });
      html += "</ul></section>";
    });
    root.innerHTML = html;
  }).catch(function () {
    root.innerHTML = '<p class="state">Could not load the catalog.</p>';
  });
})();
