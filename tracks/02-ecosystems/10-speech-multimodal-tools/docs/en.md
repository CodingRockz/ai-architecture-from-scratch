---
title: "Speech & multimodal tools"
track: 02-ecosystems
order: 10
summary: Specialist tools for voice, transcription, images, and video — when to use them instead of a generalist model.
readingTime: 6
prerequisites:
  - "Multimodal models"
tags:
  - ecosystems
  - speech
  - multimodal
lastReviewed: 2026-05-30
sources:
  - "ElevenLabs — https://elevenlabs.io/"
  - "Deepgram — https://deepgram.com/"
---

## Overview

Beyond general multimodal LLMs, there's a layer of **specialist tools** focused on one
modality: voice generation (**ElevenLabs**), speech-to-text transcription (**Deepgram**,
**Whisper**), and image/video generation (Flux, and various video models). They often beat
generalist models on their specific modality — for quality, latency, or control.

## Why this matters

When you build something voice- or media-heavy (an AI receptionist, a podcast tool, a video
generator), the specialist tool is frequently the right pick over a do-everything model.
Knowing this layer exists prevents both "the LLM should do it all" and reinventing a wheel that
a mature tool already provides.

## Core concepts

- **Speech-to-text (STT / transcription):** turn audio into text. Tools: Deepgram, OpenAI
  Whisper, AssemblyAI. Key factors: accuracy (esp. accents/jargon), latency (for live use), and
  language support.
- **Text-to-speech (TTS / voice generation):** turn text into natural speech. Tools:
  ElevenLabs, others. Key factors: naturalness, voice cloning, latency, and emotional control.
- **Speech-to-speech / real-time voice:** combine STT + reasoning + TTS into a live
  conversational loop. Latency is everything for it to feel human.
- **Image/video generation:** create or edit visuals. Separate from your text LLM; rapidly
  evolving and uneven in quality.

## Decision framework

```decision
title: Generalist model or specialist tool?
Occasional, simple media task (describe an image, rough transcription)? → A **generalist multimodal model** is fine.
Production voice/transcription where quality & latency matter? → A **specialist** (Deepgram, ElevenLabs) usually wins.
Building a real-time voice agent? → Specialist STT + LLM + TTS, optimised for **latency** — or a purpose-built real-time voice API.
Brand voice / voice cloning / fine emotional control? → A specialist TTS tool with those features.
Image/video generation? → Dedicated generation models, evaluated on your style needs.
```

## How it works

A voice agent is a pipeline: audio in → transcribe (STT) → reason (LLM) → generate reply →
speak (TTS) → audio out, ideally fast enough to feel conversational. Each stage can be a
specialist tool. Media generation is typically a single specialist model you prompt. The
architect's job is to assemble the right pieces and optimise the weakest link (usually latency
for voice, quality/consistency for media).

## Common mistakes

- **Forcing a generalist model** to do high-quality voice/transcription it isn't best at.
- **Ignoring latency** in voice — the single most common reason voice agents feel broken.
- **Underestimating sensitivity** — voices and faces can be **biometric data** with legal
  protections; recordings trigger consent and retention rules.
- **Over-trusting media generation** for anything requiring accuracy or rights-clean output
  (IP/copyright concerns).

## Real business examples

- An **AI receptionist** uses Deepgram (STT) + a frontier LLM + ElevenLabs (TTS), tuned for low
  latency, to handle calls naturally.
- A media team uses a specialist TTS to produce consistent branded narration at scale.
- A marketing team uses an image-generation model for concepts — with a human checking for
  rights and brand fit before anything ships.

## Tools in this category

```toolcard
name: Speech & media specialist tools
category: Single-modality tools (voice, transcription, image, video)
use: Best-in-class quality/latency/control for a specific modality
alternatives: ElevenLabs (TTS), Deepgram / Whisper / AssemblyAI (STT), Flux & video models
when: Production voice/media work where a generalist model falls short
whennot: Occasional, simple modality tasks a multimodal LLM handles fine
```

## Governance considerations

```governance
Voice and visual data are often the most regulated data you'll touch. Voices and faces can qualify as **biometric data** with specific consent and protection requirements; call recordings carry consent, residency, and retention obligations; generated media raises **IP/copyright and deepfake/misuse** concerns. For each tool, confirm where audio/images are processed and stored, get the necessary consent, set retention limits, and guard against misuse (e.g. voice cloning). Treat this data as high-sensitivity by default.
```

## How an architect thinks

```architect
The architect designs media features as pipelines of best-of-breed parts, not as one model doing everything, and optimises the bottleneck — almost always latency for live voice. They also front-load the governance because this data (voices, faces, recordings) is among the most legally sensitive, and retrofitting consent and retention is painful. Specialist tool, weakest-link focus, sensitivity-first.
```

## Key takeaways

- A layer of **specialist tools** (ElevenLabs, Deepgram, Whisper, image/video models) often
  beats generalist LLMs on a single modality.
- **Voice agents are pipelines** (STT → LLM → TTS); **latency** is the make-or-break factor.
- Use generalists for casual tasks, **specialists for production** media/voice.
- Voice/visual data is **highly sensitive** (biometrics, consent, IP) — govern it first.

## Self-check

1. Why use a specialist STT/TTS tool over a generalist multimodal model for production?
2. What are the stages of a real-time voice agent, and which usually needs the most attention?
3. Why is speech/visual data a heightened governance concern?
