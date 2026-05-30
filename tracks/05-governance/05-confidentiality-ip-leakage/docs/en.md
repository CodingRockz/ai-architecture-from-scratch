---
title: "Confidentiality, IP & privileged information"
track: 05-governance
order: 5
summary: Keeping trade secrets, client confidences, and intellectual property from leaking into — or out of — AI systems.
readingTime: 7
prerequisites:
  - "Data privacy, residency & jurisdiction"
tags:
  - governance
  - confidentiality
  - ip
lastReviewed: 2026-05-30
sources:
  - "WIPO — Artificial intelligence and intellectual property — https://www.wipo.int/about-ip/en/frontier_technologies/ai_and_ip.html"
---

## Overview

Privacy is about *personal* data. **Confidentiality** is broader: trade secrets, client
information, legally privileged material, unpublished IP, strategic plans. AI introduces new ways
for this to leak — into a provider's systems when you send it, and *out* of an AI system when
someone queries it. This lesson is about protecting information whose value or duty depends on it
staying controlled.

## Why this matters

A leaked trade secret can lose its legal protection. Exposed client material can breach
professional duties (lawyers, accountants, doctors) or contracts. Pasting confidential strategy
into a consumer AI tool can hand it to a third party. For many professionals, confidentiality
isn't best-practice — it's a binding obligation with serious consequences.

## Core concepts

- **Two leak directions:**
  - **Inbound to the provider** — you send confidential text to a hosted model; it may be
    retained or (on some tiers) used in training.
  - **Outbound from your system** — your AI (e.g. a RAG bot) reveals confidential content to a
    user who shouldn't see it.
- **Trade secrets require secrecy to stay protected.** Disclosing one carelessly (including to an
  AI vendor without proper terms) can forfeit its legal status.
- **Privilege** (e.g. legal professional privilege) can be *waived* by disclosure to a third
  party — a real risk when "the third party" is an AI provider.
- **Your IP in outputs.** Content you generate, and content the model was trained on, raise
  ownership/infringement questions (covered more in the licensing lesson).

## Decision framework

```decision
title: Is it safe to put this confidential material into an AI system?
Is it a trade secret, privileged, or under an NDA/contract? → Use only tools with contractual confidentiality (enterprise terms, no-training, limited retention) — or keep it local.
Will it go into a RAG index others can query? → Enforce access control at retrieval so only authorised users can surface it.
Could disclosure waive a legal protection (privilege, trade-secret status)? → Treat hosted use as disclosure unless terms clearly prevent it; prefer local.
Generating content you need to own/clear? → Check the provider's output IP terms and your training-data exposure (see licensing lesson).
```

## How it works

Protecting confidentiality with AI is about controlling both doors. Inbound: choose deployments
whose terms (or architecture, if self-hosted) guarantee the material isn't retained or trained
on — and for the most sensitive material, keep it local so it never leaves. Outbound: design RAG
and agents so confidential content is only retrievable by those entitled to it (access control at
retrieval, from the RAG and security lessons). Add redaction where full content isn't needed.

## Common mistakes

- **Pasting confidential or privileged material into consumer AI tools** — a common,
  career-risking habit.
- **Assuming an NDA with a client permits sending their data to any AI vendor** — it usually
  doesn't without their consent and proper sub-processor terms.
- **RAG over-sharing** — indexing confidential docs without per-user access control, so anyone can
  query them out.
- **Forgetting outputs and logs** can contain confidential snippets that then persist in traces or
  generated artifacts.

## Real business examples

- A **lawyer** uses an enterprise AI tool with contractual confidentiality and no-training terms
  for drafting — and keeps the most sensitive privileged material on a local model, avoiding any
  argument that privilege was waived.
- A **startup** stops staff pasting product roadmaps into consumer chatbots after realising it
  could jeopardise trade-secret protection; it provides a sanctioned tool with proper terms.
- A **consultancy** builds a RAG assistant with strict per-client access control so one client's
  confidential material can never surface in another's queries.

## Governance considerations

```governance
Confidentiality failures are often irreversible and legally serious (lost trade-secret status, waived privilege, breached contracts). Controls: a clear policy on what may go into which tools; sanctioned tools with proper confidentiality terms (or local deployment) for sensitive material; access control at retrieval to prevent outbound leakage; redaction/minimisation; and staff training (the human pasting data is the most common failure point). Map which categories of confidential information exist and where they're allowed to go — same discipline as the privacy lesson, broader scope.
```

## How an architect thinks

```architect
The architect guards *both doors*: what confidential data flows *into* AI tools, and what an AI system can reveal *out* to users. They classify confidentiality alongside privacy, route the most sensitive material to local/contractually-protected deployments, and design retrieval so entitlement is enforced at query time. And they respect that some disclosures are irreversible — once a secret is out, no control brings it back — so they err toward caution for privileged and trade-secret material.
```

## Key takeaways

- **Confidentiality** is broader than privacy: trade secrets, client/privileged info, unpublished
  IP.
- Guard **both doors**: inbound (don't leak to the provider) and outbound (don't let your AI
  reveal it to the wrong users).
- Disclosure can **forfeit legal protection** (trade-secret status, privilege) — treat hosted use
  as disclosure unless terms prevent it.
- Controls: **sanctioned tools with proper terms or local deployment, access control at retrieval,
  redaction, policy, and training.**

## Self-check

1. What are the "two doors" through which confidential information can leak with AI?
2. Why can sending a trade secret to a consumer AI tool be especially damaging?
3. How do you prevent a RAG system from leaking confidential documents outbound?
