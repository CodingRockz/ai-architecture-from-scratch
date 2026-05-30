---
title: "Working with Claude / Cursor / Codex effectively"
track: 06-implementation
order: 1
summary: The habits that separate people who get great results from AI coding tools from those who get frustration.
readingTime: 7
prerequisites:
  - "Driving AI tools (Claude / Cursor / Codex)"
  - "Coding agents (Claude Code, Cursor, Codex)"
tags:
  - implementation
  - ai-tools
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Claude Code documentation — https://docs.anthropic.com/en/docs/claude-code/overview"
---

## Overview

This track turns "I understand it" into "I can make it happen." It opens with the working habits
for directing AI coding tools well — the practices that, more than the model itself, determine
whether you ship something good. Orientation introduced driving AI tools; here we go deeper into
the day-to-day discipline.

## Why this matters

The same tool produces wildly different results in different hands. The differentiator isn't secret
prompts — it's habits: giving context, working in small verifiable steps, reviewing reasoning, and
never shipping what you can't check. These habits are learnable and compound.

## Core concepts

- **Context is everything.** The tool knows nothing about your goal, constraints, or codebase
  unless you tell it. Front-load context.
- **Small, verifiable steps.** Don't request a whole system at once; build a slice, verify, expand.
  Small steps are checkable and correctable.
- **Ask for reasoning and a plan first.** Review the *approach* before the artifact — cheaper to
  fix.
- **Review, don't rubber-stamp.** Treat output as a confident draft from a fast junior — check it.
- **Iterate with specific feedback.** "It's wrong" is weak; "X breaks when Y; the constraint was Z"
  steers well.
- **Keep a feedback loop.** Tests, examples, or a way to verify each step turns guessing into
  engineering.

## Decision framework

```decision
title: Am I working with the tool effectively?
Did I give context (goal, constraints, relevant code/data)? → If not, expect generic output.
Am I working in small, verifiable steps? → If it's one giant request, break it down.
Did I review the plan/reasoning before accepting? → Review thinking, not just artifacts.
Can I verify each result? → If you can't check it, don't accept it.
Is my feedback specific? → Vague feedback gets vague fixes.
```

## How it works

The effective pattern: set context and the goal, ask for a plan and trade-offs, get a minimal first
version, verify it, then iterate with specific feedback — expanding scope only as each piece is
confirmed. You stay the architect (deciding, reviewing, owning) while the tool does the keystrokes.
When you hit something you can't evaluate, that's a signal to learn the concept (this course) or
bring in help — not to ship blind.

## Common mistakes

- **Context-free prompts** → generic, wrong output.
- **One giant request** → can't tell what's broken.
- **Accepting the first answer** because it sounds confident.
- **Vague feedback** → unhelpful iterations.
- **Shipping what you can't evaluate** → the fast road to an incident.

## Real business examples

- A non-technical founder gets consistently good results by always opening with context (what the
  business does, the constraint, the goal) and asking for a plan first — versus a colleague who
  types one-liners and gets mush.
- An operator builds an automation in five verified steps, catching a wrong assumption at step two
  instead of after "build the whole thing."

## Governance considerations

```governance
How you work with these tools is a governance surface (from the driving-AI-tools lesson): put constraints (data residency, "never do X without approval") in your brief up front; be careful what you paste (code, secrets, regulated data go to the provider and into logs — check terms); and verify before shipping, especially anything touching money, security, or personal data, since AI-generated code can carry vulnerabilities. Effective and safe are the same habit: context in, verification out.
```

## How an architect thinks

```architect
The architect treats the AI tool like a brilliant, fast, literal junior with zero context until briefed: they front-load context, ask for the plan, work in small verifiable steps, review reasoning, and give precise feedback. They never confuse "sounds confident" with "is correct," and they hold the line that anything unverifiable doesn't ship. The model's capability is roughly fixed; the quality they extract is a function of these habits.
```

## Key takeaways

- Results depend more on **your habits** than the model: **context, small steps, plan-first,
  review, specific feedback.**
- Stay the **architect** — decide, review, own; let the tool do the keystrokes.
- **Never ship what you can't evaluate** — it's a signal to learn or get help.
- Effective working habits are also **good governance** (constraints in, verification out).

## Self-check

1. Why does context matter so much when working with AI tools?
2. Why work in small, verifiable steps rather than one big request?
3. What should you do when the tool produces something you can't evaluate?
