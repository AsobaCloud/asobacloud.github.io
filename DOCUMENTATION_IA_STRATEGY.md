# Documentation IA Strategy (v3 - One-Shot Ready)

**Objective**: This document outlines a fortified, operationally specific Information Architecture (IA) for the `asobacloud.github.io` repository. It has been revised based on an adversarial design review to make it **safe and effective for one-shot autonomous development by an AI coder**. It introduces explicit constraints, definitions of "done," and content generation rules to prevent ambiguity and ensure a predictable, high-quality outcome.

---

## 1. Guiding Principles (Unchanged)

The core principles remain the same:
*   **Audience-Centric**: Structure content around user personas and their goals.
*   **Task-Oriented**: Frame "Guides" as step-by-step solutions to specific problems.
*   **Progressive Disclosure**: Layer information from high-level overviews to deep technical specifics.
*   **Code-Centric & Complete**: Provide copy-pastable code samples with full, expected JSON responses.
*   **Visually Supported**: Use diagrams and charts to clarify complex concepts.
*   **Discoverable**: Ensure the site is easy to search and navigate.

---

## 2. The "One-Shot" Execution Contract

To prevent ambiguity and scope creep during autonomous generation, the following rules are **non-negotiable**.

### 2.1. Documentation Completion Contract (Definition of "Done")

This contract bounds the solution space to ensure consistent depth and prevent over/under-generation.

*   **Section Structure**: Each top-level section (`/guides/`, `/api-reference/`, etc.) MUST contain an `overview.md` file that summarizes the section's purpose (≤ 500 words).
*   **Page Limits**:
    *   Each top-level section MUST contain between 3 and 5 child pages (unless specified otherwise in the Canonical Page Manifest).
    *   No individual page may exceed 800 words.
*   **Content Requirements**: Every page (excluding overviews) MUST contain:
    *   A clear, single-task focus.
    *   At least one concrete code example (cURL or Python) where applicable.
*   **Termination Condition**: The project is considered "done" when all pages in the **Canonical Page Manifest (Section 3)** have been created and populated according to these rules. No additional pages shall be created.

### 2.2. Audience Profiles & Content Targeting

To prevent tonal inconsistency, content will be targeted at specific personas.

*   **Personas:**
    *   **Beginner**: Non-technical user. Wants to understand outcomes and high-level value. No API or coding knowledge.
    *   **Developer**: Technical user. Comfortable with REST, JSON, and CLI tools. Wants schemas, endpoints, and actionable code examples.
    *   **Decision Maker**: Business-focused user. Wants to understand capabilities, limitations, and ROI. Does not want code.

*   **Targeting Rules:**
    *   `index.md` & `/use-cases/` → **Decision Maker** & **Beginner**
    *   `get-started.md` → **Beginner**
    *   `/guides/` → **Beginner** & **Developer** (content should be accessible to both)
    *   `/api-reference/` → **Developer**
    *   `/technical-concepts/` → **Developer** (Advanced)

### 2.3. Progressive Disclosure Enforcement Rules

This acts as a "linter" for content depth to ensure concepts are introduced at the right time.

*   **`get-started.md`**:
    *   **ALLOWED**: Simple, copy-pastable code examples.
    *   **FORBIDDEN**: Explanations of internal architecture, ML model theory, or alternative API endpoints.
*   **`/guides/`**:
    *   **ALLOWED**: Conceptual explanations of *what* a feature does and *why* it's useful. Links to the API reference for implementation details.
    *   **FORBIDDEN**: Deep dives into mathematical formulas, complex model internals, or exhaustive lists of all API parameters.
*   **`/api-reference/`**:
    *   **ALLOWED**: Detailed, parameter-by-parameter descriptions of API endpoints, request/response schemas, and error codes.
    *   **FORBIDDEN**: Narrative tutorials or high-level business justifications.
*   **`/technical-concepts/`**:
    *   **ALLOWED**: Full, in-depth explanations of the underlying technology, including ML models, algorithms, and data processing pipelines.

