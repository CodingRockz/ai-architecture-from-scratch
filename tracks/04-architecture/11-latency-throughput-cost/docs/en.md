---
title: "Latency, throughput & cost optimization"
track: 04-architecture
order: 11
summary: The performance triangle — how fast, how much, and how cheap — and the levers to tune each.
readingTime: 7
prerequisites:
  - "Tokens & tokenization"
  - "Model routing & multi-model systems"
tags:
  - architecture
  - performance
  - cost
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Models overview (pricing & performance) — https://docs.anthropic.com/en/docs/about-claude/models"
---

## Overview

Every AI system juggles three performance dimensions: **latency** (how fast it responds),
**throughput** (how many requests it can handle), and **cost** (how much per request). They trade
off against each other and against quality. This lesson is the architect's toolkit for tuning them
deliberately instead of hoping.

## Why this matters

The same system can be delightful or unusable, affordable or ruinous, depending on these choices.
A voice agent lives or dies on latency; a high-volume pipeline lives or dies on throughput and
cost. Knowing the levers lets you hit the targets the use case actually requires.

## Core concepts

- **Latency** — time to respond. Dominated by model size, output length (it generates token by
  token), network round-trips, and any extra steps (retrieval, tools, agent loops). Critical for
  interactive/voice use.
- **Throughput** — requests handled per unit time. For self-hosting, the inference engine's
  batching and your GPU count drive it; for APIs, provider rate limits and your concurrency.
- **Cost** — tokens × price × volume, plus infra (from the tokens and cost lessons).
- **The trade-offs.** Smaller/quantized models: faster, cheaper, sometimes lower quality. Streaming
  output: feels faster (tokens appear live) without changing total time. Caching: cheaper and faster
  for repeats. Routing: cheap models for easy work. More context/steps/agents: slower and pricier.
- **There's no global "best" — only best for the target.** Set the latency/throughput/cost budget
  per use case, then tune.

## Decision framework

```decision
title: Tuning the performance triangle
Interactive or voice (latency-critical)? → Smaller/faster model, stream output, minimise steps and context, keep it close (region/edge).
High-volume pipeline (throughput/cost-critical)? → Batch, route easy work to small models, cache, trim tokens.
Cost too high? → Route to smaller models, cut context/output length, cache repeats (see cost governance).
Quality too low after speeding up? → You over-optimised; rebalance — find the smallest model that still passes the eval.
Repeated identical/similar requests? → Cache results.
```

## How it works

You set the budget the use case demands (e.g. "voice: under ~1s perceived latency"; "batch: cost
per item under X"), then pull the relevant levers: model size (routing), output length, context
size (retrieval over dumping), streaming (perceived latency), caching (repeats), batching
(throughput), and placement (region/edge for latency, sensitivity for residency). You verify
quality still passes your evaluation after each optimisation — speed and cost gains that break
quality aren't gains.

## Common mistakes

- **Optimising one dimension blindly** — e.g. cheapest model, ignoring the quality or latency hit.
- **Ignoring output length** — verbose responses are a big, hidden latency and cost driver.
- **Not streaming** interactive responses — they feel slow even when they aren't.
- **Stuffing huge context** — slower (quadratic attention), pricier; retrieve instead.
- **No caching** for repeated requests.
- **Speeding up past the quality bar** — re-check evaluation after tuning.

## Real business examples

- A voice agent switches to a smaller model, streams output, and trims context to hit conversational
  latency — usability transformed, quality still acceptable for the task.
- A high-volume classifier batches requests and routes to a small model, multiplying throughput and
  slashing cost per item.
- A chatbot caches answers to common questions, cutting both latency and spend for the frequent
  cases.

## Governance considerations

```governance
Performance optimisation intersects governance in two ways. First, **cost control** is a governance concern (runaway spend, denial-of-wallet) — the same levers (routing, caching, trimming, limits) serve both performance and cost governance. Second, **placement choices made for latency** (which region/edge) must still respect **residency and confidentiality** — don't route sensitive data to a faster but non-compliant location. And re-run **evaluation** after optimising: a faster/cheaper config that quietly lowers quality is a reliability (and, in high-stakes uses, a safety) regression.
```

## How an architect thinks

```architect
The architect sets explicit latency/throughput/cost budgets per use case, then tunes against them with the right levers — never chasing a single metric in isolation. They know the big, often-missed levers (output length, context size, streaming, caching, routing) and they re-validate quality with evaluation after every optimisation. "Best" is meaningless to them; "meets the budget the use case needs, at acceptable quality" is the goal. Performance is engineered to a target, not maximised blindly.
```

## Key takeaways

- Balance the **performance triangle**: **latency, throughput, cost** — they trade off with each
  other and with quality.
- Set a **budget per use case**, then pull levers: **model size/routing, output length, context size,
  streaming, caching, batching, placement.**
- **Streaming** improves *perceived* latency; **caching** and **routing** cut cost; **trimming
  context** helps both.
- **Re-evaluate quality after tuning**, and keep placement **residency-compliant**.

## Self-check

1. What are the three dimensions of the performance triangle, and what trades against them?
2. Why is output length a major, often-missed lever?
3. Why must you re-run evaluation after optimising for speed or cost?
