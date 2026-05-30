/* home.js — renders track cards + a "continue learning" hint on the landing page. */
(function () {
  "use strict";
  var AAFS = window.AAFS;
  var grid = document.getElementById("home-tracks");
  var cont = document.getElementById("home-continue");
  if (!grid) return;

  AAFS.getCurriculum().then(function (curr) {
    var html = "";
    curr.tracks.forEach(function (track) {
      var tnum = AAFS.leadingNum(track.id);
      var first = (track.lessons || []).find(function (l) { return l.status === "published"; });
      var href = first ? "lesson.html?path=" + encodeURIComponent(AAFS.lessonPath(track.id, first.id)) : "catalog.html#" + track.id;
      html += '<a class="card track-card-link" href="' + href + '">';
      html += '<span class="tnum">Track ' + (tnum === null ? "C" : tnum) + "</span>";
      html += "<h3>" + AAFS.escapeHtml(track.title) + "</h3>";
      html += "<p>" + AAFS.escapeHtml(track.summary || "") + "</p>";
      html += "</a>";
    });
    grid.innerHTML = html;

    if (cont) {
      var s = AAFS.progressStats(curr);
      if (s.completed > 0) {
        cont.innerHTML = "You've completed " + s.completed + " of " + s.published +
          ' published lessons. <a href="catalog.html">Keep going →</a>';
        cont.style.display = "";
      }
    }
  }).catch(function () { grid.innerHTML = ""; });
})();
