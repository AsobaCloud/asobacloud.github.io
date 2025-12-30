# Documentation Information Architecture Strategy (v2)

This document outlines a revised strategy for restructuring the `asobacloud.github.io` repository into a comprehensive documentation portal, guided by the successful principles of Stripe's documentation. The goal is to create a resource that is clear, actionable, and tailored to both business and technical users, enabling a one-shot implementation by an AI coder.

## 1. Deeper Analysis of Stripe's Information Architecture

Stripe's documentation is a model of clarity and usability because it is architected around user workflows and goals, not just technical specifications. Our strategy will be built on these core observations:

1.  **Audience-Driven Structure**: Stripe separates its content for different audiences. Business leaders can explore product pages about `Payments` or `Revenue`, while developers can dive directly into the `API Reference`. This acknowledgment that different users have different needs is paramount.
2.  **Layered Content (Progressive Disclosure)**: Stripe guides users from high-level concepts to deep technical details in a logical progression:
    *   **Layer 1 (The "What"):** High-level product pages that explain the value proposition.
    *   **Layer 2 (The "How"):** Task-based guides and tutorials with code snippets for common use cases.
    *   **Layer 3 (The "Details"):** An exhaustive, parameter-level API reference for every endpoint.
3.  **"Show, Don't Just Tell" Philosophy**: Stripe's "API Explorer" and interactive examples are key. Developers can make live API calls, see real responses, and copy working code directly from the docs. While a full API explorer is out of scope for a one-shot update, we will simulate this experience by providing language-specific code samples (cURL, Python) and showing the exact, complete API responses.
4.  **Clear Separation of Guides and Reference**: Stripe maintains a crucial distinction between "Guides" (for learning and accomplishing tasks) and the "API Reference" (for looking up specific details). This prevents users from getting bogged down in unnecessary detail.

## 2. Guiding Principles & First Principles (Revised)

*   **Audience-Centric**: The primary navigation and content structure will be organized around our key user personas (C&I Asset Owners, IPPs, Developers) and their goals.
*   **Task-Oriented**: All "Guides" will be structured as step-by-step instructions to solve a specific problem or achieve a particular outcome (e.g., "Getting Your First Forecast," "Setting Up a New Asset").
*   **Progressive Disclosure**: The documentation will be layered, allowing users to engage at the level of detail they need, from a high-level overview to the deepest API reference.
*   **Code-Centric with Complete Examples**: Every API endpoint mentioned will be accompanied by complete, copy-pastable code samples in Python and cURL, along with the full, expected JSON responses.
*   **Visually Supported**: The documentation will not be a wall of text. It will be enhanced with diagrams, charts, and screenshots to illustrate concepts and workflows.
*   **Discoverable**: The site will be easy to navigate and search.

## 3. Key Decisions for One-Shot Implementation

To ensure this document is ready for a one-shot implementation, the following decisions are made:

*   **Navigation Structure**: We will use a top-level navigation bar with the following items: `Home`, `Guides`, `API Reference`, `Use Cases`, `Technical Concepts`, and `Get Started`.
*   **Styling**: The visual style will be clean and minimal, prioritizing readability. It will be based on the existing styles in `esums-use-cases.html` but adapted for a documentation format.
*   **Code Blocks**: All code blocks will have a language identifier and a "copy" button.
*   **Homepage**: The `index.md` will be repurposed as the main "Home" landing page, providing an overview of the Ona Intelligence Layer and directing users to the other sections.
*   **Internal Linking**: The AI coder is instructed to aggressively link between sections. For example, a "Guide" that uses an API endpoint must link directly to the entry for that endpoint in the "API Reference".

## 4. Proposed Information Architecture (Revised)

The repository will be structured around the following top-level categories. The AI coder will create new markdown files for each of these sections:

*   **`index.md` (Home/Overview):**
    *   Purpose: High-level overview of the Ona Intelligence Layer.
    *   Content: A marketing-oriented page that explains what the platform does, who it's for, and what problems it solves. It will have clear call-to-action links to "Get Started," "View a Demo," and "Explore Use Cases."

