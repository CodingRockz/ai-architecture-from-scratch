---
title: "Validating AI-generated output"
track: 06-implementation
order: 7
summary: How to check what an AI tool produces — so you never ship on confidence alone.
readingTime: 7
prerequisites:
  - "Working with Claude / Cursor / Codex effectively"
  - "Evaluation, hallucinations & scaling laws"
tags:
  - implementation
  - validation
lastReviewed: 2026-05-30
sources:
  - "NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework"
---

## Overview

AI tools are confident whether they're right or wrong. **Validation** is the discipline of checking
their output before you rely on it — the non-negotiable counterpart to letting AI do the building.
The rule from Orientation, made operational: never ship what you can't verify.

## Why this matters

Confident-but-wrong is the defining AI failure mode. Validation is what stands between a plausible
output and a costly mistake — a wrong number in a report, a security hole in code, a hallucinated
citation. It's also the skill that lets a non-coder responsibly use AI builds: you may not write the
code, but you must be able to check that it does what you needed.

## Core concepts

- **Confidence ≠ correctness.** Treat every output as a draft to verify, not an answer to trust.
- **Validate against the spec.** Does it do what you asked, meet the acceptance criteria, respect
  the constraints?
- **Verify behaviour, not vibes.** Run it on real and edge-case inputs; check outputs against known
  answers — don't judge by how good it *sounds*.
- **Check the things AI gets wrong:** invented facts/citations, subtle logic errors, missed edge
  cases, security/privacy issues, and silently ignored constraints.
- **Layer your checks:** automated tests/evals where possible, plus human review of the parts that
  matter; bring in an expert when stakes exceed your ability to verify.
- **Validate, don't just accept regenerations.** If you ask it to "fix it," validate the fix too.

## Decision framework

```decision
title: Have I actually validated this output?
Does it meet the spec and acceptance criteria? → Check explicitly, not by impression.
Did I test on real + edge-case inputs (not just the demo)? → Behaviour over vibes.
Did I check for the usual AI errors (bad facts/citations, logic, edge cases, security, ignored constraints)? → Run that checklist.
Is it within my ability to verify? → If not, get tests, examples, or an expert — don't ship blind.
For high stakes (money/security/personal data/legal)? → Independent/expert review before shipping.
```

## How it works

You validate against the spec and acceptance criteria you wrote, exercising the output on real and
edge-case inputs and comparing to known-good results. You run the "what AI gets wrong" checklist
(facts, logic, edge cases, security, constraints). Where you can, you have the tool produce tests
or examples so checks are repeatable. For anything you can't personally verify — or that's
high-stakes — you escalate to automated evaluation and/or a qualified human. Then, and only then,
you ship.

## Common mistakes

- **Shipping on confidence** — the cardinal error.
- **Judging by how good it sounds** instead of testing behaviour.
- **Only the happy path** — skipping edge cases where AI often fails.
- **Not re-validating fixes** — assuming "fix it" worked.
- **Shipping what you can't verify** instead of getting help — especially for high-stakes outputs.

## Real business examples

- A founder validates an AI-built report generator by feeding it known inputs and checking the
  numbers against a manual calculation — catching a subtle aggregation bug before it reached
  leadership.
- A team has the tool generate tests alongside a feature, so each change is automatically checked,
  and routes the security-sensitive parts to an engineer for review.
- An analyst catches hallucinated citations in an AI research summary by checking each source —
  because they validated, not assumed.

## Governance considerations

```governance
Validation is a core governance control and the operational form of accountability: "the AI produced it" is never a defence, so a human must be able to verify what ships. For high-stakes outputs, validation should be independent and documented (it's audit evidence). Recognise the honest limit (next lessons): a non-coder cannot fully validate, say, the security of generated code — so for production-critical or sensitive systems, escalate to qualified review. Knowing *when* you can't validate is itself part of responsible governance.
```

## How an architect thinks

```architect
The architect's reflex is "prove it," not "looks good." They validate against the spec, test behaviour on real and edge cases, run the AI-error checklist, and make checks repeatable with tests. They're honest about the boundary of what they can personally verify and escalate beyond it for high-stakes work. The discipline is simple and absolute: nothing ships that hasn't been verified by someone accountable and competent to verify it.
```

## Key takeaways

- **Confidence ≠ correctness** — validate every output before relying on it.
- Validate **against the spec**, test **behaviour on real + edge cases**, and run the **AI-error
  checklist** (facts, logic, edge cases, security, constraints).
- **Re-validate fixes**; make checks **repeatable** with tests/evals.
- **Never ship what you can't verify** — escalate to expert/independent review for high stakes
  (it's also governance/audit evidence).

## Self-check

1. Why is "it sounds right" not validation?
2. What's on the "what AI gets wrong" checklist?
3. What should you do when output is beyond your ability to verify?
