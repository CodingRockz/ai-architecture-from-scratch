---
title: "Open-source LLMs (Llama, Qwen, Gemma, Mistral)"
track: 02-ecosystems
order: 3
summary: Models you can download and run yourself — why and when that's worth it, and what you take on by doing it.
readingTime: 7
prerequisites:
  - "Frontier LLMs (Claude, GPT, Gemini)"
  - "Distillation & quantization"
tags:
  - ecosystems
  - open-source
  - llms
lastReviewed: 2026-05-30
sources:
  - "Meta — Llama models — https://www.llama.com/"
  - "Stanford HAI — Artificial Intelligence Index Report 2025 (open vs closed gap) — https://hai.stanford.edu/ai-index/2025-ai-index-report"
---

## Overview

**Open-weight models** — Llama (Meta), Qwen (Alibaba), Gemma (Google), Mistral, and others —
are models whose weights you can download and run on your own hardware (or rented GPUs). They
trade some peak capability and convenience for **control, privacy, and cost predictability**.
The gap to frontier models has narrowed a lot, making them a serious option.

## Why this matters

The single biggest reason to choose open models is **keeping data and the model in your
control** — essential when residency, confidentiality, or regulatory rules forbid sending data
to a third-party API. They can also be cheaper at very high volume and free you from vendor
lock-in. But running them means you take on the infrastructure and the responsibilities.

## Core concepts

- **"Open weights" ≠ fully open.** Most "open-source" LLMs release the weights (so you can run
  and fine-tune them) but not all training data, and some have license restrictions (e.g. usage
  caps). Always check the license.
- **You run them** — via an inference engine (vLLM, Ollama; next lessons) on your GPUs or a
  cloud GPU host. That's real operational work.
- **They come in sizes**, and **quantization** (earlier lesson) lets smaller/compressed
  versions run on modest hardware — even laptops for the small ones.
- **You can fine-tune them freely** (LoRA/QLoRA), which closed models often restrict.

## Decision framework

```decision
title: Open-weight model or hosted frontier API?
Data must stay on-prem / in-region by law or contract? → **Open model, self-hosted** — often the deciding factor.
Want zero infrastructure and maximum capability, data-sharing acceptable? → **Hosted frontier API.**
Very high, steady volume where per-call API costs hurt? → **Open model** can be cheaper if you can run it efficiently.
Need deep customisation / free fine-tuning? → **Open model.**
Small team, no ops capacity, moderate volume? → **Hosted API** — don't take on infra you can't maintain.
```

## How it works

You pick a model and size, run it on an inference engine, and call it like any other model —
except now *you* own uptime, scaling, security patching, and the GPUs. The capability is yours
to keep and customise, but so are the operational burdens. Many teams use a **hybrid**: open
models for sensitive or high-volume work, frontier APIs for the hardest tasks (see the
Architecture track).

## Common mistakes

- **Underestimating the operational cost.** "Free" weights still need GPUs, expertise, and
  maintenance — sometimes more total cost than an API.
- **Ignoring the license.** Some open models restrict commercial use or scale; read it
  (covered in Governance: licensing).
- **Assuming open = worse.** For many tasks, a good open model is more than enough; test it.
- **Self-hosting to "save money" at low volume.** APIs usually win until volume is high and
  steady.

## Real business examples

- A healthcare provider runs an open model on-prem so patient data never leaves their network —
  capability was secondary to **residency and confidentiality**.
- A high-volume document processor finds a quantized open model on rented GPUs cheaper than
  per-call API pricing at their scale.
- A startup uses a hosted API to launch fast, planning to move sensitive workloads to an open
  model later — a deliberate, staged choice.

## Tools in this category

```toolcard
name: Open-weight LLMs
category: Downloadable, self-hostable language models
use: Run and fine-tune capable models on your own hardware for control, privacy, and cost
alternatives: Llama (Meta), Qwen (Alibaba), Gemma (Google), Mistral, DeepSeek
when: Data residency/confidentiality, free fine-tuning, or high steady volume
whennot: No ops capacity, low volume, or you need the absolute top capability with no infra
```

## Governance considerations

```governance
Open models flip the governance trade-off. You gain **control** (data and model stay in your environment — strong for residency and confidentiality) but take on **responsibility** (you patch, secure, and monitor the deployment yourself, and you must comply with the model's license). Track the model's license terms, who can access the self-hosted endpoint, and your own patching/security — the provider is no longer doing that for you.
```

## How an architect thinks

```architect
The architect frames it as "control vs. convenience." Open models move data control and customisation in-house at the price of operational burden. They rarely see it as all-or-nothing: a hybrid — open models where control matters, frontier APIs where capability matters — usually beats dogmatic "all open" or "all closed." And they always read the license before committing.
```

## Key takeaways

- **Open-weight models** (Llama, Qwen, Gemma, Mistral) you **run yourself** — trading peak
  capability/convenience for **control, privacy, cost predictability**.
- The deciding reason is usually **data residency/confidentiality**; high steady volume is a
  secondary one.
- "Open weights" ≠ unrestricted — **check the license**.
- You gain control but **own the operations** (uptime, security, patching). **Hybrid** setups
  are common.

## Self-check

1. What's the most common decisive reason to choose an open, self-hosted model?
2. Why isn't "the weights are free" the same as "it's cheaper"?
3. What does a hybrid open/closed architecture look like, and why use one?
