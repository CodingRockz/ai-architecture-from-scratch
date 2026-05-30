---
title: "Fine-tuning stacks"
track: 02-ecosystems
order: 9
summary: The tools that make fine-tuning practical — Axolotl, Unsloth, managed tuning — and how to decide if you even need them.
readingTime: 6
prerequisites:
  - "LoRA / QLoRA"
  - "Pre-training, fine-tuning & alignment"
tags:
  - ecosystems
  - fine-tuning
lastReviewed: 2026-05-30
sources:
  - "Unsloth documentation — https://docs.unsloth.ai/"
---

## Overview

If you decide to fine-tune an open model (after exhausting prompting and RAG), you'll use a
**fine-tuning stack** — tools that handle the data prep, training loop, and LoRA/QLoRA
mechanics for you. The common names: **Unsloth** (fast, memory-efficient), **Axolotl**
(flexible, config-driven), and **managed fine-tuning** services from model and cloud providers.

## Why this matters

Fine-tuning used to require deep ML expertise; these tools and managed services have lowered the
bar dramatically. As a decision-maker, you should know fine-tuning is *accessible* now, while
remembering it's still usually the **last** lever to pull — and that "accessible" doesn't remove
the data and maintenance responsibilities.

## Core concepts

- **What they do:** take your dataset of examples and an open base model, run LoRA/QLoRA
  training efficiently, and output a fine-tuned model or adapter you can serve.
- **Self-run vs. managed:**
  - **Self-run** (Unsloth, Axolotl) — you run them on your own/rented GPUs; maximum control,
    more effort.
  - **Managed** (provider fine-tuning services) — upload data, get a tuned model back; less
    control, far less effort. Some work on closed models too.
- **Data is the hard part.** The tool is the easy bit; assembling a clean, representative,
  rights-cleared dataset of input→ideal-output examples is the real work and the real cost.

## Decision framework

```decision
title: Do I need a fine-tuning stack, and which?
Have you exhausted prompting + RAG? → If not, do that first; most needs don't require fine-tuning.
Real, persistent behaviour/format gap remains? → Fine-tune. Choose:
  - No ML team, want it easy? → **Managed fine-tuning** service.
  - Self-hosting / want control / cost at scale? → **Unsloth or Axolotl** on your GPUs.
Need fresh facts? → Not fine-tuning — that's RAG.
Don't have good training data? → Stop: fix the data first, or reconsider — bad data makes a worse model.
```

## How it works

You prepare a dataset (examples of the inputs the model will see and the outputs you want),
point the tool at a base model, and it runs an efficient LoRA/QLoRA training pass, producing a
small adapter or merged model. Managed services wrap all of this behind an upload-and-wait
interface. Either way, you then **evaluate** the result against your real tasks before trusting
it — fine-tuning can help *or* hurt depending on data quality.

## Common mistakes

- **Fine-tuning prematurely** before trying prompting and RAG — wasted effort and ongoing
  maintenance.
- **Underinvesting in the dataset.** Garbage or unrepresentative examples produce a worse model;
  data quality dominates.
- **Skipping post-tune evaluation and safety re-test** — fine-tuning can degrade alignment.
- **Ignoring data rights/privacy** in the training set (covered in Governance).
- **Creating a model you must now maintain** — every base-model update may mean re-tuning.

## Real business examples

- A company with a strict output format that prompting couldn't guarantee uses a managed
  fine-tuning service on a small dataset — quick win, no ML team.
- A team self-hosting an open model uses Unsloth to fine-tune cost-effectively on their GPUs,
  then evaluates carefully before rollout.
- A startup *almost* fine-tunes for "domain knowledge," realises that's a RAG problem, and saves
  the effort.

## Tools in this category

```toolcard
name: Fine-tuning stacks
category: Tools/services to adapt models to your data (LoRA/QLoRA)
use: Run efficient fine-tuning to instil a specific behaviour, style, or format
alternatives: Unsloth, Axolotl (self-run); managed fine-tuning from model/cloud providers
when: A real behaviour gap remains after prompting + RAG, and you have good training data
whennot: You need facts (use RAG), or haven't tried cheaper levers, or lack quality data
```

## Governance considerations

```governance
Fine-tuning trains on your data, so the governance bar rises: confirm you have the **rights** to use the data; remove or protect **personal/confidential** information (it can be memorised into the model); record **data lineage** for audits; and **re-test safety/alignment** afterwards, since tuning can erode guardrails. With **managed** services, your training data goes to a third party — check their terms and residency. None of these go away just because the tooling got easy.
```

## How an architect thinks

```architect
The architect treats fine-tuning stacks as proof that fine-tuning is now *cheap to attempt* — which is precisely why discipline matters. They still climb the ladder (prompt → RAG → fine-tune), invest in the dataset (the real lever), and demand evaluation and safety re-testing before any tuned model ships. "We can fine-tune easily now" is true; "we should" is a separate, evidence-based decision.
```

## Key takeaways

- **Fine-tuning stacks** (Unsloth, Axolotl, managed services) make LoRA/QLoRA fine-tuning
  practical.
- **Data quality is the real work**; the tool is the easy part.
- Fine-tuning remains the **last lever** — prompt and RAG first; use RAG for facts.
- Easier tooling doesn't remove **data-rights, privacy, lineage, safety-retest, and maintenance**
  duties; always **evaluate** the result.

## Self-check

1. What's the genuinely hard part of fine-tuning, and why?
2. Self-run vs. managed fine-tuning — what's the trade-off?
3. Name two governance checks required before and after fine-tuning.
