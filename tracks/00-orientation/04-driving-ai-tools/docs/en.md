---
title: "Driving AI tools (Claude / Cursor / Codex)"
track: 00-orientation
order: 4
summary: Your implementation team is an AI coding tool. Here's how to direct it well — context, specs, iteration, and verification.
readingTime: 9
prerequisites:
  - "The new role: architect, not implementer"
tags:
  - orientation
  - ai-tools
  - prompting
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Claude Code documentation — https://docs.anthropic.com/en/docs/claude-code/overview"
---

## Overview

Throughout this course, when something needs building, you'll direct an AI coding tool to do
it. This lesson is the practical core skill: how to *drive* tools like Claude (and Claude
Code), Cursor, and Codex so they produce what you actually want — and how to catch it when
they don't.

This is not "prompt engineering" tricks. It's the discipline of giving a capable assistant
enough context, a clear goal, and a way to check the result.

## Why this matters

The gap between people who get great results from AI tools and people who get frustrated isn't
mostly about the model — it's about how they're directed. The same tool, given vague input,
produces vague output; given context, constraints, and a feedback loop, it produces something
genuinely useful. Driving well is a learnable skill, and it's the one that makes everything
else in this course actionable.

## Core concepts

**The three things every good instruction has:**

1. **Context** — what you're working on, the constraints, the data, the audience. The model
   can't read your mind or your business.
2. **A clear goal** — what "done" looks like, concretely.
3. **A way to verify** — how you'll know it worked. Ask for tests, examples, or a way to check.

**Specify, don't micromanage.** Describe the *what* and the *why*; let the tool figure out
the *how*, then review. You're an architect briefing a builder, not dictating keystrokes.

**Iterate in small steps.** Don't ask for the whole system at once. Get a small slice working,
verify it, then expand. Small steps are easier to check and to correct.

**Always verify.** AI tools are confident even when wrong. Never ship output you haven't
checked — and if you can't check it (because you don't understand it), that's a signal to
learn the concept or bring in help, not to ship and hope.

## How it works

A strong working pattern, which you'll see echoed in every "How to ask Claude / Cursor" card:

1. **Set the role and context.** "Act as my AI architect. I'm building X for Y, with
   constraint Z."
2. **State the goal and constraints**, including governance ("data must stay in our region").
3. **Ask for a plan first**, before code. Review the plan — it's cheaper to fix than the build.
4. **Request a minimal first version** you can test.
5. **Ask how you'll verify it**, and for the trade-offs it made.
6. **Iterate**: correct, expand, re-check.

## Decision framework

```decision
title: Is my instruction good enough to send?
Does it include the context (what, why, constraints, data)? If not, add it.
Does it say what "done" looks like? Vague goals get vague output.
Did I ask for a plan or trade-offs, not just code? You want to review thinking, not just artefacts.
Do I have a way to verify the result? If you can't check it, don't ship it.
Is it scoped small enough to evaluate? If it's a whole system, break it down.
```

## Common mistakes

- **Vague, contextless prompts** ("build me an app") and then disappointment.
- **Accepting the first answer** without review because it *sounds* authoritative.
- **Asking for everything at once**, then being unable to tell which part is broken.
- **Skipping governance in the brief** — and getting a design that quietly sends sensitive
  data to a third party.
- **Shipping what you can't evaluate.** The fastest route to a production incident.

## Real business examples

- A **non-technical founder** describes their support workflow, asks Claude for an
  architecture plan and trade-offs, reviews it, then has it build a tested prototype — shipping
  a working tool without an engineer for the first pass.
- An **ops manager** directs Cursor to build an automation in small, verified steps, catching a
  wrong assumption at step two instead of discovering it in production.

## Governance considerations

```governance
How you drive AI tools is itself a governance surface:
- **Put constraints in the brief.** Data residency, privacy, and "never do X without approval" should be stated up front, not discovered later.
- **Review what data you paste in.** Prompts go to the tool's provider and into logs — don't paste secrets or regulated data without checking the terms.
- **Verify before shipping**, especially anything that touches money, security, or personal data. AI-generated code can carry security flaws; a human accountable review is non-negotiable for production.
```

## How an architect thinks

```architect
A weak operator treats the AI like a vending machine — insert prompt, receive answer. A strong operator treats it like a brilliant, fast, literal-minded junior who has no context until you give it: brief it well, ask for its reasoning, check its work, and iterate. The model's capability is roughly fixed; the quality you extract is mostly up to you.
```

## Tools in this category

```toolcard
name: AI coding agents
category: Direct an AI to build software
use: Turn a clear spec into working code, automations, and prototypes — under your direction
alternatives: Claude / Claude Code, Cursor, GitHub Copilot / Codex, Windsurf
when: Almost any build task once you can specify and verify it
whennot: Production-critical security/safety code you cannot evaluate — prototype, then bring in an engineer
```

## How to ask Claude / Cursor

A reusable opening template you'll adapt all course long:

```prompt
Act as my AI architect and engineer.

Context:
- I'm building: [what, and for whom].
- Constraints: [data sensitivity / residency, budget, timeline, must-haves].

Please:
1. Propose a plan and the key trade-offs in plain language — don't write code yet.
2. Flag any governance decisions I need to make first.
3. Then give me a minimal first version I can test, and tell me how to verify it works.
4. Ask me clarifying questions before you start if anything is unclear.
```

## Key takeaways

- Driving AI tools well is the skill that makes the rest of this course **actionable**.
- Every good instruction has **context, a clear goal, and a way to verify**.
- **Specify, don't micromanage; iterate in small steps; always verify.**
- Put **governance constraints in the brief**, and **never ship what you can't evaluate**.

## Self-check

1. What are the three ingredients of a good instruction to an AI tool?
2. Why ask for a *plan and trade-offs* before asking for code?
3. What should you do when the AI produces output you can't evaluate?
