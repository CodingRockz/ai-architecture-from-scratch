---
title: "Fallback, disaster recovery & model lifecycle"
track: 05-governance
order: 14
summary: Staying resilient when AI fails, providers change, or models get deprecated — the operational continuity of AI.
readingTime: 7
prerequisites:
  - "Vendor risk, lock-in & procurement"
  - "Evaluation, hallucinations & scaling laws"
tags:
  - governance
  - resilience
  - lifecycle
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

AI systems fail and change: providers have outages, models get **deprecated** or silently
updated, quality drifts, costs spike. **Fallback** (what happens when the AI is unavailable or
wrong), **disaster recovery** (restoring service after a failure), and **model lifecycle
management** (handling model versions and retirements) are how you keep operating through all of
it. This is the resilience dimension of governance.

## Why this matters

If a core business process depends on an AI that can vanish, change behaviour overnight, or be
wrong, you need a plan — or one bad day takes you down. Providers regularly retire model versions
and push updates that change outputs; treating "the model" as a permanent fixture is a mistake.
Resilience planning turns these foreseeable events into non-events.

## Core concepts

- **Fallback / graceful degradation.** What the system does when the AI is down, slow, or
  uncertain: queue for later, route to a human, use a simpler backup model, or fail safely with a
  clear message — never silently break.
- **Disaster recovery.** Procedures to restore service after an outage (provider down, key
  revoked, region offline), including a secondary provider/model if the function is critical.
- **Model lifecycle.** Models are versioned and retired. Providers **deprecate** old versions
  (forcing migration) and **update** models (changing behaviour). You must track versions, test
  before migrating, and re-evaluate after changes.
- **Silent updates are a real risk.** A hosted model can change under you; your evaluation suite
  (earlier lessons) is how you detect resulting behaviour shifts.

## Decision framework

```decision
title: Planning resilience for an AI feature
Is the feature business-critical? → Need a fallback (human or backup model) and a documented recovery plan; consider a second provider.
What if the AI is down or slow? → Define graceful degradation: queue, human handoff, or safe failure — not a silent break.
Relying on a specific model version? → Track its lifecycle; watch deprecation notices; keep an abstraction so you can switch.
After any model change/update? → Re-run your evaluation suite before trusting it in production.
Low-stakes, non-critical? → A simple "try again later" fallback may be enough — right-size it.
```

## How it works

You identify how critical each AI function is, then plan for its failure modes proportionately.
For critical functions: a fallback path (human or backup model), a recovery procedure, and ideally
a secondary provider you can switch to (enabled by the abstraction layer from the vendor lesson).
For model lifecycle: pin/track which version you use, monitor provider deprecation timelines, and
**re-evaluate** whenever you migrate or the provider updates — catching behaviour shifts before
customers do. Your evaluation suite and monitoring are the early-warning system.

## Common mistakes

- **No fallback** — the AI goes down and the whole process stops (or worse, fails silently).
- **Single provider for a critical path** with no alternative ready.
- **Ignoring deprecation notices** until a model is switched off and the feature breaks.
- **Trusting a model after a silent update** without re-evaluating — quality can shift overnight.
- **Over-engineering resilience for trivial features** — match the effort to criticality.

## Real business examples

- A company keeps a secondary model provider configured behind its abstraction layer; when the
  primary has an outage, traffic fails over and customers barely notice.
- A team gets a deprecation notice for the model version they use, tests the successor against
  their evaluation suite, fixes a prompt regression, and migrates smoothly before the cutoff.
- A support bot degrades gracefully during a provider outage by queuing requests and offering a
  human handoff, instead of throwing errors at customers.

## Governance considerations

```governance
Resilience is governance because availability and consistency are part of staying in control. Include AI failure and model-change scenarios in your risk register, with documented fallback and recovery plans for critical functions and named owners. Tie lifecycle management to evaluation: a re-evaluation gate before every migration or after a provider update is both quality assurance and compliance evidence (you can show the system stayed accurate through change). The vendor-lock-in controls (abstraction, exportable data, second provider) are what make fast recovery possible.
```

## How an architect thinks

```architect
The architect assumes the AI *will* be unavailable, wrong, or changed at some point, and designs the system to survive it: graceful degradation rather than silent breakage, a human or backup path for critical functions, and an abstraction that makes switching providers fast. They treat models as versioned, perishable components — tracked, tested on migration, re-evaluated after updates — not permanent fixtures. Resilience effort scales with how much the business depends on the function.
```

## Key takeaways

- Plan for failure and change: **fallback/graceful degradation, disaster recovery, and model
  lifecycle management.**
- Critical functions need a **fallback (human or backup model)** and ideally a **second provider**
  (enabled by an abstraction layer).
- Models are **versioned and perishable** — track deprecations, and **re-evaluate after every
  migration or silent update.**
- It's a **governance/resilience** concern — document plans, owners, and the re-evaluation gate;
  right-size to criticality.

## Self-check

1. What is graceful degradation, and why is silent failure worse than a clear failure?
2. Why must you re-evaluate after a provider updates a model?
3. What makes fast failover to another provider possible?
