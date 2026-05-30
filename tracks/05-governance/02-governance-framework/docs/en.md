---
title: "Building an AI governance framework"
track: 05-governance
order: 2
summary: How to set up roles, policies, and a lifecycle so AI is used safely and consistently across an organisation.
readingTime: 8
prerequisites:
  - "Why governance is a pillar, not a footnote"
tags:
  - governance
  - framework
  - policy
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
  - "ISO/IEC 42001 — AI management system — https://www.iso.org/standard/81230.html"
---

## Overview

A governance *framework* is the structure that makes safe AI use repeatable instead of ad hoc:
who decides, what the rules are, and how AI systems are reviewed across their life. You don't
need to invent one from scratch — established frameworks (NIST AI RMF, ISO/IEC 42001) give you a
backbone. This lesson shows what a practical, right-sized framework contains.

## Why this matters

Without a framework, every team makes its own (often unsafe) choices, risks are invisible, and
nobody owns outcomes. With one, AI adoption is consistent, defensible, and faster — because the
guardrails are known. For regulated organisations, a documented framework is increasingly
expected by auditors and regulators.

## Core concepts

A workable framework has four parts:

1. **Roles & accountability.** Who owns AI governance? Who approves new AI uses? Who's
   accountable when something goes wrong? (Often an AI governance lead or committee, with named
   owners per system.)
2. **Policies.** Clear, usable rules: acceptable use, what data may go to which tools, when human
   approval is required, security requirements. (See the access-control/usage-policy lesson.)
3. **A review/approval process.** A lightweight gate for new AI uses, scaled to risk: low-risk
   uses self-certify; high-risk uses get real review.
4. **A lifecycle.** Govern AI systems from idea → assessment → deployment → monitoring →
   retirement — not just at launch. (NIST frames this as Govern, Map, Measure, Manage.)

## Visual explanation

```mermaid
%% alt: A lifecycle loop: propose a use, assess its risk, approve proportionately, deploy with controls, monitor in production, and review or retire — feeding back to assessment.
flowchart LR
  P[Propose AI use] --> A[Assess risk]
  A --> AP[Approve - scaled to risk]
  AP --> D[Deploy with controls]
  D --> M[Monitor in production]
  M --> R[Review / update / retire]
  R --> A
```

## How it works

The NIST AI RMF organises governance into four functions you can borrow directly:

- **Govern** — set the culture, roles, and policies (the foundation).
- **Map** — understand each AI system's context and risks.
- **Measure** — evaluate and track those risks (links to the evaluation/observability layer).
- **Manage** — act on risks: mitigate, monitor, and respond.

ISO/IEC 42001 is a certifiable management-system standard if you need formal assurance. For most
organisations, you adapt these into something proportionate: a one-page policy, a simple
risk-tiered approval, named owners, and a register — not a 200-page binder nobody reads.

## Decision framework

```decision
title: How heavy should our framework be?
Small team, low-risk uses? → A one-page acceptable-use policy + a "sensitive data / high-stakes? ask first" rule.
Growing, some customer/sensitive data? → Add named owners, a simple risk-tiered approval, and a register of AI uses.
Regulated or high-stakes at scale? → Adopt NIST AI RMF (or ISO 42001) properly, with documented assessments and audits.
Multiple teams adopting AI fast? → Central policy + lightweight self-service approval, so governance enables rather than blocks.
```

## Common mistakes

- **Over-engineering it** into bureaucracy that teams route around — shadow AI is the result.
- **Under-doing it** — no owner, no policy, no record of what AI is even in use.
- **Launch-only governance** — approving at deployment, then never monitoring or reviewing.
- **No inventory.** You can't govern AI uses you don't know exist; maintain a register.
- **Copying a framework wholesale** without adapting to your risk and size.

## Real business examples

- A mid-size firm adopts a trimmed NIST AI RMF: a governance lead, a one-page policy, a
  risk-tiered approval form, and a register — enough to satisfy clients' security questionnaires
  and to move quickly.
- A startup keeps it to a single policy doc and a Slack channel where any AI use touching
  customer data must be flagged — proportionate and real.

## Governance considerations

```governance
The framework is the governance, so the meta-risks are about the framework itself: keep an **inventory** of AI uses (you can't govern the invisible), assign **clear ownership** (diffuse responsibility = no responsibility), and make it **proportionate** (too heavy → bypassed; too light → exposed). Tie it to the rest of this track: the framework is where privacy, security, compliance, and oversight obligations get assigned and tracked.
```

## How an architect thinks

```architect
The architect designs governance like a product: usable, proportionate, and adopted. They start from established frameworks (don't reinvent), strip them to what the organisation's risk actually warrants, and optimise for "the easy path is the safe path." A framework that teams route around is worse than none, because it creates false assurance. Right-sized, owned, and lived beats comprehensive and ignored.
```

## Key takeaways

- A framework makes safe AI use **repeatable**: **roles, policies, a risk-tiered approval, and a
  lifecycle.**
- Don't reinvent — adapt **NIST AI RMF** (Govern, Map, Measure, Manage) or **ISO/IEC 42001**.
- **Right-size it**: proportionate to risk, so it enables rather than blocks.
- Keep an **inventory and clear owners**, and govern across the **whole lifecycle**, not just at
  launch.

## Self-check

1. What are the four parts of a practical governance framework?
2. What do NIST's four functions (Govern, Map, Measure, Manage) each cover?
3. Why is an over-heavy framework sometimes worse than a light one?
