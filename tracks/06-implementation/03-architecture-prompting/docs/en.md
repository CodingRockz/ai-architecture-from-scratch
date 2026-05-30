---
title: "Architecture prompting"
track: 06-implementation
order: 3
summary: Describing whole systems to an AI — not snippets — so it builds something coherent, governable, and right-sized.
readingTime: 7
prerequisites:
  - "Writing a spec an AI agent can execute"
  - "How an AI architect thinks"
tags:
  - implementation
  - architecture
  - prompting
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents"
---

## Overview

There's a difference between prompting for a snippet ("write a function that…") and prompting for a
*system* ("design and build a RAG assistant that…"). **Architecture prompting** is directing an AI
tool at the system level — describing components, data flows, constraints, and trade-offs — so it
produces something coherent and sound rather than a pile of disconnected pieces.

## Why this matters

As an architect you operate at the system level (Track 4). To get the tool to build at that level,
you must *prompt* at that level: give it the architecture thinking, not just a task. This is how
your design judgement gets transferred into a real system.

## Core concepts

- **Prompt the system, not just the step.** Describe the components (model, retrieval, tools,
  storage), how data flows, and how they connect — not just one function.
- **Bring the architect's questions into the prompt.** Ask for trade-offs (RAG vs fine-tune, local
  vs cloud), not just an implementation — and have it justify choices.
- **State constraints as first-class.** Data residency, cost, latency, scale, governance — these
  shape the architecture, so they belong in the prompt.
- **Ask for the design before the build.** Get the architecture proposal, review it against your
  judgement (Track 4), then have it implement.
- **Iterate at the architecture level too** — "use routing to cut cost," "add a human-approval step
  here," "keep sensitive data local."

## How to do it

```prompt
Act as my AI architect. Design (don't build yet) a system for:

Goal: [what it must do, for whom, quality bar].
Constraints: [data sensitivity/residency, budget, latency target, scale, integrations].
Governance: [what needs human approval; what it must not do; what to log].

Please:
1. Propose an architecture: components, data flow, and which patterns (RAG / fine-tune / routing / agent vs workflow) — and WHY, with trade-offs.
2. Flag the key risks (security, privacy, cost, failure modes) and how the design mitigates them.
3. Recommend the simplest design that meets the requirements; call out anything you'd add only if needed.
4. Then give a build plan in small, verifiable steps.

Ask clarifying questions first.
```

## Decision framework

```decision
title: Am I prompting at the architecture level?
Did I describe the system (components + data flow), not just a task? → If not, you'll get fragments.
Did I include constraints that shape architecture (data, cost, latency, scale)? → These drive the design.
Did I ask for trade-offs and justification, not just an answer? → Review the reasoning against your judgement.
Did I ask for the design before the build? → Approve the architecture first.
Did I push for the simplest sufficient design? → Guard against over-engineering.
```

## Common mistakes

- **Snippet-level prompts** for system-level problems → incoherent results.
- **Omitting architecture-shaping constraints** → a design that ignores residency, cost, or scale.
- **Accepting the first architecture** without reviewing trade-offs against your Track 4 judgement.
- **Letting it over-engineer** (an agent/framework where RAG would do) — push for simplest
  sufficient.
- **Building before approving the design** → expensive rework at the system level.

## Real business examples

- A non-coder prompts at the architecture level for an internal assistant — specifying residency,
  cost target, and "design first" — and gets a sensible RAG design (local model, access-controlled
  retrieval) to approve before building.
- A team uses architecture prompting to compare RAG vs fine-tuning *with the AI's reasoning*, then
  applies their own judgement to choose — using the tool to inform, not decide.

## Governance considerations

```governance
Architecture prompting is where you ensure governance is built into the design, not patched later. Put data residency/confidentiality, required approvals, "must not do" rules, and logging in the prompt as constraints, and ask the tool to show how the architecture meets them and what risks remain. Then apply your own judgement — the tool proposes, you (the accountable architect) dispose. A design produced without governance constraints in the prompt will reliably omit them.
```

## How an architect thinks

```architect
The architect transfers their system-level thinking into the prompt: components, data flow, constraints, trade-offs, and a demand for the *simplest sufficient* design — reviewed before any build. They use the tool to generate and stress-test architecture options, but they keep the deciding to themselves, judging the proposals against the Track 4 principles. The prompt is, in effect, an architecture brief — and the better the brief, the better the system.
```

## Key takeaways

- **Prompt at the system level** — components, data flow, constraints, trade-offs — not just
  snippets.
- Ask for the **design and its justification before the build**, and push for the **simplest
  sufficient** architecture.
- Put **architecture-shaping constraints and governance** in the prompt.
- The tool **proposes**; you, the accountable architect, **decide** — judging against Track 4.

## Self-check

1. What's the difference between snippet-level and architecture-level prompting?
2. Why ask for trade-offs and a design before any code?
3. How do you keep the AI from over-engineering the architecture?
