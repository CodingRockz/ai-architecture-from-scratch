---
title: "Licensing, copyright & open-source risk"
track: 05-governance
order: 10
summary: What you're allowed to use, train on, and ship — model licenses, copyright of AI outputs, and open-source caveats.
readingTime: 7
prerequisites:
  - "Open-source LLMs (Llama, Qwen, Gemma, Mistral)"
tags:
  - governance
  - licensing
  - copyright
lastReviewed: 2026-05-30
sources:
  - "U.S. Copyright Office — Copyright and Artificial Intelligence — https://www.copyright.gov/ai/"
  - "WIPO — AI and intellectual property — https://www.wipo.int/about-ip/en/frontier_technologies/ai_and_ip.html"
---

## Overview

AI raises thorny intellectual-property questions in three directions: the **license of the model**
you use (what you're permitted to do with it), the **copyright status of AI outputs** (do you own
what it generates?), and the **provenance of training data** (was it trained on material that
creates infringement risk?). These are unsettled and jurisdiction-dependent — but you can manage
the risk with a few clear practices. (Education, not legal advice.)

## Why this matters

Get licensing wrong and you may be using a model in a way its terms forbid (e.g. a commercial use
the license caps). Misunderstand output copyright and you may not own — or may not be able to
protect — content your business depends on. Ignore training-data provenance and you inherit
infringement exposure. For anything you ship or rely on commercially, this matters.

## Core concepts

- **Model licenses vary widely.** "Open" models range from permissive (Apache/MIT-style, broad
  commercial use) to restricted (custom licenses with usage caps, field-of-use limits, or
  acceptable-use rules). **Always read the specific license** — "open" is not one thing.
- **Copyright of AI outputs is unsettled.** In several jurisdictions (e.g. current US Copyright
  Office guidance), purely AI-generated content may **not** be copyrightable; human authorship/
  creative input matters. So you may not be able to claim/defend exclusive rights in raw AI
  outputs.
- **Training-data risk.** Models trained on copyrighted material are the subject of ongoing
  litigation; outputs can sometimes resemble training data. Some vendors offer **IP indemnities**
  for enterprise customers — a meaningful risk transfer.
- **Provider output terms.** Hosted providers' terms usually assign you rights to use outputs —
  but read them, and note that "you may use it" is different from "you own a defensible
  copyright."

## Decision framework

```decision
title: Managing IP risk in an AI use
Self-hosting/fine-tuning an open model? → Read its license: commercial use allowed? usage caps? field-of-use limits? acceptable-use terms?
Shipping AI-generated content commercially? → Add meaningful human creative input; don't assume you hold enforceable copyright in raw outputs.
Worried about training-data infringement? → Prefer providers offering IP indemnification for enterprise use; keep humans reviewing outputs for obvious copying.
Generating brand/marketing assets? → Check both the tool's output terms and likeness/trademark issues; have a human clear them.
High-stakes IP question? → Get qualified IP counsel — this area is unsettled and jurisdictional.
```

## How it works

Practically: before adopting a model, read its license and confirm your intended use is permitted
(commercial scope, scale, field). For outputs you'll commercialise, keep a human in the creative
loop and don't rely on owning raw generations. For infringement exposure, favour vendors that
indemnify enterprise customers and keep review in place. Record these decisions — which model
under which license, which output terms — as part of your governance records.

## Common mistakes

- **Assuming "open" = "do anything commercially."** Many open models have real restrictions; read
  the license.
- **Assuming you automatically own AI outputs** — you may not hold enforceable copyright in purely
  machine-generated content.
- **Ignoring training-data/infringement risk** in customer-facing generated content.
- **Overlooking enterprise IP indemnities** that some providers offer (free risk reduction).
- **Treating it as settled law** — it's actively evolving and varies by country.

## Real business examples

- A startup picks an open model for a commercial product but checks the license first, discovering
  a usage cap that would have been breached at scale — and chooses a permissively-licensed
  alternative.
- A media company keeps human editors substantively involved in AI-assisted content so it can
  claim copyright, rather than relying on raw, likely-uncopyrightable generations.
- An enterprise selects a hosted provider partly for its **IP indemnification**, transferring some
  infringement risk.

## Governance considerations

```governance
IP and licensing belong in your governance records: track which models you use under which licenses (and that your usage complies), the output/IP terms of each provider, and whether indemnification applies. For commercialised AI content, set a policy requiring human creative involvement and review. Because the law is unsettled and jurisdiction-specific, define when IP counsel is required (e.g. anything you'll assert exclusive rights over, or high-volume customer-facing generation). This is general guidance, not legal advice.
```

## How an architect thinks

```architect
The architect adds "are we allowed to, and do we own it?" to the selection checklist alongside capability and cost. They read model licenses before committing, prefer indemnified providers for infringement-sensitive uses, and design human creativity into anything whose IP they need to defend. They treat the legal uncertainty as a reason for caution and documentation — and know when to escalate to IP counsel rather than improvise.
```

## Key takeaways

- **Model licenses vary** — "open" can carry commercial caps and field limits; **read the specific
  license.**
- **AI outputs may not be copyrightable** without human creative input — don't assume you own raw
  generations.
- **Training-data infringement** is an evolving risk; favour **enterprise IP indemnities** and keep
  human review.
- Record licensing/IP decisions in governance; **get IP counsel** for high-stakes, unsettled
  questions. (Not legal advice.)

## Self-check

1. Why is "it's an open model" not enough to know you can use it commercially?
2. Why might you not own a defensible copyright in raw AI-generated content?
3. What is an IP indemnity, and why might it influence vendor choice?
