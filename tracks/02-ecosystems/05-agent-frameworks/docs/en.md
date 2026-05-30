---
title: "Agent frameworks & orchestration"
track: 02-ecosystems
order: 5
summary: The libraries that coordinate models, tools, and steps — LangGraph, CrewAI, AutoGen — and when you actually need one.
readingTime: 7
prerequisites:
  - "Agents, tools & memory"
  - "The map of the AI ecosystem"
tags:
  - ecosystems
  - orchestration
  - agent-frameworks
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents"
---

## Overview

**Agent frameworks** are software libraries that help developers coordinate the moving parts of
an AI system — chaining model calls, wiring up tools, managing multi-step or multi-agent flows,
and handling state. Names you'll hear: **LangGraph**, **CrewAI**, **AutoGen**, **LlamaIndex**,
and the broader **LangChain** ecosystem. They live in the *orchestration* layer of the map.

## Why this matters

When people say "we're building an agent," there's usually a framework underneath doing the
coordination. As a decision-maker you don't write this code, but you should know what these
tools do, recognise that they're often *optional*, and avoid teams over-engineering with a
heavy framework where a few plain model calls would do.

## Core concepts

- **Orchestration = coordination.** These frameworks manage the sequence of steps, the passing
  of data between them, tool calling, retries, and (for multi-agent setups) communication
  between agents.
- **Single-agent vs multi-agent.** Some frameworks focus on one capable agent with tools;
  others (CrewAI, AutoGen) specialise in multiple agents collaborating (a "researcher" + a
  "writer" + a "critic"). Multi-agent is powerful but adds cost, latency, and unpredictability.
- **Often optional.** A surprising amount of "agentic" behaviour is just a model called a few
  times with some tools — achievable with minimal code. Frameworks earn their place on genuinely
  complex flows.

## Decision framework

```decision
title: Do we need an agent framework — and which kind?
Simple, fixed sequence? → No framework needed; plain model calls or a workflow tool suffice.
Complex, branching, stateful agent logic? → A single-agent orchestration framework (e.g. LangGraph) can help structure it.
Genuinely need multiple specialised agents collaborating? → A multi-agent framework (CrewAI, AutoGen) — but prove a single agent can't do it first.
Mostly connecting apps with some AI steps? → A workflow-automation tool (next lesson), not an agent framework.
```

## How it works

A framework gives developers building blocks — nodes/steps, state, tool definitions, control
flow — so they don't reinvent the plumbing for multi-step AI. The trade-off is added
abstraction and dependency: frameworks move fast, can be heavy, and sometimes obscure what's
really happening. Anthropic's own guidance is telling: **start simple**, and add framework
complexity only when the task clearly demands it.

## Common mistakes

- **Reaching for a heavy framework first.** Many tasks need far less; over-orchestration adds
  cost, latency, and debugging pain.
- **Jumping to multi-agent.** Multiple agents multiply unpredictability and expense; a single
  well-designed agent usually wins.
- **Framework lock-in.** Deeply coupling to a fast-moving library is a maintenance risk; keep
  the core logic portable.
- **Confusing the layer.** Agent frameworks (orchestration) are not models and not workflow
  automation tools — different jobs.

## Real business examples

- A team builds a research assistant with a single-agent framework to manage its
  search-read-summarise loop and tool calls — a reasonable fit.
- Another team starts with CrewAI's multi-agent setup for a simple task, hits cost and
  reliability problems, and simplifies to one agent — faster and cheaper.
- A company realises their "agent" project is really "connect these five apps with an AI step,"
  and switches to a workflow-automation tool instead.

## Tools in this category

```toolcard
name: Agent / orchestration frameworks
category: Coordinate models, tools, and multi-step or multi-agent flows
use: Structure complex, stateful AI logic that plain calls can't cleanly handle
alternatives: LangGraph / LangChain, CrewAI, AutoGen, LlamaIndex
when: Genuinely complex agent logic or justified multi-agent collaboration
whennot: Simple sequences (use plain calls) or app-connection tasks (use workflow automation)
```

## Governance considerations

```governance
Orchestration frameworks coordinate *actions*, so they concentrate the agent risks from the Foundations track: every tool an agent can call is a permission to govern, every autonomous step is a place injection or error can propagate. Insist on least-privilege tool access, human gates on high-impact actions, and full logging of each step — frameworks make it easy to add capability, so deliberately constrain it. Also weigh dependency risk: a heavy, fast-moving framework is itself something to maintain and secure.
```

## How an architect thinks

```architect
The architect's mantra here is "start simple." They treat frameworks as a means to manage *genuine* complexity, not a default. The progression is: plain model call → model with a few tools → single agent → (only if truly needed) a framework → (rarely) multi-agent. Each step up adds power and cost and unpredictability, so they climb only as far as the problem forces them.
```

## Key takeaways

- Agent frameworks (**LangGraph, CrewAI, AutoGen, LlamaIndex**) live in the **orchestration**
  layer — they coordinate steps, tools, and agents.
- They're **often optional**; many "agents" are just a few model calls with tools.
- **Start simple**; add framework (and especially **multi-agent**) complexity only when the task
  demands it.
- They concentrate **agent governance** concerns (permissions, human gates, logging) and add
  **dependency risk**.

## Self-check

1. What job does an "orchestration" framework do?
2. Why is multi-agent usually not the place to start?
3. When is a workflow-automation tool the better choice than an agent framework?
