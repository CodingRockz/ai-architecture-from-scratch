---
title: "Debugging and iterating with an AI pair"
track: 06-implementation
order: 9
summary: How to get unstuck and improve a build with an AI tool — even when you can't read the code yourself.
readingTime: 6
prerequisites:
  - "Working with Claude / Cursor / Codex effectively"
tags:
  - implementation
  - debugging
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Claude Code documentation — https://docs.anthropic.com/en/docs/claude-code/overview"
---

## Overview

Things break. When they do, an AI tool is also your debugging partner — but only if you direct it
well. **Debugging with an AI pair** is the skill of describing what's wrong, giving it the
information it needs, and iterating toward a fix you can verify, even as a non-coder.

## Why this matters

The difference between "stuck and frustrated" and "fixed in minutes" is usually how you communicate
the problem. Good debugging direction lets non-coders resolve issues that would otherwise require an
engineer — within the limits of what you can verify.

## Core concepts

- **Give it the evidence.** The exact error message, what you did, what you expected, what happened.
  Vague problem reports get vague fixes.
- **Describe expected vs actual.** The gap is the bug; state both clearly.
- **Let it diagnose before fixing.** Ask "what's likely causing this and how would you confirm?"
  before "fix it" — understanding the cause prevents band-aids.
- **One change at a time.** Fix and verify in small steps; multiple simultaneous changes hide which
  one worked (or broke more).
- **Verify the fix.** Re-test; don't assume "fixed it" means fixed (validation/testing lessons).
- **Watch for guessing.** If it tries random fixes without diagnosis, push it to investigate the
  actual cause.

## How to do it

```prompt
Something's broken. Help me debug it.

- What I did: [...]
- What I expected: [...]
- What actually happened (exact error/output): [paste it]

First, tell me the most likely causes and how to confirm which it is — don't just change code yet. Then propose ONE fix at a time and tell me how to verify it worked. Explain in plain language as you go.
```

## Decision framework

```decision
title: Am I debugging effectively?
Did I give the exact error + expected vs actual? → If not, add it; vague reports waste cycles.
Did I ask for diagnosis before a fix? → Understand the cause, avoid band-aids.
One change at a time, each verified? → Don't batch fixes blindly.
Is it guessing instead of investigating? → Push it to find the real cause.
Beyond what I can verify / high-stakes? → Get an engineer; don't ship an unverified fix.
```

## Common mistakes

- **Vague reports** ("it doesn't work") → useless help.
- **"Just fix it"** without diagnosis → band-aids that mask the real issue.
- **Many changes at once** → can't tell what helped or what broke.
- **Not verifying the fix** → assuming it's resolved.
- **Accepting guess-and-check loops** → push for root-cause investigation instead.
- **Shipping an unverified fix** for high-stakes code — escalate.

## Real business examples

- A non-coder pastes the exact error and expected-vs-actual; the AI identifies a misconfiguration in
  one step, explains it plainly, and the fix is verified in minutes.
- A team stuck in a guess-and-check loop redirects the tool to "diagnose the root cause and how to
  confirm it," which surfaces the actual bug instead of more random patches.

## Governance considerations

```governance
Debugging with AI carries the same guardrails as building: don't paste secrets or sensitive data into the tool while sharing error context (redact logs); verify fixes before they ship, especially for anything touching money, security, or personal data; and recognise the limit — if you can't verify a fix is correct and safe (e.g. a security-related bug), that's an escalation to a qualified engineer, not a "trust the AI and ship" moment. A confidently-presented fix is still a draft until verified.
```

## How an architect thinks

```architect
The architect debugs by communicating clearly (exact error, expected vs actual), demanding diagnosis before fixes, changing one thing at a time, and verifying each step — treating the AI as a sharp pair who needs the evidence and a push toward root cause rather than band-aids. They stay alert to guess-and-check spirals and to the boundary of what they can verify, escalating high-stakes or unverifiable fixes. Clear problem framing is most of the fix.
```

## Key takeaways

- Give the **exact error + expected vs actual**; **diagnose before fixing**.
- **One change at a time**, each **verified**; push past **guess-and-check** to root cause.
- **Redact sensitive data** from error context; **verify fixes** before shipping.
- Escalate **unverifiable or high-stakes** fixes to a qualified engineer.

## Self-check

1. What information turns a vague bug report into an actionable one?
2. Why ask for diagnosis before a fix?
3. When should a debugging session become an escalation to an engineer?
