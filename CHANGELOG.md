# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed — UX/visual & pedagogy pass (after design + learning reviews)
- **Diagrams are now legible.** Wide Mermaid diagrams break out beyond the prose column and
  render at full size (Mermaid `useMaxWidth:false`, larger font/spacing, auto-tagged `.wide`)
  instead of being squeezed to ~44% and unreadable.
- **Fixed prev/next pager** label spacing (label and title were jammed together).
- **Glossary auto-linking:** the first occurrence of any glossary term in a lesson now links
  to the glossary with the definition as a hover tooltip (the promised scaffold for non-coders).
- **Glossary expanded** from 29 → 90 terms and **redesigned**: A–Z index, term count, search,
  two-column lettered sections, anchor highlighting.
- **Roadmap is now public-facing:** a "learning path" of the nine tracks (with a progress bar),
  replacing the internal M0–M7 build milestones.
- **Accessibility/polish:** raised faint-text contrast toward WCAG AA; per-track accent colours
  on track cards and the roadmap path; "What you're signing up for" expectations block added to
  Orientation lesson 1.

### Added
- Project scaffold: repo meta files, MIT + CC BY 4.0 licensing, Vercel config.
- Static site engine (vanilla JS): lesson renderer with `?path=` loading, collapsible
  track navigation, catalog, roadmap, and glossary pages.
- Content widgets rendered from fenced Markdown blocks: decision cards, tool cards,
  architect notes, governance boxes, prompt blocks (with copy), and Mermaid diagrams.
- Credibility plumbing: per-lesson "last reviewed" badge and primary-source lists.
- Audience plumbing: email capture and a non-Git suggestion/correction form.
- `curriculum.json` manifest covering all 7 tracks + capstone.
- Three gold-standard sample lessons:
  - Foundations — *Retrieval-Augmented Generation (RAG)*
  - Governance — *Security threats: prompt injection, data poisoning & RAG leakage*
  - Operations — *Automate vs augment vs leave-it-human*

### Added — full course content
- **All 92 lessons across all 9 tracks are now drafted and published** (Orientation,
  Foundations, Ecosystems & Tooling, Operations, Architecture, Governance, Implementation,
  Future, and the Capstone). Each lesson follows the standard template (overview, why it
  matters, core concepts, visual, decision framework, common mistakes, business examples,
  governance, architect note, tools, "ask Claude" prompts, key takeaways, self-check) with
  frontmatter, primary sources, and a "last reviewed" date.
- `scripts/sync-status.mjs` (`npm run sync`) — sets each lesson's published/planned status
  from disk and keeps `curriculum.json` formatted.

### Notes
- Volatile specifics (tools, prices, regulations) are isolated in dated cards; verify against
  the linked primary sources. This is education, not professional advice.
