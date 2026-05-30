# Data Display Pattern Guide
## When to Use Which Display Pattern

**Purpose**: This document provides deterministic rules for selecting data display patterns in documentation based on data characteristics and user intent.

**Scope**: Applies to all documentation content in `asobacloud.github.io`. Defines **when** to use specific patterns, not how to implement them.

**Target Audience**: AI coders writing documentation, documentation authors, content reviewers.

**Last Updated**: 2025-01-XX

---

## ⚡ EXECUTION RULES (One-Shot Ready)

**CRITICAL**: These rules are **deterministic and machine-actionable**. Apply them mechanically without interpretation.

### Rule Application Method

1. **Identify data characteristics** (use decision tree below)
2. **Match to pattern** (use mapping table)
3. **Apply pattern** (use implementation template)
4. **Validate** (use checklist)

---

## Decision Framework

### Step 1: Identify Data Type

**CRITICAL**: Classify data into exactly ONE category. No overlaps.

| Data Type | Characteristics | Examples |
|-----------|----------------|----------|
| **API Parameters** | Request/response fields, types, required/optional | `file`, `email`, `site_name` |
| **API Responses** | Complete JSON objects, arrays, nested structures | `{"status": "success", "forecast": {...}}` |
| **Time-Series Data** | Values indexed by timestamp, sequential | Forecast values over 24 hours |
| **Tabular Data** | Rows and columns, comparable values | Error codes, status values |
| **Metrics/Statistics** | Single values or small sets, aggregated | Accuracy: 96%, Total: 28500.5 kWh |
| **Code Examples** | Executable code, commands, scripts | cURL commands, Python SDK |
| **Hierarchical Data** | Nested structures, parent-child relationships | API endpoint structure |
| **Comparison Data** | Side-by-side values, before/after | Option A vs Option B |

### Step 2: Identify User Intent

**CRITICAL**: Determine what the user needs to DO with the data.

| User Intent | Description | Pattern Selection Impact |
|-------------|-------------|-------------------------|
| **Reference** | Look up specific value | Table, inline code |
| **Understand Structure** | See how data is organized | JSON example, hierarchical list |
| **Compare Options** | Evaluate alternatives | Comparison table, side-by-side |
| **Execute** | Copy and run code | Code block with syntax highlighting |
| **Analyze Trends** | See patterns over time | Time-series chart (if visual) or table |
| **Verify** | Check expected output | Complete response example |

### Step 3: Identify Data Scale

**CRITICAL**: Count items to determine scale.

| Scale | Count | Pattern Selection |
|-------|-------|-------------------|
| **Small** | 1-5 items | Inline, simple list |
| **Medium** | 6-20 items | Table, structured list |
| **Large** | 21-100 items | Table with pagination note, truncated example |
| **Very Large** | 100+ items | Summary + link to full data, truncated example |

---

## Pattern Selection Rules

### Rule Set 1: API Documentation

#### Rule 1.1: API Parameters → Table

**When to use**:
- ✅ Documenting request parameters
- ✅ Documenting response fields
- ✅ Any structured field list with types/descriptions

**Pattern**: Parameter table

