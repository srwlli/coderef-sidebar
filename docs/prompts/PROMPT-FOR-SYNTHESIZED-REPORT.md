agent_prompt:
task: "Synthesize multiple agent app reports into a single consolidated report."

input_files: - "claude-app-report.md" - "codex-app-report.md" - "gemini-app-report.md"

instructions: - "Read the listed app reports." - "Identify overlapping content and unify terminology." - "Merge insights from all reports into a single synthesized perspective." - "Highlight areas of consensus across agents." - "Include unique contributions from each report without duplication." - "Structure the final output using COSTAR (Context, Objective, Style, Tone, Audience, Response)." - "Apply curated vocabulary (Action + Scope + Modifier + Output)." - "Ensure the final report includes tech stack, UI design, workflow, architecture, deployment, and strategic value." - "Save the consolidated report as [[{{agent_name}}]]-app-synthesis.md in the root directory."

output:
location: "./"
filename_pattern: "[[{{agent_name}}]]-app-synthesis.md"
format: "markdown"
validation: - "Filename MUST follow the pattern [[agent]]-app-synthesis.md." - "Agent name MUST be lowercase with no spaces." - "Save ONLY in project root." - "Reject if filename does not comply."

deliverable:
sections: - metadata:
last_updated: "{{date}}"
version: "1.0"
maintainer: "{{team_or_person}}" - context: "{{consolidated_context}}" - objective: - "{{consolidated_purpose}}" - "{{consolidated_workings}}" - "{{consolidated_value}}" - tech_stack: "{{merged_technologies_frameworks}}" - ui_design: "{{synthesized_ui_strategy}}" - workflow: "{{consolidated_user_and_system_flows}}" - architecture: "{{integrated_architecture_overview}}" - api_integration: "{{unified_endpoints_and_authentication}}" - deployment: "{{recommended_deployment_strategy}}" - value: "{{combined_business_and_technical_value}}"
