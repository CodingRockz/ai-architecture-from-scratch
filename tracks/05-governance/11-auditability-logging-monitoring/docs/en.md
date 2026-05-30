---
title: "Auditability, logging & monitoring"
track: 05-governance
order: 11
summary: Being able to show what your AI did and why — the records and monitoring that make AI defensible and debuggable.
readingTime: 7
prerequisites:
  - "Evaluation & observability tooling"
  - "Building an AI governance framework"
tags:
  - governance
  - auditability
  - monitoring
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

When an AI system makes a decision, helps with a task, or goes wrong, can you reconstruct *what
happened and why*? **Auditability** is the ability to answer that — backed by **logging**
(recording what the system did) and **monitoring** (watching it in real time). This is both an
operational necessity (debugging, incident response) and a governance/compliance requirement.

## Why this matters

Regulators, auditors, clients, and your own incident responders will ask "show me." A high-risk
decision a customer challenges, a data-leak investigation, a regulator's inquiry — all need
records. Beyond compliance, monitoring is how you catch problems (cost spikes, quality drops,
misuse, attacks) before they become disasters. AI's opacity makes this harder *and* more
important than for ordinary software.

## Core concepts

- **Logging** — recording the inputs, key steps (retrieved sources, tool calls), outputs,
  decisions, and who/what was involved, with timestamps. This is the raw material of audits and
  debugging. (The observability tools from Track 2 produce much of this.)
- **Auditability** — the ability to *reconstruct and explain* a past action from those logs.
  Includes capturing *why* where possible (which sources grounded an answer, which rule fired).
- **Monitoring & alerting** — real-time watch on quality, cost, latency, errors, and abuse
  signals, with alerts so humans notice.
- **The tension with privacy.** Logs often contain sensitive prompt/response data, so the log
  store is itself sensitive — secure it, control access, and set retention.

## Decision framework

```decision
title: What do I need to log and monitor here?
High-stakes or regulated decisions? → Log inputs, outputs, the basis (sources/rules), and the human approver; retain per policy for audits.
Customer-facing or could be challenged? → Keep enough to explain and defend each output.
Production system of any kind? → Monitor cost, latency, error rate, and quality; alert on anomalies.
Agent that takes actions? → Log every action and tool call; this is essential for incident response.
Logs contain sensitive data? → Secure and access-control the log store; set retention limits (don't keep forever by default).
```

## How it works

You instrument the system (often via observability tooling) to record each interaction's
important elements, store them securely, and set up monitoring dashboards and alerts. For
auditability, you ensure the logs capture not just *what* the output was but enough context to
explain *why* — which retrieved documents informed it, which user triggered it, whether a human
approved. When something goes wrong or is questioned, you can reconstruct the event. You balance
this against privacy by securing logs and retaining them only as long as needed.

## Common mistakes

- **Not logging at all** — then you can't debug, explain, or prove anything.
- **Logging too little** — capturing the output but not the basis (sources, who approved), so you
  can't explain *why*.
- **Logging insecurely** — sensitive data in unprotected logs becomes a breach waiting to happen.
- **Keeping logs forever "just in case"** — over-retention is its own privacy/compliance risk; set
  limits.
- **No monitoring** — logs you never watch don't catch problems in time.

## Real business examples

- A lender logs each AI-assisted decision with the data used and the human reviewer, so when a
  customer disputes a decision, they can explain and defend it to a regulator.
- A team's monitoring alerts on a sudden cost spike from a runaway agent loop, letting them stop
  it within minutes instead of discovering it on the monthly bill.
- After a suspected prompt-injection incident, an agent's action logs let responders see exactly
  what it did and contain the damage.

## Governance considerations

```governance
Auditability is where governance becomes provable. Risk registers, human-approval steps, accuracy claims, and access policies are only credible if you can *show* they operated — that's what logs do. Align logging with the framework (what each AI system records, retention periods, who can access logs) and with compliance (high-risk uses typically require record-keeping). Two cautions: secure the logs (they're sensitive) and set retention deliberately (long enough to audit, short enough to respect privacy). Monitoring closes the loop by turning records into timely alerts.
```

## How an architect thinks

```architect
The architect designs for the question "prove what happened." They instrument systems to capture not just outputs but the *basis* for them, secure the resulting logs as sensitive data, and wire monitoring so anomalies surface fast. They see auditability as the connective tissue that makes every other control believable — a human-approval step or an accuracy claim means little if you can't demonstrate it ran. And they retain deliberately, balancing audit needs against privacy.
```

## Key takeaways

- **Logging** records what the system did; **auditability** lets you reconstruct and **explain why**;
  **monitoring** catches problems in real time.
- For high-stakes uses, capture **inputs, outputs, basis (sources/rules), and approver**; log
  **every agent action**.
- Logs are **sensitive** — secure them, control access, and set **retention limits**.
- Auditability is what makes every other governance control **provable** to auditors, regulators,
  and clients.

## Self-check

1. What's the difference between logging and auditability?
2. Why is capturing the *basis* for an output (not just the output) important?
3. Why are logs themselves a privacy/security concern?
