---
title: "Testing AI-built systems"
track: 06-implementation
order: 8
summary: How to test systems that are non-deterministic — and prevent hallucinated, plausible-looking implementations.
readingTime: 7
prerequisites:
  - "Validating AI-generated output"
  - "Evaluation, hallucinations & scaling laws"
tags:
  - implementation
  - testing
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

Validating a single output is one thing; **testing a whole AI system** before and after launch is
another. AI systems are non-deterministic (the same input can vary) and AI-built code can *look*
right while being subtly wrong — even containing functions or APIs the model invented. This lesson
is how to test for real, given those quirks.

## Why this matters

Testing is how you gain confidence a system works *in general*, not just in a demo, and how you keep
it working as inputs, models, and code change. Skipping it is how plausible-looking systems reach
production and fail on real users — or on a case the demo never tried.

## Core concepts

- **Two things to test:** the *system/code* (does the software work?) and the *AI behaviour* (are
  the model's outputs good enough?). Both matter.
- **Non-determinism.** AI outputs vary, so you test against criteria/ranges and over many cases, not
  a single exact expected string. This is **evaluation** (Track 1/2) applied as testing.
- **Hallucinated implementations.** AI can generate code that references non-existent functions,
  libraries, or APIs, or that handles the happy path only. Run it; don't assume it works because it
  reads well.
- **Test sets from real cases.** Build them from real and edge-case inputs (including the nasty
  ones), and grow them from production examples over time.
- **Regression testing.** Re-test after any change — code, prompt, or a (possibly silent) model
  update — to catch breakages and drift.

## Decision framework

```decision
title: Is this AI system tested enough to trust?
Did you actually run it (not just read the code)? → AI code can look right and be wrong; execute it.
Do you have a test set of real + edge cases, not just demo inputs? → Build one; that's where failures hide.
Are you testing AI behaviour with criteria/ranges (not exact-match)? → Non-determinism needs evaluation-style tests.
Will you re-test after changes and model updates? → Set up regression checks; catch drift.
High-stakes? → More cases, edge coverage, and expert review of critical/security paths.
```

## How it works

You test the system at two levels. For the *code*, you (or the tool, directed by you) run it on
inputs and confirm behaviour, ideally with automated tests — and you watch for hallucinated
references by actually executing it. For the *AI behaviour*, you apply evaluation: a representative
test set scored against criteria (accuracy, groundedness, format), accepting that outputs vary. You
keep these as regression checks so future changes and silent model updates are caught. Production
traces (observability) feed new cases back into the test set.

## Common mistakes

- **"It reads correctly" instead of running it** — missing hallucinated/broken implementations.
- **Exact-match testing** of inherently variable AI output — flaky and misleading; test criteria.
- **Demo-only inputs** — no edge cases, so the failure tail is untested.
- **No regression testing** — changes and silent model updates break things unnoticed.
- **Testing code but not AI behaviour** (or vice versa) — both need testing.

## Real business examples

- A team discovers their AI-built integration called a library function that doesn't exist — caught
  immediately by *running* it, not by reading it.
- A company builds a 100-case evaluation as a regression test; when the provider silently updates
  the model, the suite flags a quality drop the same day.
- An automation is tested on deliberately messy inputs (malformed invoices) and correctly routes
  them to a human — verified before go-live.

## Governance considerations

```governance
Testing is governance evidence and a safety mechanism. A documented test/evaluation suite demonstrates accuracy and reliability for audits and regulators (especially high-risk uses), and regression testing after model changes is how you honour the lifecycle obligation (silent updates can shift behaviour). For high-stakes or security-sensitive systems, testing must include qualified review of critical paths — a non-coder running happy-path checks is not sufficient assurance for, say, the security of payment code. Test coverage should scale with stakes, and results should be retained.
```

## How an architect thinks

```architect
The architect tests both the code and the AI behaviour, always by *running* not reading, with test sets drawn from real and edge cases, and with evaluation-style criteria for non-deterministic outputs. They keep everything as regression checks because models and code change underneath them. And they scale rigor to stakes — light for throwaway tools, thorough (with expert review of critical paths) for anything production or sensitive. "It demoed well" is never their standard of done.
```

## Key takeaways

- Test the **code** *and* the **AI behaviour** — by **running**, not reading (AI code can look right
  and be wrong, even inventing functions/APIs).
- Use **real + edge-case test sets** and **criteria/ranges** (not exact-match) for non-deterministic
  output.
- **Regression-test after every change and model update** to catch breakage and drift.
- Scale rigor to **stakes**; testing is **governance evidence** and needs **expert review** of
  critical paths.

## Self-check

1. Why must you run AI-built code rather than judge it by reading?
2. Why is exact-match testing wrong for AI behaviour, and what do you do instead?
3. Why is regression testing especially important with hosted models?
