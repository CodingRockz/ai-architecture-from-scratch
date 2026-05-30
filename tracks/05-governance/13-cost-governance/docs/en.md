---
title: "Cost governance"
track: 05-governance
order: 13
summary: Preventing AI spend from spiralling — visibility, budgets, limits, and design choices that control cost.
readingTime: 7
prerequisites:
  - "Tokens & tokenization"
  - "Evaluation & observability tooling"
tags:
  - governance
  - cost
  - finops
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Models overview (pricing & token usage) — https://docs.anthropic.com/en/docs/about-claude/models"
---

## Overview

AI usage costs money per request, and at scale — or with misbehaving systems — it can spiral fast
and quietly. **Cost governance** is keeping AI spend visible, predictable, and controlled, through
a mix of monitoring, budgets, hard limits, and cost-aware design. It's the financial dimension of
staying in control.

## Why this matters

Unmanaged AI cost is one of the most common unpleasant surprises: a runaway agent loop, an
over-verbose prompt path, or simple growth turning a small bill into a large one. Beyond avoiding
shock invoices, cost discipline is what makes AI features *sustainably* viable — many projects die
not because they don't work, but because they don't work *economically*.

## Core concepts

- **Cost is per-token (mostly).** Input + output tokens × price × volume. Output is often pricier;
  long contexts and chatty responses add up. (See the tokens lesson.)
- **The cost drivers:** model choice (frontier vs small), context size (huge prompts/RAG dumps),
  output length, request volume, retries, and agent loops (which can multiply calls).
- **Visibility first.** You can't govern what you can't see — observability/usage dashboards are
  the foundation.
- **Controls:** budgets and alerts, hard rate/spend limits, caps on agent steps and tokens, and
  caching of repeated requests.
- **Cost-aware design:** model routing (small models for easy tasks), retrieval instead of dumping
  documents, trimming conversation history, and right-sizing.

## Decision framework

```decision
title: Controlling cost for an AI feature
Do you have visibility into per-feature/per-user spend? → If not, add it first (observability) — blind cost is uncontrolled cost.
Using a frontier model for everything? → Route easy/high-volume work to smaller models (big savings).
Sending large contexts every call? → Use retrieval + history trimming to cut tokens.
Running agents? → Cap steps, tool calls, and tokens per task to prevent runaway loops.
Repeated identical requests? → Cache results.
Need a safety net? → Set budgets, alerts, and hard spend/rate limits so a bug can't bankrupt a project.
```

## How it works

You start with visibility (dashboards showing spend by feature, model, and ideally user/customer),
then apply controls and design choices to the biggest drivers. Most savings come from a few moves:
routing easy work to cheaper models, sending less context (retrieval over dumping), trimming
outputs and history, caching, and capping agent loops. Hard limits and alerts are the safety net
that turns a potential runaway into a contained blip.

## Common mistakes

- **No visibility** — discovering cost on the monthly invoice instead of in a dashboard.
- **Frontier model for everything**, including trivial tasks — often the biggest waste.
- **Unbounded agents** — loops with no step/token cap can rack up huge bills fast.
- **Dumping whole documents** into prompts instead of retrieving relevant chunks.
- **No alerts or hard limits** — a bug or abuse spike then runs unchecked.
- **Optimising cost before it matters** — at tiny scale, don't over-engineer; add controls as
  volume grows.

## Real business examples

- A team adds per-feature cost tracking and finds one verbose prompt path drives 30% of spend —
  a quick fix.
- A product routes the 80% of easy requests to a small model and reserves the frontier model for
  hard ones, cutting the bill substantially with no quality loss where it matters.
- A company caps agent steps and sets a daily spend alert; when a deployment bug causes a loop,
  the alert and cap contain it to pennies instead of thousands.

## Governance considerations

```governance
Cost governance is part of staying in control, and it overlaps with security and reliability: a runaway loop is both a cost and an availability incident, and uncontrolled spend can be triggered by abuse (a form of denial-of-wallet attack). Treat budgets, alerts, and hard limits as standard controls, set ownership for AI spend, and include cost in your risk register (availability/financial risk). Visibility tooling here is the same observability layer that supports audit and quality — one investment, several governance payoffs.
```

## How an architect thinks

```architect
The architect designs for "cost per successful task," not just capability. They instrument spend, attack the biggest drivers (model size, context, output length, agent loops), and put hard limits in as a safety net — because an unbounded agent or an abuse spike shouldn't be able to bankrupt a feature. They also right-size the effort: minimal controls at tiny scale, tightening as volume grows. Economic viability is a design requirement, not an afterthought.
```

## Key takeaways

- AI cost = **tokens × price × volume**, driven by **model choice, context size, output length,
  volume, retries, and agent loops.**
- **Visibility first** (observability), then controls: **budgets, alerts, hard limits, caps on
  agent steps, caching.**
- **Cost-aware design** (model routing, retrieval, trimming) yields the biggest savings.
- Unmanaged cost is a **governance risk** (financial + availability, incl. "denial-of-wallet");
  own it and right-size controls to scale.

## Self-check

1. What are the main drivers of AI cost?
2. Why are hard limits and caps on agent loops important?
3. Name two cost-aware design choices that cut spend without hurting quality.
