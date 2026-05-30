---
title: "Sanity-checking generated code & infra as a non-coder"
track: 06-implementation
order: 10
summary: What you genuinely can verify about AI-built code and infrastructure without being an engineer — and what you can't.
readingTime: 7
prerequisites:
  - "Validating AI-generated output"
tags:
  - implementation
  - code-review
  - limits
lastReviewed: 2026-05-30
sources:
  - "OWASP Top 10 for LLM Applications (2025) — https://genai.owasp.org/llm-top-10/"
---

## Overview

As a non-coder directing AI to build, you can't do a full engineering code review — but you're not
helpless either. There's a real set of checks you *can* perform to catch many problems, and a clear
boundary beyond which you must rely on tests, the AI itself, or a human expert. This lesson maps
both, honestly.

## Why this matters

Knowing what you can and can't verify keeps you from two failure modes: over-confidence (shipping
unreviewed code as if you'd checked it) and over-caution (needing an engineer for everything,
including safe prototypes). Calibrated self-knowledge is what makes a non-coder genuinely
productive *and* safe.

## Core concepts

**What you CAN sanity-check (no coding required):**

- **Behaviour.** Run it on real and edge-case inputs; does it do the right thing? (The strongest
  check you have.)
- **Does it meet the spec** and acceptance criteria?
- **Have the AI explain it** in plain language, then check the explanation makes sense and matches
  what you asked.
- **Ask the AI to review its own/another model's code** for bugs and security issues (a second
  model as reviewer helps).
- **Obvious red flags:** hardcoded secrets/passwords, sending data to unexpected places, no error
  handling, ignoring a constraint you set.
- **Tests exist and pass** — ask for tests; run them.

**What you genuinely CANNOT fully verify (needs an engineer for high stakes):**

- Subtle **security vulnerabilities** (injection, auth flaws, unsafe data handling).
- **Scalability/performance** under real load.
- **Maintainability** and hidden technical debt.
- Correctness of complex logic you can't follow.

## Decision framework

```decision
title: Can I sign off on this build myself?
Is it a prototype / internal / low-stakes tool? → Your behaviour + spec checks (plus AI review and tests) are usually enough.
Does it run correctly on real and edge cases, meet the spec, and pass tests? → Good signs; proceed for low stakes.
Any red flags (secrets in code, data going somewhere odd, no error handling)? → Stop; fix or escalate.
Production-critical, security-sensitive, or handling money/personal data? → Get a qualified engineer to review — beyond non-coder verification.
Can't tell if it's safe? → Treat that uncertainty as a "no" until verified.
```

## How it works

You run the build on real and edge-case inputs (behaviour is your most reliable signal), confirm it
meets the spec, have the AI explain it and review it (ideally a second model as an independent
reviewer), check for obvious red flags, and run tests. That combination catches a lot. But you stay
honest about the ceiling: subtle security, scale, and maintainability are beyond non-coder
verification, so for high-stakes or production-critical systems you route to a qualified engineer.
The skill is knowing which side of the line you're on.

## Common mistakes

- **Assuming "runs without errors" = "safe and correct"** — it can run and still be insecure or
  subtly wrong.
- **Over-trusting AI self-review** — helpful, not sufficient for security-critical code.
- **Shipping production/security code on non-coder checks alone.**
- **The opposite: needing an engineer for a throwaway prototype** — wasting expertise on low stakes.
- **Ignoring red flags** because the thing "works."

## Real business examples

- A non-coder ships an internal prototype after behaviour tests, spec checks, AI review, and passing
  tests — appropriate for low stakes.
- A team spots a red flag (an API key hardcoded in the generated code) during a sanity check and
  fixes it before it ever runs.
- A founder routes a payment-handling feature to a contract engineer for security review — correctly
  recognising it as beyond their own verification.

## Governance considerations

```governance
This lesson is the honest core of responsible non-coder building. Accountability means a competent human verifies what ships — so match the verifier to the stakes: your sanity checks suffice for prototypes and internal tools, but production-critical, security-sensitive, or regulated systems require qualified engineering review (and that review is governance/audit evidence). Red flags like hardcoded secrets or unexpected data flows are governance issues (privacy, security) — catch what you can, and escalate what you can't. Knowing your verification ceiling is itself a control.
```

## How an architect thinks

```architect
The architect knows exactly where their verification ceiling is and works confidently up to it: behaviour testing, spec conformance, AI explanation and review, red-flag scanning, and tests — plenty for prototypes and internal tools. Above the ceiling (security, scale, production-critical, regulated), they bring in an engineer without ego. They treat "I can't tell if this is safe" as a hard stop, not a maybe. Calibrated honesty about what they can verify is what makes them both productive and trustworthy.
```

## Key takeaways

- You **can** sanity-check **behaviour, spec conformance, AI explanations/reviews, red flags, and
  tests** — enough for **prototypes and internal tools**.
- You **cannot** fully verify **subtle security, scale, and maintainability** — these need a
  **qualified engineer** for high stakes.
- Watch for **red flags** (hardcoded secrets, odd data flows, no error handling).
- **Match the verifier to the stakes**; treat "can't tell if it's safe" as a **stop**.

## Self-check

1. List three things you can sanity-check without coding.
2. What can't a non-coder fully verify, and what do you do about it for high-stakes builds?
3. Why is "it runs without errors" insufficient assurance?
