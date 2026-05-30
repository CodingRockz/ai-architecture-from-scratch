---
title: "The limits of AI-built code & when to bring in an engineer"
track: 06-implementation
order: 11
summary: An honest look at where AI-generated code falls short — security, maintainability, production — and how to draw the line.
readingTime: 7
prerequisites:
  - "Sanity-checking generated code & infra as a non-coder"
tags:
  - implementation
  - limits
  - production
lastReviewed: 2026-05-30
sources:
  - "OWASP Top 10 for LLM Applications (2025) — https://genai.owasp.org/llm-top-10/"
  - "Stanford HAI — Artificial Intelligence Index Report 2025 — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

This course is built on directing AI to build — and it would be dishonest not to draw the line
clearly. AI coding tools are remarkable for prototypes and internal tools, but **AI-generated code
has real, well-documented limits**, especially for production, security, and maintainability. This
lesson is the honest boundary: what AI build is great for, where it falls short, and when to bring
in a human engineer.

## Why this matters

Overselling "non-coders can build anything" leads to burned users and real incidents — insecure
systems, unmaintainable messes, production failures. Drawing the line honestly is what makes the
*rest* of this course credible and safe. It's also a core governance stance: know the limits of
your tools.

## Core concepts

- **What AI build is genuinely great for:** prototypes, internal tools, automations, proofs of
  concept, one-off scripts, and accelerating real engineers. Huge value, appropriately low stakes.
- **Where AI-generated code falls short:**
  - **Security.** A substantial share of AI-generated code contains vulnerabilities; models don't
    reliably produce secure code, and a non-coder can't catch subtle flaws.
  - **Maintainability & technical debt.** AI can produce code that works now but is hard to extend
    and accrues debt faster than carefully engineered code.
  - **Complex/edge correctness.** Subtle logic and rare cases are where it quietly fails.
  - **Production hardening.** Scale, reliability, monitoring, and security at production grade need
    real engineering.
- **Regulated/high-stakes reality.** Many sectors deliberately limit "vibe-coded" systems for
  exactly these reasons.
- **The honest promise.** A non-coder can **spec, prototype, evaluate, govern, and direct** — and
  **know when to bring in an engineer**. Not "replace engineers for production."

## Decision framework

```decision
title: Can this ship on AI build alone, or do I need an engineer?
Prototype / internal / low-stakes / reversible? → AI build + your verification is appropriate.
Touches money, security, personal/health data, safety, or legal commitments? → Bring in a qualified engineer before production.
Will many people or customers depend on it at scale? → Production hardening needs engineering.
Regulated sector? → Expect to require qualified review/sign-off.
Can you (or tests) actually verify it's correct AND safe? → If not, that's the line — escalate.
```

## How it works

You use AI build freely for what it's great at — prototypes, internal tools, automations — applying
your verification (previous lessons). When a system crosses into production, security-sensitivity,
scale, regulation, or anything you can't verify, you bring engineering in: sometimes to review and
harden the AI-built prototype, sometimes to rebuild the critical parts properly. The prototype is
rarely wasted — it's a precise, working spec that makes the engineer's job faster. Knowing where the
line is, and crossing it deliberately, is the skill.

## Common mistakes

- **Shipping AI-built code to production** as if "works in a demo" = "production-ready."
- **Assuming AI writes secure code** — it frequently doesn't, and you can't catch the subtle flaws.
- **Treating a prototype as the finished product** rather than a head start for engineering.
- **Over-correcting** — refusing AI build even for safe prototypes (losing huge value).
- **Hiding the limits** from stakeholders, then facing an incident.

## Real business examples

- A founder builds a working prototype with AI, validates the concept with users, then hands it to
  engineers to security-review and productionise — the prototype accelerates them rather than
  replacing them.
- A team almost ships an AI-built feature handling customer payments until they recognise it's over
  the line; an engineer reviews it and finds (and fixes) a security flaw the non-coders couldn't
  have seen.
- An internal tool with no sensitive data and low stakes ships on AI build alone — correctly, given
  the stakes.

## Governance considerations

```governance
This is a governance lesson as much as a technical one. Responsible AI build means matching assurance to stakes: prototypes and internal tools can ride on your verification; production-critical, security-sensitive, or regulated systems require qualified engineering review and sign-off — which is also audit evidence. Be transparent with stakeholders about what was AI-built and what was engineer-reviewed; "the AI wrote it" is never a defence for a production incident. Knowing and communicating these limits is part of being in control — the whole point of the Governance pillar.
```

## How an architect thinks

```architect
The architect is bullish on AI build for prototypes, internal tools, and acceleration — and clear-eyed that production, security, scale, and regulation need real engineering. They treat the AI-built prototype as a precise working spec that makes engineers faster, not as the finished product. They draw the line by stakes and verifiability, cross it deliberately (engineer in), and never hide it from stakeholders. Honesty about the limits is exactly what lets them use AI build aggressively where it's safe.
```

## Key takeaways

- AI build is **excellent for prototypes, internal tools, automations, and accelerating
  engineers** — and **limited** for **security, maintainability, complex correctness, and production
  hardening**.
- The honest promise: **spec, prototype, evaluate, govern, direct — and know when to bring in an
  engineer.** Not "replace engineers for production."
- **Match assurance to stakes**; cross the line to engineering **deliberately** for high-stakes
  systems.
- A prototype is a **head start (a working spec)** for engineering, not the finished product — and
  honesty about limits is **good governance**.

## Self-check

1. What is AI-built code genuinely great for, and where does it fall short?
2. What's the honest version of "non-coders can build with AI"?
3. How do you decide when a build must go to a qualified engineer?
