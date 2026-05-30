---
title: "Prompting to set up fine-tuning"
track: 06-implementation
order: 5
summary: Directing an AI tool through a fine-tuning effort — focusing your attention on the data and the evaluation.
readingTime: 7
prerequisites:
  - "Fine-tuning architecture"
  - "Architecture prompting"
tags:
  - implementation
  - fine-tuning
  - worked-example
lastReviewed: 2026-05-30
sources:
  - "Unsloth documentation — https://docs.unsloth.ai/"
---

## Overview

If you've decided fine-tuning is warranted (behaviour gap, not facts — see the fine-tuning
lessons), you can direct an AI tool through the mechanics. But the tool can't do the two things that
matter most: assemble good training data and decide whether the result is acceptable. This lesson is
how to direct the build while you own the data and the evaluation.

## Why this matters

Fine-tuning is the lever people most often pull wrongly. Directing it well means putting your effort
where it counts (data quality, evaluation, safety) and letting the tool handle the training plumbing
— and recognising when you should *not* fine-tune at all.

## Core concepts

- **First, confirm you should fine-tune.** Behaviour gap remaining after prompting + RAG? Facts →
  RAG instead. (Have the tool pressure-test this with you.)
- **The data is your job.** You decide and assemble the input→ideal-output examples; the tool can
  help format/clean, but representativeness and quality are yours to own.
- **The tool handles the mechanics.** LoRA/QLoRA training via Unsloth/Axolotl or a managed service —
  directed by you, executed by it.
- **You own the evaluation gate.** A held-out set of real tasks, scored before/after, plus a safety
  re-test. The tool can run evals, but you set the bar and decide.
- **Plan the lifecycle.** Versioning, data lineage, re-tuning on base-model updates (from the
  fine-tuning architecture lesson).

## How to direct it

```prompt
Act as my ML engineer. Help me fine-tune an open model for a specific BEHAVIOUR (not facts).

First: pressure-test whether fine-tuning is the right tool here vs prompting/RAG — push back if it isn't.
Goal behaviour: [e.g. always output this strict JSON format / this house style].
Then guide me to:
1. Define what training examples I need and how many; help me format/clean the dataset I provide.
2. Choose a method (default LoRA/QLoRA) and set up the training (self-run or managed) — explain the steps.
3. Build an evaluation: a held-out set of my real tasks, scoring quality AND a safety re-test.
4. Tell me the pass bar and the lifecycle plan (versioning, re-tuning on base-model updates).

Don't start training until the dataset and eval are ready. Ask me questions first.
```

## Decision framework

```decision
title: Directing a fine-tune responsibly
Has the tool confirmed fine-tuning beats prompting/RAG here? → If not, reconsider; facts → RAG.
Do I have a quality, representative dataset? → This is mine to own; the tool can format, not invent quality.
Is there a held-out eval (quality + safety) with a pass bar? → Required before trusting the result.
Did the result beat the baseline on real tasks? → If not, don't ship it.
Is the lifecycle planned (versioning, lineage, re-tune)? → Set before starting.
```

## Common mistakes

- **Fine-tuning when prompting/RAG would do** — direct the tool to challenge this first.
- **Letting the tool "make up" training data** — synthetic data can help but representativeness and
  quality are your responsibility.
- **No held-out evaluation or safety re-test** — shipping a possibly-worse, possibly-less-safe
  model.
- **Skscoring only quality, not safety** — tuning can erode alignment.
- **No lifecycle plan** — an orphaned fine-tune that rots.

## Real business examples

- A team directs an AI tool to fine-tune for a strict output format, but first the tool confirms
  prompting couldn't reliably achieve it; the team supplies a clean dataset, the tool runs a LoRA
  tune, and they gate on a real-task eval before rollout.
- A company almost fine-tunes for "product knowledge"; prompted to pressure-test, the tool points
  out that's a RAG problem — saving the effort.

## Governance considerations

```governance
Directing a fine-tune doesn't offload its governance (from the fine-tuning lessons): you must have rights to the training data, remove/protect personal and confidential info (it can be memorised), record data lineage, confirm the base model's license permits tuning, and re-test safety afterward. With managed services, your data goes to a third party — check terms and residency. Have the tool surface these requirements, but you (accountable) confirm them — the tool will train on whatever you give it without judging the rights or sensitivity.
```

## How an architect thinks

```architect
The architect directs the mechanics to the tool and keeps the judgement: is fine-tuning even right, is the dataset good and rights-clean, does the result beat the baseline on real tasks and stay safe, and who maintains it. They make the tool pressure-test the decision and run the evals, but they own the data and the go/no-go. Fine-tuning is the lever they pull last and direct most carefully, because it's the easiest to do badly.
```

## Key takeaways

- Direct the **mechanics** (LoRA/QLoRA training) to the tool; **own the data and the evaluation**.
- Have the tool **pressure-test** whether to fine-tune at all (facts → RAG).
- Gate on a **held-out, real-task eval + safety re-test**; ship only if it **beats the baseline**.
- The **data governance and lifecycle** are yours — confirm them; the tool won't.

## Self-check

1. What two parts of fine-tuning can the tool *not* do for you?
2. Why direct the tool to challenge the decision to fine-tune?
3. What governance items must you confirm even when the tool runs the training?