**Template**:
```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1` | string | Yes | Description |
| `param2` | integer | No | Description |
```

**Validation**:
- [ ] All parameters listed
- [ ] Type specified for each
- [ ] Required/optional indicated
- [ ] Description provided

**Example**:
```markdown
## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | CSV file with historical solar production data |
| `email` | string | Yes | Your email address for request identification |
| `site_name` | string | No | Name for your site (defaults to filename) |
```

#### Rule 1.2: API Response → Complete JSON Example

**When to use**:
- ✅ Showing successful API response
- ✅ Showing error response structure
- ✅ Documenting response schema

**Pattern**: Complete JSON code block

**Template**:
````markdown
### Success Response (200)

```json
{
  "status": "success",
  "data": {
    // Complete response structure
  }
}
```
````

**Validation**:
- [ ] JSON is valid syntax
- [ ] All fields from parameter table included
- [ ] Example values are realistic
- [ ] No truncated/ellipsis unless explicitly noted

**Example**:
````markdown
### Success Response (200)

```json
{
  "status": "success",
  "forecast": {
    "site_name": "My Solar Site",
    "location": "Durban",
    "forecast_hours": 24,
    "generated_at": "2025-12-30T10:00:00Z",
    "forecasts": [
      {
        "timestamp": "2025-12-30T11:00:00Z",
        "hour_ahead": 1,
        "kWh_forecast": 15.5,
        "confidence": 0.85
      }
      // ... 23 more hours
    ]
  }
}
```
````

#### Rule 1.3: Error Codes → Table

**When to use**:
- ✅ Documenting error responses
- ✅ Status code reference
- ✅ Error code lookup

**Pattern**: Error code table

**Template**:
```markdown
| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `invalid_format` | Description |
| 401 | `unauthorized` | Description |
```

**Validation**:
- [ ] All error codes listed
- [ ] HTTP status code included
- [ ] Description explains cause
- [ ] Example response shown

---

### Rule Set 2: Time-Series Data

#### Rule 2.1: Time-Series → Table (Small/Medium) or Summary (Large)

**When to use**:
- ✅ Forecast data over time
- ✅ Historical values
- ✅ Sequential measurements

**Decision**:
- **Small (≤24 items)**: Show complete table
- **Medium (25-100 items)**: Show sample rows + note about full dataset
- **Large (100+ items)**: Show summary statistics + link to full data

**Pattern**: Time-series table

**Template**:
```markdown
| Timestamp | Value | Unit | Notes |
|-----------|-------|------|-------|
| 2025-12-30T11:00:00Z | 15.5 | kWh | Hour 1 |
| 2025-12-30T12:00:00Z | 65.2 | kWh | Hour 2 |
```

**Validation**:
- [ ] Timestamps in ISO 8601 format
- [ ] Values include units
- [ ] If truncated, note clearly ("Showing first 10 of 24 hours")
- [ ] Link to full data if available

**Example**:
```markdown
## Forecast Results

| Timestamp | Hour Ahead | kWh Forecast | Confidence |
|-----------|------------|--------------|------------|
| 2025-12-30T11:00:00Z | 1 | 15.5 | 0.85 |
| 2025-12-30T12:00:00Z | 2 | 65.2 | 0.85 |
| 2025-12-30T13:00:00Z | 3 | 130.1 | 0.85 |
| ... | ... | ... | ... |
| 2025-12-31T10:00:00Z | 24 | 12.3 | 0.82 |

*Showing first 3 and last 1 of 24 forecast hours. Full forecast available in API response.*
```

---

### Rule Set 3: Comparison Data

#### Rule 3.1: Options Comparison → Comparison Table

**When to use**:
- ✅ Comparing multiple options
- ✅ Before/after scenarios
- ✅ Feature comparison

**Pattern**: Comparison table

**Template**:
```markdown
| Feature | Option A | Option B |
|---------|----------|----------|
| Feature 1 | Value A | Value B |
| Feature 2 | Value A | Value B |
```

**Validation**:
- [ ] All options in columns
- [ ] All features in rows
- [ ] Consistent value format
- [ ] Clear option labels

**Example**:
```markdown
## API Endpoint Comparison

| Feature | Freemium Forecast | Advanced Forecast |
|---------|-------------------|-------------------|
| Forecast Horizon | 24 hours | 7-30 days |
| Update Frequency | On-demand | Real-time |
| Historical Data Required | 30 days | 90 days |
| Cost | Free | Paid |
```

#### Rule 3.2: Side-by-Side Comparison → Two-Column Layout

**When to use**:
- ✅ Comparing approaches/methods
- ✅ Before/after visual comparison
- ✅ Different implementation strategies

**Pattern**: Two-column layout (see `DOCUMENTATION_IA_GUIDE.md` for HTML)

**When NOT to use**:
- ❌ Simple value comparison (use table)
- ❌ Code comparison (use code blocks side-by-side)

---

### Rule Set 4: Code Examples

#### Rule 4.1: Executable Code → Code Block with Language

**When to use**:
- ✅ API requests (cURL, HTTP)
- ✅ SDK usage (Python, JavaScript)
- ✅ Configuration files
- ✅ Shell commands

**Pattern**: Syntax-highlighted code block

**Template**:
````markdown
```language
// Complete, executable code
```
````

**Validation**:
- [ ] Language specified
- [ ] Code is complete (copy-paste ready)
- [ ] No placeholders (use realistic values)
- [ ] Expected output shown separately

**Example**:
````markdown
### cURL Request

```bash
curl -X POST https://forecasting.api.asoba.org/api/v1/freemium-forecast \
  -F "file=@sample.csv" \
  -F "email=user@example.com" \
  -F "verification_code=123456" \
  -F "site_name=My Solar Site" \
  -F "location=Durban" \
  -F "capacity_kw=500" \
  -F "tou_accepted=true"
