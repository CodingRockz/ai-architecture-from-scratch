---
title: "Prompting to build a RAG system"
track: 06-implementation
order: 4
summary: A worked, end-to-end example of directing an AI tool to build a RAG system — and verifying it.
readingTime: 8
prerequisites:
  - "RAG architecture (deep)"
  - "Architecture prompting"
tags:
  - implementation
  - rag
  - worked-example
lastReviewed: 2026-05-30
sources:
  - "Anthropic — Contextual Retrieval — https://www.anthropic.com/news/contextual-retrieval"
---

## Overview

Let's make implementation concrete: directing an AI coding tool to build a RAG system end to end,
applying everything from the RAG and spec lessons. You'll see how understanding (what RAG is, what
makes it good) plus good direction (spec, architecture prompt, verification) produces a working
system without you writing the code.

## Why this matters

RAG is the most common business AI build, and this worked example is a template you can adapt for
your own. It shows the full loop — spec → architecture → build in steps → verify — on a real,
valuable system.

## The walkthrough

**1. Spec (from the spec lesson).** Goal: an internal assistant answering questions over our policy
documents, with citations, staff-only, sensitive data kept in-region. Inputs: questions; outputs:
cited answers. Done: accurate, cited answers on a test set; access restricted.

**2. Architecture prompt (design first).**

```prompt
Act as my AI architect. DESIGN (don't build yet) a RAG system:
- Content: ~500 internal policy PDFs. Users: staff only. Answers must cite the source section.
- Constraint: data must stay in our region; propose options and flag any that don't.
Please recommend: chunking strategy, embedding model, vector store, whether to add re-ranking and hybrid search, and how we'll enforce per-user access at retrieval. Explain trade-offs, recommend the simplest design that meets this, and flag governance decisions. Ask me questions first.
```

**3. Build in small, verifiable steps.** Start with ~20 documents end-to-end, verify retrieval and
citations, then scale.

```prompt
Now implement v1 on a 20-document sample: ingest + chunk (with the strategy you proposed), embed, store, retrieve with access filtering, and generate cited answers. Give me a way to test retrieval quality (show which chunks were retrieved for a question). Build it step by step and explain each step. Stop after ingestion so I can verify before we continue.
```

**4. Verify (the crucial part).** Check retrieval returns the right chunks (not just that answers
*sound* good), citations are correct, and access control works. Then expand to the full corpus.

## Decision framework

```decision
title: Is my AI-built RAG actually good?
Are the RIGHT chunks being retrieved (not just plausible answers)? → Test retrieval directly; this is the #1 thing.
Are citations present and correct? → Required to trust and verify answers.
Does access control work (a user can't retrieve forbidden docs)? → Test it explicitly.
Did you start small and verify before scaling? → Don't build the whole thing blind.
Does it pass on a real test set, not just demo questions? → Evaluate on your actual cases.
```

## Common mistakes

- **Skipping the design step** — jumping to "build a RAG" without architecture direction.
- **Not testing retrieval directly** — trusting nice-sounding answers (the model can sound good on
  bad chunks).
- **Building the full corpus first** instead of verifying on a sample.
- **Forgetting access control and citations** in the prompt — then they're missing.
- **No real test set** — only trying a few demo questions.

## Real business examples

- A non-technical operations lead directs an AI tool through exactly this loop and ships an
  internal "ask our policies" assistant — design reviewed, built on a sample, verified for
  retrieval and access control, then scaled.
- A team catches that their AI-built RAG was retrieving wrong chunks *because they tested retrieval
  directly* — fixing chunking before launch instead of after complaints.

## Governance considerations

```governance
This build implements governance from earlier tracks: residency (put "data stays in-region" in the prompt → likely a local/in-region model and vector store), access control at retrieval (test that users can't surface forbidden docs), citations (auditability and verification), and curated indexing (be deliberate about what 500 PDFs you index). Verify these explicitly — an AI tool will only build them in if your spec/architecture prompt asked for them, and only you can confirm they actually work before real data and users arrive.
```

## How an architect thinks

```architect
The architect runs the loop — spec → design → build-in-steps → verify — and spends their attention on the two places it matters: the design (constraints, simplest-sufficient, governance) and the verification (test *retrieval* directly, check citations and access control, evaluate on real cases). They don't trust good-sounding answers; they confirm the right chunks were retrieved. The AI does the building; the architect owns the direction and the proof that it works.
```

## Key takeaways

- Direct a RAG build with the full loop: **spec → architecture (design first) → build in small
  steps → verify.**
- **Test retrieval directly** — the #1 check; good-sounding answers can ride on bad chunks.
- Put **residency, access control, and citations** in the prompt, and **verify** each works.
- **Start on a sample, evaluate on a real test set**, then scale.

## Self-check

1. Why design (architecture prompt) before saying "build a RAG"?
2. Why test retrieval directly instead of judging the final answers?
3. Which governance features must be in the prompt to end up in the build?
