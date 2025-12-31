---
layout: default
---
# Guide: Developer Guide

This guide provides the core principles and processes for developers contributing to the Ona Intelligence Layer platform. Adherence to these guidelines is mandatory to ensure code quality, continuity, and accountability.

## Core Principles

### 1. EXPLORE > PLAN > CONFIRM > CODE > VALIDATE > DEPLOY
**NEVER write code without following this exact sequence:**

1.  **EXPLORE**:
    *   **ALWAYS start by reviewing relevant documentation.**
    *   **CRITICAL: Review the project's architectural first principles.** This document encodes verified patterns (especially for CORS, error handling, and response formats) that MUST be reused.
    *   Thoroughly examine the codebase to understand existing patterns, functions, and architecture.
    *   Search for similar implementations to understand established patterns.
2.  **PLAN**: Write out a detailed plan of what needs to be changed and how.
3.  **CONFIRM**: Present the exact plan to the user and get explicit approval before proceeding.
4.  **CODE**: Implement only the minimal changes necessary.
5.  **VALIDATE**: Run all safety checkers and test functionality.
6.  **DEPLOY**: Only deploy after validation passes.

### 2. Codebase Continuity
- **Think harder and thoroughly examine similar areas of the codebase** to ensure your proposed approach fits seamlessly with the established patterns and architecture.
- **Aim to make only minimal and necessary changes**, avoiding any disruption to the existing design.
- **Whenever possible, take advantage of components, utilities, or logic that have already been implemented** to maintain consistency and reduce duplication.

### 3. Issue-Driven Development
**ALL work must reference an existing GitHub issue.**

- **NEVER create code without an associated issue.**
- **Reference the issue number in all commit messages** (e.g., "feat: add freemium forecast endpoint (#42)").
- **Update the issue status as work progresses** (e.g., Backlog → Ready → In progress → In review → Done).

## Pre-Code Checklist

Before writing ANY code, answer these questions:

1.  **Is there a GitHub issue for this work?** (If not, create one or ask the user to create it).
2.  **Have I reviewed the architectural first principles?**
3.  **What does the existing documentation say?**
4.  **What already exists in the codebase?** (Search for similar implementations).
5.  **What is the minimal change needed?** (Avoid over-engineering).
6.  **Have I checked for duplicate functions or components?**

## Human Decision Gate

**CRITICAL**: After completing the PLAN phase, you MUST:

1.  **Present the exact plan** to the user with specific details of what will be changed.
2.  **List all files** that will be modified.
3.  **List all functions/components** that will be added/modified/removed.
4.  **STOP AND WAIT** for explicit user approval before proceeding to the CODE phase.

## Code Quality and Deployment

*   **No Duplicate Functions**: Always modify or extend existing functions before creating new ones.
*   **Consistent Naming**: Follow established naming patterns.
*   **Safety Checks**: All safety checkers (JavaScript, Python, Shell) must pass before deployment.
*   **Testing**: Verify that your changes work as expected and have not broken existing functionality.
*   **Commits**: Write clear, concise commit messages that reference the relevant issue number.
*   **Issue Updates**: Close the issue on GitHub only after the changes have been deployed and verified.
