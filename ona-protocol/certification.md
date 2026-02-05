# Certification Program

The ODS-E Certification Program establishes quality tiers for implementations and data exports. Certification validates that your platform correctly implements the specification.

## Certification Tiers

```
┌─────────────────────────────────────────────────────────────────────┐
│  TIER 4: Ona Intelligence Ready™                                    │
│  ────────────────────────────────────────────────────────────────── │
│  Full validation + analytics compatibility                          │
│  $5,000 + partnership agreement                                     │
├─────────────────────────────────────────────────────────────────────┤
│  TIER 3: ODS-E Certified™                                           │
│  ────────────────────────────────────────────────────────────────── │
│  Schema + semantic + quality validation                             │
│  $1,500/year                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  TIER 2: ODS-E Validated                                            │
│  ────────────────────────────────────────────────────────────────── │
│  Automated schema validation                                        │
│  $100/validation                                                    │
├─────────────────────────────────────────────────────────────────────┤
│  TIER 1: ODS-E Compatible                                           │
│  ────────────────────────────────────────────────────────────────── │
│  Self-declared, no verification                                     │
│  Free                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tier 1: Compatible

**Cost**: Free
**Verification**: None

### What You Can Claim

- "Exports ODS-E format"
- "ODS-E compatible"

### What You Cannot Claim

- "ODS-E Certified"
- "ODS-E Validated"
- Use of certification marks

### Requirements

Self-declare that your implementation:
1. Produces JSON matching the production-timeseries schema
2. Uses the standard error_type enum values
3. Outputs ISO 8601 timestamps

---

## Tier 2: Validated

**Cost**: $100 per validation
**Verification**: Automated

### Process

1. Submit sample data file (minimum 1,000 records)
2. Run automated validation suite
3. Receive validation report

### Test Suite

```bash
# Run Tier 2 validation locally
ods-e certify --tier 2 sample_data.json
```

**Tests performed:**

| Test | Pass Criteria |
|------|---------------|
| Schema compliance | 100% records pass JSON Schema validation |
| Required fields | All records have timestamp, kWh, error_type |
| Type correctness | All fields match expected types |
| Enum compliance | All error_type values in allowed enum |
| Timestamp format | All timestamps valid ISO 8601 with timezone |

### Output

```json
{
  "tier": 2,
  "status": "passed",
  "records_tested": 1000,
  "tests": {
    "schema_compliance": {"passed": true, "errors": 0},
    "required_fields": {"passed": true, "errors": 0},
    "type_correctness": {"passed": true, "errors": 0},
    "enum_compliance": {"passed": true, "errors": 0},
    "timestamp_format": {"passed": true, "errors": 0}
  },
  "validation_id": "VAL-2026-00123",
  "validated_at": "2026-02-05T14:00:00Z"
}
```

### What You Can Claim

- "ODS-E Validated"
- Reference validation ID in documentation

---

## Tier 3: ODS-E Certified™

**Cost**: $1,500/year
**Verification**: Automated + manual review

### Process

1. Submit certification application
2. Provide sample data (minimum 10,000 records, 7+ days)
3. Automated test suite runs
4. Manual review of edge cases
5. Receive certification or remediation report
6. Annual recertification required

### Test Suite

All Tier 2 tests, plus:

| Test | Pass Criteria |
|------|---------------|
| Physical plausibility | kWh values within physical bounds |
| Temporal consistency | Monotonic timestamps, expected intervals |
| Error code fidelity | Correct mapping of OEM codes to taxonomy |
| Completeness | Gap analysis passes thresholds |
| Cross-field consistency | Power factor bounds, state/production alignment |

### Thresholds

| Metric | Required |
|--------|----------|
| Schema compliance | 100% |
| Physical plausibility | ≥ 99.5% |
| Temporal consistency | ≥ 99% |
| Completeness | ≥ 95% |

### Benefits

- **Certification mark**: Use "ODS-E Certified™" logo
- **Directory listing**: Listed on ona-protocol.org/certified
- **Trademark license**: Permission to use ODS-E trademarks in marketing
- **Support channel**: Access to certification support

### Certification Mark

```
┌────────────────────────┐
│   ✓ ODS-E Certified    │
│      2026              │
└────────────────────────┘
```

Usage requirements:
- Must link to ona-protocol.org/certified
- Must display certification year
- Must recertify annually to maintain mark

---

## Tier 4: Ona Intelligence Ready™

**Cost**: $5,000 + partnership agreement
**Verification**: Asoba technical review

### Process

1. Complete Tier 3 certification
2. Submit partnership application
3. Technical integration review
4. API integration testing
5. Certification + partnership agreement

### Additional Tests

| Test | Purpose |
|------|---------|
| Physics validation compatibility | Data works with anomaly detection |
| Interpolation compatibility | Gap filling produces valid results |
| Forecasting data requirements | Sufficient history and quality for LSTM |
| Carbon tracking attributes | Required fields for carbon calculation |
| API integration | Direct data submission works correctly |

### Requirements

- All Tier 3 requirements
- Minimum 30 days historical data
- Completeness ≥ 98%
- GPS coordinates for all assets
- Capacity values for all assets

### Benefits

- Everything in Tier 3
- **API access**: Direct integration with Ona Intelligence Layer
- **Priority support**: Dedicated technical contact
- **Co-marketing**: Joint case studies and announcements
- **Roadmap input**: Early access to spec changes

---

## Certification Process

### Timeline

| Stage | Duration |
|-------|----------|
| Application review | 1-2 business days |
| Test suite execution | Automated (minutes) |
| Manual review (Tier 3+) | 3-5 business days |
| Remediation (if needed) | Varies |
| Certification issued | 1 business day |

### Application

**Online**: ona-protocol.org/certify

**Required information**:
- Company name and contact
- Platform/product name
- OEM(s) supported
- Sample data file
- Technical documentation link

### Remediation

If certification fails:

1. Receive detailed error report
2. 30-day remediation window
3. One free re-test included
4. Additional re-tests: $50 each

### Annual Renewal

Tier 3 certification requires annual renewal:
- Automated re-test against current spec
- $1,500 renewal fee
- 30-day grace period after expiration

---

## Self-Certification Tools

### Local Testing

```bash
# Install certification tools
pip install ods-e[certify]

