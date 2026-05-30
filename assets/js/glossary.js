/* glossary.js — searchable, A–Z glossary page. */
(function () {
  "use strict";
  var AAFS = window.AAFS;
  var root = document.getElementById("glossary-list");
  var search = document.getElementById("glossary-search");
  var indexEl = document.getElementById("glossary-index");
  var countEl = document.getElementById("glossary-count");
  if (!root) return;

  var terms = [];

  function firstLetter(t) {
    var c = (t.term || "").replace(/^[^A-Za-z0-9]+/, "").charAt(0).toUpperCase();
    return /[A-Z]/.test(c) ? c : "#";
  }

  function card(t) {
    return '<dl class="glossary-term" id="' + AAFS.slug(t.term) + '">' +
      "<dt>" + AAFS.escapeHtml(t.term) + "</dt>" +
      "<dd>" + AAFS.renderProse(t.definition || "") + "</dd></dl>";
  }

  function renderGrouped() {
    var groups = {};
    terms.forEach(function (t) {
      var L = firstLetter(t);
      (groups[L] = groups[L] || []).push(t);
    });
    var letters = Object.keys(groups).sort();

    if (indexEl) {
      indexEl.innerHTML = letters.map(function (L) {
        return '<a href="#letter-' + L + '">' + L + "</a>";
      }).join("");
      indexEl.style.display = "";
    }

    root.innerHTML = letters.map(function (L) {
      return '<section class="glossary-section" id="letter-' + L + '">' +
        '<h2 class="glossary-letter">' + L + "</h2>" +
        '<div class="glossary-grid">' + groups[L].map(card).join("") + "</div>" +
        "</section>";
    }).join("");
  }

  function renderFiltered(q) {
    if (indexEl) indexEl.style.display = "none";
    var items = terms.filter(function (t) {
      return t.term.toLowerCase().indexOf(q) !== -1 ||
        (t.definition || "").toLowerCase().indexOf(q) !== -1;
    });
    if (!items.length) { root.innerHTML = '<p class="state">No matching terms.</p>'; return; }
    root.innerHTML = '<div class="glossary-grid">' + items.map(card).join("") + "</div>";
  }

  function render() {
    var q = (search && search.value || "").trim().toLowerCase();
    if (q) renderFiltered(q); else renderGrouped();
  }

  AAFS.getGlossary().then(function (data) {
    terms = data.slice().sort(function (a, b) { return a.term.localeCompare(b.term); });
    if (countEl) countEl.textContent = terms.length + " terms";
    render();
    // Deep-link: if the page loaded with a #hash, scroll to it after render.
    if (location.hash) {
      var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) el.scrollIntoView();
    }
    if (search) search.addEventListener("input", render);
  }).catch(function () {
    root.innerHTML = '<p class="state">Could not load the glossary.</p>';
  });
})();
