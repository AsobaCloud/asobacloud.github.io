# Documentation Information Architecture Guide
## Aligning with Stripe's Best Practices

**⚠️ EXECUTION STATUS**: This document contains both **design principles** (non-executable) and **execution instructions** (one-shot ready). 

**🚀 FOR AI CODERS**: See `AI_EXECUTION_PROMPT.md` for a focused execution prompt. Alternatively, read ONLY the [Execution Plan](#execution-plan) section below and ignore all other sections.

**📊 DATA DISPLAY PATTERNS**: This guide does NOT define rules for selecting data display patterns (e.g., tables vs charts, when to use callouts). See `DATA_DISPLAY_PATTERN_GUIDE.md` for deterministic pattern selection rules.

**Purpose**: This document provides a comprehensive analysis of Stripe's documentation information architecture and establishes guiding principles and strategies for restructuring the `asobacloud.github.io` repository to achieve similar clarity, discoverability, and user experience.

**Target Audience**: AI coders tasked with one-shot documentation updates, documentation maintainers, and product teams.

**Last Updated**: 2025-01-XX

---

## ⚡ EXECUTION PLAN (One-Shot Ready)

**CRITICAL**: This section contains **deterministic, machine-actionable instructions**. All other sections are **reference/design philosophy** and should NOT be interpreted as execution steps.

### Scope Declaration

**IN SCOPE** (files/directories that MAY be modified):

```
asobacloud.github.io/
├── index.md                          ✅ MODIFY
├── get-started.md                    ✅ MODIFY
├── guides/                           ✅ MODIFY (all files)
├── api-reference/                    ✅ MODIFY (all files)
├── use-cases/                        ✅ MODIFY (all files)
├── technical-concepts/                ✅ MODIFY (all files)
├── products/                          ✅ MODIFY (all files)
├── _layouts/default.html             ✅ MODIFY (navigation only)
├── _config.yml                       ✅ MODIFY (navigation only)
├── assets/js/search.js               ✅ MODIFY
├── assets/css/styles.css             ✅ MODIFY (additions only)
└── _plugins/                        ✅ CREATE (if needed for search index)
```

**OUT OF SCOPE** (files/directories that MUST NOT be modified):

```
asobacloud.github.io/
├── .git/                            ❌ DO NOT TOUCH
├── .github/                         ❌ DO NOT TOUCH
├── CNAME                            ❌ DO NOT TOUCH
├── .gitignore                       ❌ DO NOT TOUCH
├── assets/images/                   ❌ DO NOT TOUCH (read-only)
├── assets/_includes/                ❌ DO NOT TOUCH
└── Any file outside repo root       ❌ DO NOT TOUCH
```

**EXTERNAL REFERENCES** (read-only, for context):

```
~/Workbench/platform/                📖 READ ONLY (for API details)
~/Workbench/esums/                   📖 READ ONLY (for use case content)
~/Workbench/website/dist/includes/common.css  📖 READ ONLY (CSS foundation)
```

---

### Deterministic Migration Map

**CRITICAL**: Execute these mappings **exactly as specified**. No interpretation allowed.

#### Existing Files to Move/Rename

| Source File | Target File | Action | Validation |
|------------|------------|--------|------------|
| `guides/forecasting.md` | `guides/forecasting/overview.md` | **MOVE** | File exists → Move to subdirectory |
| `guides/data-management.md` | `guides/data-management/overview.md` | **MOVE** | File exists → Move to subdirectory |
| `guides/portfolio-management.md` | `guides/portfolio-management/overview.md` | **MOVE** | File exists → Move to subdirectory |
| `guides/developer-guide.md` | `guides/developer-guide.md` | **KEEP** | Keep in place (no move needed) |
| `guides/overview.md` | `guides/overview.md` | **KEEP** | Keep in place (may enhance) |
| `api-reference/freemium-forecasting-api.md` | `api-reference/forecasting/freemium-forecast.md` | **MOVE** | File exists → Move to subdirectory |
| `api-reference/authentication.md` | `api-reference/authentication.md` | **KEEP** | Keep in place (may enhance) |
| `api-reference/overview.md` | `api-reference/overview.md` | **KEEP** | Keep in place (may enhance) |
| `technical-concepts/machine-learning-models.md` | `technical-concepts/machine-learning/forecasting-models.md` | **MOVE** | File exists → Move to subdirectory |
| `technical-concepts/data-standardization.md` | `technical-concepts/data-standardization.md` | **KEEP** | Keep in place (may enhance) |
| `technical-concepts/overview.md` | `technical-concepts/overview.md` | **KEEP** | Keep in place (may enhance) |
| `use-cases/sibaya-casino.md` | `use-cases/sibaya-casino.md` | **KEEP** | Keep in place (may enhance) |
| `use-cases/cummins-portfolio.md` | `use-cases/cummins-portfolio.md` | **KEEP** | Keep in place (may enhance) |
| `use-cases/avaron-infrastructure.md` | `use-cases/avaron-infrastructure.md` | **KEEP** | Keep in place (may enhance) |
| `use-cases/overview.md` | `use-cases/overview.md` | **KEEP** | Keep in place (may enhance) |
| `index.md` | `index.md` | **REWRITE** | Replace entire content with wayfinding template |
| `get-started.md` | `get-started.md` | **MODIFY** | Enhance but preserve existing code examples |
| `_layouts/default.html` | `_layouts/default.html` | **MODIFY** | Update navigation HTML only (between `<!-- NAV START -->` and `<!-- NAV END -->` markers) |
| `assets/js/search.js` | `assets/js/search.js` | **REWRITE** | Replace with auto-indexing implementation |
| `assets/css/styles.css` | `assets/css/styles.css` | **MODIFY** | Add new CSS (append, don't replace) |

#### New Files to Create

| Target File | Source Content | Action | Validation |
|------------|---------------|--------|------------|
| `guides/forecasting/generating-forecasts.md` | Extract from `guides/forecasting.md` | **CREATE** | New file, extract content |
| `guides/forecasting/interpreting-results.md` | Extract from `guides/forecasting.md` | **CREATE** | New file, extract content |
| `guides/forecasting/improving-accuracy.md` | Extract from `guides/forecasting.md` | **CREATE** | New file, extract content |
| `guides/data-management/preparing-data.md` | Extract from `guides/data-management.md` | **CREATE** | New file, extract content |
| `guides/data-management/uploading-data.md` | Extract from `guides/data-management.md` | **CREATE** | New file, extract content |
| `guides/data-management/data-quality.md` | Extract from `guides/data-management.md` | **CREATE** | New file, extract content |
| `api-reference/forecasting/overview.md` | New content | **CREATE** | New overview file |
| `technical-concepts/machine-learning/overview.md` | New content | **CREATE** | New overview file |
| `_plugins/search_index_generator.rb` | New plugin | **CREATE** | Jekyll plugin for search index |
| `search-index.json` | Generated by plugin | **CREATE** | Auto-generated during build |

#### Directories to Create

| Directory | Purpose | Validation |
|-----------|---------|------------|
| `guides/forecasting/` | Forecasting guide subdirectory | Create if not exists |
| `guides/data-management/` | Data management guide subdirectory | Create if not exists |
| `guides/portfolio-management/` | Portfolio management guide subdirectory | Create if not exists |
| `api-reference/forecasting/` | Forecasting API subdirectory | Create if not exists |
| `technical-concepts/machine-learning/` | ML concepts subdirectory | Create if not exists |
| `_plugins/` | Jekyll plugins directory | Create if not exists |

**CRITICAL RULE**: If a file is not listed above, **DO NOT MODIFY IT**.

**Files to DELETE** (after migration):

- None. All existing files are moved, not deleted.

---

### Mechanical Rewrite Rules

**CRITICAL**: Apply these rules **mechanically**. No exceptions.

#### Rule 1: Code Blocks
- ✅ **MUST preserve** all code blocks exactly as-is
- ✅ **MUST preserve** all API request/response JSON verbatim
- ✅ **MUST preserve** all cURL examples exactly
- ❌ **MUST NOT** modify code syntax or examples
- ❌ **MUST NOT** add new code examples unless explicitly specified

#### Rule 2: Links
- ✅ **MUST update** all internal links to match new file structure
- ✅ **MUST preserve** all external links exactly
- ✅ **MUST add** "See also" sections linking to related pages
- ❌ **MUST NOT** break any existing links
- ❌ **MUST NOT** add links to non-existent pages

#### Rule 3: Content Extraction
- ✅ **MAY split** long documents into multiple files
- ✅ **MUST preserve** all factual content
- ✅ **MUST preserve** all metrics, numbers, and data
- ✅ **MUST extract** by moving contiguous heading blocks verbatim (H2 → H3 → content)
- ✅ **MUST NOT** reword or paraphrase extracted content
- ✅ **MUST NOT** combine content from different sections
- ❌ **MUST NOT** invent new content
- ❌ **MUST NOT** add "TODO" or "Coming Soon" sections

**Extraction Method**:
1. Identify H2 headings as section boundaries
2. Move entire H2 section (heading + all content until next H2) to new file
3. Copy verbatim - no rewording, no paraphrasing
4. Preserve all code blocks, lists, tables exactly as-is
5. Update internal links to reflect new file structure

#### Rule 4: Headings
- ✅ **MAY restructure** heading hierarchy for clarity
- ✅ **MUST preserve** all heading text content
- ❌ **MUST NOT** change heading meaning
- ❌ **MUST NOT** remove headings that contain unique information

#### Rule 5: CSS
- ✅ **MUST build** on `common.css` (use CSS variables)
- ✅ **MUST add** new CSS to `assets/css/styles.css`
- ❌ **MUST NOT** modify `common.css` (read-only reference)
- ❌ **MUST NOT** hardcode colors (use CSS variables)

#### Rule 6: Navigation
- ✅ **MUST update** `_layouts/default.html` navigation structure
- ✅ **MUST update** only content between `<!-- NAV START -->` and `<!-- NAV END -->` markers
- ✅ **MUST preserve** existing toggle functionality JavaScript
- ✅ **MUST preserve** header and footer HTML (outside nav markers)
- ❌ **MUST NOT** modify header/footer HTML
- ❌ **MUST NOT** change layout structure outside nav section
- ❌ **MUST NOT** modify JavaScript outside navigation-related code

**Navigation Update Method**:
1. Locate `<!-- NAV START -->` marker in `_layouts/default.html`
2. Locate `<!-- NAV END -->` marker
3. Replace only HTML between these markers
4. Preserve all HTML before `<!-- NAV START -->` and after `<!-- NAV END -->`
5. Preserve all JavaScript (may be before/after markers)

---

### Acceptance Criteria (Machine-Checkable)

**CRITICAL**: The documentation uplift is COMPLETE if and only if ALL of the following checks pass.

#### Check 1: All Moved Files Exist at Target Paths

```bash
#!/bin/bash
# Run this script from repo root

ERRORS=0

# Files that were moved
[ -f "guides/forecasting/overview.md" ] || { echo "FAIL: guides/forecasting/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/data-management/overview.md" ] || { echo "FAIL: guides/data-management/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/portfolio-management/overview.md" ] || { echo "FAIL: guides/portfolio-management/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "api-reference/forecasting/freemium-forecast.md" ] || { echo "FAIL: api-reference/forecasting/freemium-forecast.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/machine-learning/forecasting-models.md" ] || { echo "FAIL: technical-concepts/machine-learning/forecasting-models.md missing"; ERRORS=$((ERRORS+1)); }

# Files that were created
[ -f "guides/forecasting/generating-forecasts.md" ] || { echo "FAIL: guides/forecasting/generating-forecasts.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/forecasting/interpreting-results.md" ] || { echo "FAIL: guides/forecasting/interpreting-results.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/forecasting/improving-accuracy.md" ] || { echo "FAIL: guides/forecasting/improving-accuracy.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/data-management/preparing-data.md" ] || { echo "FAIL: guides/data-management/preparing-data.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/data-management/uploading-data.md" ] || { echo "FAIL: guides/data-management/uploading-data.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/data-management/data-quality.md" ] || { echo "FAIL: guides/data-management/data-quality.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "api-reference/forecasting/overview.md" ] || { echo "FAIL: api-reference/forecasting/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/machine-learning/overview.md" ] || { echo "FAIL: technical-concepts/machine-learning/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "_plugins/search_index_generator.rb" ] || { echo "FAIL: _plugins/search_index_generator.rb missing"; ERRORS=$((ERRORS+1)); }

# Files that should NOT exist at old paths (if moved)
[ ! -f "guides/forecasting.md" ] || { echo "FAIL: guides/forecasting.md still exists (should be moved)"; ERRORS=$((ERRORS+1)); }
[ ! -f "guides/data-management.md" ] || { echo "FAIL: guides/data-management.md still exists (should be moved)"; ERRORS=$((ERRORS+1)); }
[ ! -f "guides/portfolio-management.md" ] || { echo "FAIL: guides/portfolio-management.md still exists (should be moved)"; ERRORS=$((ERRORS+1)); }
[ ! -f "api-reference/freemium-forecasting-api.md" ] || { echo "FAIL: api-reference/freemium-forecasting-api.md still exists (should be moved)"; ERRORS=$((ERRORS+1)); }
[ ! -f "technical-concepts/machine-learning-models.md" ] || { echo "FAIL: technical-concepts/machine-learning-models.md still exists (should be moved)"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: All file existence checks passed"
else
  echo "FAIL: $ERRORS file existence check(s) failed"
  exit 1
fi
```

#### Check 2: Navigation Structure

```bash
#!/bin/bash

ERRORS=0

# Check _layouts/default.html contains required nav sections
grep -q "Getting Started" _layouts/default.html || { echo "FAIL: Navigation missing 'Getting Started'"; ERRORS=$((ERRORS+1)); }
grep -q "API Reference" _layouts/default.html || { echo "FAIL: Navigation missing 'API Reference'"; ERRORS=$((ERRORS+1)); }
grep -q "Technical Concepts" _layouts/default.html || { echo "FAIL: Navigation missing 'Technical Concepts'"; ERRORS=$((ERRORS+1)); }
grep -q "Use Cases" _layouts/default.html || { echo "FAIL: Navigation missing 'Use Cases'"; ERRORS=$((ERRORS+1)); }

# Check navigation has hierarchical structure (sub-menus)
grep -q "sub-menu\|sub-nav-header" _layouts/default.html || { echo "FAIL: Navigation missing sub-menu structure"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Navigation structure check passed"
else
  echo "FAIL: $ERRORS navigation check(s) failed"
  exit 1
fi
```

#### Check 3: No TODOs or Placeholders

```bash
#!/bin/bash

ERRORS=0

# Check for TODOs in documentation files
TODOS=$(grep -r "TODO\|Coming Soon\|FIXME\|XXX" guides/ api-reference/ technical-concepts/ use-cases/ index.md get-started.md 2>/dev/null | wc -l)

if [ "$TODOS" -gt 0 ]; then
  echo "FAIL: Found $TODOS TODO/placeholder(s) in documentation"
  grep -r "TODO\|Coming Soon\|FIXME\|XXX" guides/ api-reference/ technical-concepts/ use-cases/ index.md get-started.md 2>/dev/null
  ERRORS=$((ERRORS+1))
else
  echo "PASS: No TODOs or placeholders found"
fi

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Content quality check passed"
else
  exit 1
fi
```

#### Check 4: CSS Uses Variables (No Hardcoded Colors)

```bash
#!/bin/bash

ERRORS=0

# Check for hardcoded hex colors (excluding comments and var() usage)
HARDCODED=$(grep -E "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}" assets/css/styles.css | grep -v "^\s*/\*" | grep -v "var(--" | grep -v "^\s*\*" | wc -l)

if [ "$HARDCODED" -gt 0 ]; then
  echo "FAIL: Found $HARDCODED hardcoded color(s) in styles.css"
  grep -E "#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}" assets/css/styles.css | grep -v "^\s*/\*" | grep -v "var(--" | grep -v "^\s*\*"
  ERRORS=$((ERRORS+1))
else
  echo "PASS: All colors use CSS variables"
fi

if [ $ERRORS -eq 0 ]; then
  echo "PASS: CSS variable check passed"
else
  exit 1
fi
```

#### Check 5: Search Functionality

```bash
#!/bin/bash

ERRORS=0

# Check search index generator plugin exists
[ -f "_plugins/search_index_generator.rb" ] || { echo "FAIL: Search index generator plugin missing"; ERRORS=$((ERRORS+1)); }

# Check search.js references search index
grep -q "search-index.json\|loadSearchIndex" assets/js/search.js || { echo "FAIL: search.js doesn't reference search index"; ERRORS=$((ERRORS+1)); }

# Check search.js has auto-indexing logic (not hardcoded array)
grep -q "fetch.*search-index\|loadSearchIndex\|async.*load" assets/js/search.js || { echo "FAIL: search.js doesn't load index dynamically"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Search functionality check passed"
else
  exit 1
fi
```

#### Check 6: Index Page Wayfinding

```bash
#!/bin/bash

ERRORS=0

# Check index.md contains wayfinding elements
grep -q "hero-section\|role-cards\|quick-links" index.md || { echo "FAIL: index.md missing wayfinding elements"; ERRORS=$((ERRORS+1)); }

# Check old content is removed
grep -q "Welcome to the Ona Intelligence Layer" index.md && { echo "FAIL: index.md still contains old welcome text"; ERRORS=$((ERRORS+1)); }

# Check role-based cards exist
grep -q "I'm a Developer\|I'm a Business User\|I'm a Decision Maker" index.md || { echo "FAIL: index.md missing role-based cards"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Index page wayfinding check passed"
else
  exit 1
fi
```

#### Check 7: No Out-of-Scope Files Modified

```bash
#!/bin/bash

ERRORS=0

# Check git status for out-of-scope files
OUT_OF_SCOPE=$(git status --porcelain | grep -E "\.git/|\.github/|CNAME|\.gitignore|assets/images/" | wc -l)

if [ "$OUT_OF_SCOPE" -gt 0 ]; then
  echo "FAIL: Found $OUT_OF_SCOPE out-of-scope file(s) modified"
  git status --porcelain | grep -E "\.git/|\.github/|CNAME|\.gitignore|assets/images/"
  ERRORS=$((ERRORS+1))
else
  echo "PASS: No out-of-scope files modified"
fi

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Scope check passed"
else
  exit 1
fi
```

#### Master Validation Script

```bash
#!/bin/bash
# Run all checks

echo "Running documentation uplift validation..."
echo ""

./check-1-files.sh && \
./check-2-navigation.sh && \
./check-3-todos.sh && \
./check-4-css.sh && \
./check-5-search.sh && \
./check-6-index.sh && \
./check-7-scope.sh

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ ALL CHECKS PASSED - Documentation uplift is COMPLETE"
  exit 0
else
  echo ""
  echo "❌ ONE OR MORE CHECKS FAILED - Documentation uplift is INCOMPLETE"
  exit 1
fi
```

---

### Execution Order (Deterministic)

**CRITICAL**: Execute in this exact order. Do not skip steps.

1. **Phase 1: File Structure**
   - Create all new directories
   - Move files according to migration map
   - Create all new files (empty placeholders)

2. **Phase 2: Content Migration**
   - Extract content from moved files
   - Split long documents per migration map
   - Update all internal links

3. **Phase 3: Navigation Update**
   - Locate `<!-- NAV START -->` and `<!-- NAV END -->` markers in `_layouts/default.html`
   - Replace only HTML between markers with new navigation structure
   - Preserve all HTML and JavaScript outside markers
   - Update navigation JavaScript (if needed, but preserve existing toggle logic)
   - Test navigation expansion/collapse

4. **Phase 4: Search Update**
   - Create `_plugins/search_index_generator.rb`
   - Update `assets/js/search.js`
   - Generate `search-index.json`

5. **Phase 5: Index Page**
   - Replace `index.md` with wayfinding template
   - Add all required HTML/CSS
   - Connect search functionality

6. **Phase 6: CSS Additions**
   - Add component CSS to `assets/css/styles.css`
   - Verify all CSS uses variables
   - Test responsive design

7. **Phase 7: Validation**
   - Run all acceptance criteria checks
   - Fix any failures
   - Verify no out-of-scope files modified

---

### Error Handling

**If any step fails:**

1. **STOP** execution immediately
2. **REPORT** which step failed and why
3. **DO NOT** proceed to next phase
4. **DO NOT** make partial changes

**Rollback procedure:**

- All changes are in git
- Use `git status` to see modified files
- Use `git checkout -- <file>` to revert individual files
- Use `git reset --hard HEAD` to revert all changes

---

### Success Definition

**The documentation uplift succeeds when:**

1. ✅ All files in migration map exist at target paths
2. ✅ All acceptance criteria pass
3. ✅ No out-of-scope files were modified
4. ✅ Navigation works (expand/collapse, active states)
5. ✅ Search works (indexes all pages, shows hierarchy)
6. ✅ Index page displays wayfinding elements
7. ✅ All internal links are valid
8. ✅ No TODOs or placeholders remain

**If ALL criteria pass → Uplift is COMPLETE**

**If ANY criteria fail → Uplift is INCOMPLETE (fix and retry)**

---

## Table of Contents

### ⚡ Execution (One-Shot Ready)
1. [Execution Plan](#execution-plan) - **START HERE** - Deterministic, machine-actionable instructions
   - [Scope Declaration](#scope-declaration)
   - [Deterministic Migration Map](#deterministic-migration-map)
   - [Mechanical Rewrite Rules](#mechanical-rewrite-rules)
   - [Acceptance Criteria](#acceptance-criteria-machine-checkable)
   - [Execution Order](#execution-order-deterministic)

### 📚 Reference (Design Philosophy)
2. [Stripe Documentation IA Analysis](#stripe-documentation-ia-analysis) - Design rationale
3. [First Principles for Documentation IA](#first-principles-for-documentation-ia) - Design principles
4. [Design Language & Visual Patterns](#design-language--visual-patterns) - Visual design reference
5. [Navigation & Search Updates](#navigation--search-updates) - Implementation reference
6. [Index Page Wayfinding Strategy](#index-page-wayfinding-strategy) - Homepage design reference
7. [Current State Assessment](#current-state-assessment) - Context
8. [Target Architecture Strategy](#target-architecture-strategy) - Target structure
9. [Migration & Implementation Guide](#migration--implementation-guide) - General guidance
10. [Content Strategy by Section](#content-strategy-by-section) - Content templates
11. [Quality Standards & Validation](#quality-standards--validation) - Quality reference

---

## Stripe Documentation IA Analysis

### 1. Hierarchical Structure

Stripe's documentation follows a clear, predictable hierarchy:

```
docs.stripe.com/
├── Getting Started (Entry Point)
│   ├── Quickstart guides
│   ├── Account setup
│   └── First API call
│
├── Guides (Task-Oriented)
│   ├── Payments
│   ├── Subscriptions
│   ├── Connect
│   └── Each guide = specific problem solved
│
├── API Reference (Complete & Exhaustive)
│   ├── Endpoints (organized by resource)
│   ├── Request/Response schemas
│   ├── Error codes
│   └── Code examples for every endpoint
│
├── Concepts (Deep Dives)
│   ├── Architecture explanations
│   ├── How things work internally
│   └── Advanced topics
│
└── Use Cases / Examples
    ├── Real-world scenarios
    ├── Code samples
    └── Integration patterns
```

### 2. Key Architectural Patterns

#### A. Progressive Disclosure
- **Entry Point**: Simple, outcome-focused (e.g., "Accept a payment")
- **Guides**: Step-by-step problem solving with context
- **API Reference**: Complete technical details
- **Concepts**: Deep technical understanding

#### B. Multiple Entry Points
- **By Role**: "I'm a developer" vs "I'm a business user"
- **By Task**: "I want to accept payments" vs "I want to manage subscriptions"
- **By Integration Type**: "I'm using React" vs "I'm using Python"

#### C. Consistent Navigation Structure
- **Left Sidebar**: Always visible, hierarchical
- **Breadcrumbs**: Clear path to current page
- **In-Page Navigation**: Table of contents for long pages
- **Cross-Linking**: Aggressive internal linking between related topics

#### D. Code-Centric Approach
- **Every API endpoint** has:
  - Request example (cURL, multiple languages)
  - Response example (complete JSON)
  - Error examples
  - Parameter descriptions
- **Guides include** copy-pastable code samples
- **Examples are complete** (not snippets requiring context)

#### E. Search-First Design
- **Global search** prominently placed
- **Search results** show context and hierarchy
- **Autocomplete** suggests relevant pages
- **Search works** across all content types

### 3. Content Organization Principles

#### Principle 1: Task-Oriented Guides
- Guides answer: "How do I [achieve specific outcome]?"
- Not: "What is [feature]?" (that's Concepts)
- Each guide = one complete task from start to finish

#### Principle 2: Reference Completeness
- API Reference is exhaustive and authoritative
- Every parameter documented
- Every error code explained
- Every response field described
- No gaps or "see code for details"

#### Principle 3: Persona-Specific Content
- **Beginners**: Getting Started, simple examples
- **Developers**: API Reference, code samples, technical concepts
- **Decision Makers**: Use cases, business value, ROI examples

#### Principle 4: Visual Hierarchy
- Clear headings (H1 → H2 → H3)
- Code blocks with syntax highlighting
- Diagrams for complex concepts
- Tables for structured data
- Callout boxes for important notes

### 4. Stripe's Navigation Patterns

#### Top-Level Categories
1. **Getting Started** - First-time user onboarding
2. **Guides** - How-to content for specific tasks
3. **API Reference** - Complete technical reference
4. **Concepts** - Deep technical explanations
5. **Changelog** - Version history and updates
6. **SDKs** - Language-specific libraries

#### Secondary Navigation
- Each top-level section has its own sub-navigation
- Sub-navigation shows hierarchy (parent → child)
- Active page highlighted
- Related pages suggested

### 5. Content Depth Strategy

Stripe uses a "pyramid" approach:

```
                    ┌─────────────────┐
                    │   Concepts      │  ← Deep technical understanding
                    │   (Advanced)    │
                    └─────────────────┘
                           ↑
                    ┌─────────────────┐
                    │  API Reference   │  ← Complete technical details
                    │   (Complete)    │
                    └─────────────────┘
                           ↑
                    ┌─────────────────┐
                    │     Guides      │  ← Task-oriented how-tos
                    │  (Contextual)   │
                    └─────────────────┘
                           ↑
                    ┌─────────────────┐
                    │ Getting Started │  ← Simple, outcome-focused
                    │   (Simple)      │
                    └─────────────────┘
```

**Key Insight**: Users start at the bottom (simple) and drill down as needed. Each layer provides more detail, but each layer is also independently useful.

---

## First Principles for Documentation IA

Based on the Stripe analysis and our platform's needs, here are the foundational principles:

### 1. User Journey First
**Principle**: Structure documentation around how users actually work, not how the product is built.

**Application**:
- Start with outcomes users want to achieve
- Organize by tasks, not by features
- Provide multiple paths to the same information
- Support both linear (tutorial) and non-linear (reference) usage

### 2. Progressive Disclosure
**Principle**: Present information in layers of increasing complexity, allowing users to access only what they need at each stage.

**Application**:
- `get-started.md`: Simple, copy-pastable examples only
- `/guides/`: Conceptual understanding + links to API reference
- `/api-reference/`: Complete technical details
- `/technical-concepts/`: Deep dives into how things work

**Enforcement Rules**:
- Getting Started: NO internal architecture explanations
- Guides: NO exhaustive parameter lists (link to API reference instead)
- API Reference: NO high-level business justifications
- Technical Concepts: NO basic tutorials

### 3. Completeness & Accuracy
**Principle**: Documentation must be complete, accurate, and up-to-date. Incomplete documentation is worse than no documentation.

**Application**:
- Every API endpoint fully documented
- Every code example tested and working
- Every link verified
- Every parameter explained
- Every error code documented

**Quality Gates**:
- No "TODO" or "Coming Soon" sections
- No broken links
- No outdated examples
- No missing parameters

### 4. Code-Centric Documentation
**Principle**: Code examples are the primary form of documentation. Text explains context; code shows implementation.

**Application**:
- Every API endpoint has request/response examples
- Every guide includes working code samples
- Code examples are complete (copy-paste ready)
- Multiple language examples where applicable
- Expected outputs shown

**Standards**:
- cURL examples for API calls
- Python examples for SDK usage
- Complete JSON responses (not truncated)
- Error examples included

### 5. Discoverability
**Principle**: Users should be able to find information quickly, even if they don't know exactly what they're looking for.

**Application**:
- Comprehensive search functionality
- Clear navigation hierarchy
- Aggressive cross-linking
- Multiple entry points
- Related content suggestions

**Implementation**:
- Search indexes all content
- Sidebar navigation shows full hierarchy
- In-page links to related topics
- Breadcrumbs show current location
- "See also" sections on relevant pages

### 6. Persona-Aware Content
**Principle**: Different users need different information presented in different ways.

**Application**:
- **Beginners**: Simple language, visual examples, step-by-step
- **Developers**: Technical details, code samples, API schemas
- **Decision Makers**: Business value, ROI, use cases, limitations

**Content Targeting**:
- `index.md` & `/use-cases/` → Decision Makers & Beginners
- `get-started.md` → Beginners
- `/guides/` → Beginners & Developers (accessible to both)
- `/api-reference/` → Developers
- `/technical-concepts/` → Developers (Advanced)

### 7. Consistency
**Principle**: Consistent structure, formatting, and terminology across all documentation.

**Application**:
- Standard page templates
- Consistent heading hierarchy
- Standardized code block formats
- Consistent terminology (glossary)
- Standardized link patterns

**Standards**:
- Every page has: Title, Overview, Main Content, Next Steps
- Code blocks: Language specified, syntax highlighted
- Links: Relative paths, descriptive anchor text
- Terminology: Use platform glossary consistently

---

## Design Language & Visual Patterns

### Overview

Stripe's documentation excels not just in information architecture, but in **visual design patterns** that make content more engaging, scannable, and readable. This section documents the key visual patterns and how to implement them in our documentation.

### CSS Foundation

**CRITICAL**: All CSS additions must build from `~/Workbench/website/dist/includes/common.css`

**What `common.css` Provides**:
- ✅ Color variables (`--primary-blue`, `--accent-blue`, `--text-dark`, etc.)
- ✅ Typography system (DM Sans font family)
- ✅ Base spacing and container utilities
- ✅ Support button styles (`.support-button`)
- ✅ Form input styles
- ✅ Responsive breakpoints

**How to Use**:
1. **Import `common.css` first** in your HTML/layout:
   ```html
   <link rel="stylesheet" href="/path/to/common.css">
   ```

2. **Use CSS variables** from `common.css` instead of hardcoding colors:
   ```css
   /* ✅ Good - uses variable */
   .my-card {
     background: var(--white);
     border-color: var(--primary-blue);
   }
   
   /* ❌ Bad - hardcoded color */
   .my-card {
     background: #FFFFFF;
     border-color: #455BF1;
   }
   ```

3. **Add component CSS** from this guide after `common.css`:
   ```html
   <link rel="stylesheet" href="/path/to/common.css">
   <link rel="stylesheet" href="/path/to/docs-components.css">
   ```

4. **Follow spacing conventions** from `common.css`:
   - Card padding: `24px`
   - Section margin: `32px`
   - Container padding: `40px` (desktop), `20px` (mobile)

### Design Principles

1. **Visual Hierarchy**: Use cards, spacing, and typography to guide the eye
2. **Scannability**: Break up dense text with visual elements
3. **Consistency**: Reuse the same patterns across all pages
4. **Responsiveness**: All patterns work on mobile, tablet, and desktop
5. **Accessibility**: Maintain contrast ratios and semantic HTML
6. **CSS Variables**: Always use variables from `common.css` for colors and spacing

---

### 1. Card Layouts

Cards are Stripe's primary visual pattern for grouping related content and creating visual hierarchy.

**CSS Foundation**: Start with `~/Workbench/website/dist/includes/common.css` which provides:
- Color variables (`--primary-blue`, `--accent-blue`, `--text-dark`, etc.)
- Base typography (DM Sans font family)
- Container and spacing utilities
- Support button styles (`.support-button`)

#### A. Product/Feature Cards (Grid Layout)

**Use Case**: Showcasing multiple products, features, or options side-by-side

**Stripe Pattern**: Grid of cards with icons, titles, descriptions, and CTAs

**Implementation**:
```html
<div class="product-cards">
  <div class="product-card">
    <img src="/path/to/icon.svg" alt="Product Name">
    <h3>Product Name</h3>
    <p>Brief description of what this product does and why it's useful.</p>
    <div class="card-tags">
      <span class="tag">Feature 1</span>
      <span class="tag">Feature 2</span>
    </div>
    <a href="/path/to/product" class="card-cta">Learn More</a>
  </div>
  <!-- Repeat for other products -->
</div>
```

**CSS to Add** (builds on `common.css`):
```css
/* Product Cards Grid */
.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.product-card {
  background: var(--white);
  border: 2px solid var(--border-grey);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
}

.product-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-card img {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  display: block;
}

.product-card h3 {
  margin-bottom: 12px;
  color: var(--text-dark);
  font-size: 1.25rem;
}

.product-card p {
  color: var(--text-light);
  margin-bottom: 16px;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 16px 0;
}

.tag {
  background: #f0f4ff;
  color: var(--primary-blue);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.card-cta {
  display: inline-block;
  padding: 10px 20px;
  background: var(--primary-blue);
  color: var(--white) !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-top: auto;
  text-align: center;
}

.card-cta:hover {
  background: var(--accent-blue);
  transform: translateY(-1px);
  color: var(--white) !important;
}
```

**CSS Classes**:
- `.product-cards` - Grid container
- `.product-card` - Individual card
- `.card-tags` - Tag container
- `.tag` - Individual tag badge
- `.card-cta` - Call-to-action button

**When to Use**:
- Product overview pages
- Feature comparisons
- Integration options
- SDK/language selection

**Best Practices**:
- Keep cards equal height (use flexbox)
- Limit to 3-4 cards per row on desktop
- Use consistent card structure across all cards
- Include visual elements (icons, images) when possible
- Make cards clickable/hoverable for better UX

#### B. Journey/Path Cards

**Use Case**: Guiding users through different paths based on their role or goal

**Stripe Pattern**: Cards that represent different user journeys or learning paths

**Implementation**:
```html
<div class="user-journey-cards">
  <div class="journey-card">
    <div class="card-icon">🚀</div>
    <h3>Quick Start</h3>
    <p>Get up and running in 5 minutes</p>
    <ul class="card-features">
      <li>Step-by-step tutorial</li>
      <li>Copy-paste code examples</li>
      <li>Expected outputs shown</li>
    </ul>
    <a href="/get-started" class="card-cta">Start Here</a>
  </div>
  <!-- Repeat for other paths -->
</div>
```

**CSS to Add** (builds on `common.css`):
```css
.user-journey-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.journey-card {
  background: var(--white);
  border: 2px solid var(--border-grey);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.journey-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.journey-card .card-icon {
  font-size: 48px;
  margin-bottom: 16px;
  text-align: center;
}

.journey-card h3 {
  margin-bottom: 12px;
  color: var(--text-dark);
}

.journey-card p {
  color: var(--text-light);
  margin-bottom: 16px;
}

.card-features {
  list-style: none;
  margin: 16px 0;
  padding: 0;
}

.card-features li {
  padding: 4px 0;
  color: var(--text-light);
  position: relative;
  padding-left: 20px;
}

.card-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary-blue);
  font-weight: bold;
}
```

**CSS Classes**:
- `.user-journey-cards` - Grid container
- `.journey-card` - Individual journey card
- `.card-icon` - Icon/emoji at top
- `.card-features` - Feature list
- `.card-cta` - Call-to-action (reuse from product cards)

**When to Use**:
- Landing pages
- "Choose your path" sections
- Role-based navigation
- Getting started options

#### C. Use Case Cards

**Use Case**: Showcasing real-world applications and case studies

**Stripe Pattern**: Cards with industry tags, metrics, and outcomes

**Implementation**:
```html
<div class="use-case-cards">
  <div class="use-case-card">
    <div class="card-header">
      <h3>Customer Name</h3>
      <span class="industry-tag">Energy Trading</span>
    </div>
    <p>Brief description of the challenge and solution.</p>
    <div class="card-benefits">
      <div class="benefit">
        <span class="icon">✓</span>
        <span>96% faster fault detection</span>
      </div>
      <div class="benefit">
        <span class="icon">✓</span>
        <span>70% penalty reduction</span>
      </div>
    </div>
    <a href="/use-cases/customer-name" class="card-cta">Read Case Study</a>
  </div>
</div>
```

**CSS Classes**:
- `.use-case-cards` - Grid container
- `.use-case-card` - Individual case study card
- `.card-header` - Header with title and tag
- `.industry-tag` - Industry badge
- `.card-benefits` - Benefits/metrics list
- `.benefit` - Individual benefit item

**When to Use**:
- Use cases overview pages
- Case study listings
- Customer success stories
- Industry-specific examples

---

### 2. Code Embeds & Syntax Highlighting

Code examples are central to Stripe's documentation. They use terminal-style code blocks with syntax highlighting.

#### A. Terminal-Style Code Blocks

**Use Case**: Shell commands, API calls, terminal output

**Stripe Pattern**: Dark terminal background with colored syntax highlighting

**Implementation**:
```markdown
```bash
curl -X POST https://api.example.com/v1/endpoint \
  -H "Authorization: Bearer TOKEN" \
  -d '{"param": "value"}'
```
```

**CSS to Add** (builds on `common.css`):
```css
/* Code Block Styling */
pre {
  background-color: #2E3436;
  color: #B5BBAE;
  padding: 20px;
  border: 2px solid #555753;
  border-radius: 6px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Ubuntu Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
  position: relative;
}

/* Terminal-like header bar */
pre::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    #AE5E5E 0%,
    #8A7000 33%,
    #4E9A06 66%,
    #3465A4 100%
  );
  border-radius: 4px 4px 0 0;
}

pre code {
  background-color: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  display: block;
  overflow-x: auto;
  line-height: 1.5;
  color: inherit;
  font-size: inherit;
}

/* Inline code */
code {
  background-color: #2E3436;
  color: #B5BBAE;
  padding: 0.2em 0.6em;
  border: 1px solid #555753;
  border-radius: 2px;
  font-family: 'Ubuntu Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

pre code {
  background-color: transparent;
  padding: 0;
  border: none;
  box-shadow: none;
}
```

**CSS Classes**:
- `pre` - Code block container
- `pre code` - Code content
- `pre.terminal` - Terminal-style block (with header)
- Language classes (`.bash`, `.python`, `.json`, etc.) - handled by syntax highlighter

**Best Practices**:
- Always specify language for syntax highlighting
- Use `bash` for shell commands
- Use `json` for API request/response examples
- Use `python` for Python SDK examples
- Keep lines under 80 characters when possible
- Use `\` for line continuation in shell commands

#### B. Inline Code

**Use Case**: Variable names, function names, API endpoints in prose

**Implementation**:
```markdown
Use the `create_response()` function to format API responses.
```

**Styling**: Already implemented with dark background and monospace font

#### C. Code with Expected Output

**Use Case**: Showing both the command and its output

**Stripe Pattern**: Separate blocks for input and output, or combined with clear separation

**Implementation**:
```markdown
### Request
```bash
curl -X POST https://api.example.com/v1/forecast \
  -F "file=@data.csv"
```

### Response
```json
{
  "status": "success",
  "forecast": {...}
}
```
```

**Best Practices**:
- Always show expected output
- Use appropriate language tags
- Include error examples when relevant
- Show complete JSON (not truncated)

---

### 3. Two-Column Layouts

Two-column layouts break up dense text and create visual interest.

#### A. Text + Image Layout

**Use Case**: Explaining concepts with supporting visuals

**Stripe Pattern**: Text on left, image/diagram on right (or vice versa)

**Implementation**:
```html
<div class="two-column-layout">
  <div class="column-text">
    <h3>How It Works</h3>
    <p>Explanation text goes here...</p>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
  <div class="column-image">
    <img src="/path/to/diagram.png" alt="Architecture diagram">
  </div>
</div>
```

**CSS to Add** (builds on `common.css`):
```css
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin: 32px 0;
  align-items: center;
}

.column-text {
  color: var(--text-dark);
}

.column-text h3 {
  color: var(--text-dark);
  margin-bottom: 16px;
}

.column-text p {
  color: var(--text-light);
  margin-bottom: 12px;
}

.column-image {
  text-align: center;
}

.column-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

**When to Use**:
- Architecture explanations
- Feature demonstrations
- Step-by-step guides with screenshots
- Concept explanations with diagrams

**Best Practices**:
- Alternate left/right alignment for visual interest
- Ensure images are high quality and relevant
- Use alt text for accessibility
- Make layouts responsive (stack on mobile)

#### B. Side-by-Side Comparison

**Use Case**: Comparing options, before/after, or different approaches

**Stripe Pattern**: Two columns with clear labels

**Implementation**:
```html
<div class="comparison-layout">
  <div class="comparison-column">
    <h4>Option A</h4>
    <p>Description of option A</p>
    <ul class="comparison-features">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
  <div class="comparison-column">
    <h4>Option B</h4>
    <p>Description of option B</p>
    <ul class="comparison-features">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
</div>
```

**CSS to Add** (builds on `common.css`):
```css
.comparison-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 32px 0;
}

.comparison-column {
  padding: 24px;
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  background: var(--white);
}

.comparison-column h4 {
  margin-top: 0;
  color: var(--primary-blue);
  font-weight: 700;
}

.comparison-column p {
  color: var(--text-light);
  margin-bottom: 12px;
}

.comparison-features {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.comparison-features li {
  padding: 8px 0;
  color: var(--text-dark);
  border-bottom: 1px solid var(--neutral-grey);
}

.comparison-features li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .comparison-layout {
    grid-template-columns: 1fr;
  }
}
```

#### C. End-of-Page Two-Column (Support + Newsletter)

**Use Case**: Footer sections with support CTA and newsletter signup

**Current Implementation**: Already exists as `.page-end-section`

**Implementation**:
```html
<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Need Help?</h3>
      <p>Contact our support team</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
    </div>
  </div>
  <div class="end-column">
    <!-- Newsletter signup form -->
  </div>
</div>
```

**CSS Classes** (already implemented):
- `.page-end-section` - Flex container
- `.end-column` - Individual column
- `.support-cta` - Support callout box
- `.support-button` - CTA button

---

### 4. Callout Boxes

Callout boxes draw attention to important information.

#### A. Info Callouts

**Use Case**: Additional context, tips, or helpful information

**Stripe Pattern**: Light blue background with icon

**Implementation**:
```html
<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <strong>Tip:</strong> You can also use the Python SDK for this operation.
  </div>
</div>
```

**CSS to Add** (builds on `common.css`):
```css
.callout {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  margin: 24px 0;
  border-left: 4px solid;
}

.callout-info {
  background: #f0f4ff;
  border-left-color: var(--primary-blue);
}

.callout-warning {
  background: #fff8e1;
  border-left-color: var(--warning-orange);
}

.callout-error {
  background: #ffebee;
  border-left-color: #e74c3c;
}

.callout-success {
  background: #e8f5e9;
  border-left-color: var(--success-green);
}

.callout-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.callout-content {
  flex: 1;
  color: var(--text-dark);
}

.callout-content strong {
  font-weight: 600;
  color: var(--text-dark);
}
```

**Types**:
- **Info** (blue): General information, tips
- **Warning** (orange): Important notices, limitations
- **Error** (red): Common mistakes, errors to avoid
- **Success** (green): Best practices, recommendations

#### B. Note Boxes

**Use Case**: Important notes that shouldn't be missed

**Implementation**:
```html
<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <strong>Note:</strong> This feature requires API version 2.0 or higher.
  </div>
</div>
```

---

### 5. Tables

Tables are essential for API reference and parameter documentation.

#### Current Implementation

Tables are already styled in `styles.css` with:
- Alternating row colors
- Hover effects
- Responsive design
- Clean borders

**Best Practices**:
- Use tables for structured data (parameters, responses, comparisons)
- Keep tables narrow (don't force full width)
- Use clear headers
- Include units/types in descriptions
- Make tables responsive (horizontal scroll on mobile)

**Example**:
```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | CSV file with historical data |
| `email` | string | Yes | Your email address |
| `site_name` | string | No | Name for your site |
```

---

### 6. Visual Hierarchy Patterns

#### A. Section Dividers

**Use Case**: Separating major sections

**Implementation**:
```markdown
---

## Next Section
```

**Styling**: Already implemented with horizontal rule styling

#### B. Step Numbers

**Use Case**: Numbered steps in tutorials

**Stripe Pattern**: Large, prominent step numbers

**Implementation**:
```html
<div class="step-container">
  <div class="step-number">1</div>
  <div class="step-content">
    <h3>Prepare Your Data</h3>
    <p>Description of step 1...</p>
  </div>
</div>
```

**CSS to Add** (builds on `common.css`):
```css
.step-container {
  display: flex;
  gap: 20px;
  margin: 32px 0;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--primary-blue);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  color: var(--text-dark);
  margin-bottom: 12px;
}

.step-content p {
  color: var(--text-light);
  margin-bottom: 8px;
}
```

#### C. Badges & Tags

**Use Case**: Status indicators, categories, labels

**Current Implementation**: `.tag` class exists for product cards

**Usage**:
```html
<span class="tag">New</span>
<span class="tag">Beta</span>
<span class="tag">Deprecated</span>
```

---

### 7. Responsive Design Patterns

All visual patterns must work across devices.

#### Breakpoints

**Current Breakpoints** (from `styles.css`):
- Mobile: `max-width: 768px`
- Tablet: `768px - 1024px`
- Desktop: `1024px+`

#### Responsive Patterns

1. **Grids**: Switch from multi-column to single column
2. **Two-column layouts**: Stack vertically on mobile
3. **Cards**: Full width on mobile, grid on desktop
4. **Tables**: Horizontal scroll on mobile
5. **Images**: Scale to fit container

**Example**:
```css
@media (max-width: 768px) {
  .product-cards {
    grid-template-columns: 1fr;
  }
  
  .two-column-layout {
    grid-template-columns: 1fr;
  }
}
```

---

### 8. Component Library Reference

#### CSS Foundation

**Start with**: `~/Workbench/website/dist/includes/common.css`

**What's Already Available**:
- ✅ Color variables (primary, accent, text, status colors)
- ✅ Typography (DM Sans font family)
- ✅ Container and spacing utilities (`.container`, `.section`)
- ✅ Support buttons (`.support-button`, `.support-button.primary`, `.support-button.secondary`)
- ✅ Form styles (`.form-group`, `.form-group input`, `.subscribe-button`)
- ✅ Footer styles (`.footer-content`, `.copyright-footer`)
- ✅ Responsive breakpoints (`@media (max-width: 768px)`)

#### Components Available in Current Docs

✅ **Product Cards** - `.product-cards`, `.product-card` (needs CSS from guide)  
✅ **Journey Cards** - `.user-journey-cards`, `.journey-card` (needs CSS from guide)  
✅ **Use Case Cards** - `.use-case-cards`, `.use-case-card` (needs CSS from guide)  
✅ **Path Cards** - `.quickstart-paths`, `.path-card` (needs CSS from guide)  
✅ **Support CTA** - `.support-cta`, `.support-button` (from `common.css`)  
✅ **Two-Column Footer** - `.page-end-section`, `.end-column` (needs CSS from guide)  

#### Components to Add (CSS Provided in This Guide)

❌ **Callout Boxes** - `.callout`, `.callout-info`, `.callout-warning`, `.callout-error`, `.callout-success`  
❌ **Two-Column Text/Image** - `.two-column-layout`, `.column-text`, `.column-image`  
❌ **Comparison Layout** - `.comparison-layout`, `.comparison-column`  
❌ **Step Numbers** - `.step-container`, `.step-number`, `.step-content`  
❌ **Code Blocks** - Terminal-style `pre`, `code` styling  
❌ **Tables** - Enhanced table styling (if not already present)  
❌ **Badge Variants** - Status badges (new, beta, deprecated)  

---

### 9. Design System Tokens

#### Colors (From `common.css`)

**Primary Colors**:
```css
--primary-black: #000000;
--primary-blue: #455BF1;
--accent-blue: #3748c8;
--white: #FFFFFF;
```

**Text Colors**:
```css
--text-dark: #333;
--text-light: #4D4D4D;
```

**Background Colors**:
```css
--background-light: #f5f5f5;
--neutral-light: #F9F9F9;
--neutral-grey: #F4F4F4;
--border-grey: #E0E0E0;
```

**Status Colors**:
```css
--success-green: #28ca42;
--warning-orange: #f39c12;
```

**Note**: All CSS additions should use these variables from `common.css` for consistency.

#### Typography

- **Font Family**: DM Sans (already implemented)
- **Headings**: Bold (700)
- **Body**: Regular (400)
- **Emphasis**: Medium (500)

#### Spacing

- **Card Padding**: 24px
- **Card Gap**: 24px
- **Section Margin**: 32px
- **Content Padding**: 40px

#### Border Radius

- **Cards**: 12px
- **Buttons**: 6-8px
- **Tags**: 16px (pill shape)
- **Images**: 8px

---

### 10. Implementation Checklist

When creating new pages, ensure:

**CSS Setup**:
- [ ] Start with `~/Workbench/website/dist/includes/common.css` as foundation
- [ ] Add component CSS from this guide (cards, callouts, layouts)
- [ ] Use CSS variables from `common.css` (don't hardcode colors)
- [ ] Test that new CSS doesn't conflict with existing styles

**Visual Patterns**:
- [ ] Use card layouts for multiple items
- [ ] Include code examples with syntax highlighting
- [ ] Use two-column layouts for text+image content
- [ ] Add callout boxes for important notes
- [ ] Use tables for structured data
- [ ] Maintain consistent spacing (24px, 32px from `common.css`)

**Quality**:
- [ ] Test responsive design on mobile (breakpoint: 768px)
- [ ] Use semantic HTML
- [ ] Include alt text for images
- [ ] Follow color contrast guidelines
- [ ] Verify CSS uses variables from `common.css`

---

### 11. Stripe-Specific Patterns to Emulate

#### A. Interactive Code Examples

**Stripe Pattern**: Code examples with "Try it" buttons or copy buttons

**Future Enhancement**: Add copy-to-clipboard buttons to code blocks

#### B. Tabbed Content

**Stripe Pattern**: Tabs for different languages/frameworks

**Example**: "cURL | Python | Node.js" tabs above code examples

**Future Enhancement**: Implement tabbed code examples

#### C. Expandable Sections

**Stripe Pattern**: Collapsible sections for advanced topics

**Implementation**: Could use `<details>` HTML element

#### D. Visual Flow Diagrams

**Stripe Pattern**: Step-by-step visual flows with arrows

**Current**: Mermaid diagrams supported

**Best Practice**: Use Mermaid for architecture diagrams, flowcharts

---

### 12. Examples from Current Documentation

#### Good Examples

✅ **Product Cards** (`products/index.md`) - Clean grid layout  
✅ **Code Blocks** (`get-started.md`) - Terminal styling with syntax highlighting  
✅ **Two-Column Footer** (`products/index.md`) - Support + Newsletter  

#### Areas for Improvement

❌ **Guides Pages** - Could use more visual elements (cards, diagrams)  
❌ **API Reference** - Could use tabbed code examples  
❌ **Technical Concepts** - Could use more diagrams and visual explanations  

---

## Navigation & Search Updates

### Overview

Updating the left-hand navigation and search functionality is **critical** for the new information architecture. This section provides specific implementation guidance for both.

### Current State

**Navigation** (`_layouts/default.html`):
- Hardcoded HTML structure in layout file
- Manual toggle icons for expand/collapse
- Current structure doesn't match new IA
- No automatic generation from file structure

**Search** (`assets/js/search.js`):
- Hardcoded `searchData` array
- Manual entry for each page
- Doesn't reflect new nested structure
- No automatic indexing from file system

### Target State

**Navigation**:
- Reflects new hierarchical structure (Getting Started → Guides → API Reference → Concepts → Use Cases)
- Auto-expands current section
- Shows active page highlighting
- Responsive (collapsible on mobile)

**Search**:
- Indexes all markdown files automatically
- Shows hierarchy in results (e.g., "Guides > Forecasting > Generating Forecasts")
- Searches content, not just titles
- Fast, client-side search

---

### 1. Navigation Structure Update

#### A. New Navigation Structure

The navigation should reflect the new IA:

```
├── Home
├── Getting Started
├── Guides
│   ├── Overview
│   ├── Forecasting
│   │   ├── Overview
│   │   ├── Generating Forecasts
│   │   ├── Interpreting Results
│   │   └── Improving Accuracy
│   ├── Data Management
│   │   ├── Overview
│   │   ├── Preparing Data
│   │   ├── Uploading Data
│   │   └── Data Quality
│   ├── Integrations
│   │   ├── Overview
│   │   ├── SCADA Systems
│   │   └── Huawei FusionSolar
│   ├── Portfolio Management
│   │   ├── Overview
│   │   ├── Multi-Site Setup
│   │   └── Reporting
│   └── Troubleshooting
│       ├── Overview
│       └── Common Issues
├── API Reference
│   ├── Overview
│   ├── Authentication
│   ├── Forecasting
│   │   ├── Overview
│   │   ├── Freemium Forecast
│   │   └── Advanced Forecast
│   ├── Data
│   │   ├── Overview
│   │   ├── Upload Historical
│   │   └── Upload Realtime
│   └── Terminal
│       └── Overview
├── Technical Concepts
│   ├── Overview
│   ├── Architecture
│   │   ├── Overview
│   │   ├── System Architecture
│   │   └── Data Flow
│   └── Machine Learning
│       ├── Overview
│       └── Forecasting Models
├── Use Cases
│   ├── Overview
│   ├── Sibaya Casino
│   ├── Cummins Portfolio
│   └── Avaron Infrastructure
└── Products
    ├── Overview
    ├── Terminal
    ├── Analyst
    └── Distributed Compute
```

#### B. Implementation Options

**Option 1: Jekyll Navigation (Recommended)**

Use Jekyll's navigation features with `_config.yml`:

```yaml
# _config.yml
navigation:
  - title: Home
    url: /
  - title: Getting Started
    url: /get-started
  - title: Guides
    children:
      - title: Overview
        url: /guides/overview
      - title: Forecasting
        children:
          - title: Overview
            url: /guides/forecasting/overview
          - title: Generating Forecasts
            url: /guides/forecasting/generating-forecasts
      - title: Data Management
        children:
          - title: Overview
            url: /guides/data-management/overview
  - title: API Reference
    children:
      - title: Overview
        url: /api-reference/overview
      - title: Authentication
        url: /api-reference/authentication
      - title: Forecasting
        children:
          - title: Overview
            url: /api-reference/forecasting/overview
          - title: Freemium Forecast
            url: /api-reference/forecasting/freemium-forecast
  # ... continue for all sections
```

**Option 2: Auto-Generated from File Structure**

Create a Jekyll plugin or script to auto-generate navigation:

```ruby
# _plugins/navigation_generator.rb
module Jekyll
  class NavigationGenerator < Generator
    def generate(site)
      # Scan file structure and generate navigation
      # Output to site.data['navigation']
    end
  end
end
```

**Option 3: Manual HTML (Current Approach)**

Update `_layouts/default.html` manually with new structure.

#### C. Navigation HTML Template

**Updated HTML Structure** (for `_layouts/default.html`):

```html
<div class="sidebar">
  <nav class="side-nav">
    <ul class="nav-list">
      <!-- Home -->
      <li class="nav-item">
        <div class="nav-header">
          <a href="{{ site.baseurl }}/">Home</a>
        </div>
      </li>
      
      <!-- Getting Started -->
      <li class="nav-item">
        <div class="nav-header">
          <a href="{{ site.baseurl }}/get-started">Getting Started</a>
        </div>
      </li>
      
      <!-- Guides -->
      <li class="nav-item">
        <div class="nav-header">
          <a href="{{ site.baseurl }}/guides/overview">Guides</a>
          <span class="toggle-icon">+</span>
        </div>
        <ul class="sub-menu">
          <li><a href="{{ site.baseurl }}/guides/overview">Overview</a></li>
          
          <!-- Forecasting Subsection -->
          <li class="nav-subsection">
            <div class="sub-nav-header">
              <a href="{{ site.baseurl }}/guides/forecasting/overview">Forecasting</a>
              <span class="sub-toggle-icon">+</span>
            </div>
            <ul class="sub-sub-menu">
              <li><a href="{{ site.baseurl }}/guides/forecasting/overview">Overview</a></li>
              <li><a href="{{ site.baseurl }}/guides/forecasting/generating-forecasts">Generating Forecasts</a></li>
              <li><a href="{{ site.baseurl }}/guides/forecasting/interpreting-results">Interpreting Results</a></li>
              <li><a href="{{ site.baseurl }}/guides/forecasting/improving-accuracy">Improving Accuracy</a></li>
            </ul>
          </li>
          
          <!-- Data Management Subsection -->
          <li class="nav-subsection">
            <div class="sub-nav-header">
              <a href="{{ site.baseurl }}/guides/data-management/overview">Data Management</a>
              <span class="sub-toggle-icon">+</span>
            </div>
            <ul class="sub-sub-menu">
              <li><a href="{{ site.baseurl }}/guides/data-management/overview">Overview</a></li>
              <li><a href="{{ site.baseurl }}/guides/data-management/preparing-data">Preparing Data</a></li>
              <li><a href="{{ site.baseurl }}/guides/data-management/uploading-data">Uploading Data</a></li>
              <li><a href="{{ site.baseurl }}/guides/data-management/data-quality">Data Quality</a></li>
            </ul>
          </li>
          
          <!-- Continue for other guide subsections -->
        </ul>
      </li>
      
      <!-- API Reference -->
      <li class="nav-item">
        <div class="nav-header">
          <a href="{{ site.baseurl }}/api-reference/overview">API Reference</a>
          <span class="toggle-icon">+</span>
        </div>
        <ul class="sub-menu">
          <!-- Similar nested structure -->
        </ul>
      </li>
      
      <!-- Continue for other top-level sections -->
    </ul>
  </nav>
</div>
```

#### D. Navigation CSS (builds on `common.css`)

**CSS to Add**:

```css
/* Sidebar Navigation */
.sidebar {
  height: calc(100vh - 70px);
  width: 280px;
  position: fixed;
  z-index: 1;
  top: 70px;
  left: 0;
  background-color: var(--white);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 30px 0 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-right: 1px solid var(--border-grey);
}

.side-nav a {
  color: var(--text-dark);
  text-decoration: none;
  display: block;
  padding: 8px 20px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.side-nav a:hover {
  color: var(--primary-blue);
  background-color: var(--neutral-light);
}

.side-nav a.active {
  color: var(--primary-blue);
  font-weight: 600;
  background-color: #f0f4ff;
  border-left: 3px solid var(--primary-blue);
}

.nav-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 15px;
}

.nav-header a {
  flex: 1;
  padding: 0;
}

.toggle-icon,
.sub-toggle-icon {
  font-size: 14px;
  color: var(--text-light);
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
}

.toggle-icon.active,
.sub-toggle-icon.active {
  transform: rotate(45deg);
}

.sub-menu {
  display: none;
  padding-left: 0;
  margin-top: 4px;
  list-style: none;
}

.sub-menu.active {
  display: block;
}

.sub-menu li {
  margin-bottom: 2px;
}

.sub-menu a {
  padding-left: 40px;
  font-size: 13px;
  font-weight: 400;
}

.nav-subsection {
  margin-top: 8px;
}

.sub-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px 6px 40px;
  font-weight: 500;
  font-size: 14px;
}

.sub-nav-header a {
  padding: 0;
}

.sub-sub-menu {
  display: none;
  padding-left: 0;
  margin-top: 4px;
  list-style: none;
}

.sub-sub-menu.active {
  display: block;
}

.sub-sub-menu li {
  margin-bottom: 2px;
}

.sub-sub-menu a {
  padding-left: 60px;
  font-size: 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: 70px;
    max-height: 300px;
    overflow-y: auto;
  }
}
```

#### E. Navigation JavaScript

**Auto-expand current section**:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  
  // Find and expand current section
  document.querySelectorAll('.nav-header a, .sub-nav-header a').forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href.split('#')[0]) || currentPath === href) {
      // Mark as active
      link.classList.add('active');
      
      // Expand parent menus
      let parent = link.closest('.nav-item, .nav-subsection');
      while (parent) {
        const subMenu = parent.querySelector('.sub-menu, .sub-sub-menu');
        const toggleIcon = parent.querySelector('.toggle-icon, .sub-toggle-icon');
        
        if (subMenu) {
          subMenu.classList.add('active');
          subMenu.style.display = 'block';
        }
        
        if (toggleIcon) {
          toggleIcon.classList.add('active');
          toggleIcon.textContent = '−';
        }
        
        parent = parent.parentElement.closest('.nav-item, .nav-subsection');
      }
    }
  });
  
  // Handle toggle clicks
  document.querySelectorAll('.toggle-icon, .sub-toggle-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const subMenu = this.parentElement.nextElementSibling || 
                      this.parentElement.parentElement.querySelector('.sub-menu, .sub-sub-menu');
      
      if (subMenu) {
        const isActive = subMenu.classList.contains('active');
        subMenu.classList.toggle('active');
        subMenu.style.display = isActive ? 'none' : 'block';
        this.classList.toggle('active');
        this.textContent = isActive ? '+' : '−';
      }
    });
  });
});
```

---

### 2. Search Functionality Update

#### A. Current Search Implementation

**Current** (`assets/js/search.js`):
- Hardcoded `searchData` array
- Manual entry for each page
- Simple text matching
- No hierarchy in results

#### B. Target Search Implementation

**Requirements**:
1. **Auto-index** all markdown files
2. **Show hierarchy** in results (e.g., "Guides > Forecasting > Generating Forecasts")
3. **Search content**, not just titles
4. **Fast client-side** search
5. **Highlight matches** in results

#### C. Implementation Options

**Option 1: Jekyll Search Index (Recommended)**

Generate search index during Jekyll build:

```yaml
# _config.yml
search:
  enabled: true
  index_file: search-index.json
```

**Plugin to generate index** (`_plugins/search_index_generator.rb`):

```ruby
module Jekyll
  class SearchIndexGenerator < Generator
    def generate(site)
      index = []
      
      site.pages.each do |page|
        next unless page.ext == '.md' || page.ext == '.html'
        
        # Extract content
        content = page.content.gsub(/<[^>]*>/, '') # Remove HTML
        content = content.gsub(/\[([^\]]+)\]\([^\)]+\)/, '\1') # Remove markdown links
        
        # Build hierarchy
        path_parts = page.url.split('/').reject(&:empty?)
        hierarchy = path_parts[0..-2].join(' > ') if path_parts.length > 1
        
        index << {
          'title' => page.data['title'] || page.name,
          'url' => page.url,
          'content' => content[0..500], # First 500 chars
          'hierarchy' => hierarchy,
          'section' => path_parts[0] || 'Home'
        }
      end
      
      # Write to JSON file
      File.write('search-index.json', index.to_json)
    end
  end
end
```

**Option 2: Client-Side Markdown Parsing**

Parse markdown files client-side (slower, but no build step):

```javascript
// assets/js/search.js
async function loadSearchIndex() {
  const response = await fetch('/search-index.json');
  return await response.json();
}

async function initializeSearch() {
  const searchData = await loadSearchIndex();
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }
    
    const results = searchData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const contentMatch = item.content.toLowerCase().includes(query);
      return titleMatch || contentMatch;
    }).slice(0, 10); // Limit to 10 results
    
    displayResults(results, query);
  });
}

function displayResults(results, query) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>';
    searchResults.style.display = 'block';
    return;
  }
  
  const html = results.map(item => {
    const titleHighlight = highlightMatch(item.title, query);
    const hierarchy = item.hierarchy ? `<span class="search-hierarchy">${item.hierarchy}</span>` : '';
    const preview = highlightMatch(item.content.substring(0, 150), query);
    
    return `
      <div class="search-result-item">
        <a href="${item.url}">
          <div class="search-result-title">${titleHighlight}</div>
          ${hierarchy}
          <div class="search-result-preview">${preview}...</div>
        </a>
      </div>
    `;
  }).join('');
  
  searchResults.innerHTML = html;
  searchResults.style.display = 'block';
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
```

#### D. Search CSS (builds on `common.css`)

**CSS to Add**:

```css
/* Search Container */
.search-container-top {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  max-width: 90%;
  margin-top: -15px;
}

.search-container-top input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;
}

.search-container-top input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(69, 91, 241, 0.1);
}

/* Search Results */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--white);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border-radius: 8px;
  border: 1px solid var(--border-grey);
  z-index: 1000;
  max-height: 500px;
  overflow-y: auto;
  display: none;
  margin-top: 8px;
}

