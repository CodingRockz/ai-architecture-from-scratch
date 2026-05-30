/* ===========================================================================
   widgets.js — Markdown → HTML rendering, custom content widgets, Mermaid.
   Depends on globals: marked, DOMPurify, mermaid (loaded via CDN).
   =========================================================================== */
(function () {
  "use strict";
  var AAFS = (window.AAFS = window.AAFS || {});

  if (window.marked && marked.setOptions) {
    marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
  }

  var ICONS = {
    decision: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v6m0 0l-7 4v5m7-9l7 4v5"/><circle cx="12" cy="3" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/></svg>',
    governance: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 3v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/></svg>',
    architect: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15"/></svg>',
    toolcard: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
    prompt: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/></svg>',
    callout: '<svg class="w-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>'
  };
  var LABELS = {
    decision: "Decision framework", governance: "Governance", architect: "How an architect thinks",
    toolcard: "Tool card", prompt: "Ask Claude / Cursor", callout: "Note"
  };

  function sanitize(html) {
    if (window.DOMPurify) {
      return DOMPurify.sanitize(html, { ADD_ATTR: ["target", "rel"] });
    }
    return html;
  }

  // Render a fragment of markdown to sanitized HTML (used inside widgets).
  function prose(md) {
    if (!window.marked) return AAFS.escapeHtml(md);
    return sanitize(marked.parse(md.trim()));
  }

  function extractTitle(raw) {
    var lines = raw.split("\n");
    var m = /^title:\s*(.+)$/.exec(lines[0] || "");
    if (m) return { title: m[1].trim(), body: lines.slice(1).join("\n") };
    return { title: null, body: raw };
  }

  function widgetEl(kind, raw) {
    var t = extractTitle(raw);
    var div = document.createElement("div");
    div.className = "widget widget-" + kind;
    var head = '<div class="widget-head">' + (ICONS[kind] || "") + "<span>" + LABELS[kind] + "</span></div>";
    var title = t.title ? '<p class="widget-title">' + AAFS.escapeHtml(t.title) + "</p>" : "";
    div.innerHTML = head + title + prose(t.body);
    return div;
  }

  function toolcardEl(raw) {
    var data = {};
    raw.split("\n").forEach(function (line) {
      var m = /^(\w+)\s*:\s*(.+)$/.exec(line.trim());
      if (m) data[m[1].toLowerCase()] = m[2].trim();
    });
    var div = document.createElement("div");
    div.className = "widget widget-toolcard";
    var rows = "";
    if (data.use) rows += "<dt>Use</dt><dd>" + AAFS.escapeHtml(data.use) + "</dd>";
    if (data.alternatives) rows += "<dt>Alternatives</dt><dd>" + AAFS.escapeHtml(data.alternatives) + "</dd>";
    if (data.when) rows += '<dt>When</dt><dd class="yes">' + AAFS.escapeHtml(data.when) + "</dd>";
    if (data.whennot) rows += '<dt>When not</dt><dd class="no">' + AAFS.escapeHtml(data.whennot) + "</dd>";
    div.innerHTML =
      '<div class="widget-head">' + ICONS.toolcard + "<span>" + LABELS.toolcard + "</span></div>" +
      '<p class="toolcard-name">' + AAFS.escapeHtml(data.name || "Tool") + "</p>" +
      (data.category ? '<p class="toolcard-cat">' + AAFS.escapeHtml(data.category) + "</p>" : "") +
      '<dl class="toolcard-grid">' + rows + "</dl>";
    return div;
  }

  function promptEl(raw) {
    var t = extractTitle(raw);
    var div = document.createElement("div");
    div.className = "widget widget-prompt";
    var pre = document.createElement("pre");
    pre.className = "prompt-body";
    pre.textContent = t.body.trim();
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.innerHTML = "Copy prompt";
    btn.addEventListener("click", function () {
      var text = pre.textContent;
      var done = function () { btn.classList.add("copied"); btn.textContent = "Copied ✓"; setTimeout(function () { btn.classList.remove("copied"); btn.textContent = "Copy prompt"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); done(); }
    });
    div.innerHTML = '<div class="widget-head">' + ICONS.prompt + "<span>" + LABELS.prompt + "</span></div>" +
      (t.title ? '<p class="widget-title">' + AAFS.escapeHtml(t.title) + "</p>" : "");
    div.appendChild(pre);
    div.appendChild(btn);
    return div;
  }

  function diagramEl(raw) {
    var alt = "";
    var m = /^%%\s*alt:\s*(.+)$/m.exec(raw);
    if (m) alt = m[1].trim();
    var wrap = document.createElement("div");
    wrap.className = "diagram";
    var fig = document.createElement("figure");
    var graph = document.createElement("div");
    graph.className = "mermaid";
    graph.textContent = raw;
    if (alt) { fig.setAttribute("role", "img"); fig.setAttribute("aria-label", alt); }
    fig.appendChild(graph);
    if (alt) {
      var cap = document.createElement("figcaption");
      cap.textContent = alt;
      fig.appendChild(cap);
    }
    wrap.appendChild(fig);
    return wrap;
  }

  var WIDGETS = { decision: 1, governance: 1, architect: 1, callout: 1 };

  function transform(container) {
    var blocks = container.querySelectorAll("pre > code");
    Array.prototype.forEach.call(blocks, function (code) {
      var cls = code.className || "";
      var lm = /language-([\w-]+)/.exec(cls);
      if (!lm) return;
      var lang = lm[1].toLowerCase();
      var raw = code.textContent;
      var pre = code.parentNode;
      var node = null;
      if (WIDGETS[lang]) node = widgetEl(lang, raw);
      else if (lang === "toolcard") node = toolcardEl(raw);
      else if (lang === "prompt") node = promptEl(raw);
      else if (lang === "mermaid") node = diagramEl(raw);
      if (node && pre.parentNode) pre.parentNode.replaceChild(node, pre);
    });
  }

  // Diagrams wider than they are tall get a `.wide` class so CSS can let them
  // break out of the prose column and stay legible.
  function tagWideDiagrams(container) {
    container.querySelectorAll(".diagram").forEach(function (d) {
      var svg = d.querySelector("svg");
      if (!svg) return;
      var w, h;
      if (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width) {
        w = svg.viewBox.baseVal.width; h = svg.viewBox.baseVal.height;
      } else {
        var vb = (svg.getAttribute("viewBox") || "").split(/\s+/);
        w = parseFloat(vb[2]); h = parseFloat(vb[3]);
      }
      if (w && h && w / h > 1.7) d.classList.add("wide");
    });
  }

  function renderMermaid(container) {
    if (!window.mermaid) return;
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    try {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: dark ? "dark" : "default",
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 16,
        flowchart: { useMaxWidth: false, htmlLabels: true, nodeSpacing: 45, rankSpacing: 55 }
      });
      var nodes = container.querySelectorAll(".mermaid");
      if (nodes.length) {
        var p = mermaid.run({ nodes: nodes });
        if (p && p.then) p.then(function () { tagWideDiagrams(container); });
        else tagWideDiagrams(container);
      }
    } catch (e) { /* leave the raw definition visible on failure */ }
  }

  /* ---- Public API ------------------------------------------------------- */

  // Parse leading frontmatter. Returns { data, body }.
  AAFS.parseFrontmatter = function (text) {
    var data = {};
    var fm = /^﻿?---\s*\n([\s\S]*?)\n---\s*\n?/.exec(text);
    if (!fm) return { data: data, body: text };
    var body = text.slice(fm[0].length);
    var lines = fm[1].split("\n");
    var curKey = null;
    lines.forEach(function (line) {
      if (/^\s*-\s+/.test(line) && curKey) {
        if (!Array.isArray(data[curKey])) data[curKey] = [];
        data[curKey].push(line.replace(/^\s*-\s+/, "").trim());
        return;
      }
      var m = /^([A-Za-z0-9_]+)\s*:\s*(.*)$/.exec(line);
      if (m) {
        curKey = m[1];
        var val = m[2].trim();
        data[curKey] = val === "" ? [] : val.replace(/^["']|["']$/g, "");
      }
    });
    return { data: data, body: body };
  };

  // Render lesson markdown body into an element, applying widgets + diagrams.
  AAFS.renderLessonBody = function (el, markdown) {
    el.innerHTML = window.marked ? sanitize(marked.parse(markdown)) : AAFS.escapeHtml(markdown);
    transform(el);
    renderMermaid(el);
  };

  AAFS.renderProse = prose;

  /* ---- Glossary auto-linking ---------------------------------------------
     Links the FIRST occurrence of each glossary term inside a lesson to the
     glossary page, with the definition as a hover tooltip. */
  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function glossaryLabels(term) {
    var base = term.split(" (")[0];               // drop "(Full Name)" suffix
    return base.split(" / ").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  var SKIP_TAGS = { A: 1, CODE: 1, PRE: 1, H1: 1, H2: 1, H3: 1, H4: 1, BUTTON: 1, DT: 1 };

  AAFS.linkGlossary = function (rootEl) {
    if (!rootEl || !AAFS.getGlossary) return;
    AAFS.getGlossary().then(function (terms) {
      var pats = [];
      terms.forEach(function (t) {
        var def = (t.definition || "").replace(/\*\*/g, "").replace(/\[\[|\]\]/g, "");
        var slug = AAFS.slug(t.term);
        glossaryLabels(t.term).forEach(function (label) {
          if (label.length < 2) return;
          pats.push({ label: label, slug: slug, def: def });
        });
      });
      // Prefer longer phrases first so "vector database" beats "vector".
      pats.sort(function (a, b) { return b.label.length - a.label.length; });

      var usedSlug = {};
      pats.forEach(function (p) {
        if (usedSlug[p.slug]) return;
        var re = new RegExp("\\b" + escapeReg(p.label) + "\\b", "i");
        var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
        var node;
        while ((node = walker.nextNode())) {
          var anc = node.parentNode, skip = false;
          while (anc && anc !== rootEl) {
            if (SKIP_TAGS[anc.nodeName] || (anc.classList && anc.classList.contains("widget-head"))) { skip = true; break; }
            anc = anc.parentNode;
          }
          if (skip) continue;
          var m = re.exec(node.nodeValue);
          if (!m) continue;
          var before = node.nodeValue.slice(0, m.index);
          var matched = node.nodeValue.slice(m.index, m.index + m[0].length);
          var after = node.nodeValue.slice(m.index + m[0].length);
          var a = document.createElement("a");
          a.className = "glossary-link";
          a.href = "glossary.html#" + p.slug;
          a.title = p.def;
          a.textContent = matched;
          var frag = document.createDocumentFragment();
          if (before) frag.appendChild(document.createTextNode(before));
          frag.appendChild(a);
          if (after) frag.appendChild(document.createTextNode(after));
          node.parentNode.replaceChild(frag, node);
          usedSlug[p.slug] = true;
          break;
        }
      });
    }).catch(function () { /* glossary optional */ });
  };
})();
