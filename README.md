<div align="center">

# AI Architecture From Scratch

### The operating system for thinking about AI.

**Understand, decide, govern, and build AI — without becoming a programmer.**

[Start learning →](https://aiarchitecturefromscratch.com) · [Browse the catalog](catalog.html) · [Roadmap](ROADMAP.md) · [Contribute](CONTRIBUTING.md)

</div>

---

## What this is

Most AI courses teach you to **build AI by hand** — they make AI *engineers*.

This one teaches you to **think about AI as a system**: how to understand it, classify the tools, make the right architecture and governance decisions, and then *direct AI coding tools (Claude / Cursor / Codex) to do the hands-on building for you*.

It makes **AI architects, operators, and decision-makers.**

> You start knowing AI only as "ChatGPT." You finish able to look at a business, find the high-value AI opportunities, choose the right architecture and tools, control cost, manage risk and governance, and direct AI agents to build internal tools and prototypes — and you know when a system needs a real engineer before production.

It's **free**, open-source, and runs as a self-contained static site — clone it and it just works.

## Who it's for

Founders · executives · consultants · product & operations managers · lawyers, accountants & other domain experts · IT managers · analysts · and engineers who want the systems / operations / governance lens.

**No coding required.**

## The five-verb loop

Every lesson follows the same spine — the thing that makes this different from a tutorial site:

> **Understand → Classify → Decide → Apply → Govern**

## The curriculum (7 tracks)

| # | Track | What you'll be able to do |
|---|-------|---------------------------|
| 0 | Orientation | Adopt the architect/operator mindset and learn to drive AI tools |
| 1 | Foundations & Core Concepts | Understand AI deeply — no hand-derived math |
| 2 | AI Ecosystems & Tooling | Classify the chaos; know which tool is which and why |
| 3 | AI Operations & Business Transformation | Find ROI and redesign processes with AI |
| 4 | AI Systems Architecture | Design RAG, agents, memory, routing, local-vs-cloud |
| 5 | AI Governance, Risk & Security | Deploy AI safely, legally, and in control |
| 6 | AI Implementation via AI Agents | Spec, direct, and validate AI-built systems |
| 7 | Future AI & Research Thinking | Reason about where this is all going |

Plus a **Capstone**, and cross-cutting libraries: **Decision Frameworks**, **Tool Cards**, and a **Glossary**.

See the full lesson-by-lesson plan in [`doc/PLAN.md`](doc/PLAN.md).

## Run it locally

It's just static files — you only need any local web server (so the browser can `fetch()` the Markdown lessons).

```bash
# Option A — Node (no install): serves on http://localhost:3000
npx serve .

# Option B — Python
python -m http.server 3000
```

Then open **http://localhost:3000**.

## How it's built

Deliberately low-tech, so anyone can fork it and it just works:

- **Content** = Markdown files under [`tracks/`](tracks/) (`tracks/<track>/<lesson>/docs/en.md`).
- **Site** = plain HTML + vanilla JS that fetches a lesson by `?path=…` and renders it. No build step, no framework.
- **Manifest** = [`curriculum.json`](curriculum.json) drives the navigation, catalog, and roadmap.
- **Diagrams** = [Mermaid](https://mermaid.js.org/) (rendered in the browser).
- **Widgets** (decision cards, tool panels, architect notes, governance boxes, prompts) are authored as fenced Markdown blocks — see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Contributing

You don't need to know Git to help. Spotted an out-of-date tool, a broken decision, or a missing example?

- **Non-coders:** use the [suggestion / correction form](contribute.html) on the site.
- **Coders:** see [`CONTRIBUTING.md`](CONTRIBUTING.md) to add or edit lessons.

## Trust & freshness

AI moves fast, so we keep volatile specifics (tools, prices, regulations) in dated cards and stamp every lesson with a **"last reviewed"** date and **primary-source links**. This is education, **not legal or professional advice**.

## Sustaining the project

Free forever. If it helps you, [sponsoring the project](SPONSORS.md) keeps the content maintained.

## License

- **Code:** [MIT](LICENSE)
- **Content** (lessons, diagrams, text): [CC BY 4.0](LICENSE-CONTENT.md)

---

<div align="center"><sub>Built in the open. Not affiliated with any AI vendor.</sub></div>
