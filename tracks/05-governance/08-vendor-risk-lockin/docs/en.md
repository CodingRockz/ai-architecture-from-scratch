---
title: "Vendor risk, lock-in & procurement"
track: 05-governance
order: 8
summary: Choosing and governing AI suppliers — assessing their risk, avoiding lock-in, and buying responsibly.
readingTime: 7
prerequisites:
  - "Frontier LLMs (Claude, GPT, Gemini)"
  - "Building an AI governance framework"
tags:
  - governance
  - vendor-risk
  - procurement
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

Most organisations *buy* AI capability rather than build it — models, tools, platforms from
third-party vendors. That makes **vendor risk** (the supplier's reliability, security, and terms),
**lock-in** (how stuck you'd be if you wanted to leave), and **procurement** (how you evaluate and
contract) central governance concerns. You're trusting outside parties with your data and your
operations; choose and govern them deliberately.

## Why this matters

A vendor can change prices, deprecate the model you depend on, suffer an outage or breach, change
terms, or use your data in ways you didn't intend. And if switching away is hard, you've lost
leverage. Treating AI vendors with the same rigor as any critical supplier protects you from
nasty surprises and keeps you in control.

## Core concepts

- **Vendor risk** — security posture (do they protect your data?), reliability (uptime, support),
  financial/longevity (will they exist next year?), and data terms (training, retention,
  residency).
- **Lock-in** — technical (proprietary APIs, formats), data (hard to export), and economic (deep
  integration makes leaving costly). The more locked in, the less leverage you have.
- **Concentration risk** — depending on a single vendor for something critical; an outage or
  policy change then hits you with no fallback.
- **Procurement diligence** — the questions and contract terms to nail down *before* you commit,
  scaled to how critical and sensitive the use is.

## Decision framework

```decision
title: Evaluating and de-risking an AI vendor
Will it handle sensitive data? → Demand data terms in writing: no training on your data, limited retention, residency, security certifications.
Is it business-critical? → Assess reliability, support, and the vendor's longevity; have a fallback plan.
How locked in would we be? → Prefer standard interfaces and exportable data; abstract your integration so you can switch.
Single point of failure? → Avoid sole dependence for critical paths; keep a second option warm.
High-stakes/regulated? → Full procurement review: security questionnaire, contract terms, audit rights, sub-processor list.
```

## How it works

Before adopting a vendor, you run diligence proportionate to the stakes: for a low-risk tool, a
quick check of terms; for a critical, data-sensitive one, a security questionnaire, contractual
guarantees (data use, residency, breach notification, audit rights), and a longevity/fallback
assessment. To limit lock-in, you design integrations behind an abstraction (so the vendor is
swappable — exactly the advice from the frontier-models lesson) and ensure you can export your
data. You revisit vendors periodically, because their terms and reliability change.

## Common mistakes

- **Adopting on a free tier** whose terms allow training on your data, then scaling on it.
- **Deep, un-abstracted integration** with one provider, making a later switch painful and
  expensive.
- **No fallback for a critical dependency** — when the vendor has an outage or changes a model,
  you're stuck.
- **Skipping diligence for "just a tool"** that quietly ends up processing sensitive data.
- **Ignoring vendor longevity** — building on a startup that may pivot or fold.

## Real business examples

- A company abstracts its LLM calls behind an internal interface; when a better/cheaper provider
  emerges (or one raises prices), they switch in days, not months — lock-in avoided by design.
- A regulated firm requires written no-training and residency terms plus audit rights before
  approving an AI vendor, satisfying its own compliance obligations.
- A team keeps a secondary model provider configured so a primary outage degrades gracefully
  instead of taking them down.

## Tools / approaches in this category

```toolcard
name: Vendor abstraction layer
category: Architecture pattern to avoid lock-in
use: Route AI calls through your own interface so providers are swappable
alternatives: Build a thin internal wrapper; or use a model-gateway/router that supports many providers
when: Any time you depend on an external model/tool and want switching leverage
whennot: Truly throwaway experiments where switching cost is irrelevant
```

## Governance considerations

```governance
Vendor governance ties together data and continuity risk. Get data terms in writing (training, retention, residency, breach notification) — this is how the privacy and confidentiality obligations from earlier lessons actually get enforced on third parties. Track your vendors and their sub-processors in your governance records (regulators and clients ask). And treat continuity as governance: a critical AI dependency needs a documented fallback (next lessons), because "the vendor changed/disappeared" is a foreseeable risk, not bad luck.
```

## How an architect thinks

```architect
The architect treats every AI vendor as both a capability and a dependency to be managed. They buy capability but design for *exit*: standard interfaces, exportable data, a warm fallback for critical paths. They push hard on data terms in contracts (that's where privacy promises become enforceable) and weigh the vendor's longevity. The guiding question: "if this vendor doubled its price, had an outage, or changed its terms tomorrow, how exposed are we — and can we switch?"
```

## Key takeaways

- Buying AI means **vendor risk** (security, reliability, longevity, data terms), **lock-in**, and
  **concentration risk** to manage.
- **Get data terms in writing** (no-training, retention, residency, breach notification) — that's
  how privacy/confidentiality is enforced on vendors.
- **Avoid lock-in** with abstraction layers and exportable data; keep a **fallback** for critical
  dependencies.
- Scale **procurement diligence** to the stakes; track vendors (and sub-processors) in governance
  records.

## Self-check

1. Name three dimensions of vendor risk.
2. What are the types of lock-in, and how does an abstraction layer help?
3. Why is a fallback for a critical AI vendor a governance issue, not just an engineering nicety?
