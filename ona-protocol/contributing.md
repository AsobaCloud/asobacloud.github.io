---
layout: default
title: "Contributing"
parent: "Ona Protocol (ODS-E)"
nav_order: 6
---

# Contributing to ODS-E

ODS-E is an open specification and we welcome contributions from the energy data community. Whether you're fixing a typo, adding support for a new OEM, or improving documentation, this guide will help you get started.

---

## Environment Setup

### Prerequisites

- **Python 3.9+**
- **Git**
- A GitHub account

### Getting Started

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/odse.git
cd odse

# Install in development mode with dev dependencies
pip install -e ".[dev]"

# Install pre-commit hooks
pre-commit install

# Verify your setup
odse --version
pytest
```

### Development Tools

| Tool | Purpose | Command |
|------|---------|---------|
| **pytest** | Run tests | `pytest` |
| **ruff** | Linting | `ruff check .` |
| **black** | Formatting | `black .` |
| **pre-commit** | Git hooks | Runs automatically on commit |

All of these run automatically in CI, but running them locally before pushing saves time.

---

## Ways to Contribute

### Documentation Improvements

The lowest barrier way to contribute. Documentation lives alongside the code and is always in need of:

- Fixing typos and grammar
- Improving clarity of explanations
- Adding code examples
- Updating screenshots or diagrams

**How to start:** Look for issues labelled `docs` or `good-first-issue`, or simply open a PR with your improvement.

### Adding & Labelling Issues

Good issue reports are extremely valuable. When filing an issue:

**Bug reports** should include:
- OEM and data format (e.g., "Huawei FusionSolar CSV export")
- Python version and `odse` version (`odse --version`)
- Minimal reproduction steps
- Expected vs actual output
- Sample data (anonymized — see [Data Privacy](#data-privacy) below)

**Feature requests** should include:
- The problem you're trying to solve
- Your proposed solution (if you have one)
- Which OEMs or schemas are affected

**Label taxonomy:**

| Label | Use for |
|-------|---------|
| `bug` | Something isn't working correctly |
| `enhancement` | New feature or improvement |
| `docs` | Documentation changes only |
| `oem-transform` | New or updated OEM transform |
| `good-first-issue` | Suitable for newcomers |
| `help-wanted` | Maintainers would appreciate help |

### Adding Transforms for New OEMs

This is the most impactful type of contribution. Each new OEM transform makes ODS-E useful to a wider community.

**Before you start:**
1. Check [existing transforms](./transforms) to see if your OEM is already supported
2. Search open issues and PRs to avoid duplicate work
3. Open an issue describing the OEM and data format you plan to support

**Submission checklist:**

- [ ] Transform YAML spec following the [transform specification format](./transforms#creating-custom-transforms)
- [ ] Sample input file (anonymized)
- [ ] Expected output file in ODS-E format
- [ ] Test cases covering normal operation, error states, and edge cases
- [ ] Documentation of OEM-specific quirks (timestamp formats, encoding, units)

**Naming convention:**
```
transforms/
├── oem-product.yaml          # e.g., huawei-fusionsolar.yaml
tests/transforms/
├── test_oem_product.py       # e.g., test_huawei_fusionsolar.py
├── fixtures/
│   ├── oem-product-input.*   # Sample input
│   └── oem-product-expected.json  # Expected output
```

For full details on the YAML spec format, field mappings, and error code mappings, see the [Transform Specifications](./transforms) page.

### Updating Existing OEM Transforms

OEMs periodically change their export formats, API responses, or error codes. When you encounter a change:

1. **Identify the change** — What fields moved, were added, or changed format?
2. **Update the YAML spec** — Modify the relevant `transforms/*.yaml` file
3. **Update error code mappings** — If new error codes appeared, classify them into the [7-category error taxonomy](./overview#error-taxonomy)
4. **Add regression tests** — Ensure the old format still works (if the OEM supports both) and the new format is handled correctly
5. **Document the change** — Note the OEM firmware/software version where the format changed

---

## PR Protocol

### Workflow

1. **Fork** the repository
2. **Branch** from `main` with a descriptive name
3. **Commit** your changes with clear messages
4. **Push** to your fork
5. **Open a PR** against `main`

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| New transform | `feat/oem-name` | `feat/sma-sunny-portal` |
| Bug fix | `fix/issue-number` | `fix/42-huawei-timestamp` |
| Documentation | `docs/description` | `docs/enphase-examples` |

### Commit Messages

Use [conventional commits](https://www.conventionalcommits.org/) and reference the issue number:

```
feat: add SMA Sunny Portal transform (#58)
fix: handle Huawei timezone offset in CSV export (#42)
docs: add Enphase Envoy API examples (#61)
```

### PR Requirements

Every PR must:

- **Pass CI** — Schema validation, tests, and linting must all be green
- **Have a clear description** — What changed, why, and how to test it
- **Include tests** — For code changes, not just documentation
- **Be focused** — One transform or one fix per PR; don't mix unrelated changes
- **Receive at least one maintainer review** before merging

---

## Good vs Bad Contributions

### What makes a good contribution

- **Focused and single-purpose** — One PR does one thing well
- **Tested** — Includes unit tests with sample input/output data
- **Follows existing patterns** — Uses the same YAML spec format, error taxonomy categories, and code style as existing transforms
- **Anonymized data** — Sample data contains no real site names, GPS coordinates, or customer information
- **Clear commit messages** — References the relevant issue and describes the "why"
- **Responsive to review** — Addresses feedback promptly and constructively

### What makes a bad contribution

- **Kitchen-sink PRs** — Multiple unrelated changes bundled together
- **Missing tests** — Code without corresponding test cases
- **New error categories** — ODS-E uses exactly [7 error categories](./overview#error-taxonomy) (`normal`, `warning`, `critical`, `fault`, `offline`, `standby`, `unknown`). Don't invent new ones; map OEM codes into the existing taxonomy
- **Real production data** — Never include identifiable customer data in samples
- **Ignoring CI** — PRs with failing linter or test runs won't be reviewed

### Data Privacy

When including sample data in your contribution:

- **Remove** real site names, asset IDs, and customer references
- **Randomize** GPS coordinates (or use `0.0, 0.0`)
- **Keep** realistic data patterns (timestamps, power values, error codes)
- **Limit** sample files to 10-50 rows — enough to test, not enough to identify

---

## Getting Help

If you're stuck, have questions, or want to discuss an idea before starting work:

- **Discord** — [Join our community](https://discord.gg/2MmDG2uTxX) for real-time discussion with maintainers and other contributors
- **GitHub Issues** — For bugs, feature requests, and technical questions
- **Email** — [support@asoba.co](mailto:support@asoba.co) for sensitive or security-related matters

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/2MmDG2uTxX" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
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