### 2.4. Explicit Non-Goals

To protect against authoritative hallucination and scope creep, the AI coder MUST adhere to the following negative constraints:

*   Do NOT document unreleased or speculative features.
*   Do NOT invent performance guarantees, SLAs, or pricing information.
*   Do NOT invent or interpret regulatory or compliance advice.
*   Do NOT add tutorials or examples for APIs not explicitly listed in the **Canonical Page Manifest**.
*   Do NOT create any pages or directories not listed in the **Canonical Page Manifest**.

---

## 3. Canonical Page Manifest (v1)

This is the **single source of truth** for the repository's structure. The AI coder will create exactly these files and directories.

*   **`index.md`** (Root file)
*   **`get-started.md`** (Root file)
*   **`/guides/`**
    *   `overview.md`
    *   `forecasting.md`
    *   `data-management.md`
    *   `portfolio-management.md`
    *   `developer-guide.md`
*   **`/api-reference/`**
    *   `overview.md`
    *   `authentication.md`
    *   `freemium-forecasting-api.md`
*   **`/use-cases/`**
    *   `overview.md`
    *   `sibaya-casino.md`
    *   `cummins-portfolio.md`
    *   `avaron-infrastructure.md`
*   **`/technical-concepts/`**
    *   `overview.md`
    *   `machine-learning-models.md`
    *   `data-standardization.md`

---

## 4. Granular Content Extraction & Migration Plan

This provides specific instructions for migrating content from legacy files.

1.  **Create New Files and Directories**: Create the exact structure defined in the **Canonical Page Manifest**.
2.  **Migrate Content**:
    *   **Source: `esums-use-cases.html`**
        *   **Target**: `/use-cases/sibaya-casino.md`, `/use-cases/cummins-portfolio.md`, `/use-cases/avaron-infrastructure.md`.
        *   **Instructions**:
            *   Convert the HTML content for each case study into its own markdown file.
            *   Extract the "Challenge," "Metrics," and "Results" sections.
            *   Retain the core value propositions. Do not include HTML/CSS styling.
    *   **Source: `ESUMS_IMPLEMENTATION_GUIDE.md`**
        *   **Target**: `index.md`, `/guides/overview.md`, and other guide pages.
        *   **Instructions**:
            *   **Extract**: Problem statements (e.g., "Fragmented intelligence"), quantified value propositions (e.g., "96% faster fault detection"), and persona-specific pain points (e.g., "CFO pain").
            *   **Do NOT Include**: Internal SEO strategy, Google Ads campaign details, conversion architecture, A/B testing plans, or any other internal-facing project management language.
    *   **Source: `FREEMIUM_FORECASTING_IMPLEMENTATION_PLAN.md`**
        *   **Target**: `/api-reference/freemium-forecasting-api.md` and `/technical-concepts/data-standardization.md`.
        *   **Instructions**:
            *   For the API reference, extract all technical details: the endpoint (`POST /api/v1/freemium-forecast`), request format, response format, error responses, and parameter descriptions.
            *   For the technical concepts page, extract the high-level description of the CSV processing and data standardization steps.
            *   **Do NOT Include**: Internal risk assessments, IAM permissions, specific AWS service names, or deployment plans. The documentation should describe the public-facing API, not the internal implementation.
    *   **Source: `AI_CODING_GUIDELINES.md`**
        *   **Target**: `/guides/developer-guide.md`.
        *   **Instructions**: Migrate the content as-is, reformatting it into a standard guide page. This is for internal developers and can remain more prescriptive.

3.  **Generate New Content**:
    *   Write the new `get-started.md` from scratch, focusing on a single, simple tutorial for the **Beginner** persona.
    *   Write all `overview.md` pages to provide clear, concise summaries for each section.
    *   Flesh out the content for all new pages, using the extracted information as the factual basis and adhering to all rules in this contract.
    *   **Internal Linking**: Aggressively link between related pages. For example, `get-started.md` should link to `/guides/forecasting.md` and `/api-reference/freemium-forecasting-api.md`.
