---
title: "Measuring impact"
track: 03-operations
order: 12
summary: Frameworks to prove whether AI actually improved productivity and quality — and to keep improving it.
readingTime: 7
prerequisites:
  - "AI ROI analysis"
  - "Evaluation & observability tooling"
tags:
  - operations
  - metrics
  - impact
lastReviewed: 2026-05-30
sources:
  - "Stanford HAI — Artificial Intelligence Index Report 2025 — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

After deploying AI, can you prove it worked? **Measuring impact** is defining the right metrics,
capturing a baseline, and tracking outcomes — so you know whether the AI delivered, can defend the
investment, and can improve it. Without measurement, you're running on anecdote and hope.

## Why this matters

Leaders increasingly ask "what did our AI investment actually deliver?" Teams that can answer with
data get more trust and budget; teams that can't lose both. Measurement also turns AI from a
one-off launch into a continuously improving capability, and it's the evidence base for governance
and ROI.

## Core concepts

- **Baseline first.** Measure the *before* (time taken, error rate, cost, satisfaction) so you can
  show the *change*. No baseline = no proof.
- **Pick metrics that map to the goal:**
  - **Productivity:** time saved, throughput, cost per task, cycle time.
  - **Quality:** error/rework rate, accuracy, consistency, customer satisfaction.
  - **Outcome/business:** revenue, conversion, retention, risk/compliance incidents.
  - **Adoption:** are people actually using it? (A leading indicator of value.)
- **Beware vanity & gaming.** "Number of AI queries" isn't value. And people optimise what you
  measure — choose metrics that can't be hit while missing the point.
- **Attribute carefully.** Did the AI cause the change, or something else? Where you can, compare
  against a control or a clear before/after.
- **Watch for hidden costs/quality dips.** Faster but more errors isn't a win; measure quality
  alongside speed.

## Decision framework

```decision
title: Building an impact measurement for an AI initiative
Did you capture a baseline before launch? → If not, do it now (or reconstruct it) — change needs a reference point.
Do your metrics map to the real goal (not vanity)? → Drop "usage counts"; measure outcomes.
Are you tracking quality alongside productivity? → Speed at the cost of errors isn't impact.
Are you measuring adoption? → Low adoption explains low impact and is fixable.
Can you reasonably attribute the change to the AI? → Use before/after or a control to avoid false credit/blame.
```

## How it works

Before launch, define the metrics tied to the opportunity's goal and capture the baseline. After
launch, track them continuously (using the observability/evaluation layer for quality and the cost
tooling for spend), compare to baseline, and attribute as rigorously as you reasonably can. Feed
the results back: double down on what works, fix or kill what doesn't. Report impact in the
business's language (time, money, quality, risk), not AI jargon.

## Common mistakes

- **No baseline** — you can show "after" but not the *change*, so you can't prove impact.
- **Vanity metrics** — counting queries or "engagement" instead of outcomes.
- **Measuring speed, ignoring quality** — hiding a quality regression behind a productivity win.
- **No adoption metric** — missing the most common reason impact is low.
- **Set-and-forget** — measuring at launch then never again, so drift goes unnoticed.
- **Over-attributing** — crediting AI for changes it didn't cause (or vice versa).

## Real business examples

- A team captures baseline handling time and error rate, then shows the AI workflow cut time 60%
  with *lower* errors — a defensible win that unlocks more budget.
- A company discovers its AI tool's impact is low not because the tool is bad but because adoption
  is — and fixes the rollout (change management) rather than scrapping it.
- A leader kills an underperforming AI project early because the metrics (vs baseline) clearly
  show no net benefit — freeing resources for better bets.

## Governance considerations

```governance
Impact measurement and governance share infrastructure and evidence. The quality metrics come from the same evaluation/observability layer that supports auditing; cost metrics come from cost governance; and demonstrating sustained accuracy/quality over time is exactly what auditors and regulators want for high-stakes uses. Measuring impact also surfaces *negative* impacts (quality dips, new errors, fairness issues) early — making measurement a safety mechanism, not just a business one. Report honestly: inflated impact claims are a governance and trust risk.
```

## How an architect thinks

```architect
The architect bakes measurement in before launch: baseline captured, goal-aligned metrics chosen, quality tracked alongside speed, adoption watched, attribution planned. They treat impact data as the feedback loop that turns a launch into a compounding capability — and as the honest basis for doubling down, fixing, or killing. They report in the business's currency (time, money, quality, risk), because impact that can't be communicated can't be funded.
```

## Key takeaways

- **Baseline first**, then track **goal-aligned** metrics: productivity, quality, business
  outcomes, and **adoption**.
- Avoid **vanity metrics** and **measure quality alongside speed**; **attribute** carefully.
- Use the **observability/evaluation/cost** layers as your measurement infrastructure.
- Measurement proves ROI, drives improvement, **surfaces negative impacts early**, and is
  **governance evidence** — report it honestly.

## Self-check

1. Why is capturing a baseline essential?
2. Give a vanity metric and a better outcome metric for an AI support tool.
3. How does measuring impact double as a safety/governance mechanism?
