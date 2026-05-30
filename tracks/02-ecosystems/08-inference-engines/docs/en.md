---
title: "Inference engines & local runtimes"
track: 02-ecosystems
order: 8
summary: The software that actually runs a model — vLLM, Ollama, llama.cpp — when you're not just calling an API.
readingTime: 6
prerequisites:
  - "Open-source LLMs (Llama, Qwen, Gemma, Mistral)"
  - "Training vs inference"
tags:
  - ecosystems
  - inference
  - local-ai
lastReviewed: 2026-05-30
sources:
  - "vLLM documentation — https://docs.vllm.ai/"
  - "Ollama — https://ollama.com/"
---

## Overview

If you use a hosted model, the provider runs it for you. If you use an **open model**, you need
software to actually run it — an **inference engine** or **runtime**. The common names: **vLLM**
(high-throughput server for production), **Ollama** (dead-simple local running), and
**llama.cpp** (efficient running on modest/edge hardware). They live in the *serving* layer of
the map.

## Why this matters

Inference engines are the bridge between "we downloaded an open model" and "we can actually use
it." Knowing they exist — and roughly which is for what — lets you reason about self-hosting
costs and feasibility, and explains how a capable model can run on a laptop (Ollama, llama.cpp)
versus serving thousands of users (vLLM).

## Core concepts

- **An inference engine loads a model and answers requests** efficiently — managing GPU memory,
  batching many requests, and exposing an API your apps call (often mimicking the OpenAI API so
  code is portable).
- **Different tools, different jobs:**
  - **Ollama** — easiest way to run open models locally; great for prototyping and personal/
    on-device use.
  - **llama.cpp** — highly optimised to run quantized models on modest CPUs/GPUs and edge
    devices.
  - **vLLM** — built for high-throughput, production serving on GPUs (efficient batching, fast).
- **They turn the "open vs hosted" choice into reality** — and their efficiency directly
  affects your self-hosting cost.

## Decision framework

```decision
title: Which runtime fits my situation?
Experimenting locally or on one machine? → **Ollama** — simplest to start.
Running on a laptop, CPU, or edge device? → **llama.cpp** (often via Ollama, which uses it).
Serving many users in production on GPUs? → **vLLM** (or a managed equivalent) for throughput.
Don't want to run anything? → Use a hosted API or a managed inference provider — skip this layer entirely.
```

## How it works

The engine loads the model's weights into memory (GPU or CPU), then for each request runs the
forward pass and streams back tokens. The clever part is efficiency: serving engines batch many
users' requests together and manage memory carefully so expensive GPUs stay busy — which is
what makes self-hosting economically viable at scale. For local use, runtimes like llama.cpp
squeeze quantized models onto everyday hardware.

You won't operate these by hand as a non-coder, but you'll *decide* whether self-hosting is
worth it, and these tools (and their efficiency) are a big part of that math.

## Common mistakes

- **Forgetting you need a runtime at all** when planning to use open models — it's real work.
- **Using a local-first tool (Ollama) for heavy production load** it isn't built for — use vLLM
  or a managed service for scale.
- **Underestimating GPU memory needs** — the model (and for MoE, all experts) must fit; this
  drives hardware cost.
- **Assuming self-hosting is automatically cheaper** — engine efficiency and your utilisation
  decide that.

## Real business examples

- A developer prototypes with Ollama on a laptop to test an open model before committing to a
  hosting plan.
- A company self-hosts with vLLM on cloud GPUs to serve its app, keeping data in-region and
  controlling per-token cost at high volume.
- An edge application runs a small quantized model via llama.cpp on local devices for offline,
  private inference.

## Tools in this category

```toolcard
name: Inference engines / runtimes
category: Software that runs models you host yourself
use: Load open models and serve responses efficiently, locally or in production
alternatives: vLLM (production), Ollama (local/easy), llama.cpp (edge/efficient), TGI
when: You self-host open models (residency, control, or high steady volume)
whennot: You use hosted APIs or a managed inference provider — no runtime to operate
```

## Governance considerations

```governance
Inference engines are what make **local/on-prem inference** possible — the technical foundation for keeping data and models in your environment to satisfy residency and confidentiality requirements. The trade-off is ownership: when you run the engine, you own its **security (the endpoint must be access-controlled), patching, uptime, and capacity**. A self-hosted model with an unsecured inference endpoint is a serious exposure — govern access to it like any sensitive internal service.
```

## How an architect thinks

```architect
The architect treats inference engines as the cost-and-control knob of self-hosting. "Can we keep data in-house?" becomes "can we run this model efficiently enough, on hardware we can afford, with an endpoint we can secure and keep up?" They match the tool to the scenario — Ollama/llama.cpp for local and edge, vLLM for production — and they fold the engine's efficiency into the open-vs-hosted cost comparison rather than assuming self-hosting is cheaper.
```

## Key takeaways

- **Inference engines** run the models you **self-host**: **Ollama** (easy/local), **llama.cpp**
  (edge/efficient), **vLLM** (production throughput).
- They make **local/on-prem inference** real — the basis for data residency and control.
- Self-hosting means **you own security, patching, uptime, and capacity** — and cheaper isn't
  guaranteed.
- If you use hosted/managed inference, you skip this layer.

## Self-check

1. Why do you need an inference engine for open models but not for hosted APIs?
2. Match the tool to the job: laptop prototype, edge device, high-volume production.
3. What new responsibility does running your own inference endpoint create?
