# Spec‑Kit (Synthesized Overview)

A concise, actionable synthesis of the multiple reviews in `speckit.md`. This focuses on the AI/CLI Spec‑Kit that enables Specification‑Driven Development (SDD) with modern coding agents.

## What It Is

Spec‑Kit is an MIT‑licensed toolkit and CLI workflow that makes specifications the primary artifact. You write specs first, refine a plan, generate tasks, and have an AI agent implement them. It works with Copilot Chat, Claude Code, and Gemini CLI.

## Core Philosophy

- Specifications drive code, not the reverse.
- Separate “what/why” (spec) from “how” (plan/stack/architecture).
- Small, testable tasks enforce iteration and validation.
- Guardrails (constitution) keep implementation aligned with principles.

## Prerequisites

- Linux/macOS or Windows with WSL2
- Python 3.11+ and `uv`
- Git
- An AI coding agent: Copilot Chat, Claude Code, or Gemini CLI
- Optional: GitHub CLI for creating PRs from generated changes

## CLI and Key Commands

```bash
# Initialize a new project directory
uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>

# Or initialize in the current directory and choose agent
specify init --here --ai copilot|claude|gemini

# In your agent chat:
/specify <problem and intent, WHAT/WHY>
/plan <tech stack, constraints, architecture, HOW>
/tasks

# Generate code from a plan
implement specs/<feature>/plan.md
```

## End‑to‑End Workflow (SDD)

1. Initialize

- Purpose: Scaffold project, templates, and guardrails.
- Outputs: `specs/`, `memory/constitution.md`, `scripts/`, base templates.

2. Specify

- Purpose: Turn problem/intent into an executable spec.
- Command: `/specify <WHAT/WHY>`
- Outputs: `specs/<feature>/spec.md` with user stories, requirements, acceptance criteria.

3. Plan

- Purpose: Decide HOW to build it: stack, architecture, models, APIs.
- Command: `/plan <stack/constraints/architecture>`
- Outputs: `plan.md`; optionally `research.md` for deeper decisions and `contracts/` for API/schema/interface definitions.

4. Tasks

- Purpose: Break plan into small, verifiable units.
- Command: `/tasks`
- Outputs: `tasks.md` (or `tasks/`) mapped to the spec and plan.

5. Implement

- Purpose: Generate and iterate on working code.
- Command: `implement specs/<feature>/plan.md`
- Outputs: Source code, configuration, and tests according to the plan and tasks; optionally open a PR via GitHub CLI.

## Typical Artifacts

```
specs/
  001-<feature-slug>/
    spec.md        # problem, users, success, scope, acceptance
    plan.md        # architecture, stack, data models, APIs
    tasks.md       # granular, testable tasks
    research.md    # optional deep dives / decisions
    contracts/     # optional API/schema/interface files
memory/
  constitution.md  # project principles and guardrails
scripts/           # automation helpers
```

## Use Cases

- Greenfield projects: start from zero with clear specs → production.
- Creative exploration: A/B alternative stacks or UX patterns.
- Brownfield modernization: add capabilities and refactor iteratively.
- Enterprise constraints: align with compliance/design systems and org principles.

## Strengths

- Clarity and alignment via executable specs and plans.
- Iterative, testable tasks improve reliability and flow.
- Agent‑agnostic templates; avoids tool lock‑in.
- Works well for prototyping and parallel exploration.

## Potential Drawbacks

- AI dependency: outputs may need curation and refinement.
- Setup complexity: `uv`, local CLIs, and language toolchains may be required.
- Learning curve: structured flow can feel heavy for tiny projects.
- Risk of over‑engineering: requires human guidance to right‑size scope.

## Tips and Best Practices

- For `/specify`: emphasize problem, users, success criteria, and scope boundaries. Avoid implementation details.
- For `/plan`: be explicit about stack choices, constraints, and priorities; document trade‑offs.
- Keep tasks small and verifiable; prefer integration‑first testing where possible.
- Iterate: update spec → regenerate plan → refresh tasks as insights emerge.

## Naming Note (Avoid Confusion)

Some sources refer to a different, internal GitHub “Spec Kit” used for GraphQL schema workflows (e.g., `.graphql` files and the `graphql-schema` gem). This document focuses on the AI/CLI Spec‑Kit for SDD described above.

## Quickstart

1. `uvx --from git+https://github.com/github/spec-kit.git specify init acme-todo`
2. In your agent:
   - `/specify A lightweight task app for individuals...`
   - `/plan Use Next.js + SQLite for speed...`
   - `/tasks`
3. `implement specs/001-acme-todo/plan.md`
4. Build, run, and iterate; open a PR when stable.

---

For links and deeper references, see the official repository: https://github.com/github/spec-kit