.search-result-item {
  border-bottom: 1px solid var(--neutral-grey);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item a {
  display: block;
  padding: 16px 20px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.search-result-item a:hover {
  background-color: var(--neutral-light);
}

.search-result-title {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
  font-size: 15px;
}

.search-result-title mark {
  background-color: #fff8e1;
  color: var(--text-dark);
  padding: 2px 4px;
  border-radius: 3px;
}

.search-hierarchy {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 8px;
  font-weight: 400;
}

.search-result-preview {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.5;
}

.search-result-preview mark {
  background-color: #fff8e1;
  color: var(--text-dark);
  padding: 1px 2px;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: var(--text-light);
}
```

#### E. Search Implementation Checklist

- [ ] Generate search index during Jekyll build
- [ ] Update `search.js` to load and use index
- [ ] Add hierarchy display in results
- [ ] Add content preview in results
- [ ] Add match highlighting
- [ ] Test search across all content types
- [ ] Ensure search works on mobile
- [ ] Add keyboard navigation (arrow keys, enter)

---

### 3. Integration with New IA

#### Navigation Updates Required

1. **Update `_layouts/default.html`**:
   - Replace hardcoded navigation with new structure
   - Add support for 3-level nesting (section > subsection > page)
   - Update toggle functionality for nested menus

2. **Update `_config.yml`** (if using Jekyll navigation):
   - Define navigation structure
   - Set up navigation data

3. **Update CSS**:
   - Add navigation styles (builds on `common.css`)
   - Ensure responsive behavior
   - Add active state styling

#### Search Updates Required

1. **Create search index generator**:
   - Jekyll plugin to scan all markdown files
   - Generate JSON index with hierarchy
   - Include content previews

2. **Update `search.js`**:
   - Load search index
   - Implement hierarchy-aware search
   - Add result highlighting
   - Improve UX (keyboard nav, etc.)

3. **Update search CSS**:
   - Style hierarchy display
   - Style result previews
   - Style match highlighting

---

### 4. Testing Checklist

**Navigation**:
- [ ] All pages accessible from navigation
- [ ] Current page highlighted correctly
- [ ] Parent sections auto-expand
- [ ] Toggle functionality works
- [ ] Mobile navigation works
- [ ] No broken links

**Search**:
- [ ] All pages indexed
- [ ] Search finds content (not just titles)
- [ ] Hierarchy displays correctly
- [ ] Results are relevant
- [ ] Match highlighting works
- [ ] Mobile search works
- [ ] Keyboard navigation works

---

## Index Page Wayfinding Strategy

### Overview

Stripe's documentation homepage excels at **wayfinding** - helping users quickly understand where to go based on their role, task, or goal. The current `index.md` is basic and doesn't leverage these patterns.

### Stripe's Homepage Patterns

**Key Elements**:
1. **Hero Section**: Clear value proposition + prominent search
2. **Role-Based Entry Points**: Cards for "I'm a developer" vs "I'm a business user"
3. **Quick Links**: Common tasks prominently displayed
4. **Visual Cards**: Different paths visually distinct
5. **Featured Content**: Recent updates or popular guides
6. **Clear Hierarchy**: Visual flow from top to bottom

### Current State (`index.md`)

**Current Content**:
- Simple welcome message
- Bullet list of capabilities
- Basic links to Get Started, Demo, Use Cases
- Separate "For Developers" section

**Issues**:
- ❌ No visual wayfinding
- ❌ No role-based entry points
- ❌ No quick links to common tasks
- ❌ No visual hierarchy
- ❌ Search not prominent
- ❌ Doesn't guide users to their path

### Target Index Page Structure

#### A. Hero Section

**Purpose**: Immediate value proposition + search

**Implementation**:
```html
<div class="hero-section">
  <h1>Ona Intelligence Layer Documentation</h1>
  <p class="hero-subtitle">
    Unlock the full potential of your renewable energy assets with AI-powered forecasting, 
    predictive maintenance, and portfolio optimization.
  </p>
  
  <!-- Prominent Search -->
  <div class="hero-search">
    <input 
      type="text" 
      id="hero-search-input" 
      placeholder="Search documentation..."
      class="hero-search-input"
    >
  </div>
</div>
```

**CSS** (builds on `common.css`):
```css
.hero-section {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  border-radius: 12px;
  margin: 40px 0;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.hero-search {
  max-width: 600px;
  margin: 0 auto;
}

.hero-search-input {
  width: 100%;
  padding: 16px 24px;
  border: 2px solid var(--border-grey);
  border-radius: 8px;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;
}

.hero-search-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(69, 91, 241, 0.1);
}
```

#### B. Role-Based Entry Points

**Purpose**: Help users find their path based on who they are

**Implementation**:
```html
<div class="wayfinding-section">
  <h2>Choose Your Path</h2>
  <p class="section-intro">
    Get started based on your role and goals
  </p>
  
  <div class="role-cards">
    <!-- Developer Path -->
    <div class="role-card developer">
      <div class="role-icon">👨‍💻</div>
      <h3>I'm a Developer</h3>
      <p>Build integrations and automate workflows</p>
      <ul class="role-features">
        <li>API Reference</li>
        <li>SDKs & Libraries</li>
        <li>Code Examples</li>
        <li>Webhooks & Events</li>
      </ul>
      <div class="role-actions">
        <a href="/get-started" class="role-button primary">Get Started</a>
        <a href="/api-reference/overview" class="role-button secondary">API Docs</a>
      </div>
    </div>
    
    <!-- Business User Path -->
    <div class="role-card business">
      <div class="role-icon">📊</div>
      <h3>I'm a Business User</h3>
      <p>Manage assets and optimize operations</p>
      <ul class="role-features">
        <li>Guides & Tutorials</li>
        <li>Use Cases</li>
        <li>Best Practices</li>
        <li>ROI Examples</li>
      </ul>
      <div class="role-actions">
        <a href="/guides/overview" class="role-button primary">View Guides</a>
        <a href="/use-cases/overview" class="role-button secondary">See Use Cases</a>
      </div>
    </div>
    
    <!-- Decision Maker Path -->
    <div class="role-card decision">
      <div class="role-icon">💼</div>
      <h3>I'm a Decision Maker</h3>
      <p>Understand value and ROI</p>
      <ul class="role-features">
        <li>Case Studies</li>
        <li>ROI Analysis</li>
        <li>Platform Capabilities</li>
        <li>Implementation Plans</li>
      </ul>
      <div class="role-actions">
        <a href="/use-cases/overview" class="role-button primary">View Case Studies</a>
        <a href="/products" class="role-button secondary">See Products</a>
      </div>
    </div>
  </div>
</div>
```

**CSS** (builds on `common.css`):
```css
.wayfinding-section {
  margin: 60px 0;
}

.wayfinding-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.section-intro {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 40px;
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 40px 0;
}

.role-card {
  background: var(--white);
  border: 2px solid var(--border-grey);
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.role-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(69, 91, 241, 0.15);
}

.role-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
}

.role-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
  text-align: center;
}

