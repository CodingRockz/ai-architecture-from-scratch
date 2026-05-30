---
title: "Evaluation & observability tooling"
track: 02-ecosystems
order: 11
summary: The tools that tell you whether your AI works and what it's doing in production — the layer most teams forget.
readingTime: 7
prerequisites:
  - "Evaluation, hallucinations & scaling laws"
tags:
  - ecosystems
  - evaluation
  - observability
lastReviewed: 2026-05-30
sources:
  - "LangSmith documentation — https://docs.smith.langchain.com/"
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

You can't manage what you can't measure. **Evaluation tools** test whether your AI produces
good outputs; **observability tools** show what it's actually doing in production — every
prompt, response, tool call, cost, and error. Names you'll hear: **LangSmith**, **DeepEval**,
**Langfuse**, **Arize/Phoenix**, **Braintrust**. This is the cross-cutting layer most teams
skip — and then can't tell if anything works.

## Why this matters

Without evaluation, you ship on vibes and discover failures via angry customers. Without
observability, you're blind to cost spikes, errors, latency, and misuse. Together they turn AI
from a hopeful black box into a system you can improve, control, and defend in an audit. This
layer is also where much of your governance evidence comes from.

## Core concepts

- **Evaluation tooling:** helps you build test sets, run outputs against them, and score quality
  (exact match, human review, or LLM-as-judge), then track scores over time and across model
  versions. (DeepEval, Braintrust, LangSmith evals.)
- **Observability / tracing:** records each request end-to-end — prompts, retrieved chunks, tool
  calls, responses, tokens, latency, cost, errors — so you can debug and monitor. (LangSmith,
  Langfuse, Arize/Phoenix.)
- **They connect:** production traces become test cases; evaluation results guide what to fix.
- **Monitoring & alerts:** flag cost spikes, error rates, latency regressions, and quality
  drops — including after a model update.

## Decision framework

```decision
title: What do I need from this layer?
About to ship anything users rely on? → At minimum, an **evaluation** set so you know quality before launch.
Running in production? → **Observability/tracing** for cost, latency, errors, and debugging — non-negotiable.
Regulated / high-stakes? → Both, plus retained logs as **audit evidence** and quality/safety monitoring.
Just prototyping for yourself? → Lightweight checks are fine — but add this layer before real users arrive.
```

## How it works

An observability tool sits around your AI calls and records a "trace" of everything that
happened, viewable later. An evaluation tool runs your system against a curated set of cases and
scores the outputs, so you can compare prompts, models, or versions objectively. In practice you
use real production traces (from observability) to grow your evaluation set, creating a loop that
keeps quality honest as things change.

## Common mistakes

- **Skipping this layer entirely** — the most common and most damaging omission; you fly blind.
- **Evaluating once, never again.** Quality drifts as inputs and models change; monitor
  continuously.
- **No cost monitoring** — AI bills can spike silently (runaway loops, verbose outputs).
- **Logging sensitive data carelessly** — traces often contain personal/confidential prompt
  content; that store is now sensitive (a governance duty, not just a convenience).

## Real business examples

- A team adds tracing and discovers 30% of cost came from one buggy, over-verbose prompt path —
  invisible until observed.
- A company builds a 100-case evaluation set; when a provider silently updates the model, their
  monitoring catches a quality drop the same day instead of weeks later via complaints.
- An auditor asks "how do you know your AI is accurate?" and the team answers with evaluation
  scores and retained traces — turning a scramble into a non-event.

## Tools in this category

```toolcard
name: Evaluation & observability tools
category: Measure quality and monitor AI in production (cross-cutting)
use: Test outputs, trace every request, track cost/latency/errors, catch regressions
alternatives: LangSmith, Langfuse, DeepEval, Arize/Phoenix, Braintrust
when: Before shipping (evaluation) and always in production (observability) — especially if regulated
whennot: Only the earliest throwaway prototypes — add before real users
```

## Governance considerations

```governance
This layer *is* much of your governance practice in tool form. Evaluation produces the evidence that your system is accurate and safe; observability logs produce the audit trail of what it did. Both are expected by frameworks like the NIST AI RMF and by regulators. Two duties: (1) **retain and protect** logs appropriately — they often contain sensitive prompt/response data, so the observability store is itself sensitive; (2) **re-evaluate after model changes**, since silent provider updates can shift behaviour. Skipping this layer isn't just risky engineering — it's a governance gap.
```

## How an architect thinks

```architect
The architect builds the instrument panel before the engine is trusted: an evaluation set first ("what does good look like, measurably?"), observability second ("what is it actually doing and costing?"). They treat this cross-cutting layer as mandatory, not optional polish — because a system you can't measure or see is one you can neither improve nor defend. It's also where most "is this safe and working?" questions get answered.
```

## Key takeaways

- **Evaluation** measures output quality; **observability** shows what the system does live
  (cost, latency, errors, traces).
- This **cross-cutting layer is the most-skipped** — and skipping it means flying blind.
- They form a **loop**: production traces become test cases; evals guide fixes.
- It's your main source of **governance/audit evidence**; protect the (sensitive) logs and
  **re-evaluate after model updates**.

## Self-check

1. What's the difference between evaluation and observability?
2. Why must evaluation continue after launch, not just before?
3. How does this layer support governance and audits?
