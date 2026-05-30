/* ===========================================================================
   common.js — shared utilities, theme, mobile menu, curriculum loader.
   Exposes a global `AAFS` namespace. No build step, no modules.
   =========================================================================== */
(function () {
  "use strict";

  var AAFS = (window.AAFS = window.AAFS || {});

  /* ---- Config -----------------------------------------------------------
     To go live, paste a form endpoint (Formspree / Buttondown / your own).
     While empty, forms run in local "demo" mode (no data leaves the browser). */
  AAFS.config = {
    subscribeEndpoint: "", // e.g. "https://formspree.io/f/xxxx"
    suggestEndpoint: ""
  };

  /* ---- Small helpers ---------------------------------------------------- */
  AAFS.escapeHtml = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  AAFS.leadingNum = function (id) {
    var m = /^(\d+)/.exec(id || "");
    return m ? parseInt(m[1], 10) : null;
  };

  // Stable slug for anchors/links (used by glossary page + auto-linker).
  AAFS.slug = function (s) {
    return String(s == null ? "" : s)
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  };

  // Glossary (cached). Returns a promise of the array of {term, definition}.
  var _glossary = null;
  AAFS.getGlossary = function () {
    if (_glossary) return _glossary;
    _glossary = fetch("library/glossary/glossary.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("glossary " + r.status); return r.json(); })
      .then(function (d) { return (d.terms || []); });
    return _glossary;
  };

  // Display number like "1.11" or "C.2".
  AAFS.lessonNumber = function (track, lessonIndex, lesson) {
    var t = AAFS.leadingNum(track.id);
    var trackPart = t === null ? "C" : String(t);
    var l = AAFS.leadingNum(lesson.id);
    var lessonPart = l === null ? lessonIndex + 1 : l;
    return trackPart + "." + lessonPart;
  };

  AAFS.lessonPath = function (trackId, lessonId) {
    return "tracks/" + trackId + "/" + lessonId + "/docs/en.md";
  };

  /* ---- Curriculum (cached) ---------------------------------------------- */
  var _curr = null;
  AAFS.getCurriculum = function () {
    if (_curr) return _curr;
    _curr = fetch("curriculum.json", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("curriculum.json " + r.status);
      return r.json();
    });
    return _curr;
  };

  // Flat, ordered list of every lesson with computed fields.
  AAFS.flatten = function (curr) {
    var out = [];
    (curr.tracks || []).forEach(function (track, ti) {
      (track.lessons || []).forEach(function (lesson, li) {
        out.push({
          trackId: track.id,
          trackTitle: track.title,
          trackIndex: ti,
          lessonIndex: li,
          id: lesson.id,
          title: lesson.title,
          summary: lesson.summary || "",
          status: lesson.status || "planned",
          number: AAFS.lessonNumber(track, li, lesson),
          path: AAFS.lessonPath(track.id, lesson.id)
        });
      });
    });
    return out;
  };

  /* ---- Progress (localStorage) ----------------------------------------- */
  var PKEY = "aafs:progress";
  AAFS.getProgress = function () {
    try { return JSON.parse(localStorage.getItem(PKEY) || "{}"); }
    catch (e) { return {}; }
  };
  AAFS.isDone = function (path) { return !!AAFS.getProgress()[path]; };
  AAFS.setDone = function (path, done) {
    var p = AAFS.getProgress();
    if (done) p[path] = Date.now(); else delete p[path];
    try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) {}
  };
  AAFS.progressStats = function (curr) {
    var all = AAFS.flatten(curr), done = AAFS.getProgress();
    var published = all.filter(function (l) { return l.status === "published"; });
    var completed = published.filter(function (l) { return done[l.path]; });
    return { total: all.length, published: published.length, completed: completed.length };
  };

  /* ---- Theme ------------------------------------------------------------ */
  var TKEY = "aafs:theme";
  AAFS.getTheme = function () {
    var saved = null;
    try { saved = localStorage.getItem(TKEY); } catch (e) {}
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  AAFS.applyTheme = function (t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.innerHTML = t === "dark"
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    }
    if (window.mermaid && AAFS._mermaidReady) {
      // Re-theme is handled per-render in lesson.js; nothing to do here.
    }
  };
  AAFS.toggleTheme = function () {
    var next = AAFS.getTheme() === "dark" ? "light" : "dark";
    try { localStorage.setItem(TKEY, next); } catch (e) {}
    AAFS.applyTheme(next);
    document.dispatchEvent(new CustomEvent("aafs:themechange", { detail: next }));
  };

  // Apply theme ASAP (before DOMContentLoaded paint where possible).
  AAFS.applyTheme(AAFS.getTheme());

  /* ---- Wire shared chrome on load -------------------------------------- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    AAFS.applyTheme(AAFS.getTheme());

    var tt = document.getElementById("theme-toggle");
    if (tt) tt.addEventListener("click", AAFS.toggleTheme);

    var mt = document.getElementById("menu-toggle");
    if (mt) mt.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });

    var bd = document.getElementById("sidebar-backdrop");
    if (bd) bd.addEventListener("click", function () { document.body.classList.remove("nav-open"); });

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