.role-card p {
  color: var(--text-light);
  margin-bottom: 24px;
  text-align: center;
  font-size: 1rem;
}

.role-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex-grow: 1;
}

.role-features li {
  padding: 8px 0;
  color: var(--text-dark);
  position: relative;
  padding-left: 24px;
  font-size: 0.95rem;
}

.role-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary-blue);
  font-weight: bold;
}

.role-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.role-button {
  flex: 1;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.role-button.primary {
  background: var(--primary-blue);
  color: var(--white);
}

.role-button.primary:hover {
  background: var(--accent-blue);
  color: var(--white);
}

.role-button.secondary {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
}

.role-button.secondary:hover {
  background: var(--primary-blue);
  color: var(--white);
}
```

#### C. Quick Links Section

**Purpose**: Surface common tasks and popular content

**Implementation**:
```html
<div class="quick-links-section">
  <h2>Popular Guides</h2>
  <div class="quick-links-grid">
    <a href="/get-started" class="quick-link-card">
      <div class="quick-link-icon">🚀</div>
      <h4>Get Started</h4>
      <p>Make your first API call in 5 minutes</p>
    </a>
    
    <a href="/guides/forecasting/overview" class="quick-link-card">
      <div class="quick-link-icon">📈</div>
      <h4>Forecasting</h4>
      <p>Generate accurate energy forecasts</p>
    </a>
    
    <a href="/guides/data-management/overview" class="quick-link-card">
      <div class="quick-link-icon">📊</div>
      <h4>Data Management</h4>
      <p>Prepare and upload your data</p>
    </a>
    
    <a href="/api-reference/authentication" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h4>Authentication</h4>
      <p>Set up API authentication</p>
    </a>
    
    <a href="/use-cases/overview" class="quick-link-card">
      <div class="quick-link-icon">💡</div>
      <h4>Use Cases</h4>
      <p>See real-world examples</p>
    </a>
    
    <a href="/guides/troubleshooting/overview" class="quick-link-card">
      <div class="quick-link-icon">🔧</div>
      <h4>Troubleshooting</h4>
      <p>Common issues and solutions</p>
    </a>
  </div>
</div>
```

**CSS** (builds on `common.css`):
```css
.quick-links-section {
  margin: 60px 0;
}

.quick-links-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 32px;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.quick-link-card {
  background: var(--white);
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  padding: 24px;
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: center;
}

.quick-link-card:hover {
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(69, 91, 241, 0.1);
}

.quick-link-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.quick-link-card h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.quick-link-card p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
}
```

#### D. Main Sections Overview

**Purpose**: Show the full documentation structure at a glance

**Implementation**:
```html
<div class="sections-overview">
  <h2>Documentation Sections</h2>
  <div class="section-cards">
    <div class="section-card">
      <h3>Getting Started</h3>
      <p>Quick tutorials to get you up and running</p>
      <a href="/get-started" class="section-link">View Getting Started →</a>
    </div>
    
    <div class="section-card">
      <h3>Guides</h3>
      <p>Step-by-step guides for common tasks</p>
      <a href="/guides/overview" class="section-link">Browse Guides →</a>
    </div>
    
    <div class="section-card">
      <h3>API Reference</h3>
      <p>Complete API documentation</p>
      <a href="/api-reference/overview" class="section-link">View API Docs →</a>
    </div>
    
    <div class="section-card">
      <h3>Technical Concepts</h3>
      <p>Deep dives into how things work</p>
      <a href="/technical-concepts/overview" class="section-link">Learn More →</a>
    </div>
    
    <div class="section-card">
      <h3>Use Cases</h3>
      <p>Real-world examples and case studies</p>
      <a href="/use-cases/overview" class="section-link">See Use Cases →</a>
    </div>
  </div>