```

### Expected Response

```json
{
  "status": "success",
  "forecast": {...}
}
```
````

#### Rule 4.2: Code Snippets → Inline Code

**When to use**:
- ✅ Variable names
- ✅ Function names
- ✅ API endpoint paths
- ✅ Configuration keys

**Pattern**: Inline code (backticks)

**Template**:
```markdown
Use the `function_name()` function to...
```

**Validation**:
- [ ] Only for short identifiers
- [ ] Not for complete code blocks
- [ ] Consistent formatting

---

### Rule Set 5: Metrics and Statistics

#### Rule 5.1: Single Metric → Inline or Callout

**When to use**:
- ✅ Key performance indicators
- ✅ Important statistics
- ✅ Success metrics

**Decision**:
- **Critical metric**: Use callout box
- **Supporting metric**: Use inline text

**Pattern**: Callout box (for critical) or inline (for supporting)

**Template**:
```markdown
<div class="callout callout-success">
  <strong>Result:</strong> 96% faster fault detection achieved.
</div>
```

**Example**:
```markdown
## Performance Metrics

<div class="callout callout-success">
  <strong>Accuracy:</strong> 96% forecast accuracy achieved with only 30 days of historical data.
</div>

The system processes data with an average latency of 2.5 seconds and maintains 99.9% uptime.
```

#### Rule 5.2: Multiple Metrics → Summary Table

**When to use**:
- ✅ Multiple related metrics
- ✅ Performance benchmarks
- ✅ Comparison metrics

**Pattern**: Summary table

**Template**:
```markdown
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Accuracy | 96% | >95% | ✅ |
| Latency | 2.5s | <5s | ✅ |
```

---

### Rule Set 6: Hierarchical Data

#### Rule 6.1: API Structure → Nested List or Tree

**When to use**:
- ✅ API endpoint hierarchy
- ✅ Nested response structure
- ✅ Directory structure

**Pattern**: Nested list or tree diagram

**Template**:
```markdown
- `/api/v1/`
  - `/forecast/`
    - `POST /freemium-forecast`
    - `POST /advanced-forecast`
  - `/data/`
    - `POST /upload-historical`
    - `POST /upload-realtime`
```

**Validation**:
- [ ] Hierarchy is clear
- [ ] Indentation consistent
- [ ] All endpoints listed
- [ ] HTTP methods specified

---

## Pattern Selection Decision Tree

**CRITICAL**: Follow this tree exactly. No interpretation.

```
START
│
├─ Is it API documentation?
│  ├─ YES → Is it parameters/fields?
│  │  ├─ YES → Use TABLE (Rule 1.1)
│  │  └─ NO → Is it response structure?
│  │     ├─ YES → Use JSON CODE BLOCK (Rule 1.2)
│  │     └─ NO → Is it error codes?
│  │        └─ YES → Use ERROR TABLE (Rule 1.3)
│  │
│  └─ NO → Continue
│
├─ Is it time-series data?
│  ├─ YES → Count items
│  │  ├─ ≤24 → Use COMPLETE TABLE (Rule 2.1)
│  │  ├─ 25-100 → Use SAMPLE TABLE + NOTE (Rule 2.1)
│  │  └─ 100+ → Use SUMMARY + LINK (Rule 2.1)
│  │
│  └─ NO → Continue
│
├─ Is it comparison data?
│  ├─ YES → Is it feature comparison?
│  │  ├─ YES → Use COMPARISON TABLE (Rule 3.1)
│  │  └─ NO → Is it approach comparison?
│  │     └─ YES → Use TWO-COLUMN LAYOUT (Rule 3.2)
│  │
│  └─ NO → Continue
│
├─ Is it executable code?
│  ├─ YES → Use CODE BLOCK WITH LANGUAGE (Rule 4.1)
│  └─ NO → Is it identifier/variable name?
│     └─ YES → Use INLINE CODE (Rule 4.2)
│
├─ Is it metrics/statistics?
│  ├─ YES → Is it critical metric?
│  │  ├─ YES → Use CALLOUT BOX (Rule 5.1)
│  │  └─ NO → Count metrics
│  │     ├─ 1 → Use INLINE (Rule 5.1)
│  │     └─ 2+ → Use SUMMARY TABLE (Rule 5.2)
│  │
│  └─ NO → Continue
│
└─ Is it hierarchical structure?
   └─ YES → Use NESTED LIST/TREE (Rule 6.1)
