---
title: "Spec it and direct an AI agent to build a slice"
track: capstone
order: 3
summary: Capstone part 3 — prove it's real by specifying a slice of your system and directing an AI tool to build and verify it.
readingTime: 8
prerequisites:
  - "Design an end-to-end AI system for a real business"
  - "Prompting to build a RAG system"
tags:
  - capstone
  - implementation
  - project
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Claude Code documentation — https://docs.anthropic.com/en/docs/claude-code/overview"
---

## Overview

The final capstone part closes the loop from understanding to *making it happen*: take a meaningful
**slice** of your designed system, write a buildable **spec**, **direct an AI tool** to build it in
small steps, and **verify** it works. You finish the course having actually produced something —
proof you can drive AI to build, within the limits you now understand.

## Why this matters

Designing and governing are essential, but the course's promise is that you can also *make it
happen* by directing AI tools. Building a real slice proves it — and the experience cements every
implementation skill (spec, architecture prompting, validation, testing, knowing the limits).

## Choose a meaningful slice

You don't build the whole system — you build a **slice** that proves the core works. Pick the
riskiest or most central part, scoped to be buildable and verifiable. Examples:

- For an "ask our docs" assistant: a working RAG over ~20 sample documents with cited answers and
  access filtering.
- For an automation: the extract → validate → route-exception path on sample inputs.
- For a copilot: the core assist function on real examples.

## The build loop (applying Track 6)

1. **Spec the slice** (spec lesson): goal, inputs/outputs with examples, constraints, acceptance
   criteria, governance rules, scope.
2. **Architecture prompt → plan** (architecture-prompting lesson): get a design/plan for the slice
   and review it before building.
3. **Build in small, verifiable steps** (working-with-tools lesson): a sample first, verify, expand.
4. **Verify** (validation & testing lessons): test behaviour on real and edge cases against your
   acceptance criteria; check the governance controls (e.g. access filtering, human gate) actually
   work; confirm you can verify what you're shipping.
5. **Know the limit** (limits lesson): if the slice is production/security-critical, note where an
   engineer would review — the capstone slice is a prototype/proof, scoped accordingly.

```prompt
Act as my AI architect and engineer. Build a SLICE of this system as a working prototype.
Spec: [paste your slice spec — goal, inputs/outputs with examples, constraints, acceptance criteria, governance rules, scope].
First propose a plan (no code yet) and ask clarifying questions. Then build it step by step on a small sample so I can verify each step. Include a way to test it against my acceptance criteria, and show me how to confirm the governance controls (e.g. access filtering / human-approval step) actually work. Keep it the simplest thing that proves the slice.
```

## Deliverable

A working prototype slice plus a short note: what it does, how you verified it (tests/results
against acceptance criteria), which governance controls you confirmed, and where production would
need engineering review. That note is your evidence you can direct *and* judge an AI build.

## Decision framework

```decision
title: Is my capstone slice a success?
Does it prove the core/riskiest part works? → A slice that dodges the hard part proves little.
Did you spec it and review a plan before building? → Direction, not vibes.
Did you verify behaviour against acceptance criteria on real + edge cases? → Not just "it ran."
Did you confirm the governance controls actually work? → e.g. access filtering, human gate.
Did you note where production needs an engineer? → Honest scoping; the slice is a proof, not a product.
```

## Common mistakes

- **Building the easy part** instead of the riskiest/core slice.
- **No spec/plan** — vibe-building, hard to verify.
- **"It ran" ≠ verified** — test behaviour against acceptance criteria.
- **Skipping the governance check** — not confirming access control / human gates work.
- **Treating the slice as production-ready** — it's a proof; note where engineering is needed.

## Real outcome

Finishing this, you've gone end to end: understood the concepts, designed a system, governed it, and
directed an AI tool to build and verify a working slice — without writing the code yourself, and
knowing exactly where your verification ends. That is the AI architect's loop, proven.

## Governance considerations

```governance
The slice is where your governance plan meets reality: verify that the controls you designed (access filtering, human-approval gates, logging, data handling) actually function in the build — designing them and confirming them are different things, and only the latter counts. Keep the prototype's data appropriate (use sample/non-sensitive data for a proof). And apply the honest limit: a capstone slice is a prototype; anything destined for production, especially security- or money-touching, requires qualified engineering review before real deployment. Confirming controls and knowing the limit are both part of the deliverable.
```

## Key takeaways

- Build a **meaningful slice** (the core/riskiest part), not the whole system — scoped to be
  **buildable and verifiable**.
- Apply the full loop: **spec → plan → build in steps → verify behaviour AND governance controls.**
- "**It ran**" isn't success — verify against **acceptance criteria** and confirm **controls work**.
- The slice is a **proof/prototype**; note where **production needs an engineer**. You've now proven
  the **AI architect's loop** end to end.

## Self-check

1. Why build the riskiest/core slice rather than the easiest part?
2. Beyond "it runs," what must you verify for the slice to count as a success?
3. How do you confirm your governance controls work, and where do you draw the production line?
