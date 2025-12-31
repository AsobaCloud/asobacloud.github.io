# AI Execution Prompt: Documentation IA Uplift

**CRITICAL**: This is a **one-shot execution prompt**. Follow instructions exactly. No interpretation allowed.

## Instructions

1. **READ ONLY**: `DOCUMENTATION_IA_GUIDE.md` → [Execution Plan](#execution-plan) section
2. **IGNORE**: All other sections in `DOCUMENTATION_IA_GUIDE.md` (they are reference only)
3. **EXECUTE**: Follow [Execution Order](#execution-order-deterministic) exactly
4. **VALIDATE**: Run all [Acceptance Criteria](#acceptance-criteria-machine-checkable) checks
5. **STOP**: If any check fails, report error and stop

## What You Must Do

### Step 1: Read Execution Plan
- Open `DOCUMENTATION_IA_GUIDE.md`
- Scroll to section: "⚡ EXECUTION PLAN (One-Shot Ready)"
- Read ONLY these subsections:
  - Scope Declaration
  - Deterministic Migration Map
  - Mechanical Rewrite Rules
  - Acceptance Criteria
  - Execution Order
- **DO NOT** read any other sections

### Step 2: Execute Migration Map
- For each row in the migration map:
  - If Action = **MOVE**: Move file from Source to Target
  - If Action = **CREATE**: Create new file at Target
  - If Action = **REWRITE**: Replace entire file content
  - If Action = **MODIFY**: Update file per rules
  - If Action = **KEEP**: Leave file unchanged
- Execute in exact order listed

### Step 3: Apply Rewrite Rules
- For each file modified:
  - Apply all applicable rules from "Mechanical Rewrite Rules"
  - No exceptions
  - No interpretation

### Step 4: Run Validation
- Execute all bash scripts from "Acceptance Criteria"
- If ANY script exits with non-zero → STOP and report
- Do NOT proceed if validation fails

## What You Must NOT Do

- ❌ Read design philosophy sections
- ❌ Interpret abstractions as instructions
- ❌ Modify files outside scope
- ❌ Skip validation steps
- ❌ Continue after validation failure
- ❌ Add content not in migration map
- ❌ Modify files not listed in migration map

## Success Criteria

The uplift is **COMPLETE** when:
- ✅ All files in migration map exist at target paths
- ✅ All acceptance criteria checks pass
- ✅ No out-of-scope files modified
- ✅ No TODOs or placeholders remain

## If You Encounter Ambiguity

**STOP** and ask:
- Is this in the migration map? → Execute exactly as specified
- Is this in scope? → If no, do not modify
- Does this violate rewrite rules? → If yes, do not do it

**DO NOT**:
- Interpret "outcome-focused" as an instruction
- Create new files not in migration map
- Modify files outside scope

## Reference

- **Execution Plan**: `DOCUMENTATION_IA_GUIDE.md` → Section "⚡ EXECUTION PLAN"
- **All other sections**: Reference only, do not execute

---

**Remember**: This is a deterministic, machine-actionable plan. No interpretation. No creativity. Execute exactly as specified.