```

---

## Validation Checklist

**CRITICAL**: Before finalizing any documentation, verify:

### General Checks
- [ ] Data type correctly identified
- [ ] User intent correctly identified
- [ ] Data scale correctly identified
- [ ] Pattern matches decision tree output

### Pattern-Specific Checks

**For Tables**:
- [ ] All columns have headers
- [ ] All rows have data (no empty cells)
- [ ] Values are consistent format
- [ ] Table is not too wide (>6 columns → consider splitting)

**For Code Blocks**:
- [ ] Language specified
- [ ] Code is complete and executable
- [ ] No placeholders (use realistic examples)
- [ ] Expected output shown

**For JSON Examples**:
- [ ] Valid JSON syntax
- [ ] All fields from schema included
- [ ] Realistic example values
- [ ] No truncated content (unless explicitly noted)

**For Comparison Tables**:
- [ ] All options in columns
- [ ] All features in rows
- [ ] Consistent value format
- [ ] Clear labels

**For Callout Boxes**:
- [ ] Only for critical information
- [ ] Appropriate type (info/warning/error/success)
- [ ] Concise message

---

## Anti-Patterns (What NOT to Do)

**CRITICAL**: These patterns are forbidden. Do not use them.

### ❌ Anti-Pattern 1: Mixed Patterns
- **Wrong**: Table with code blocks mixed in
- **Right**: Separate table, then separate code block

### ❌ Anti-Pattern 2: Incomplete Examples
- **Wrong**: `{"status": "success", ...}`
- **Right**: Complete JSON with all fields

### ❌ Anti-Pattern 3: Unspecified Language
- **Wrong**: ``` code ```
- **Right**: ```bash code ``` or ```json code ```

### ❌ Anti-Pattern 4: Truncated Without Note
- **Wrong**: Table showing 5 rows, no indication there are more
- **Right**: "Showing first 5 of 24 rows" or link to full data

### ❌ Anti-Pattern 5: Hardcoded Values in Examples
- **Wrong**: `email=user@example.com` (should be realistic but generic)
- **Right**: `email=your-email@example.com` or clearly marked as example

---

## Examples by Section Type

### API Reference Pages

**Required Patterns**:
1. Parameter table (Rule 1.1)
2. Request example - code block (Rule 4.1)
3. Response example - JSON code block (Rule 1.2)
4. Error codes table (Rule 1.3)

**Example Structure**:
```markdown
# Endpoint Name

## Endpoint
`POST /api/v1/endpoint`

## Request Parameters
[Table - Rule 1.1]

## Request Example
[Code Block - Rule 4.1]

## Response
[JSON Code Block - Rule 1.2]

## Error Responses
[Error Table - Rule 1.3]
```

### Guide Pages

**Required Patterns**:
- Code examples (Rule 4.1)
- Expected outputs (Rule 1.2)
- Metrics/statistics (Rule 5.1 or 5.2)
- Comparison tables (Rule 3.1) if comparing options

### Use Case Pages

**Required Patterns**:
- Metrics callout boxes (Rule 5.1) for key results
- Summary tables (Rule 5.2) for multiple metrics
- Comparison tables (Rule 3.1) if comparing before/after

---

## Quick Reference: Pattern Selection

| Data Type | Small (1-5) | Medium (6-20) | Large (21-100) | Very Large (100+) |
|-----------|-------------|---------------|----------------|-------------------|
| **API Parameters** | Table | Table | Table | Table (with note) |
| **API Responses** | JSON Block | JSON Block | JSON Block (sample) | JSON Block (sample + link) |
| **Time-Series** | Table | Table | Table (sample) | Summary + Link |
| **Metrics** | Inline/Callout | Table | Table | Summary Table |
| **Code** | Code Block | Code Block | Code Block | Code Block (sample) |
| **Comparison** | Table | Table | Table | Table (key features) |

---

## Success Criteria

**Documentation follows this guide when**:

- ✅ All data displays match decision tree output
- ✅ All patterns pass validation checklist
- ✅ No anti-patterns present
- ✅ All code examples are complete and executable
- ✅ All tables have headers and consistent formatting
- ✅ All JSON examples are valid syntax
- ✅ All comparisons use appropriate pattern

---

**Remember**: This guide defines **when** to use patterns. For **how** to implement them, see `DOCUMENTATION_IA_GUIDE.md`.
