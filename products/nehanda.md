---
title: "Nehanda"
layout: default
nav_order: 3
parent: "Products"
---

# Nehanda

A 27B parameter multimodal language model fine-tuned for RAG synthesis and epistemic robustness. **88.7% on the FACTS Grounding benchmark** — the highest score on the public split, above Gemini 2.5 Pro (87.8%), Claude 3.5 Sonnet (83.8%), and GPT-4o (79.8%).

<img src="/assets/images/analyst.png" alt="Nehanda" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

**Model**: [asoba/nehanda-v3-27b](https://huggingface.co/asoba/nehanda-v3-27b) on Hugging Face

---

## Overview

Nehanda v3 is a specialized language model that departs from standard chat models to focus on forensic analysis and evidence-based assessment. Built on Qwen3.6-27B, it prioritizes **provenance** and **structure** over fluency, explicitly stating when information is unknown rather than fabricating. The base model includes a native vision encoder — all five training stages are text-only, so the vision weights carry full Qwen3.6-27B vision capability forward.

<div class="evaluation-card">
  <div class="evaluation-card-header">
    <div class="evaluation-card-icon">🧪</div>
    <h3>Model Evaluation</h3>
  </div>
  <div class="evaluation-card-content">
    <p>Comprehensive evaluation of Nehanda's epistemic consistency, signal detection capabilities, and multi-turn reasoning performance.</p>
    <a href="/products/nehanda-evaluation" class="card-cta">View Evaluation Results</a>
  </div>
</div>

Nehanda serves as the default synthesis engine for [Zorora](/products/zorora), powering deep research workflows that require rigorous citation tracing and credibility assessment.

### Key Achievement: Perfect Multi-Turn Consistency

Nehanda v3 achieves **100% multi-turn epistemic consistency** across energy and intelligence domains — matching Claude Opus 4.6 while far outperforming GPT-5 Mini (37.5–50%) under sustained conversational pressure. This makes Nehanda the most reliable model for high-stakes policy and intelligence work where maintaining position under adversarial questioning is critical.

Read the full research: [Epistemic Robustness Under Adversarial Narrative Environments](https://asoba.org/pub-nehanda-epistemic.html)

### FACTS Grounding Benchmark — 88.7% Factuality

Nehanda v3 was evaluated on [Google DeepMind's FACTS Grounding benchmark](https://www.kaggle.com/benchmarks/google/facts-grounding): 860 public examples from [google/FACTS-grounding-public](https://huggingface.co/datasets/google/FACTS-grounding-public), each requiring a long-form response grounded in a provided context document. The result:

| Metric | Score |
|--------|-------|
| **Factuality score** | **88.7%** (763 / 860 eligible & grounded) |
| Grounding rate (valid responses) | 93.5% (763 / 816) |
| Eligibility rate | 98.4% (803 / 816) |

**Leaderboard comparison:**

| # | Model | Score | Params |
|---|-------|-------|--------|
| **1** | **Nehanda v3 (this work)** | **88.7%** | 27B |
| 2 | Gemini 2.5 Pro Preview | 87.8% | — |
| 3 | Gemini 2.5 Flash | 85.3% | — |
| 4 | Gemini 2.5 Flash-Lite | 84.1% | — |
| 5 | Claude 3.5 Sonnet | 83.8% | — |
| 6 | GPT-4o | 79.8% | — |
| 7 | Gemma 3 27B | 74.9% | 27B |
| 8 | GPT-4o mini | 72.2% | — |
| 9 | Gemma 3 4B | 70.1% | 4B |
| 10 | Gemma 3 1B | 36.4% | 1B |

Nehanda v3 outperforms the same-size open model Gemma 3 27B (74.9%) by 13.8 percentage points. The leaderboard scores use Google's 3-judge protocol; Nehanda v3 uses a single judge (GLM-5.2) — see the [benchmark report](https://asoba.org/pub-nehanda-v3.html) for methodology details.

### Vision Capabilities

The Qwen3.6-27B base model includes a native vision encoder. Since all five training stages are text-only, the vision weights are untouched and carry full native capability forward:

- **Document and structured data parsing** — Ingest scanned regulatory filings, tariff schedules, and charts directly as images, bypassing OCR pipelines
- **Object localization** — Bounding box and point-coordinate outputs in stable JSON format
- **Video understanding** — Up to 224K video tokens for hour-scale video with event pinpointing
- **Native multimodal context** — 262,144-token context window (extendable to ~1M via YaRN); images and text share the same context
- **Thinking and non-thinking modes** — Chain-of-thought over image content or direct extraction

---

## Evaluation Framework

<div class="evaluation-card">
  <div class="evaluation-card-header">
    <div class="evaluation-card-icon">📊</div>
    <h3>3-Phase Epistemic Stress Test</h3>
  </div>
  <div class="evaluation-card-content">
    <p>Nehanda is evaluated using a rigorous 3-phase framework that measures reliability under sustained adversarial pressure. The framework tests whether the model can maintain correct positions when pressured with false premises or conflicting information.</p>
    <div class="evaluation-card-features">
      <ul>
        <li><strong>Phase 1 (Table Stakes):</strong> 24 recall-level tests — any model should score 95%+</li>
        <li><strong>Phase 2 (Single Hard):</strong> 48 higher-order tasks with conflicting sources, embedded falsehoods, and extrapolation traps</li>
        <li><strong>Phase 3 (Multi-Turn):</strong> 16 turns across 4 sequences — the differentiating signal</li>
      </ul>
    </div>
  </div>
  <a href="/products/nehanda-evaluation" class="card-cta">View Evaluation Details</a>
</div>

---

## Core Capabilities

### Signal Detection
Distinguishes between routine noise and pre-cursor indicators of structural shifts in regulatory, financial, and geopolitical systems.

### Systems Analysis
Domain knowledge served via RAG at inference time, always current and always citable.

### Citation Tracing
Follows logic chains across multiple sources with provenance tracking, enabling verification of claims back to original documents.

### Anti-Fabrication
Enforces strict adherence to provided context. Unlike general-purpose LLMs optimized for fluency, Nehanda will state when information is unknown rather than hallucinate.

### Multi-Turn Consistency
Maintains correct position under sustained conversational pressure with perfect consistency across adversarial follow-ups.

---

## Architecture

| Specification | Value |
|---------------|-------|
| Base Model | Qwen3.6-27B |
| Fine-tuning | 5-stage stacked QLoRA pipeline (transformers 5.5.0 + unsloth) |
| Parameters | 27B |
| Context Window | 262K tokens (extendable to ~1M via YaRN) |
| Vision | Native Qwen3.6-27B vision encoder (untouched — text-only training) |
| Training Hardware | NVIDIA L40S GPU (44.4 GiB VRAM) |
| License | Apache 2.0 |

### Training Pipeline

1. **Epistemic Foundation (SFT)** — Epistemic discipline, correcting false premises, bounding answers to given information
2. **Epistemic Hardening (SFT)** — Evidence weighting, unknown boundaries, correcting false or overstated user framing
3. **RAG Synthesis (SFT)** — Synthesizes ranked news and economic data into fact-driven thesis, prioritizing higher-credibility evidence
4. **Constitutional SFT + Replay** — Maintains strict epistemic honesty using 0.3 replay buffer ratio from Stages 2 and 3 to prevent catastrophic forgetting
5. **Constitutional DPO** — Preference optimization where chosen responses maintain source boundaries and rejected responses fabricate or capitulate

### Key Innovation: RAG-Based Domain Knowledge

Unlike v1 which baked domain knowledge into weights, v3 moves factual grounding to a retrieval layer at inference time. This enables:
- Always-current information without retraining
- Direct source citations for every claim (inline square brackets)
- Native vision capability for document/image ingestion without OCR
- Lower training cost despite capable base model

---

## Performance Highlights

### Multi-Turn Epistemic Consistency (Phase 3)

| Model | Energy Consistency | Intel Consistency |
|-------|-------------------|-------------------|
| **Nehanda v3** | **100%** | **100%** |
| Claude Opus 4.6 | 100% | 100% |
| GPT-5 Mini | 37.5% | 50% |
| Nehanda v2 | 43.8% | 50% |

### Single-Turn Epistemic Resistance (Phase 2)

| Dimension | Nehanda v3 Energy | Nehanda v3 Intel | GPT-5 Mini |
|-----------|---------------------|-------------------|------------|
| **Overall** | 74.8% | 79.2% | 84.5% |
| Adversarial | 100% | 100% | 100% |
| Sycophancy | 100% | 100% | 100% |

### Comparison Sequence (Conflicting Sources Under Sycophancy Pressure)

| Model | Energy Score | Intel Score |
|-------|--------------|-------------|
| **Nehanda v3** | **75%** | **62.5%** |
| GPT-5 Mini | 0% | 12.5% |
| Nehanda v2 | 0% | 0% |

---

## Evaluation Framework

Nehanda is evaluated on a custom 3-phase epistemic harness:

**Phase 1 (Table Stakes)** - 24 recall-level tests (10% weight)
**Phase 2 (Single Hard)** - 48 higher-order reasoning tests (35% weight)
**Phase 3 (Multi-Turn)** - 16 turns across 4 sequences (45% weight)

The 3-phase design reveals the differentiating signal: single-turn benchmarks systematically overstate model capability. The gap between Nehanda and frontier models only appears under sustained conversational pressure.

---

## Integration with Zorora

Nehanda powers the `/search` and `/research` commands in [Zorora](/products/zorora):

1. **Ingest** - Raw context from search tools
2. **Triage** - Information scored by credibility and relevance
3. **Synthesize** - Answers highlighting information gaps, conflicting accounts, and consensus points

---

## Usage

```python
from unsloth import FastModel

model, tokenizer = FastModel.from_pretrained(
    model_name="asoba/nehanda-v3-27b",
    max_seq_length=2048,
)

prompt = """You are an intelligence assessment specialist.
### Instruction:
Analyze the provided cable for indicators of regulatory capture.
### Context:
[Your context here]
### Response:"""

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=512)
print(tokenizer.decode(outputs[0]))
```

### Local Inference with Unsloth Studio

```bash
# Install Unsloth Studio (macOS, Linux, WSL)
curl -fsSL https://unsloth.ai/install.sh | sh
unsloth studio -H 0.0.0.0 -p 8888
# Open http://localhost:8888 and search for asoba/nehanda-v3-27b
```

---

## License

CC-BY-NC-ND-4.0

Access requires contact information sharing via Hugging Face.

---

## Support & Resources

### Documentation
- [Zorora Product Page](/products/zorora)
- [API Reference](/api-reference/overview)
- [FACTS Grounding Benchmark Report](https://asoba.org/pub-nehanda-v3.html)
- [Research Paper: Epistemic Robustness](https://asoba.org/pub-nehanda-epistemic.html)

### Support
- **Email**: [support@asoba.org](mailto:support@asoba.org)
- **Discord**: [Join our community](https://discord.gg/v4vD5EXSUD)

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.org" class="support-button">Email Support</a>
      <a href="https://discord.gg/v4vD5EXSUD" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
      </a>
    </div>
  </div>

  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>
</div>
