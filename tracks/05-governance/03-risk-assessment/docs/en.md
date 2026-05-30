---
title: "AI risk assessment & risk registers"
track: 05-governance
order: 3
summary: A practical way to find, rate, and track what could go wrong with an AI system — before it does.
readingTime: 7
prerequisites:
  - "Building an AI governance framework"
  - "Thinking in systems and trade-offs"
tags:
  - governance
  - risk-assessment
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
  - "OWASP Top 10 for LLM Applications (2025) — https://genai.owasp.org/llm-top-10/"
---

## Overview

Risk assessment is the disciplined version of "what could go wrong here?" For an AI system you
list the plausible failures and attacks, rate each by how likely and how damaging it is, decide
how to mitigate it, and track it all in a **risk register**. It sounds formal; it can be a
one-page table. The point is to think it through *before* deployment, not after an incident.

## Why this matters

AI systems fail in ways ordinary software doesn't (hallucination, prompt injection, bias, silent
model drift). Without a structured pass, you'll miss some — usually the expensive ones. A risk
register also turns vague anxiety into a concrete, prioritised to-do list, and becomes evidence
for audits and stakeholders.

## Core concepts

- **Risk = likelihood × impact.** A small chance of a catastrophe and a frequent minor nuisance
  are different; rate both dimensions.
- **Categories to scan** (so you don't miss any): accuracy/hallucination, data privacy/leakage,
  security (injection, poisoning), bias/fairness, compliance/legal, cost/availability,
  vendor/lifecycle. (The OWASP LLM Top 10 is a great checklist for the security-flavoured ones.)
- **Mitigation types:** avoid (don't do the risky thing), reduce (controls like human approval),
  transfer (insurance, vendor terms), accept (consciously, if low). 
- **A risk register** is just a living table: risk, likelihood, impact, owner, mitigation,
  status.

## Visual explanation

```mermaid
%% alt: A risk matrix with likelihood on one axis and impact on the other. High likelihood and high impact is the priority zone to mitigate first.
quadrantChart
  title Likelihood vs impact
  x-axis Low likelihood --> High likelihood
  y-axis Low impact --> High impact
  quadrant-1 Mitigate first (priority)
  quadrant-2 Have a plan / monitor
  quadrant-3 Accept & note
  quadrant-4 Reduce likelihood
```

## How it works

For a given AI system, walk the categories above and write down each plausible failure. Rate
likelihood and impact (even just low/medium/high). Sort by the combination. For the top risks,
assign an owner and a concrete mitigation, and record the residual risk you're accepting. Revisit
the register periodically and after changes — risks shift as the system, data, and models evolve.

This isn't bureaucracy for its own sake; it's how you make sure the *important* risks get
attention and the trivial ones don't consume it.

## Decision framework

```decision
title: What do I do with each identified risk?
High likelihood AND high impact? → **Mitigate now** before deploying (controls, redesign, or don't ship it).
High impact, low likelihood? → Have a **plan and monitoring** (fallback, detection) even if rare.
Low impact, high likelihood? → **Reduce** if cheap; otherwise accept the nuisance.
Low/low? → **Accept and note** — don't over-invest.
Can't reduce a high risk acceptably? → Reconsider whether this AI use should happen at all.
```

## Common mistakes

- **Skipping it because "the demo works."** Demos show the happy path; risk assessment is about
  the unhappy ones.
- **Only listing technical risks.** Compliance, bias, cost, and vendor risks bite just as hard.
- **A one-time exercise.** Risks change; the register is living, reviewed after each significant
  change (including silent model updates).
- **No owners.** A risk without an owner is a risk nobody's handling.
- **Analysis paralysis.** Keep it proportionate — a focused one-pager beats an unread tome.

## Real business examples

- Before launching an AI support bot, a team's register flags "bot gives confidently wrong refund
  info" (high impact) → mitigation: restrict it to retrieval-grounded answers + human approval
  for refunds. Caught in planning, not production.
- A lender's register flags bias risk in AI scoring → mitigation: fairness testing + human review
  + audit logging, satisfying both ethics and regulators.

## Governance considerations

```governance
The risk register is a cornerstone governance artifact — it's how the framework's "Map" and "Manage" functions become concrete, and it's exactly what auditors, clients' security teams, and regulators ask to see. Keep it current, assign owners, and link mitigations to the relevant controls in this track (privacy, access control, human approval, logging, fallback). Document *accepted* risks explicitly too — conscious acceptance is governance; silent ignorance is not.
```

## How an architect thinks

```architect
The architect runs a risk pass as naturally as a cost estimate. They scan every category (not just the technical ones), rate by likelihood × impact, and spend their mitigation budget on the top-right quadrant — high/high — while consciously accepting the trivial. They treat "we can't mitigate this to an acceptable level" as a legitimate reason to *not build* something. The register isn't paperwork; it's the prioritised plan for keeping the system safe.
```

## Key takeaways

- Risk assessment = **list failures, rate likelihood × impact, mitigate the worst, track in a
  register.**
- **Scan all categories** (accuracy, privacy, security, bias, compliance, cost, vendor) — use
  OWASP/NIST as checklists.
- Mitigation options: **avoid, reduce, transfer, accept** (consciously).
- The **register is living**, owned, and is key **audit evidence**; "can't mitigate" can mean
  "don't build."

## Self-check

1. What two dimensions define a risk's priority?
2. Name three risk categories beyond pure security.
3. What are the four ways to treat a risk, and when would you "accept" one?
