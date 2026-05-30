---
title: "Multi-agent system design"
track: 04-architecture
order: 9
summary: When multiple cooperating agents help — and the much more common case where one well-designed agent (or a workflow) is better.
readingTime: 7
prerequisites:
  - "Agents, tools & memory"
  - "Agent frameworks & orchestration"
tags:
  - architecture
  - multi-agent
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents"
---

## Overview

A **multi-agent system** uses several AI agents that collaborate — e.g. a "researcher," a
"writer," and a "reviewer" — each with a role, passing work between them. It's an appealing idea
and occasionally the right one, but it's frequently over-used. This lesson is about when
multi-agent genuinely helps versus when a single agent or a plain workflow is better.

## Why this matters

Multi-agent designs multiply cost, latency, and unpredictability. Teams reach for them because
they sound sophisticated, then struggle with reliability and debugging. Knowing when the
complexity pays — and when it doesn't — saves a lot of pain and money.

## Core concepts

- **What it is.** Multiple agents with distinct roles/tools coordinating toward a goal, via an
  orchestration framework (CrewAI, AutoGen, LangGraph from Track 2).
- **The appeal:** separation of concerns (each agent specialised), parallelism, and tackling tasks
  too complex for one prompt.
- **The cost:** more model calls (cost + latency), compounding unpredictability (each agent can
  err, and errors propagate), harder debugging, and more failure modes.
- **The default truth:** most problems don't need it. A single well-designed agent with good tools,
  or a deterministic workflow, is usually more reliable and cheaper. Anthropic's guidance: start
  simple; add agents only when clearly justified.
- **When it does help:** genuinely separable sub-tasks, naturally parallel work, or distinct
  expertise/tools per role — and you can tolerate the added cost and variance.

## Decision framework

```decision
title: Do I really need multiple agents?
Can a workflow (fixed steps) do it? → Use the workflow — most reliable and cheap.
Can one agent with the right tools do it? → Use a single agent — far simpler than many.
Genuinely separable sub-tasks or parallel work needing distinct roles/tools? → Multi-agent may help.
Is it high-stakes or latency-sensitive? → Be cautious — multi-agent adds variance and delay.
Tried simpler first and proven it insufficient? → Only then add agents; start with the fewest.
```

## How it works

If multi-agent is warranted, you give each agent a clear, narrow role, the minimal tools it needs,
and a defined way to pass work (and verify it) between agents — often a coordinator/orchestrator
agent managing the others. You design for the failure case: each agent's errors can cascade, so you
add checks, limits, and human gates on consequential actions. In practice, the discipline is to
keep the number of agents minimal and prove each one earns its place.

## Common mistakes

- **Multi-agent by default** because it sounds advanced — when one agent or a workflow would be
  more reliable.
- **Too many agents** — each adds cost, latency, and a new failure point.
- **No error containment** — one agent's hallucination propagates through the others.
- **Unbounded loops** between agents — runaway cost (cap steps/calls).
- **Skipping the simpler baseline** — never proving a single agent couldn't do it.

## Real business examples

- A team builds an elaborate multi-agent "company" for a task and hits cost, latency, and
  reliability walls; collapsing it to one well-tooled agent works better and cheaper.
- A genuinely parallel research task uses a coordinator plus several worker agents to gather
  sources simultaneously, then a synthesiser — a justified, bounded multi-agent design.
- A workflow with a single agent step replaces a proposed five-agent system, delivering the same
  outcome predictably.

## Governance considerations

```governance
Multi-agent systems carry the full agent risk set (prompt injection, runaway loops, over-broad permissions) multiplied across agents, plus harder traceability — when something goes wrong, *which* agent did it? Apply least privilege per agent (each gets only its needed tools/data), cap steps and total cost to prevent runaway interactions, keep human gates on consequential actions, and log every agent's actions for auditability. The added complexity makes monitoring and containment more important, not less — another reason to prefer the simplest design that works.
```

## How an architect thinks

```architect
The architect is skeptical of multi-agent by default. Their ladder is workflow → single agent → multi-agent, and they climb only when a task is genuinely separable or parallel and they've proven simpler approaches insufficient. When they do go multi-agent, they minimise the number of agents, give each least privilege, contain errors, cap loops, and log everything. They optimise for reliability and traceability over architectural sophistication — fewer moving parts almost always wins.
```

## Key takeaways

- **Multi-agent** = several role-specialised agents collaborating — occasionally powerful, often
  over-used.
- It **multiplies cost, latency, unpredictability, and failure modes**; **start simple** (workflow
  or single agent).
- Justified only for **genuinely separable/parallel** work where you can tolerate the overhead.
- Governance is **harder** (traceability, cascading errors) — least privilege per agent, caps,
  human gates, full logging.

## Self-check

1. What does a multi-agent system add in cost and risk versus a single agent?
2. When is multi-agent genuinely justified?
3. Why is traceability harder in multi-agent systems?
