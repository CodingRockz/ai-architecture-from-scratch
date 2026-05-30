---
title: "Edge & on-device AI"
track: 04-architecture
order: 6
summary: Running models on the user's device — phones, laptops, sensors — and when that beats the cloud.
readingTime: 6
prerequisites:
  - "Distillation & quantization"
  - "Local vs cloud vs hybrid"
tags:
  - architecture
  - edge-ai
lastReviewed: 2026-05-30
sources:
  - "Ollama — https://ollama.com/"
---

## Overview

**Edge AI** runs models directly on the end device — a phone, laptop, camera, or sensor — rather
than in the cloud. Thanks to small/quantized models and efficient runtimes (llama.cpp, Ollama),
surprisingly capable AI can now run locally on everyday hardware. It's a powerful option when
privacy, latency, offline operation, or per-request cost matter.

## Why this matters

Edge flips several trade-offs: data never leaves the device (strong privacy/residency), responses
are instant (no network round-trip), it works offline, and there's no per-request cloud cost. The
price is using smaller, less capable models and managing deployment across many devices. Knowing
when edge wins opens up applications cloud can't serve well.

## Core concepts

- **On-device inference.** The model runs locally; inputs never go to a server. Enabled by
  quantized small models + efficient runtimes.
- **The edge advantages:** privacy (data stays on device), low latency (no network), offline
  capability, and zero marginal cloud cost.
- **The edge constraints:** limited compute/memory means smaller, less capable models; updating
  models across many devices is an operational challenge; battery/thermal limits on mobile.
- **Hybrid edge-cloud.** Handle routine/sensitive work on-device, escalate hard cases to the cloud
  — mirroring the local/cloud hybrid pattern.

## Decision framework

```decision
title: Should this run on the edge?
Must data never leave the device (privacy/regulatory)? → Strong case for edge.
Need instant response or offline operation? → Edge (no network dependency).
Is a smaller model good enough for the task? → Edge is feasible; if you need top capability, use cloud or hybrid.
Huge fleet of devices to keep updated? → Factor in deployment/update complexity.
Hardest cases occasionally? → Hybrid: edge for routine, cloud for the hard ones.
```

## How it works

You pick a small/quantized model that fits the device and runs acceptably, deploy it via an
on-device runtime, and keep inference local. For capability beyond the small model, you add a
hybrid path that escalates select requests to the cloud (network permitting). The main ongoing
challenge is fleet management: pushing model updates and monitoring across many devices.

## Common mistakes

- **Forcing a too-large model onto constrained hardware** — it won't fit or will be too slow;
  right-size and quantize.
- **Expecting cloud-frontier capability on-device** — edge models are smaller; set expectations.
- **Ignoring update/monitoring logistics** across a device fleet.
- **Overlooking edge for privacy-sensitive use cases** where it's the ideal answer.

## Real business examples

- A mobile app runs a small model **on-device** for instant, private text features that work
  offline — no data sent, no latency, no per-use cost.
- A factory runs vision models on **edge cameras** to flag defects in real time without streaming
  footage to the cloud (bandwidth + privacy).
- A product uses **hybrid edge-cloud**: on-device for common, sensitive operations; cloud for rare
  complex requests.

## Governance considerations

```governance
Edge is often the strongest privacy/residency answer: if inference is on-device, sensitive data may never leave it at all, sidestepping many cloud data-handling concerns. But edge shifts other duties to you: securing the model and data *on* devices you may not fully control, updating models across a fleet (including pushing fixes), and ensuring consistent behaviour everywhere. For regulated, privacy-critical, or offline use cases, edge can turn a hard governance problem into an easy one — provided you manage device security and updates.
```

## How an architect thinks

```architect
The architect reaches for edge when privacy, latency, offline operation, or per-request cost are the binding constraints, and when a small model clears the quality bar. They right-size and quantize to fit the hardware, plan fleet updates/monitoring as a first-class concern, and add a hybrid cloud escape hatch for the rare hard case. Edge is a deliberate trade — less capability for more privacy, speed, and independence — chosen when those properties matter most.
```

## Key takeaways

- **Edge AI** runs models **on the device**: strong **privacy, low latency, offline, no per-request
  cloud cost** — at the price of **smaller models** and **fleet management**.
- Enabled by **quantized small models + efficient runtimes**.
- Use **hybrid edge-cloud** to escalate hard cases.
- Often the **best privacy/residency answer**, but you own **device security and updates**.

## Self-check

1. What are the main advantages of running AI on the edge?
2. What's the central trade-off versus cloud?
3. Why can edge simplify privacy/residency governance — and what new duty does it add?
