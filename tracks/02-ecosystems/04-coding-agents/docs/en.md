---
title: "Coding agents (Claude Code, Cursor, Codex)"
track: 02-ecosystems
order: 4
summary: The tools that turn your specs into working software — your implementation team, and how to use them well.
readingTime: 7
prerequisites:
  - "Driving AI tools (Claude / Cursor / Codex)"
  - "Agents, tools & memory"
tags:
  - ecosystems
  - coding-agents
  - implementation
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Claude Code documentation — https://docs.anthropic.com/en/docs/claude-code/overview"
---

## Overview

**Coding agents** are AI tools that read, write, and run code across a whole project — not just
autocomplete a line, but plan, edit many files, run tests, and iterate. Tools like **Claude
Code**, **Cursor**, and **Codex** are how a non-coding architect actually gets things built.
This lesson is about what they are and how to direct them; the *skills* of directing them were
covered in Orientation.

## Why this matters

This entire course rests on a premise: you direct AI to build. Coding agents are the tool that
makes that real. They've moved from "help a developer type faster" to "complete substantial
tasks from a description," which is exactly what lets a non-programmer ship prototypes and
internal tools — provided you direct and verify well.

## Core concepts

- **Beyond autocomplete.** Modern coding agents are *agents* (loop: plan → edit → run → observe
  → fix), able to work across an entire codebase, run commands, and self-correct.
- **Two flavours:**
  - **In-editor** (Cursor, Copilot) — live in your code editor; great for interactive,
    supervised work.
  - **Terminal/agentic** (Claude Code, Codex) — run more autonomously on tasks you describe;
    great for larger, hands-off chunks you then review.
- **You supervise, you don't abdicate.** They're powerful but fallible; you set the goal,
  review the plan, and verify the result.

## Decision framework

```decision
title: How should a non-coder use a coding agent?
Building a prototype or internal tool? → Great fit. Specify clearly, let it build, test the result.
Production system touching money/security/personal data? → Use it to prototype, then have a qualified engineer review and harden before shipping.
Don't understand the output at all? → That's a signal: learn the concept or get help — don't ship what you can't evaluate.
Big task? → Break it into small, verifiable steps; review each.
```

## How it works

You give the agent a goal and context; it proposes a plan, makes changes, runs things, and
reports back. The good ones show their work and let you intervene. Your job is the architect's:
clear spec, review the approach, check it does what you need, and decide if it's good enough —
or needs an engineer for the last mile.

The honest limit (covered in Track 6): AI-generated code can carry security and maintainability
issues, and a non-coder can't fully audit it. For prototypes and internal tools that's usually
fine; for production, bring in expertise.

## Common mistakes

- **Treating output as production-ready** without review, especially for anything sensitive.
- **Vague goals.** "Build me a CRM" produces mush; specify the actual need and constraints.
- **One giant request** instead of small, checkable steps.
- **Pasting secrets or sensitive data** into the tool without checking where it goes.
- **Believing it removes the need to understand the concept.** You still need enough
  understanding to evaluate.

## Real business examples

- A non-technical founder describes a simple internal dashboard, and Claude Code builds a
  working version in an afternoon — validated by the founder, shipped internally.
- An ops manager uses Cursor to build a data-cleaning script step by step, catching a wrong
  assumption early because they reviewed each step.
- A team prototypes a customer-facing feature with a coding agent, then hands it to engineers
  to security-review and productionise.

## Tools in this category

```toolcard
name: Coding agents
category: AI that builds software from your direction
use: Plan, write, run, and fix code across a project — turning specs into working tools
alternatives: Claude Code, Cursor, GitHub Copilot / Codex, Windsurf
when: Prototypes, internal tools, automations — anything you can specify and verify
whennot: Production-critical security/safety code you cannot evaluate — prototype, then involve an engineer
```

## Governance considerations

```governance
Coding agents touch your code, your systems, and often your data:
- **Code provenance & security.** AI-generated code can contain vulnerabilities; production code needs human security review (Track 6 covers the evidence and the limits).
- **Data exposure.** What you paste (code, secrets, data) goes to the tool's provider — check terms and avoid pasting credentials or regulated data.
- **Permissions.** Agentic tools can run commands and change files; run them with appropriate, limited access, not as all-powerful.
- **Accountability.** "The AI wrote it" is not a defence — a human owns what ships.
```

## How an architect thinks

```architect
The architect sees coding agents as a force-multiplier for *building*, not a replacement for *judgment*. They invest their effort in the spec and the review — the two places a human adds the most — and let the agent handle the keystrokes in between. They also know the boundary: prototype freely, but route production-grade, high-stakes code through real engineering review.
```

## Key takeaways

- Coding agents (**Claude Code, Cursor, Codex**) **plan, write, run, and fix code** — your
  implementation team.
- They make **non-coders productive** for prototypes and internal tools; **production needs
  engineering review**.
- Direct with **clear specs and small steps**; **verify** everything; never ship what you can't
  evaluate.
- Mind **code security, data exposure, permissions, and accountability**.

## Self-check

1. How do coding agents differ from old-style autocomplete?
2. Where's the line between "ship it" and "get an engineer" for a non-coder?
3. Name two governance risks specific to coding agents.
