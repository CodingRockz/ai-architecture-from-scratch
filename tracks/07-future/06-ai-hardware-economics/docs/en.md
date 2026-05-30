---
title: "AI hardware & inference economics"
track: 07-future
order: 6
summary: The cost curves and hardware trends shaping what AI is affordable to do — and how that changes your options over time.
readingTime: 6
prerequisites:
  - "GPU & infrastructure basics"
  - "Training vs inference"
tags:
  - future
  - hardware
  - economics
lastReviewed: 2026-05-30
sources:
  - "Stanford HAI — Artificial Intelligence Index Report 2025 (cost trends) — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

What AI you can afford to do is shaped by hardware and **inference economics** — the cost of running
models, which has been falling rapidly even as capability rises. Understanding these trends helps
you anticipate what becomes feasible, and avoid over-committing to today's cost assumptions.

## Why this matters

The cost of a given AI capability has dropped dramatically and continues to fall, which means things
that are too expensive today may be cheap soon (and vice versa for capability you can get for the
same money). Strategic and architectural decisions with multi-year horizons should account for this
trajectory, not just today's prices.

## Core concepts

- **Inference cost is falling fast.** The price to achieve a given level of capability has dropped
  by large factors year over year (better hardware, efficiency, competition). Plan for "cheaper
  soon."
- **Capability per dollar is rising.** You get more for the same spend over time — small models keep
  getting better, making cheap/local options more viable.
- **Hardware drives it.** Specialised AI chips (and competition among them), plus software
  efficiency (quantization, better serving), compound the cost declines.
- **Concentration and supply.** AI compute is somewhat concentrated (a few chip makers, big cloud
  providers), creating supply, pricing, and geopolitical dynamics (next lessons).
- **Implication:** don't architect as if today's costs are permanent; keep options open to exploit
  falling costs and rising small-model capability.

## How to think about it

```architect
The architect factors the cost trajectory into multi-year decisions: capabilities that are marginal-on-cost today may be clearly worth it soon, and small/local models keep getting more capable per dollar (strengthening hybrid and edge options). They avoid locking into expensive assumptions, keep models swappable (so they can ride price/capability improvements), and treat compute concentration as a supply and continuity risk to watch.
```

## Decision framework

```decision
title: How should hardware/cost trends affect my decisions?
Capability marginal on cost today? → It may be clearly worthwhile soon; design so you can adopt it when costs drop.
Choosing model size? → Re-check periodically — small models keep getting better per dollar.
Long-horizon architecture? → Don't bake in today's prices; keep models/deployment swappable.
Depend heavily on one compute source? → Treat concentration as a supply/continuity risk (fallbacks, Track 5).
```

## Common mistakes

- **Assuming today's costs are permanent** — over- or under-investing based on a snapshot.
- **Ignoring rising small-model capability** — sticking with expensive frontier models for tasks
  small ones now handle.
- **Locking into one compute supplier** without regard to supply/pricing risk.
- **Over-reading short-term price moves** — focus on the multi-year trajectory.

## Real business examples

- A company that deemed a capability "too expensive" revisits it a year later when inference costs
  have fallen and finds it clearly worthwhile — because it kept the option open.
- A team periodically re-evaluates model size and migrates routine work to a now-good-enough smaller
  model, cutting cost as small-model capability rose.

## Governance considerations

```governance
Hardware economics intersect governance mainly through cost governance and continuity. Falling costs ease cost pressure but don't remove the need for budgets, limits, and monitoring (Track 5). Compute concentration is a continuity and even geopolitical risk: dependence on a narrow set of chip makers or cloud providers can affect availability and pricing, so critical workloads benefit from the fallback and vendor-diversification thinking from the governance track. Keep deployment swappable so you can respond to both cost improvements and supply shocks.
```

## Key takeaways

- **Inference cost is falling fast** and **capability per dollar is rising** — small/local models
  keep improving.
- Don't architect as if **today's costs are permanent**; keep models/deployment **swappable** to
  ride improvements.
- AI **compute is concentrated** — a supply, pricing, and continuity risk to watch.
- Trends ease cost but don't remove **cost governance**; factor the trajectory into long-horizon
  decisions.

## Self-check

1. What's happening to the cost of a given AI capability over time?
2. Why keep models swappable given these trends?
3. Why is compute concentration a governance/continuity concern?
