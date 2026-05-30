---
title: "Hallucination management & human approval"
track: 05-governance
order: 12
summary: Designing for the certainty that AI will sometimes be confidently wrong — grounding, confidence, and human gates.
readingTime: 7
prerequisites:
  - "Evaluation, hallucinations & scaling laws"
  - "Retrieval-Augmented Generation (RAG)"
tags:
  - governance
  - hallucination
  - human-in-the-loop
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

Models hallucinate — they produce confident, fluent statements that are simply false. You can't
eliminate this (it's how they work), so governance means **designing for it**: grounding answers
in real sources, surfacing uncertainty, and putting humans in the loop where being wrong is
costly. This lesson turns "the AI might be wrong" from a worry into a managed control.

## Why this matters

The damage from hallucination isn't the wrong answer itself — it's *acting on it unchecked*. A
hallucinated legal citation, medical claim, or financial figure that flows straight into a
decision is where harm happens. Manage the path from output to action, and you contain the risk
even though the model remains fallible.

## Core concepts

- **Hallucination is inherent, not a bug to patch.** Models generate *plausible* text, not
  *verified* truth. Manage, don't expect to remove.
- **Grounding (RAG).** Tie answers to retrieved real sources and require **citations** so claims
  are checkable — the single most effective mitigation.
- **Confidence & abstention.** Design systems to say "I'm not sure" or route to a human rather
  than always producing an answer. An AI that knows when to defer is safer.
- **Human-in-the-loop (HITL).** A person reviews or approves before high-stakes outputs take
  effect — the backstop for when grounding isn't enough.
- **Match control to stakes.** Low-stakes: let it run, spot-check. High-stakes/irreversible:
  mandatory human approval.

## Decision framework

```decision
title: How should I guard against acting on a hallucination?
Low stakes, easily corrected (e.g. internal brainstorming)? → Let it run; spot-check quality.
Factual answers users will rely on? → **Ground in sources + require citations**; users can verify.
High-stakes or irreversible (legal, medical, financial, external comms)? → **Mandatory human approval** before it takes effect.
The model is uncertain or out of scope? → Design it to **abstain or escalate**, not to guess.
Can't make errors catchable or acceptable? → Reconsider whether to automate this at all.
```

## How it works

You build a pipeline from output to action with checks sized to the stakes. For factual systems,
retrieval grounds the answer and citations let anyone verify it. You can add confidence signals
(e.g. flag low-grounding answers) and abstention ("I don't have a source for that"). For
consequential actions, a human approves before execution — the model *recommends*, the human
*decides*. Monitoring and evaluation (earlier lessons) tell you the real error rate so you can
tune where humans are needed.

## Common mistakes

- **Expecting a "non-hallucinating" model.** None exists; design for fallibility.
- **Ungrounded answers presented as fact**, with no sources to check.
- **Auto-executing high-stakes actions** on raw model output — the core danger.
- **Forcing an answer always.** A model that can't say "I don't know" will confidently make
  something up.
- **Human approval in name only** — rubber-stamping without real review defeats the control;
  design approvals to be meaningful (give the reviewer the basis and time).

## Real business examples

- A **legal research tool** requires every answer to cite a source document and routes
  low-confidence queries to a lawyer — hallucination becomes catchable, not dangerous.
- A **support bot** answers routine questions from grounded help content but escalates anything it
  can't ground, and requires human approval for refunds.
- A **medical information assistant** presents sourced information with confidence indicators and
  hard-stops on giving treatment decisions, deferring to clinicians.

## Governance considerations

```governance
Hallucination management is a headline governance control, especially in regulated and high-stakes domains. Document your approach — grounding, citations, abstention, and where human approval is required — because it's exactly what risk registers, auditors, and the EU AI Act's human-oversight expectations look for. Ensure approvals are *real*: give reviewers the answer's basis (sources) and enough time, so oversight isn't a rubber stamp. And keep measuring the error rate (evaluation/monitoring) to place human gates where they actually matter.
```

## How an architect thinks

```architect
The architect assumes the model *will* be confidently wrong and asks "what happens then?" They engineer the output-to-action path: ground and cite so errors are visible, let the system abstain instead of guessing, and gate consequential actions behind a human who has the basis to judge. The level of control tracks the stakes and the measured error rate — heavy where being wrong is costly, light where it isn't. The model's fallibility is a fixed input to the design, not a surprise.
```

## Key takeaways

- Hallucination is **inherent** — design for it; you can't remove it.
- **Grounding + citations** is the top mitigation; add **abstention** so the system can say "I
  don't know."
- **Human approval** for high-stakes/irreversible outputs — and make it **meaningful**, not a
  rubber stamp.
- **Match control to stakes and measured error rate**; document it as a governance control.

## Self-check

1. Why is "we'll find a model that doesn't hallucinate" the wrong plan?
2. What two design features make hallucinations catchable rather than dangerous?
3. What makes a human-approval step real rather than a rubber stamp?
