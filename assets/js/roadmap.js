/* roadmap.js — public learning-path: a progress bar + the ordered track journey. */
(function () {
  "use strict";
  var AAFS = window.AAFS;
  var bar = document.getElementById("roadmap-progress");
  var path = document.getElementById("roadmap-tracks");
  if (!path) return;

  AAFS.getCurriculum().then(function (curr) {
    var s = AAFS.progressStats(curr);

    if (bar) {
      var pct = s.published ? Math.round((s.completed / s.published) * 100) : 0;
      bar.innerHTML =
        '<div style="display:flex;justify-content:space-between;font-size:.85rem;color:var(--text-muted);margin-bottom:8px">' +
        "<span>Your progress</span><span>" + s.completed + " / " + s.published + " lessons</span></div>" +
        '<div style="height:10px;border-radius:999px;background:var(--bg-sunken);overflow:hidden">' +
        '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,var(--brand),var(--accent))"></div></div>';
    }

    var done = AAFS.getProgress();
    var html = "";
    curr.tracks.forEach(function (track) {
      var tnum = AAFS.leadingNum(track.id);
      var lessons = track.lessons || [];
      var first = lessons[0];
      var doneCount = lessons.filter(function (l) { return done[AAFS.lessonPath(track.id, l.id)]; }).length;
      var href = first ? "lesson.html?path=" + encodeURIComponent(AAFS.lessonPath(track.id, first.id)) : "catalog.html#" + track.id;

      html += '<a class="path-step" href="' + href + '">';
      html += '<span class="path-num">' + (tnum === null ? "C" : tnum) + "</span>";
      html += '<span class="path-body">';
      html += "<span class=\"path-title\">" + AAFS.escapeHtml(track.title) + "</span>";
      html += '<span class="path-summary">' + AAFS.escapeHtml(track.summary || "") + "</span>";
      html += '<span class="path-meta">' + lessons.length + " lessons" +
        (doneCount ? ' · <span class="path-done">' + doneCount + " done</span>" : "") + "</span>";
      html += "</span>";
      html += '<span class="path-go" aria-hidden="true">→</span>';
      html += "</a>";
    });
    path.innerHTML = html;
  }).catch(function () {
    path.innerHTML = '<p class="state">Could not load the learning path.</p>';
  });
})();
