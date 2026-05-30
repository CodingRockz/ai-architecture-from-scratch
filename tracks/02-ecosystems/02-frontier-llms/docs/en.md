---
title: "Frontier LLMs (Claude, GPT, Gemini)"
track: 02-ecosystems
order: 2
summary: The most capable closed models — what they're best at, how they differ, and how to choose without religion.
readingTime: 7
prerequisites:
  - "The map of the AI ecosystem"
tags:
  - ecosystems
  - llms
  - frontier-models
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Models overview — https://docs.anthropic.com/en/docs/about-claude/models"
  - "Stanford HAI — Artificial Intelligence Index Report 2025 — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

**Frontier LLMs** are the most capable general-purpose language models available, offered as
hosted services (you call an API; you don't run them). The big families are **Claude**
(Anthropic), **GPT** (OpenAI), and **Gemini** (Google), with others close behind. They're the
default choice when you want maximum capability with minimum infrastructure.

## Why this matters

For most businesses, a frontier model via API is the fastest, lowest-effort way to get
excellent results — no GPUs, no hosting, no ML team. The choice between them matters less than
people think (they're broadly comparable and leapfrog each other), but knowing how to choose,
and *not* getting locked into one, is a real skill.

## Core concepts

- **Closed / hosted.** You access them over an API; the weights aren't yours to run. You trade
  control for convenience and capability.
- **They leapfrog constantly.** Whoever is "best" changes every few months. Designing your
  system so you can **switch models** is worth more than betting on a permanent winner.
- **Tiers within each family.** Each provider offers a range — a top model (most capable,
  priciest), a mid model (balanced), and a small/fast model (cheap, for high volume). Match the
  tier to the task, don't default to the biggest.
- **Differentiators are modest and shifting:** reasoning quality, coding, long-context
  handling, multimodal strengths, safety behaviour, latency, and price. Test on your task.

## Decision framework

```decision
title: Which frontier model should I use?
Maximum reasoning/coding quality, cost secondary? → Whichever top-tier model wins on *your* eval right now (re-check quarterly).
High volume, simpler tasks? → A small/fast tier from any provider — don't pay frontier prices for easy work.
Already in a cloud ecosystem (e.g. Azure, Google Cloud)? → The integrated model can simplify procurement and data handling.
Worried about lock-in? → Build behind an abstraction so you can swap providers; don't hard-wire one.
Sensitive data / residency needs? → Check each provider's data, region, and retention terms — or consider open models (next lesson).
```

## How to choose without religion

People form tribal attachments to model brands. Don't. The professional approach:

1. Define your real task and a small evaluation set.
2. Try 2–3 frontier models on it.
3. Compare quality, latency, and cost-per-successful-task.
4. Pick the best for now — and keep your code able to switch.

## Common mistakes

- **Brand loyalty over evaluation.** The "best" model is task- and time-specific; measure.
- **Using the top tier for everything**, including trivial tasks — a common, expensive habit.
- **Hard-wiring one provider** so deeply that switching later is painful (vendor lock-in).
- **Ignoring the data terms.** Free/consumer tiers may use your data differently than business
  tiers — read them, especially for sensitive data.

## Real business examples

- A startup runs the same 40-example eval across three frontier models and finds the
  *cheapest* one is good enough for their use — saving materially at scale.
- A company routes hard requests to a top-tier model and the bulk of easy ones to a small tier,
  cutting cost without hurting quality (model routing, see Architecture track).

## Tools in this category

```toolcard
name: Frontier LLM APIs
category: Hosted, closed, general-purpose language models
use: Top-tier reasoning, writing, coding, and multimodal — with zero infrastructure
alternatives: Claude (Anthropic), GPT (OpenAI), Gemini (Google), Grok, others
when: You want maximum capability fast and are comfortable sending data to a provider
whennot: Strict data-residency/confidentiality needs, or you must avoid per-call costs at scale — consider open models
```

## Governance considerations

```governance
With hosted frontier models, your data leaves your environment. Govern accordingly:
- **Data terms.** Confirm whether prompts are used for training and how long they're retained. Business/enterprise tiers usually offer stronger guarantees than consumer ones — verify, don't assume.
- **Residency.** Check which regions process your data; some providers offer regional or in-cloud options.
- **Lock-in.** Reliance on one provider is a strategic risk — abstract your integration so you can switch.
- **Model updates.** Providers update models silently; re-run your evals after changes, since behaviour can shift.
```

## How an architect thinks

```architect
The architect treats frontier models as interchangeable, improving commodities — powerful, but not something to marry. They design an abstraction layer so the model is a swappable component, choose tiers per task by cost-per-successful-task, and re-evaluate on a schedule. The question is never "which model is best?" but "which model is best for this task, this quarter, at this price — and how fast can we switch when that changes?"
```

## Key takeaways

- Frontier LLMs (**Claude, GPT, Gemini**) are **hosted, closed, maximally capable** — zero
  infrastructure.
- They **leapfrog**; **switchability beats loyalty**. Build behind an abstraction.
- Use **tiers** — top model for hard tasks, small/fast for high-volume — don't default to
  biggest.
- Hosted means **your data leaves**; govern data terms, residency, lock-in, and silent updates.

## Self-check

1. Why is designing for model-switching more valuable than picking a "best" provider?
2. What is "cost-per-successful-task" and why use it to choose?
3. Name two governance checks specific to hosted frontier models.