*   **`get-started.md`:**
    *   Purpose: A single, clear entry point for new users.
    *   Content: This will be a step-by-step tutorial that walks a user through their first interaction with the platform:
        1.  How to get API credentials.
        2.  A complete "Hello World" example: uploading a sample CSV file and receiving a 24-hour forecast.
        3.  This page will feature the `freemiumforecastingApi` as the primary example.

*   **/guides/** (Directory with multiple files):
    *   Purpose: Task-oriented tutorials for accomplishing specific goals.
    *   Files to create:
        *   `guides/forecasting.md`: How to generate forecasts, interpret results, and understand forecast accuracy.
        *   `guides/data-management.md`: How to prepare, upload, and standardize data.
        *   `guides/portfolio-management.md`: How to manage and analyze a portfolio of assets.
        *   `guides/energy-trading.md`: How to use the platform for energy trading optimization.
        *   `guides/compliance.md`: How to use the platform for regulatory compliance.
        *   `guides/developer-guide.md`: This will house the content from the existing `AI_CODING_GUIDELINES.md` and any other developer-specific process documentation.

*   **/api-reference/** (Directory with multiple files):
    *   Purpose: Detailed, parameter-level documentation for every API endpoint.
    *   Files to create:
        *   `api-reference/authentication.md`: Explaining API key usage.
        *   `api-reference/freemium-forecasting-api.md`: A detailed breakdown of the `freemiumforecastingApi`, including the `POST /api/v1/freemium-forecast` endpoint, all parameters, and example request/response pairs.
        *   *(Future sections for other APIs can be added here)*

*   **/use-cases/** (Directory with multiple files):
    *   Purpose: Showcase real-world applications and success stories.
    *   Content: The content from `esums-use-cases.html` will be migrated into markdown files within this directory. Each case study (Sibaya, Cummins, Avaron) will be its own file.

*   **/technical-concepts/** (Directory with multiple files):
    *   Purpose: Explain the underlying technology for advanced users.
    *   Content: This section will explain the "how" behind the platform.
        *   `technical-concepts/machine-learning-models.md`: An overview of the ML models used for forecasting (LSTM, ARIMA, etc.).
        *   `technical-concepts/data-standardization.md`: A description of the data standardization process.

## 5. Content Migration and Creation Plan (Revised)

The AI coder will execute the following plan:

1.  **Create New Files and Directories**: Create the file and directory structure outlined in Section 4.
2.  **Migrate Existing Content**:
    *   **`esums-use-cases.html`**: Convert the HTML content into markdown and create individual files for each case study in the `/use-cases/` directory.
    *   **`ESUMS_IMPLEMENTATION_GUIDE.md`**: Extract the business-level messaging and value propositions for the new `index.md` (Home) and the various `guides`.
    *   **`FREEMIUM_FORECASTING_IMPLEMENTATION_PLAN.md`**: This is the primary source for the `api-reference/freemium-forecasting-api.md`. Extract all technical details, including the endpoint, request/response formats, and error codes. Also use this for `technical-concepts/data-standardization.md`.
    *   **`AI_CODING_GUIDELINES.md`**: Move this content into `guides/developer-guide.md`.
3.  **Create New Content**:
    *   Write the new `get-started.md` from scratch, ensuring it is a simple, actionable tutorial.
    *   Write the new overview pages for each of the `guides`, `api-reference`, and `technical-concepts` sections.
    *   Flesh out the content for all new pages, using the existing documents as the source of truth.
4.  **Implement Visuals and Interactivity**:
    *   Embed diagrams and charts where appropriate (e.g., a data flow diagram in `technical-concepts/data-standardization.md`).
    *   Ensure all code blocks are correctly formatted with language identifiers and a copy button.

This revised strategy provides a clear, actionable plan for the AI coder to execute a one-shot update of the documentation, aligned with the best practices demonstrated by Stripe.