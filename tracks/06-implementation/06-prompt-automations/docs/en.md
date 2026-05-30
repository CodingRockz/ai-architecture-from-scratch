---
title: "Prompting to build automations & agent workflows"
track: 06-implementation
order: 6
summary: Directing an AI tool to build a real automation — from a process description to a working, governed workflow.
readingTime: 7
prerequisites:
  - "AI workflows, copilots & agentic workflows"
  - "Writing a spec an AI agent can execute"
tags:
  - implementation
  - automation
  - worked-example
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents"
---

## Overview

A worked example of turning a business process into a working automation by directing an AI tool —
applying the workflow-vs-agent judgement (Track 3) and good direction (spec, verify). The aim:
remove a recurring manual task safely, with the human kept in the right place.

## Why this matters

Automations are among the fastest, highest-ROI AI wins, and modern tools (workflow platforms +
coding agents) make them buildable by non-coders who can specify and verify. This shows the loop on
a concrete, common case.

## The walkthrough

**1. Decide the pattern (Track 3).** Known, repeatable steps → an **AI workflow** (deterministic),
not an autonomous agent. Keep a human gate on anything consequential.

**2. Spec the automation.** Trigger, steps, AI step(s), human-approval points, integrations,
fallback, what to log. Example: "When an invoice email arrives → AI extracts fields → validate
against rules → post routine ones → flag exceptions/over-$X to a human."

**3. Direct the build (start small, verify).**

```prompt
Act as my automation engineer. Build a workflow (deterministic, not an autonomous agent):

Trigger: [e.g. new invoice email in this inbox].
Steps: [extract fields with AI → validate with these rules → post to <system> → flag exceptions and anything over $X to a human].
Constraints: [data sensitivity, which tools/integrations, residency].
Governance: human approval for exceptions and amounts over $X; log every action; if a step fails, queue for manual handling (don't drop or mis-post).

Build it step by step on a few sample inputs first so I can verify extraction and the human-approval path before we connect the real systems. Recommend the simplest reliable approach (e.g. an n8n/Make-style workflow with an AI step). Ask questions first.
```

**4. Verify.** Test extraction accuracy, that exceptions route to a human, that the fallback works,
and that actions are logged — on samples, before going live.

## Decision framework

```decision
title: Is my AI-built automation safe to switch on?
Is it a workflow (known steps) rather than a needless agent? → Prefer the deterministic option.
Does a human approve consequential/irreversible actions? → Required (money, deletes, external comms).
Did you verify on samples (extraction, routing, fallback) before live data? → Don't go live blind.
Is there a fallback for failures (queue for manual, don't drop)? → Essential.
Is every action logged for audit? → Yes, before launch.
Start narrow? → Automate the clean majority; route the messy minority to a human.
```

## Common mistakes

- **Building an autonomous agent** where a deterministic workflow fits — more risk, less
  reliability.
- **No human gate** on consequential actions (especially money).
- **Going live without sample verification** of extraction and the approval path.
- **No fallback** — failures drop data or mis-post silently.
- **No logging** — can't audit or debug.
- **Automating 100%** including edge cases instead of routing them to a human.

## Real business examples

- An ops manager directs a tool to build the invoice workflow above on an n8n-style platform,
  verifies it on ten sample invoices (including a deliberately weird one that correctly routes to a
  human), then connects it live — reclaiming most of a 10-hr/week task.
- A team builds a ticket-triage automation: AI classifies and drafts, a human approves sends, with
  full logging and a queue fallback if the AI is down.

## Governance considerations

```governance
Automations *act*, so governance is built into the spec and verified in the build: human-approval gates on consequential/irreversible actions, least-privilege access to the systems it touches, logging of every action for audit, and a fallback so failures queue for manual handling rather than dropping or mis-posting. For agentic portions, add step/cost caps and guard the untrusted-input-to-powerful-action path (prompt injection). Verify these controls actually work on samples before connecting real systems — the tool builds what you asked for, and only you can confirm it's safe.
```

## How an architect thinks

```architect
The architect picks the least-autonomous pattern that works (usually a deterministic workflow), bakes the human gate and fallback into the spec, and verifies the *control paths* (approval, fallback, logging) on samples before going live — not just the happy path. They start narrow (automate the clean majority, route exceptions), instrument it, and widen autonomy only as the measured error rate earns trust. The tool builds; the architect ensures it's safe and reversible.
```

## Key takeaways

- Pick the pattern first (usually a **deterministic workflow**, not an agent); keep a **human gate**
  on consequential actions.
- **Spec the governance** (approvals, least privilege, logging, fallback) and **verify control
  paths on samples** before going live.
- **Start narrow** (clean majority automated, exceptions to humans) and widen with evidence.
- The tool builds what you specify — **you confirm it's safe and reversible**.

## Self-check

1. Why prefer a deterministic workflow over an agent for most automations?
2. Which control paths must you verify before switching an automation on?
3. What's a good fallback when an automation step fails?
