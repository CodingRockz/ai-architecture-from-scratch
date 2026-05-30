---
title: "Compliance & regulation"
track: 05-governance
order: 9
summary: The emerging rules for AI — the EU AI Act, sector laws, and how to stay on the right side of them.
readingTime: 8
prerequisites:
  - "Why governance is a pillar, not a footnote"
  - "Data privacy, residency & jurisdiction"
tags:
  - governance
  - compliance
  - regulation
lastReviewed: 2026-05-30
sources:
  - "EU Artificial Intelligence Act — https://artificialintelligence-act.eu/"
  - "EU AI Act — Article 4 (AI literacy) — https://artificialintelligence-act.eu/article/4/"
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

AI regulation has arrived. The **EU AI Act** is the most comprehensive, with obligations phasing
in through 2025–2027, and it reaches any organisation serving EU users. On top of it sit existing
privacy laws (GDPR), sector rules (health, finance, legal), and a patchwork of national
approaches. This lesson maps the landscape and how to stay compliant without a law degree — while
remembering this is education, not legal advice.

## Why this matters

Non-compliance carries real penalties (EU AI Act fines can reach into the millions or a
percentage of global turnover, like GDPR) and can block you from markets. Regulation is also
*creating demand*: the EU AI Act's AI-literacy requirement (Article 4) obliges organisations to
ensure staff understand the AI they use — which is partly what this course helps with. Knowing the
rules turns a threat into a navigable constraint.

## Core concepts

- **The EU AI Act is risk-tiered:**
  - **Unacceptable risk** — banned uses (e.g. social scoring, certain manipulation).
  - **High risk** — strict obligations (e.g. AI in hiring, credit, medical, critical
    infrastructure): risk management, data governance, human oversight, documentation, accuracy.
  - **Limited risk** — transparency duties (e.g. tell users they're talking to AI; label
    AI-generated content).
  - **Minimal risk** — most uses; few specific obligations.
- **It's extraterritorial** — it applies if your AI affects people in the EU, wherever you are
  (like GDPR).
- **AI literacy (Article 4)** — organisations must ensure relevant staff have adequate AI
  understanding (in force from 2 Feb 2025).
- **Sector & national rules layer on top** — health (e.g. medical-device rules), finance
  (model-risk and fair-lending rules), legal (professional conduct), plus US state laws and
  other countries' frameworks.
- **Frameworks help you comply** — NIST AI RMF and ISO/IEC 42001 give you a structure that maps to
  many of these obligations.

## Decision framework

```decision
title: What's my compliance exposure, and what must I do?
Do you affect EU users? → The EU AI Act likely applies — determine your risk tier.
Is the use "high-risk" (hiring, credit, medical, etc.)? → Expect strict duties: risk management, human oversight, documentation, accuracy, data governance.
Interacting with people or generating content? → Transparency duties: disclose AI use; label AI-generated media.
Regulated sector? → Layer sector rules (medical-device, financial, professional) on top.
Unsure of legal exposure? → This is the point to involve qualified legal/compliance counsel — don't guess on high-stakes uses.
```

## How it works

You determine which regimes apply (by where your users are and what sector you're in), classify
your AI use by risk tier, and then meet the corresponding obligations — most of which map onto
things this track already teaches: risk assessment, data governance, human oversight,
auditability/documentation, accuracy/evaluation, and transparency. A governance framework (NIST/
ISO) is the scaffolding that organises this evidence. For genuinely high-risk or ambiguous cases,
you bring in legal/compliance professionals — the architect's job is to know *when* that's needed
and to have the technical controls ready.

## Common mistakes

- **Assuming "we're not in the EU, so it doesn't apply."** It can, extraterritorially.
- **Ignoring transparency duties** — failing to disclose AI interaction or label AI content.
- **Treating compliance as a one-off** — obligations phase in over time and your uses change.
- **No documentation** — much of compliance is being able to *show* your risk management,
  oversight, and accuracy; undocumented good practice doesn't count.
- **DIY on high-stakes legal questions** — know the limit and get counsel.

## Real business examples

- A company using AI in **hiring** (high-risk under the EU AI Act) implements human oversight,
  bias testing, documentation, and candidate transparency — turning a compliance requirement into
  a defensible process.
- A consumer app adds a clear "you're chatting with an AI" notice and labels AI-generated images
  to meet transparency duties.
- A firm runs mandatory AI-literacy training (partly satisfying Article 4) and documents it.

## Governance considerations

```governance
Compliance is where the rest of this track pays off: risk registers, data governance, human oversight, evaluation, and audit logs are exactly the evidence regulators expect. Build them as normal practice and compliance becomes largely a matter of *documenting* what you already do. Keep a record of which regimes apply to which AI uses, your risk-tier classifications, and the controls in place. And mark the calendar — obligations (like the EU AI Act's high-risk rules) phase in on set dates. This is general guidance, not legal advice: for high-risk or ambiguous cases, engage qualified counsel.
```

## How an architect thinks

```architect
The architect treats regulation as a set of design constraints to engineer for, not a wall to fear. They classify each AI use by risk tier early, because "high-risk" pulls in concrete obligations (oversight, documentation, accuracy) that shape the build. They ensure the technical controls produce the evidence compliance needs, and they know exactly where their competence ends and a lawyer's begins — bringing counsel in for the high-stakes calls rather than guessing.
```

## Key takeaways

- The **EU AI Act** is risk-tiered (**unacceptable / high / limited / minimal**), **extraterritorial**,
  and phasing in through 2025–2027; **AI-literacy** duties are already live.
- **Sector and national rules** layer on top (health, finance, legal, US state laws).
- Compliance largely **reuses this track's controls** (risk, data governance, oversight, audit,
  evaluation, transparency) — plus **documentation**.
- Classify your use's **risk tier early**; **get qualified counsel** for high-stakes/ambiguous
  cases. (Education, not legal advice.)

## Self-check

1. What are the EU AI Act's four risk tiers, and what does "high-risk" trigger?
2. Why might the EU AI Act apply to a company outside the EU?
3. Why is documentation so central to demonstrating compliance?
