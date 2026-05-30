---
title: "Access control & AI usage policies"
track: 05-governance
order: 7
summary: Deciding who can use which AI, with what data, for what — and enforcing it technically and by policy.
readingTime: 7
prerequisites:
  - "Building an AI governance framework"
tags:
  - governance
  - access-control
  - policy
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
  - "OWASP Top 10 for LLM Applications (2025) — https://genai.owasp.org/llm-top-10/"
---

## Overview

Two complementary controls keep AI use in bounds: a clear **usage policy** (the human rules — who
may use which tools, with what data, for what) and **access control** (the technical enforcement —
who and what can actually reach which models, data, and actions). Policy tells people what's
allowed; access control makes the dangerous things impossible.

## Why this matters

Most AI incidents trace back to one of these being missing: staff using unsanctioned tools with
sensitive data (no policy, or no enforcement), or an AI system with more access than it needs
(no least privilege). Get both right and you prevent a large fraction of leaks, breaches, and
runaway-agent incidents.

## Core concepts

- **AI usage policy** — a short, usable document covering: which AI tools are sanctioned, what
  data may go into each, when human approval is required, and what's prohibited. Pair it with
  **training** so people actually know it.
- **Least privilege** — give each user *and each AI system/agent* the minimum access needed.
  This is the single most important security principle for AI (from the security lesson).
- **Access control at every layer** — who can use the tool; which data/documents they (and the AI)
  can reach; which actions/tools an agent may invoke; per-user filtering at retrieval in RAG.
- **Scoped credentials & secrets** — agents and integrations should hold narrow, revocable keys,
  never broad standing access.
- **Shadow AI** — unsanctioned tool use. A policy plus a *good sanctioned option* reduces it
  (people use shadow tools when the official path is missing or painful).

## Decision framework

```decision
title: Setting access for an AI system or user
What's the minimum data/tools/actions needed for the job? → Grant exactly that; deny the rest (least privilege).
Does the AI act on behalf of a user? → Enforce *that user's* permissions at retrieval and action time, not a blanket service account.
Are there high-impact actions? → Require human approval; don't grant the AI standing power to do them.
Is the data sensitive? → Restrict who and which systems can reach it; log access.
Are staff using random AI tools? → Provide a sanctioned, pleasant option + a clear policy; enforce where you can.
```

## How it works

Policy and enforcement work together. The policy sets expectations ("don't put client data in
unsanctioned tools; refunds over $X need human approval"). Access control makes the high-risk
versions technically hard or impossible: the RAG system filters retrieval by the asking user's
permissions; the agent's credentials only allow safe actions; sensitive data stores are reachable
only by authorised systems. Where you can't enforce technically, policy plus training and
monitoring fill the gap.

## Common mistakes

- **Policy without enforcement** (or vice versa) — you need both; rules nobody enforces, or
  enforcement nobody understands, both fail.
- **Over-privileged agents/service accounts** — the classic AI security hole; a hijacked or
  confused agent can do whatever its broad credentials allow.
- **Ignoring per-user permissions in RAG** — letting the AI retrieve documents the asking user
  can't see (outbound leakage).
- **No sanctioned tool**, so staff inevitably use shadow AI with sensitive data.
- **Set-and-forget** — access needs review as roles and systems change.

## Real business examples

- A company issues a one-page AI policy (sanctioned tools, no client data in consumer apps,
  approval rules) and provides a good enterprise tool — shadow AI drops sharply.
- A RAG assistant enforces each employee's document permissions at retrieval, so a junior can't
  surface board-level files by asking cleverly.
- An agent that can send emails is given a tightly scoped account and a human-approval step for
  anything external — containing the damage if it's manipulated.

## Governance considerations

```governance
Access control and usage policy are where many other governance duties get enforced: privacy and confidentiality (who/what can reach sensitive data), security (least privilege limits blast radius), and accountability (approval gates put a named human on high-impact actions). Tie them to the framework: every AI system should have documented access (its permissions and why) and fall under the usage policy. Review access periodically, and log it — access logs are key audit and incident-investigation evidence.
```

## How an architect thinks

```architect
The architect applies least privilege to *machines as rigorously as to people* — arguably more, because an AI can be socially engineered via prompt injection. Their default for any AI system or agent is "minimum access that lets it do its job," with high-impact actions gated by a human. On the human side, they make the safe path the easy path (a good sanctioned tool) so policy is followed by default rather than resented and bypassed.
```

## Key takeaways

- Pair a **usage policy** (human rules) with **access control** (technical enforcement) — you need
  both.
- **Least privilege** applies to **AI systems and agents**, not just people — the top AI security
  principle.
- In RAG, **enforce the asking user's permissions at retrieval**; gate **high-impact actions** with
  a human.
- Provide a **good sanctioned tool** to curb **shadow AI**; review and **log** access.

## Self-check

1. How do a usage policy and access control complement each other?
2. Why is least privilege especially important for AI agents?
3. What reduces "shadow AI," and why does a policy alone often fail to?