</div>
```

**CSS** (builds on `common.css`):
```css
.sections-overview {
  margin: 60px 0;
}

.sections-overview h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 32px;
}

.section-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.section-card {
  background: var(--white);
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease;
}

.section-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(69, 91, 241, 0.1);
}

.section-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.section-card p {
  color: var(--text-light);
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.section-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.section-link:hover {
  color: var(--accent-blue);
}
```

### Complete Index Page Template

**Full `index.md` Structure**:

```markdown
---
title: "Documentation Home"
layout: default
---

<div class="hero-section">
  <h1>Ona Intelligence Layer Documentation</h1>
  <p class="hero-subtitle">
    Unlock the full potential of your renewable energy assets with AI-powered forecasting, 
    predictive maintenance, and portfolio optimization.
  </p>
  
  <div class="hero-search">
    <input 
      type="text" 
      id="hero-search-input" 
      placeholder="Search documentation..."
      class="hero-search-input"
    >
  </div>
</div>

<div class="wayfinding-section">
  <h2>Choose Your Path</h2>
  <p class="section-intro">
    Get started based on your role and goals
  </p>
  
  <!-- Role Cards HTML from above -->
</div>

<div class="quick-links-section">
  <h2>Popular Guides</h2>
  <!-- Quick Links HTML from above -->
</div>

<div class="sections-overview">
  <h2>Documentation Sections</h2>
  <!-- Section Cards HTML from above -->
</div>

<script>
  // Connect hero search to main search functionality
  document.getElementById('hero-search-input').addEventListener('focus', function() {
    // Could redirect to search page or open search modal
    document.getElementById('search-input').focus();
  });
</script>
```

### Implementation Checklist

- [ ] Create hero section with value prop and search
- [ ] Add role-based entry cards (Developer, Business User, Decision Maker)
- [ ] Add quick links section with popular guides
- [ ] Add main sections overview
- [ ] Add CSS for all new components (builds on `common.css`)
- [ ] Connect hero search to main search functionality
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Ensure all links work correctly
- [ ] Verify visual hierarchy and flow

### Key Differences from Current Index

**Current**:
- ❌ Text-heavy, no visual wayfinding
- ❌ No role-based entry points
- ❌ Search not prominent
- ❌ No quick links
- ❌ Doesn't guide users

**New**:
- ✅ Visual hero section with prominent search
- ✅ Role-based cards for different user types
- ✅ Quick links to popular content
- ✅ Clear visual hierarchy
- ✅ Guides users to their path
- ✅ Matches Stripe's wayfinding patterns

---

## Current State Assessment

### Existing Structure

```
asobacloud.github.io/
├── index.md (Landing page)
├── get-started.md (Quickstart)
├── guides/
│   ├── overview.md
│   ├── forecasting.md
│   ├── data-management.md
│   ├── portfolio-management.md
│   └── developer-guide.md
├── api-reference/
│   ├── overview.md
│   ├── authentication.md
│   └── freemium-forecasting-api.md
├── use-cases/
│   ├── overview.md
│   ├── sibaya-casino.md
│   ├── cummins-portfolio.md
│   └── avaron-infrastructure.md
├── technical-concepts/
│   ├── overview.md
│   ├── machine-learning-models.md
│   └── data-standardization.md
└── products/
    ├── index.md
    ├── terminal.md
    ├── analyst.md
    └── distributed-compute.md
```

### Strengths

✅ **Clear top-level structure** - Matches Stripe's pattern  
✅ **Progressive disclosure** - Getting Started → Guides → API Reference → Concepts  
✅ **Persona targeting** - Use cases for decision makers, API reference for developers  
✅ **Existing content** - Good foundation to build upon  

### Gaps & Issues

❌ **Incomplete API Reference** - Only freemium forecasting API documented  
❌ **Missing product documentation** - Products section exists but may need expansion  
❌ **Limited guides** - Only 4 guides, may need more task-oriented content  
❌ **No SDK documentation** - Python/JavaScript SDKs not documented  
❌ **Inconsistent depth** - Some sections very detailed, others sparse  
❌ **Missing integration guides** - No guides for common integrations  
❌ **No changelog** - Version history not documented  

### Content Gaps Analysis

Based on platform repository (`~/Workbench/platform`):

**Missing API Documentation**:
- Terminal API endpoints
- Data ingestion endpoints
- Weather data endpoints
- Training service endpoints
- Real-time data endpoints

**Missing Guides**:
- Integration with SCADA systems
- Setting up data pipelines
- Configuring forecasting models
- Troubleshooting common issues
- Best practices for data quality

**Missing Concepts**:
- OODA Loop architecture
- Data flow architecture
- Service architecture overview
- Security model
- Deployment architecture

---

## Target Architecture Strategy

### Proposed Structure

```
asobacloud.github.io/
├── index.md
│   └── Landing page with clear value prop and entry points
│
├── get-started.md
│   └── Simple 5-minute tutorial (Beginner-focused)
│
├── guides/
│   ├── overview.md
│   ├── forecasting/
│   │   ├── overview.md
│   │   ├── generating-forecasts.md
│   │   ├── interpreting-results.md
│   │   └── improving-accuracy.md
│   ├── data-management/
│   │   ├── overview.md
│   │   ├── preparing-data.md
│   │   ├── uploading-data.md
│   │   └── data-quality.md
│   ├── integrations/
│   │   ├── overview.md
│   │   ├── scada-systems.md
│   │   ├── huawei-fusionsolar.md
│   │   └── custom-integrations.md
│   ├── portfolio-management/
│   │   ├── overview.md
│   │   ├── multi-site-setup.md
│   │   └── reporting.md
│   └── troubleshooting/
│       ├── overview.md
│       ├── common-issues.md
│       └── debugging-guides.md
│
├── api-reference/
│   ├── overview.md
│   ├── authentication.md
│   ├── forecasting/
│   │   ├── overview.md
│   │   ├── freemium-forecast.md
│   │   └── advanced-forecast.md
│   ├── data/
│   │   ├── overview.md
│   │   ├── upload-historical.md
│   │   ├── upload-realtime.md
│   │   └── query-data.md
│   ├── terminal/
│   │   ├── overview.md
│   │   └── [endpoints].md
│   └── errors/
│       └── error-codes.md
│
├── technical-concepts/
│   ├── overview.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── system-architecture.md
│   │   ├── data-flow.md
│   │   └── ooda-loop.md
│   ├── machine-learning/
│   │   ├── overview.md
│   │   ├── forecasting-models.md
│   │   └── model-training.md
│   └── data-standardization.md
│
├── use-cases/
│   ├── overview.md
│   ├── sibaya-casino.md
│   ├── cummins-portfolio.md
│   ├── avaron-infrastructure.md
│   ├── energy-trading.md
│   ├── oam.md
│   └── insurance.md
│
├── products/
│   ├── index.md
│   ├── terminal.md
│   ├── analyst.md
│   └── distributed-compute.md
│
└── sdks/
    ├── overview.md
    ├── python/
    │   ├── overview.md
    │   ├── installation.md
    │   └── examples.md
    └── javascript/
        ├── overview.md
        ├── installation.md
        └── examples.md
```

### Key Changes from Current Structure

1. **Nested Guides**: Organize guides by topic area (forecasting/, data-management/, etc.)
2. **Expanded API Reference**: Separate sections for different API categories
3. **New Sections**: 
   - `/integrations/` - Integration guides
   - `/troubleshooting/` - Problem-solving guides
   - `/sdks/` - SDK documentation
   - `/api-reference/errors/` - Centralized error documentation
4. **Expanded Technical Concepts**: Architecture section with system overview
5. **More Use Cases**: Additional case studies from esums folder

---

## Migration & Implementation Guide

### Phase 1: Structure Setup

**Goal**: Create the new directory structure and overview pages.

**Tasks**:
1. Create new directory structure (nested guides, API categories)
2. Create `overview.md` files for each new section
3. Update `_config.yml` navigation if needed
4. Ensure all overview pages follow standard template

**Standard Overview Template**:
```markdown
# [Section Name] Overview

[1-2 sentence description of what this section contains]

## What You Can Find Here

* **[Page 1](./page1.md)**: [Brief description]
* **[Page 2](./page2.md)**: [Brief description]
* **[Page 3](./page3.md)**: [Brief description]

## Quick Links

* [Related Section](../related-section/overview.md)
* [Getting Started](../../get-started.md)
```

### Phase 2: Content Migration

**Goal**: Move and reorganize existing content into new structure.

**Migration Map**:

| Current Location | Target Location | Action |
|-----------------|-----------------|--------|
| `guides/forecasting.md` | `guides/forecasting/overview.md` | Move + expand |
| `guides/data-management.md` | `guides/data-management/overview.md` | Move + expand |
| `guides/portfolio-management.md` | `guides/portfolio-management/overview.md` | Move + expand |
| `api-reference/freemium-forecasting-api.md` | `api-reference/forecasting/freemium-forecast.md` | Move + enhance |
| `technical-concepts/machine-learning-models.md` | `technical-concepts/machine-learning/forecasting-models.md` | Move + expand |
| `use-cases/*.md` | `use-cases/*.md` | Keep, add more |

### Phase 3: Content Enhancement

**Goal**: Fill gaps and enhance existing content.

**Priority Order**:
1. **API Reference** - Complete all endpoint documentation
2. **Guides** - Add missing task-oriented guides
3. **Technical Concepts** - Add architecture documentation
4. **SDKs** - Document Python and JavaScript SDKs
5. **Use Cases** - Add more case studies

### Phase 4: Cross-Linking & Navigation

**Goal**: Ensure discoverability through comprehensive linking.

**Tasks**:
1. Add "See also" sections to relevant pages
2. Link from guides to API reference
3. Link from API reference to technical concepts
4. Link from use cases to relevant guides
5. Update breadcrumbs and navigation

### Phase 5: Quality Assurance

**Goal**: Ensure completeness and accuracy.

**Checklist**:
- [ ] All API endpoints documented
- [ ] All code examples tested
- [ ] All links verified
- [ ] All overview pages complete
- [ ] Consistent formatting across all pages
- [ ] Search functionality working
- [ ] Mobile navigation working

---

## Content Strategy by Section

### Getting Started (`get-started.md`)

**Purpose**: Get users to their first successful API call in 5 minutes.

**Content Rules**:
- ✅ Simple, copy-pastable code
- ✅ Clear step-by-step instructions
- ✅ Expected output shown
- ✅ Links to next steps
- ❌ NO architecture explanations
- ❌ NO advanced features
- ❌ NO troubleshooting (link to guides instead)

**Template**:
```markdown
# Get Started with [Product Name]

[1 paragraph: What you'll achieve]

## Prerequisites
- [Simple list]

## Step 1: [Action]
[Code example]

## Step 2: [Action]
[Code example]

## Step 3: [Verify]
[Expected output]

## Next Steps
- [Link to relevant guide]
- [Link to API reference]
```

### Guides (`/guides/`)

**Purpose**: Task-oriented how-to content that solves specific problems.

**Content Rules**:
- ✅ Focus on ONE task per guide
- ✅ Explain WHY, not just HOW
- ✅ Include code examples
- ✅ Link to API reference for details
- ✅ Include troubleshooting tips
- ❌ NO exhaustive API parameter lists
- ❌ NO deep technical architecture

**Template**:
```markdown
# [Task Name]

[1-2 paragraphs: What problem this solves and why]

## Prerequisites
- [List]

## Overview
[High-level approach]

## Step-by-Step Guide

### Step 1: [Action]
[Explanation + code]

### Step 2: [Action]
[Explanation + code]

## Common Issues
- [Issue 1]: [Solution]
- [Issue 2]: [Solution]

## Next Steps
- [Related guide]
- [API reference]
- [Technical concept]
```

### API Reference (`/api-reference/`)

**Purpose**: Complete, authoritative technical reference.

**Content Rules**:
- ✅ Every parameter documented
- ✅ Request/response examples
- ✅ Error examples
- ✅ Complete JSON schemas
- ✅ Code examples in multiple languages
- ❌ NO high-level explanations (link to guides)
- ❌ NO business justifications

**Template**:
```markdown
# [Endpoint Name]

[1 sentence: What this endpoint does]

## Endpoint
```
POST /api/v1/endpoint
```

## Authentication
[Required auth method]

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1 | string | Yes | [Description] |

## Request Example

### cURL
```bash
curl -X POST https://api.example.com/v1/endpoint \
  -H "Authorization: Bearer TOKEN" \
  -d '{"param1": "value"}'
```

### Python
```python
# Example
```

## Response

### Success Response (200)
```json
{
  "status": "success",
  "data": {...}
}
```

### Error Responses
[All error codes]

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| field1 | string | [Description] |

## Related
- [Guide link]
- [Concept link]
```

### Technical Concepts (`/technical-concepts/`)

**Purpose**: Deep technical understanding of how things work.

**Content Rules**:
- ✅ Explain internal architecture
- ✅ Explain algorithms and models
- ✅ Include diagrams
- ✅ Explain design decisions
- ✅ Link to implementation details
- ❌ NO basic tutorials
- ❌ NO API usage examples (link to API reference)

**Template**:
```markdown
# [Concept Name]

[2-3 paragraphs: What this is and why it matters]

## Overview
[High-level explanation]

## Architecture
[Diagram + explanation]

## How It Works
[Detailed explanation]

## Design Decisions
[Why we made these choices]

## Related
- [API reference]
- [Guide]
```

### Use Cases (`/use-cases/`)

**Purpose**: Real-world examples showing business value.

**Content Rules**:
- ✅ Focus on business outcomes
- ✅ Include metrics and ROI
- ✅ Tell a story
- ✅ Include technical details (but secondary)
- ✅ Link to relevant guides
- ❌ NO generic feature descriptions
- ❌ NO sales language

**Template**:
```markdown
# [Customer/Use Case Name]

[1 paragraph: Who they are and what challenge they faced]

## Challenge
[Problem statement]

## Solution
[How we solved it]

## Implementation
[Technical approach - brief]

## Results
- Metric 1: [Value]
- Metric 2: [Value]
- ROI: [Value]

## Learn More
- [Relevant guide]
- [Relevant API]
```

---

## Quality Standards & Validation

### Content Quality Checklist

**Every Page Must Have**:
- [ ] Clear, descriptive title (H1)
- [ ] Overview/introduction paragraph
- [ ] Logical heading hierarchy (H2 → H3)
- [ ] Code examples (where applicable)
- [ ] Links to related content
- [ ] "Next Steps" or "Learn More" section

**Code Examples Must**:
- [ ] Be copy-paste ready
- [ ] Include expected output
- [ ] Use correct syntax highlighting
- [ ] Be tested and working
- [ ] Include all required parameters

**Links Must**:
- [ ] Use relative paths
- [ ] Have descriptive anchor text
- [ ] Point to existing pages
- [ ] Be verified (no 404s)

### Validation Process

**Before Publishing**:
1. **Structure Check**: Verify all files exist in correct locations
2. **Link Check**: Verify all internal links work
3. **Code Check**: Test all code examples
4. **Format Check**: Verify consistent formatting
5. **Content Check**: Verify completeness per section rules

**Automated Checks** (if possible):
- Link checker script
- Markdown linter
- Code example validator
- Search index verification

### Success Metrics

**Quantitative**:
- 100% API endpoint coverage
- 0 broken internal links
- All code examples tested
- All overview pages complete

**Qualitative**:
- Users can find information quickly
- Code examples work without modification
- Content matches user personas
- Navigation is intuitive

---

## Implementation Priority

### High Priority (Phase 1)
1. ✅ Complete API Reference for all endpoints
2. ✅ Expand Guides with task-oriented content
3. ✅ Add Architecture documentation
4. ✅ Enhance existing content with cross-links

### Medium Priority (Phase 2)
1. Add SDK documentation
2. Add Integration guides
3. Add Troubleshooting guides
4. Expand Use Cases

### Low Priority (Phase 3)
1. Add Changelog
2. Add Video tutorials
3. Add Interactive examples
4. Add Community contributions

---

## Reference: Stripe Documentation Patterns

### Navigation Pattern
- **Left Sidebar**: Hierarchical, always visible
- **Top Bar**: Search, account, support links
- **Breadcrumbs**: Show current location
- **In-Page TOC**: For long pages

### Content Patterns
- **Getting Started**: Simple, outcome-focused
- **Guides**: Task-oriented, contextual
- **API Reference**: Complete, technical
- **Concepts**: Deep, explanatory

### Code Example Patterns
- **Multiple Languages**: cURL, Python, Node.js, etc.
- **Complete Examples**: Full, working code
- **Expected Output**: Show what users should see
- **Error Handling**: Include error examples

### Cross-Linking Patterns
- **"See also"** sections
- **Related topics** sidebar
- **In-text links** to related concepts
- **"Next steps"** at end of pages

---

## Quick Reference: Design Patterns

### When to Use Which Pattern

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Product Cards** | Multiple products/features to showcase | Products page, feature comparison |
| **Journey Cards** | Different user paths/roles | Landing page, "Choose your path" |
| **Use Case Cards** | Case studies, real-world examples | Use cases overview |
| **Two-Column Layout** | Text + image explanations | Architecture docs, feature guides |
| **Callout Boxes** | Important notes, warnings, tips | Throughout guides and API docs |
| **Code Blocks** | API examples, commands | All API reference, guides |
| **Tables** | Structured data, parameters | API reference, comparisons |
| **Step Numbers** | Tutorials, step-by-step guides | Getting started, how-to guides |

### HTML/CSS Quick Reference

#### Product Cards
```html
<div class="product-cards">
  <div class="product-card">
    <img src="...">
    <h3>Title</h3>
    <p>Description</p>
    <div class="card-tags"><span class="tag">Tag</span></div>
    <a href="..." class="card-cta">Learn More</a>
  </div>
</div>
```

#### Callout Boxes
```html
<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <strong>Tip:</strong> Your message here.
  </div>
</div>
```

#### Two-Column Layout
```html
<div class="two-column-layout">
  <div class="column-text">...</div>
  <div class="column-image"><img src="..."></div>
</div>
```

#### Code Blocks
````markdown
```bash
curl -X POST https://api.example.com/v1/endpoint
```
````

### Design Tokens Quick Reference

**CSS Foundation**: `~/Workbench/website/dist/includes/common.css`

**Colors** (from `common.css`):
- Primary Blue: `#455BF1` (var(--primary-blue))
- Accent Blue: `#3748c8` (var(--accent-blue))
- Primary Black: `#000000` (var(--primary-black))
- Text Dark: `#333` (var(--text-dark))
- Text Light: `#4D4D4D` (var(--text-light))
- Border Grey: `#E0E0E0` (var(--border-grey))
- Success Green: `#28ca42` (var(--success-green))
- Warning Orange: `#f39c12` (var(--warning-orange))

**Spacing**:
- Card padding: `24px`
- Card gap: `24px`
- Section margin: `32px`
- Container padding: `40px` (from `common.css`)

**Border Radius**:
- Cards: `12px`
- Buttons: `8px` (from `common.css`)
- Tags: `16px` (pill)
- Form inputs: `6px` (from `common.css`)

**Typography** (from `common.css`):
- Font Family: `'DM Sans', Helvetica, Arial, sans-serif`
- Font Weights: 400 (normal), 500 (medium), 700 (bold)

---

## Conclusion

This guide establishes the information architecture principles and strategies needed to transform our documentation into a Stripe-quality resource. The key is:

1. **User journey first** - Structure around how users work
2. **Progressive disclosure** - Layer information by complexity
3. **Completeness** - Document everything thoroughly
4. **Code-centric** - Examples are primary documentation
5. **Discoverable** - Multiple paths to information
6. **Persona-aware** - Different content for different users
7. **Consistent** - Standardized structure and formatting

By following these principles and the implementation guide, an AI coder can systematically update the documentation repository to achieve world-class information architecture.

---

---

## ⚡ EXECUTION INSTRUCTIONS FOR AI CODERS

**CRITICAL**: This document contains both **executable instructions** and **reference material**.

### How to Use This Document

1. **START HERE**: Read [Execution Plan](#execution-plan) section first
   - Contains deterministic, machine-actionable instructions
   - No interpretation required
   - Execute steps in exact order

2. **REFERENCE ONLY**: All other sections are design philosophy
   - Use for context and understanding
   - Do NOT interpret as execution steps
   - Reference when implementing specific components

3. **VALIDATION**: After execution, run [Acceptance Criteria](#acceptance-criteria-machine-checkable)
   - All checks must pass
   - If any fail, fix and retry

### Execution Checklist

**Before Starting**:
- [ ] Read entire [Execution Plan](#execution-plan) section
- [ ] Understand scope (what's in/out)
- [ ] Review migration map (know what moves where)
- [ ] Review rewrite rules (know what can/can't change)

**During Execution**:
- [ ] Follow [Execution Order](#execution-order-deterministic) exactly
- [ ] Apply [Mechanical Rewrite Rules](#mechanical-rewrite-rules) strictly
- [ ] Reference design sections only for context
- [ ] Do NOT interpret abstractions as instructions

**After Execution**:
- [ ] Run all [Acceptance Criteria](#acceptance-criteria-machine-checkable) checks
- [ ] Verify no out-of-scope files modified
- [ ] Test navigation and search functionality
- [ ] Validate all links work

### If You Encounter Ambiguity

**STOP** and ask:
- Is this in the migration map? → Execute exactly as specified
- Is this in scope? → If no, do not modify
- Does this violate rewrite rules? → If yes, do not do it
- Is this an abstraction? → Reference only, not executable

**Do NOT**:
- Interpret "outcome-focused" as an instruction
- Create new files not in migration map
- Modify files outside scope
- Skip validation steps

### Success Criteria

**The uplift is COMPLETE when**:
- ✅ All files in migration map exist at target paths
- ✅ All acceptance criteria pass
- ✅ Navigation works correctly
- ✅ Search works correctly
- ✅ Index page displays wayfinding elements
- ✅ No out-of-scope files modified

**If ANY criteria fail → Uplift is INCOMPLETE**

---

**Questions or Issues?**
- Review `DOCUMENTATION_IA_STRATEGY.md` for existing strategy
- Check platform `AI_CODING_GUIDELINES.md` for coding standards
- Reference `ARCHITECTURAL_FIRST_PRINCIPLES.md` for technical patterns