# Run Tier 2 tests locally
ods-e certify --tier 2 my_data.json

# Run Tier 3 tests (requires capacity info)
ods-e certify --tier 3 my_data.json --capacity 500 --location -26.2,28.0

# Generate certification report
ods-e certify --tier 3 my_data.json --report certification_report.pdf
```

### Test Data Requirements

| Tier | Records | Duration | Assets |
|------|---------|----------|--------|
| Tier 2 | ≥ 1,000 | Any | 1+ |
| Tier 3 | ≥ 10,000 | ≥ 7 days | 1+ |
| Tier 4 | ≥ 50,000 | ≥ 30 days | 1+ |

### Sample Test Output

```
$ ods-e certify --tier 3 production_data.json --capacity 500

ODS-E Certification Test Suite - Tier 3
========================================

Data Summary:
  Records: 15,840
  Duration: 11 days (2026-01-25 to 2026-02-05)
  Assets: 1

Tier 2 Tests:
  ✓ Schema compliance      15840/15840 (100.0%)
  ✓ Required fields        15840/15840 (100.0%)
  ✓ Type correctness       15840/15840 (100.0%)
  ✓ Enum compliance        15840/15840 (100.0%)
  ✓ Timestamp format       15840/15840 (100.0%)

Tier 3 Tests:
  ✓ Physical plausibility  15823/15840 (99.89%)
  ✓ Temporal consistency   15800/15840 (99.75%)
  ✓ Error code fidelity    15840/15840 (100.0%)
  ✓ Completeness           96.2% (threshold: 95%)
  ✓ Cross-field consistency 15812/15840 (99.82%)

Result: PASSED

To submit for official certification:
  ods-e certify --submit production_data.json
```

---

## Trademark Usage

### Permitted Uses

After certification:

```
✓ "Our platform is ODS-E Certified™"
✓ "Exports ODS-E Certified™ data"
✓ Display certification mark with year
✓ Link to certification listing
```

### Prohibited Uses

```
✗ "ODS-E Certified" without valid certification
✗ "ODS-E" in product names without permission
✗ Certification mark without active certification
✗ Implying Asoba endorsement beyond certification
```

### Mark Guidelines

- Minimum size: 50px height
- Clear space: 10px on all sides
- Do not modify colors or proportions
- Always include certification year
- Link to ona-protocol.org/certified

---

## FAQ

### How long does certification take?

Tier 2: Same day (automated)
Tier 3: 5-7 business days
Tier 4: 2-3 weeks

### What if my data has gaps?

Gaps are expected in real-world data. Tier 3 requires ≥95% completeness, meaning up to 5% missing intervals are acceptable. Document expected gaps (maintenance windows, connectivity issues) in your application.

### Can I certify multiple OEMs?

Yes. Each OEM/platform combination requires separate certification. Bundle pricing available for 3+ certifications.

### What happens if the spec changes?

Major version changes (1.x → 2.x) require recertification. Minor versions (1.0 → 1.1) maintain certification with 12-month transition period.

### Is certification transferable?

No. Certification applies to specific product versions. New versions require recertification (at reduced fee for minor updates).
