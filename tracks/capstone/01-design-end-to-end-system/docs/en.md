---
title: "Design an end-to-end AI system for a real business"
track: capstone
order: 1
summary: Capstone part 1 — put the whole course together: choose a real scenario and architect a complete AI system for it.
readingTime: 9
prerequisites:
  - "How an AI architect thinks"
  - "How to think like an AI transformation architect"
tags:
  - capstone
  - architecture
  - project
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

This is where it all comes together. The capstone is a three-part project: **design** a complete AI
system for a real business (this lesson), write its **governance & risk plan** (part 2), and
**spec and direct an AI agent to build a working slice** (part 3). Part 1 is the architecture — from
business need to a concrete, justified design.

## Why this matters

Anyone can absorb concepts; an architect *applies* them under real constraints. This project proves
you can take a messy business situation and produce a sound, governable, buildable design — the
defining capability of an AI architect, and the thing that makes you employable and credible.

## Choose your scenario

Pick a real business and a real problem (your own, an employer's, or a realistic hypothetical).
Good capstone scenarios are concrete and meaningful, e.g.:

- An internal "ask our knowledge" assistant for a professional-services firm.
- An AI workflow that automates a recurring back-office task (like the accounting case).
- A customer-facing assistant or AI receptionist for a small business.

Pick one you understand well enough to judge "good."

## The design method (applying the whole course)

Work the architect's loop (Track 4) using the operations lens (Track 3):

1. **Business goal & value.** What problem, for whom, what's the value (ROI framing, Track 3)?
2. **Requirements & "good enough."** What must it do; what accuracy/latency/cost bar?
3. **Constraints.** Data sensitivity/residency, budget, scale, integrations, governance (these
   shape everything — Track 4/5).
4. **Automate/augment/human + pattern.** What level of autonomy; copilot, workflow, or agentic
   (Track 3)?
5. **Architecture & patterns.** RAG? Fine-tune? Local/cloud/hybrid? Routing? Memory? Tools? — choose
   the **simplest sufficient** design and justify each piece (Track 1/4).
6. **Tooling.** Which models and components, classified by the ecosystem map (Track 2), and
   build-vs-buy-vs-assemble (Track 3).
7. **Cross-cutting.** Evaluation, observability, cost, security, fallback (Track 4/5).

## Deliverable: an architecture brief

Produce a short brief (1–3 pages) covering: the problem & value; requirements & "good enough";
constraints; the chosen pattern & autonomy level; the architecture (with a simple diagram); the
tools/components and why; and the cross-cutting plan. Justify your choices in trade-off terms.

```architect
The mark of a strong capstone design isn't sophistication — it's *justified simplicity*. Every component earns its place against the requirements and constraints; nothing is there because it's trendy. A reviewer should be able to follow your reasoning from business goal to each design choice, and see that you chose the simplest thing that meets the bar, governably.
```

## Decision framework

```decision
title: Is my capstone design sound?
Does it trace from a real business goal and value? → If it's tech-first, restart from the goal.
Did constraints (data/residency/cost/governance) shape it? → They should eliminate options and justify choices.
Is it the simplest design that meets the requirements? → Justify every added component; cut the rest.
Did you choose the right autonomy level (copilot/workflow/agent)? → Least autonomy that works.
Did you plan evaluation, security, cost, and fallback? → Cross-cutting concerns designed in, not bolted on.
```

## Common mistakes

- **Technology-first** — designing around a cool pattern instead of the business need.
- **Over-engineering** — agents/fine-tunes where prompt+RAG would do.
- **Ignoring constraints** — a design that violates residency or budget.
- **Skipping cross-cutting concerns** — no evaluation, security, or fallback in the design.
- **No justification** — choices stated without trade-off reasoning.

## Use AI to help (and to critique)

```prompt
Act as a senior AI architect reviewing my system design. Here's my scenario and draft architecture brief: [paste].
Critique it: is it the simplest design that meets the requirements and constraints? Are the pattern and autonomy level right? What's missing in evaluation, security, cost, and fallback? Where am I over- or under-engineering? Push back hard and suggest improvements.
```

## Governance considerations

```governance
Bake governance into the design now, not in part 2 only — part 2 will deepen it. Your brief should already reflect: data classification and residency (shaping local vs cloud), access control (who/what reaches what), the autonomy level and where humans gate high-stakes actions, and what you'll log. A design that's impressive but ungovernable fails the capstone — controllability is part of "good." Part 2 turns these into a full risk and governance plan.
```

## Key takeaways

- The capstone applies the **whole course** to a **real scenario** — part 1 is the **architecture**.
- Work from **business goal → requirements → constraints → pattern/autonomy → architecture → tooling
  → cross-cutting.**
- Aim for **justified simplicity**: every component earns its place; the simplest sufficient,
  governable design wins.
- Produce a **1–3 page architecture brief** with a diagram and trade-off justifications; use AI to
  **critique** it.

## Self-check

1. Does your design trace clearly from a business goal, or did it start with technology?
2. Can you justify each component against requirements and constraints?
3. Have you chosen the least autonomy that meets the need, and designed in the cross-cutting
   concerns?
