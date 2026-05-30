---
title: "Reasoning models & test-time compute"
track: 07-future
order: 1
summary: Models that "think" longer before answering — what changed, what it's good for, and what it costs.
readingTime: 7
prerequisites:
  - "Transformers & attention"
  - "Training vs inference"
tags:
  - future
  - reasoning
lastReviewed: 2026-05-30
sources:
  - "Stanford HAI — Artificial Intelligence Index Report 2025 — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

A major recent shift: **reasoning models** that spend more compute *at answer time* — effectively
"thinking" longer, working through steps internally — to solve harder problems. This "test-time
compute" trades extra time and cost for better answers on complex tasks. It's reshaping what AI can
do and how we pay for it.

## Why this matters

Reasoning models opened up tasks that stumped earlier models (hard math, complex coding,
multi-step planning). But they cost more and respond slower, so knowing *when* the extra reasoning
is worth it — versus a fast, cheap model — is a live architectural decision, not just a curiosity.

## Core concepts

- **Test-time compute.** Instead of just scaling training, you let the model do more work per query
  (more internal steps, exploring approaches) to improve answers. More "thinking" = better on hard
  problems, but slower and pricier.
- **Reasoning vs standard models.** Reasoning models excel at complex, multi-step problems; standard
  (faster) models are better for simple, high-volume, latency-sensitive tasks. It's a routing
  decision (Track 4).
- **A new scaling axis.** As gains from sheer model size got harder, test-time compute became a
  complementary way to improve performance — "think longer" rather than only "be bigger."
- **Visible vs hidden reasoning.** Some models expose their step-by-step thinking; you can often
  control how much reasoning effort to spend.

## How to think about it

```architect
The architect treats reasoning as a dial with a price: spend more test-time compute on the hard, high-value problems where a better answer is worth the latency and cost, and use fast standard models for the easy, high-volume majority. It's the routing mindset (Track 4) applied to "how hard should the model think?" — match reasoning effort to problem difficulty and stakes, not maximise it everywhere.
```

## Decision framework

```decision
title: Reasoning model or standard model?
Hard, multi-step problem (complex analysis, math, planning, tricky code)? → Reasoning model — the extra thinking pays off.
Simple, high-volume, latency-sensitive task? → Standard fast model — don't pay for reasoning you don't need.
Mixed workload? → Route by difficulty (reasoning for hard, fast for easy) — Track 4.
Cost/latency-sensitive but need some reasoning? → Tune the reasoning effort if the model allows.
```

## Common mistakes

- **Using reasoning models for everything** — overpaying and adding latency on easy tasks.
- **Using fast models for genuinely hard problems** and getting shallow answers.
- **Assuming "thinks longer" = "always right"** — reasoning improves but doesn't eliminate errors;
  still validate.
- **Ignoring the cost/latency jump** when adopting reasoning models at scale.

## Real business examples

- A firm routes complex contract analysis to a reasoning model and routine classification to a fast
  one — best results where it matters, low cost elsewhere.
- A team enables higher reasoning effort only for its hardest support escalations, keeping everyday
  queries fast and cheap.

## Governance considerations

```governance
Reasoning models change the cost and latency profile (a cost-governance concern — they can be much pricier per query) and, where reasoning is visible, may expose intermediate "thoughts" that could include sensitive content in logs — handle those traces as sensitive. They also still hallucinate, so the same grounding and human-oversight controls apply; "it reasoned about it" is not a guarantee of correctness. Treat reasoning effort as a cost lever to budget and route, and keep validating outputs.
```

## Key takeaways

- **Reasoning models** spend more **test-time compute** to "think longer," excelling at hard,
  multi-step problems — at higher cost and latency.
- It's a **new scaling axis** ("think longer," not just "be bigger").
- **Route by difficulty**: reasoning for hard/high-value, fast models for easy/high-volume.
- They **still hallucinate** and cost more — keep validation and cost governance.

## Self-check

1. What does "test-time compute" mean, and what does it trade?
2. When is a reasoning model worth its extra cost and latency?
3. Why isn't "it thought longer" a guarantee of a correct answer?
