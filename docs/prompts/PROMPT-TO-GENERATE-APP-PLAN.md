agent_prompt:
name: "agent-app-roadmap"
framework: "POWER"
task: "Produce a precise, phased, step-by-step roadmap to set up, install, and begin coding the app—without generating code."
input_files: - "agent-app-plan.md" - "agent-app-report.md"

output:
location: "./"
filename_pattern: "{{agent_name}}-app-roadmap.md"
format: "markdown"
validation: - "Output MUST be a .md file in project root." - "Filename MUST match {{agent_name}}-app-roadmap.md (lowercase, no spaces)." - "Reject if filetype/location/pattern do not comply."

constraints: - "Do NOT generate code, commands, or snippets." - "Write imperatives as steps; keep them tool-agnostic." - "Use numbered phases and numbered steps within each phase." - "Include acceptance criteria, owners, and estimates as placeholders."

power:
purpose: >
Create a clear, execution-ready roadmap that teams can follow to prepare the environment,
install dependencies, configure the app, verify quality gates, and start feature work.
o: >
Deliver a phased plan (0→11) with numbered steps, dependencies, and acceptance criteria,
referencing insights from agent-app-plan.md and agent-app-report.md.
work: >
Parse input files to extract tech stack, modules, APIs, schemas, and conventions; align roadmap
with these details while remaining code-free and tool-agnostic.
examples: >
Provide structured phases and steps only (no commands). Use placeholders for tool names,
versions, and paths (e.g., {{package_manager}}, {{node_version}}, {{env_file}}).
requirements: >
Each phase must include: scope, numbered steps, acceptance_criteria, owner, duration_estimate,
dependencies. No code blocks. Keep style concise and actionable.

deliverable:
sections: - metadata:
last_updated: "{{date}}"
version: "1.0"
maintainer: "{{team_or_person}}" - roadmap:
phase_0_prerequisites_audit:
scope: "Verify baseline OS, runtimes, package manager, and permissions."
steps: - "Inventory required runtimes from inputs (e.g., {{node_version}})." - "Confirm {{package_manager}} policy and lockfile ownership." - "Validate toolchain versions meet minimums."
acceptance_criteria: "All minimum versions documented; risks noted."
owner: "{{owner_devops}}"
duration_estimate: "{{hours_0}}"
dependencies: []
phase_1_repo_bootstrap:
scope: "Prepare repository access and local workspace."
steps: - "Obtain repo URL(s) and branch strategy." - "Clone repository and configure remotes." - "Set global/project git settings per conventions."
acceptance_criteria: "Repo cloned; branch policy documented."
owner: "{{owner_devlead}}"
duration_estimate: "{{hours_1}}"
dependencies: ["phase_0_prerequisites_audit"]
phase_2_dependencies_install:
scope: "Install all dependencies without code execution examples."
steps: - "Identify package manager from inputs." - "Install dependencies respecting lockfile and scripts policy." - "Document post-install checks."
acceptance_criteria: "Dependencies installed; no audit blockers."
owner: "{{owner_dev}}"
duration_estimate: "{{hours_2}}"
dependencies: ["phase_1_repo_bootstrap"]
phase_3_configuration_secrets:
scope: "Configure environment variables and local config."
steps: - "Create {{env_file}} from sample; fill required keys." - "Document secrets handling and storage rules." - "Validate config via dry checks (no commands shown)."
acceptance_criteria: "{{env_file}} present; required keys listed."
owner: "{{owner_security}}"
duration_estimate: "{{hours_3}}"
dependencies: ["phase_2_dependencies_install"]
phase_4_local_run_readiness_check:
scope: "Confirm app can be started locally (describe, not execute)."
steps: - "List pre-run prerequisites (ports, services)." - "Define expected health indicators and URLs." - "Capture common startup issues from plan/report."
acceptance_criteria: "Readiness checklist complete with expected outcomes."
owner: "{{owner_dev}}"
duration_estimate: "{{hours_4}}"
dependencies: ["phase_3_configuration_secrets"]
phase_5_quality_gates:
scope: "Lint, format, test, and type-check baselines."
steps: - "Identify tooling from inputs ({{linter}}, {{formatter}}, {{test_runner}}, {{type_checker}})." - "Define pass/fail thresholds and coverage targets." - "Record remediation workflow for failures."
acceptance_criteria: "Quality gates defined; thresholds approved."
owner: "{{owner_qe}}"
duration_estimate: "{{hours_5}}"
dependencies: ["phase_4_local_run_readiness_check"]
phase_6_project_structure_alignment:
scope: "Standardize folders/modules to match architecture."
steps: - "Map modules/components to agreed structure." - "Define naming and import path conventions." - "Document boundaries and ownership."
acceptance_criteria: "Structure map approved; no conflicts."
owner: "{{owner_arch}}"
duration_estimate: "{{hours_6}}"
dependencies: ["phase_5_quality_gates"]
phase_7_api_data_integration_prep:
scope: "Prepare API endpoints and schema usage (no code)."
steps: - "List required endpoints with auth patterns." - "Align data models with schemas and validation." - "Define mock/stub strategy for early development."
acceptance_criteria: "API+schema contract documented."
owner: "{{owner_backend}}"
duration_estimate: "{{hours_7}}"
dependencies: ["phase_6_project_structure_alignment"]
phase_8_ci_cd_scaffold:
scope: "Define CI/CD pipeline stages and triggers."
steps: - "Specify checks (install, build, tests, lint, type)." - "Define artifact, env promotion, and approvals." - "Record secrets and cache policies."
acceptance_criteria: "Pipeline spec approved."
owner: "{{owner_devops}}"
duration_estimate: "{{hours_8}}"
dependencies: ["phase_7_api_data_integration_prep"]
phase_9_observability_security_baseline:
scope: "Establish logs, metrics, traces, and security controls."
steps: - "Select logging/metrics strategy aligned with stack." - "Define error handling and alert thresholds." - "Document dependency/license and vuln scan cadence."
acceptance_criteria: "Runbooks and policies documented."
owner: "{{owner_sre}}"
duration_estimate: "{{hours_9}}"
dependencies: ["phase_8_ci_cd_scaffold"]
phase_10_developer_onboarding_docs:
scope: "Create minimal onboarding path."
steps: - "Write quickstart (no commands), workflow, and conventions." - "Add FAQ and common issues from report/plan." - "Define PR/CR checklist."
acceptance_criteria: "Docs reviewed; new dev completes setup unaided."
owner: "{{owner_devrel}}"
duration_estimate: "{{hours_10}}"
dependencies: ["phase_9_observability_security_baseline"]
phase_11_ready_to_code_gate:
scope: "Finalize readiness to begin feature development."
steps: - "Confirm all prior acceptance criteria met." - "Select initial tickets with definitions of done." - "Schedule kickoff and responsibilities."
acceptance_criteria: "Go/No-Go recorded; coding may begin."
owner: "{{owner_pm}}"
duration_estimate: "{{hours_11}}"
dependencies: ["phase_10_developer_onboarding_docs"]
