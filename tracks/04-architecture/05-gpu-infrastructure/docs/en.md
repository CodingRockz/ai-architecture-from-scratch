---
title: "GPU & infrastructure basics"
track: 04-architecture
order: 5
summary: What a decision-maker needs to know about the hardware AI runs on — enough to reason about cost and feasibility.
readingTime: 7
prerequisites:
  - "Tensors"
  - "Training vs inference"
tags:
  - architecture
  - gpu
  - infrastructure
lastReviewed: 2026-05-30
sources:
  - "NVIDIA — What Is a GPU? — https://www.nvidia.com/en-us/glossary/gpu/"
---

## Overview

AI runs on **GPUs** (and similar accelerators), and their availability, memory, and cost shape what
you can do — especially if you self-host. You don't need to be a hardware engineer, but you need
enough literacy to reason about feasibility and cost when self-hosting or training, and to
understand why "just rent more GPUs" isn't always simple.

## Why this matters

GPU memory determines which models you can run; GPU cost and scarcity drive a big share of
self-hosting and training budgets; and "we need more GPUs" is a real constraint behind many AI cost
conversations. This literacy lets you sanity-check feasibility and budgets instead of taking them on
faith.

## Core concepts

- **GPUs do the tensor math** in parallel (from the tensors lesson) — far faster than CPUs for AI.
- **GPU memory (VRAM) is the key limit.** The model's weights (and, for MoE, all experts) must fit
  in VRAM to run. Bigger model = more VRAM = more/larger (pricier) GPUs. Quantization shrinks this.
- **Training needs far more than inference.** Training holds extra data (gradients, optimizer
  state) in memory and runs much longer — hence the huge clusters and bills.
- **Rent vs own.** Cloud GPUs (rent by the hour) suit variable/early use; owning hardware can be
  cheaper at high steady utilisation but is capital and maintenance. Cloud GPUs can also be scarce.
- **You usually don't touch this with hosted APIs** — the provider owns the GPUs; you pay per token.

## Decision framework

```decision
title: Do GPUs/infrastructure enter my decision?
Using hosted APIs only? → No — you pay per token; skip GPU concerns.
Self-hosting an open model? → Yes — check the model (and MoE experts) fit in your GPU's VRAM; quantize if needed.
Variable or early-stage usage? → Rent cloud GPUs; don't buy hardware yet.
Very high, steady utilisation? → Owning/long-term-reserving hardware may be cheaper; model it.
Training/fine-tuning at scale? → Expect significant GPU time/cost; this is where big bills live.
```

## How it works

When you self-host, you match the model to the hardware: confirm the (possibly quantized) model
fits in available VRAM, and size the number of GPUs to your throughput needs (the inference engine,
from Track 2, batches requests to use them efficiently). For training/fine-tuning, you budget far
more GPU time. For variable needs, you rent cloud GPUs; for heavy steady needs, owning can pay off
but adds capital and ops. With hosted APIs, all of this is the provider's problem and you simply pay
per use.

## Common mistakes

- **Picking a model that doesn't fit the GPU** — VRAM is the hard limit; check first (or quantize).
- **Buying hardware too early** — at low/variable volume, renting is usually smarter.
- **Confusing training and inference hardware needs** — training is far heavier.
- **Ignoring GPU scarcity/lead times** when planning capacity.
- **Over-worrying about GPUs as an API user** — you don't manage them at all.

## Real business examples

- A team wants to self-host a large open model but its VRAM exceeds their GPU; they switch to a
  quantized version that fits, trading a little quality for feasibility.
- A startup rents cloud GPUs for spiky workloads instead of buying, keeping cost proportional to use.
- A high-volume, steady-load company reserves long-term GPU capacity, lowering per-hour cost versus
  on-demand.

## Governance considerations

```governance
Infrastructure choices intersect with governance mainly through control and continuity. **Owning/controlling the hardware** (on-prem or dedicated cloud) supports data residency and confidentiality — the model and data stay in your environment — but you own its physical/network security and uptime. **Rented cloud GPUs** are convenient but place workloads on shared infrastructure under a provider's terms (check residency and isolation). Treat GPU capacity as a continuity risk too: scarcity or a provider issue can take a self-hosted service down, so plan capacity and fallback.
```

## How an architect thinks

```architect
The architect treats GPUs as a feasibility-and-cost gate for self-hosting, not a fascination. Their checks: does the (quantized) model fit in VRAM? how many GPUs for our throughput? rent or own given our utilisation? and what's the training cost if we tune? For hosted APIs they ignore all of it and reason in tokens. They also remember GPU scarcity is a real planning constraint and a continuity risk — capacity isn't infinite or instant.
```

## Key takeaways

- **GPUs** run AI's tensor math; **VRAM** is the key limit — the model must fit (quantize if not).
- **Training needs far more** GPU than inference; that's where big bills are.
- **Rent** for variable/early use, **own/reserve** for high steady utilisation; mind **scarcity**.
- **Hosted APIs hide all of this** — you just pay per token; GPU literacy matters mainly for
  **self-hosting and training**.

## Self-check

1. Why is GPU memory (VRAM) the key constraint when self-hosting?
2. Why does training need far more hardware than inference?
3. When does renting cloud GPUs beat owning hardware?
