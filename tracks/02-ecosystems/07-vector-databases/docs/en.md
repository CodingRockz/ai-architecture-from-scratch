---
title: "Vector databases"
track: 02-ecosystems
order: 7
summary: Where embeddings live and how relevant ones are found fast — the retrieval engine behind RAG.
readingTime: 6
prerequisites:
  - "Embeddings & vectors"
  - "Retrieval-Augmented Generation (RAG)"
tags:
  - ecosystems
  - vector-database
  - rag
lastReviewed: 2026-05-30
sources:
  - "Pinecone — What is a vector database? — https://www.pinecone.io/learn/vector-database/"
---

## Overview

A **vector database** stores embeddings (the meaning-vectors from earlier) and, given a query
vector, returns the closest matches in milliseconds — even across millions of items. It's the
retrieval engine inside RAG, semantic search, and recommendations. Options range from dedicated
services (Pinecone, Qdrant, Weaviate) to a simple extension on a database you may already run
(pgvector for Postgres).

## Why this matters

If you're doing RAG or semantic search, you need somewhere to keep and search vectors. The
choice is often overthought (it's frequently not the hard part) but it does carry real
consequences for cost, scale, operations, and — importantly — data governance.

## Core concepts

- **Job:** store vectors + metadata, and do fast **nearest-neighbour** search ("find the
  closest vectors to this one").
- **Dedicated vs. add-on.** Dedicated vector DBs (Pinecone, Qdrant, Weaviate, Milvus) are
  purpose-built and scale well. Add-ons like **pgvector** bolt vector search onto Postgres —
  simpler if you already use Postgres and your scale is modest.
- **Hosted vs. self-hosted.** Like models, you can use a managed cloud service or run it
  yourself (residency/control vs. convenience).
- **Metadata filtering.** Good vector DBs let you combine semantic search with filters (e.g.
  "only this user's documents") — essential for access control in RAG.

## Decision framework

```decision
title: Which vector database should I use?
Already on Postgres, modest scale? → **pgvector** — fewest moving parts.
Need to self-host for residency/control? → **Qdrant, Weaviate, or Milvus** (open-source, self-hostable).
Want fully managed, scale without ops? → **Pinecone** or a managed Qdrant/Weaviate.
Tiny dataset (hundreds of items)? → You may not need a vector DB at all — brute-force search or even just the context window can work.
```

## How it works

You store each chunk's embedding plus metadata (source, owner, date). At query time you embed
the question and ask the DB for the nearest vectors, optionally filtered by metadata. It uses
clever indexing (approximate nearest-neighbour) to do this fast at scale, trading a tiny bit of
exactness for big speed gains. The result feeds your RAG prompt.

As stressed in the RAG lesson: the database is rarely the bottleneck. Retrieval *quality*
(chunking, embedding model, re-ranking) matters more than which store you pick.

## Common mistakes

- **Over-engineering the choice.** Teams agonise over vector DBs when pgvector or even
  in-memory search would do at their scale.
- **Ignoring metadata filtering** — then you can't enforce per-user access control at retrieval
  (a real governance hole).
- **Forgetting the store is sensitive data.** Embeddings derive from your content and can leak;
  treat the DB with the same care as the source documents.
- **Mismatched embeddings.** Vectors from different embedding models aren't comparable — keep
  them consistent.

## Real business examples

- A startup adds `pgvector` to its existing Postgres for a support-doc RAG — no new
  infrastructure, done in a day.
- A regulated firm self-hosts Qdrant so embeddings of confidential documents never leave its
  network, and uses metadata filters so each user only retrieves what they're allowed to see.

## Tools in this category

```toolcard
name: Vector databases
category: Store & search embeddings (nearest-neighbour retrieval)
use: The retrieval engine for RAG, semantic search, and recommendations
alternatives: Pinecone, Qdrant, Weaviate, Milvus, pgvector (Postgres)
when: You have non-trivial content to search by meaning, or are building RAG
whennot: A handful of items — brute force or the context window may suffice
```

## Governance considerations

```governance
A vector database is sensitive data wearing a different hat — its contents are derived from (and can partially reveal) your source documents. Govern it like the originals: control who can query it, host it where residency requires, and be deliberate about what gets indexed. Crucially, use **metadata filtering to enforce per-user access at retrieval time** — otherwise RAG can surface documents a user isn't permitted to see (a leakage path from the Governance track).
```

## How an architect thinks

```architect
The architect spends little energy on "which vector DB" and a lot on retrieval quality and access control. Their checklist: does it support the metadata filtering we need for permissions? Can we host it where residency demands? Does it scale to our size? Beyond that, they pick the option with the least operational burden — often pgvector early, a dedicated store later — and move on to the parts that actually determine answer quality.
```

## Key takeaways

- A **vector database** stores embeddings and finds the **nearest** ones fast — the engine
  behind RAG and semantic search.
- Choices span **pgvector** (simplest if on Postgres) to dedicated **Pinecone/Qdrant/Weaviate**;
  hosted or self-hosted.
- It's **rarely the bottleneck** — retrieval quality matters more. Don't over-engineer the
  choice.
- Treat it as **sensitive data** and use **metadata filtering** to enforce per-user access.

## Self-check

1. What two things does a vector database actually do?
2. Why is metadata filtering important for governance in RAG?
3. When might you not need a vector database at all?
