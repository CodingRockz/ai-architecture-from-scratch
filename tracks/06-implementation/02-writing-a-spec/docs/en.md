---
title: "Writing a spec an AI agent can execute"
track: 06-implementation
order: 2
summary: Turning a fuzzy idea into clear, buildable instructions — the single highest-leverage implementation skill.
readingTime: 7
prerequisites:
  - "Working with Claude / Cursor / Codex effectively"
tags:
  - implementation
  - specification
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents"
---

## Overview

A **spec** is a clear description of what to build, for whom, with what constraints, and what
"done" looks like. It's the highest-leverage thing a non-coder produces, because a good spec lets
an AI tool build the right thing — and a vague one guarantees the wrong thing, fast. Writing specs
is the architect's core deliverable.

## Why this matters

"Build me a CRM" produces mush; a precise spec produces something useful. Most disappointing AI
builds trace back to a weak spec, not a weak model. The spec is where your understanding (the rest
of this course) becomes executable direction.

## Core concepts

A buildable spec covers:

- **Goal & users.** What it should do and for whom.
- **Inputs & outputs.** What goes in, what should come out (with examples — examples are
  enormously clarifying).
- **Constraints.** Data sensitivity/residency, budget, latency, must-use or must-avoid tools,
  integrations.
- **"Done" / acceptance criteria.** Concretely, how you'll know it works.
- **Governance requirements.** Approvals, what it must not do, logging.
- **Scope boundaries.** What's explicitly *out* of scope for this version.

And critically: **start with a plan, not the whole build.** Ask the tool to propose an approach
from your spec, review it, then proceed.

## How to write one (with AI's help)

You don't have to write a perfect spec alone — you can draft with the tool. Describe the goal and
let it ask clarifying questions; its questions reveal the gaps you need to fill. Then lock the spec
before building.

```prompt
I want to build [X] for [users]. Before any code, help me write a clear spec.

Here's what I know:
- Goal: [...]
- Inputs/outputs (with examples if I have them): [...]
- Constraints (data sensitivity/residency, budget, latency, integrations): [...]
- What "done" looks like: [...]
- Governance: [what it must not do; what needs human approval; what to log]
- Out of scope for v1: [...]

Ask me clarifying questions to fill any gaps, then write the spec and propose an approach. Don't write code yet.
```

## Decision framework

```decision
title: Is my spec ready to build from?
Are the goal and users clear? → If not, the build will drift.
Are inputs/outputs defined, ideally with examples? → Examples remove ambiguity.
Are constraints (data, cost, latency, integrations) stated? → Or the tool will guess, possibly unsafely.
Are acceptance criteria concrete? → "Done" must be checkable.
Are governance rules and out-of-scope listed? → Bound the behaviour and the work.
Did I get a plan to review before building? → Review approach first; it's cheap to change.
```

## Common mistakes

- **One-line "build me X" specs** → wrong thing, confidently built.
- **No examples** → ambiguity the tool fills with assumptions.
- **Omitting constraints/governance** → designs that leak data or do too much.
- **No acceptance criteria** → no way to say whether it's done.
- **Jumping to build before reviewing a plan** → expensive rework.
- **Unbounded scope** → sprawling, unverifiable output.

## Real business examples

- A founder turns "we need an internal dashboard" into a one-page spec (users, the 5 metrics,
  data source, who can access, "done = these load correctly and only staff can see them") — and the
  AI builds the right thing first try.
- A team avoids a costly misbuild because the tool's clarifying questions surfaced an unstated
  integration constraint *before* coding.

## Governance considerations

```governance
The spec is where governance gets designed in rather than bolted on. Put data sensitivity/residency, "must not do" rules, required human approvals, and logging directly in the spec — so the system is built governable from the start. A spec that omits these produces a build that quietly ignores them (e.g. sends sensitive data to a third party). Treat the governance section of the spec as non-optional, especially for anything touching money, customers, or sensitive data.
```

## How an architect thinks

```architect
The architect knows the spec is where they add the most value — it's the translation of understanding into executable direction. They make it concrete (examples, acceptance criteria), bounded (explicit scope, governance rules), and constraint-aware, and they use the tool's clarifying questions to find their own gaps. They always review a *plan* derived from the spec before any code, because correcting an approach costs minutes and correcting a finished build costs days.
```

## Key takeaways

- The **spec** is the highest-leverage thing a non-coder produces — vague spec, wrong build.
- Cover **goal/users, inputs/outputs (with examples), constraints, acceptance criteria, governance,
  and scope.**
- **Draft it with the tool** (let its clarifying questions find your gaps), then **review a plan
  before building.**
- Put **governance in the spec** so the system is built controllable from the start.

## Self-check

1. What are the essential elements of a buildable spec?
2. Why are examples so valuable in a spec?
3. Why review a plan derived from the spec before any code is written?
