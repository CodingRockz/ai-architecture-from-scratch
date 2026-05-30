---
title: "Write its governance & risk plan"
track: capstone
order: 2
summary: Capstone part 2 — make your designed system safe and defensible with a real governance and risk plan.
readingTime: 8
prerequisites:
  - "Design an end-to-end AI system for a real business"
  - "AI risk assessment & risk registers"
tags:
  - capstone
  - governance
  - project
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
  - "EU Artificial Intelligence Act — https://artificialintelligence-act.eu/"
---

## Overview

A design isn't done until it's safe and defensible. Part 2 of the capstone is the **governance and
risk plan** for the system you designed — applying the whole Governance track to your specific
scenario. This is the deliverable that separates an architect from a tinkerer: you can show your
system is controllable, compliant, and resilient.

## Why this matters

In real organisations, the governance plan is what gets a system *approved* — by security, legal,
the board, or a regulator. It's also our headline differentiator as a course. Producing one for your
capstone proves you can deploy AI responsibly, not just build it.

## What the plan contains

Apply the Governance track (Track 5) to your design:

1. **Risk register.** List plausible failures/attacks (accuracy/hallucination, privacy/leakage,
   security/injection, bias, compliance, cost, vendor/lifecycle), rate by likelihood × impact, and
   give each a mitigation and owner.
2. **Data & privacy.** Classify the data; state residency/jurisdiction handling, minimisation, and
   where each class is allowed to go.
3. **Security.** Prompt-injection/poisoning/leakage defences; least privilege; trust boundaries;
   what's gated.
4. **Access control & usage policy.** Who/what can use it, with what data; per-user access at
   retrieval if RAG.
5. **Human oversight.** Where humans are in/on/out of the loop and why; meaningful approval for
   high-stakes actions.
6. **Compliance.** Applicable regimes (EU AI Act tier, sector rules); transparency duties; what you
   must document.
7. **Auditability.** What you log, how it's protected and retained.
8. **Cost governance.** Budgets, limits, monitoring.
9. **Resilience.** Fallback/graceful degradation, model lifecycle/re-evaluation, vendor/continuity.
10. **Accountability.** Who owns the system and its outcomes.

## Deliverable: a governance & risk plan

A document (2–4 pages) covering the above for your specific system — concrete, not generic. The risk
register is the centrepiece; the rest shows how each major risk is controlled.

```architect
A strong governance plan is *specific and proportionate*. It names this system's real risks (not boilerplate), rates them honestly, and matches controls to stakes — heavy where the impact is high, light where it isn't. It reads like something you could hand to a security team or regulator and have them say "yes, this is controlled." Generic or absent governance fails the capstone as surely as a broken design.
```

## Decision framework

```decision
title: Is my governance plan adequate?
Does the risk register cover all categories (accuracy, privacy, security, bias, compliance, cost, vendor)? → Fill any gaps.
Are risks rated and mitigated with named owners? → A risk without a rating/owner isn't managed.
Is data handling specific (classification, residency, minimisation)? → Generic privacy text isn't enough.
Are humans placed by stakes, with meaningful approval on high-impact actions? → Show where and why.
Is it proportionate? → Controls match the stakes — not too heavy, not too light.
Could you hand this to security/legal/a regulator? → That's the bar.
```

## Common mistakes

- **Generic boilerplate** instead of this system's real risks.
- **Risk register without ratings/owners/mitigations** — a list, not a plan.
- **Vague data handling** — no classification, residency, or minimisation specifics.
- **No human-oversight design** for high-stakes actions.
- **Disproportionate** — crushing controls on a trivial system, or none on a serious one.
- **Ignoring compliance/transparency** duties that apply.

## Use AI to help (and to stress-test)

```prompt
Act as a security and compliance reviewer. Here is my AI system design and draft governance/risk plan: [paste].
Stress-test it: what risks did I miss (use the OWASP LLM Top 10 and NIST AI RMF as references)? Are my ratings and mitigations realistic? Is data handling specific enough? Where is it too heavy or too light for the stakes? Would this satisfy a security team or regulator? Push back and suggest improvements.
```

## Governance considerations

```governance
This entire lesson is the governance consideration — but note the meta-point: a governance plan is only real if it's *lived*, not filed. Tie it to operations (the controls actually run), to evaluation/observability (the evidence exists), and to ownership (someone is accountable). For high-stakes or regulated scenarios, note explicitly where qualified legal/security professionals would be engaged — knowing the limit of your own competence is part of good governance, and part of a credible capstone.
```

## Key takeaways

- A design is done only when it's **safe and defensible** — part 2 is the **governance & risk plan**.
- Apply Track 5: **risk register (centrepiece), data/privacy, security, access, human oversight,
  compliance, auditability, cost, resilience, accountability.**
- Make it **specific and proportionate** — handable to security/legal/a regulator.
- A plan is only real if **lived** (controls run, evidence exists, someone owns it); note where
  **professionals** are needed.

## Self-check

1. What's the centrepiece of the governance plan, and what must each entry include?
2. Why must the plan be specific to your system rather than generic?
3. What does "proportionate" governance mean for your scenario?
