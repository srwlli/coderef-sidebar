// App Generation Prompt Chain - 4 Steps
// To be integrated into the prompts page

export const appGenerationChainSteps = [
  {
    title: 'Step 1: App Report Generation',
    description:
      'Generate comprehensive project report by scanning all modules and synthesizing knowledge',
    content: `<project_report_generation>
  <output>
    <filename_pattern>{{agent_name}}-app-report.md</filename_pattern>
    <format>markdown</format>
  </output>

  <instructions>
    <step>Scan the project directory recursively.</step>
    <step>Identify all modules: each contains README.md, ARCHITECTURE.md, COMPONENTS.md, API.md, and SCHEMA.md.</step>
    <step>For each module, read files in order: README → ARCHITECTURE → COMPONENTS → API → SCHEMA.</step>
    <step>Extract knowledge incrementally and update the project report.</step>
    <step>Maintain a consolidated knowledge graph across all modules.</step>
    <step>Cross-link modules if APIs or schemas reference each other.</step>
    <step>Enforce COSTAR framework structure.</step>
  </instructions>

  <response_structure>
    <context>{{system_overview}}</context>
    <objective>
      <what_it_is>{{project_overview}}</what_it_is>
      <how_it_works>{{workflow_description}}</how_it_works>
      <value>{{strategic_value}}</value>
    </objective>
    <audience>
      <technical_leads>{{integration_focus}}</technical_leads>
      <developers>{{implementation_focus}}</developers>
      <stakeholders>{{business_focus}}</stakeholders>
    </audience>
  </response_structure>

save_as: {{agent_name}}-app-report.md
store_as: app_report`,
  },
  {
    title: 'Step 2: App Idea & Build Plan',
    description:
      'Review documentation and create consolidated build plan with tech stack and architecture',
    content: `<agent_prompt name="agent-app-idea">
  <task>Review project documentation and create a build plan.</task>

  <instructions>
    <step>Scan for all modules using {{app_report}} from Step 1.</step>
    <step>Extract information about tech stack, dependencies, and environment.</step>
    <step>Analyze UI components and user interaction patterns.</step>
    <step>Derive workflow and data flow from architecture and schema.</step>
    <step>Summarize API endpoints, authentication, and integration points.</step>
    <step>Cross-reference modules to identify interdependencies.</step>
    <step>Propose consolidated build plan with deployment strategy.</step>
    <step>Format output using COSTAR framework.</step>
  </instructions>

  <deliverable>
    <filename>{{agent_name}}-app-idea.md</filename>
    <sections>
      <tech_stack>{{technologies_frameworks_libraries}}</tech_stack>
      <ui_design>{{ui_components_and_layout}}</ui_design>
      <workflow>{{user_and_system_workflows}}</workflow>
      <architecture>{{system_architecture_and_data_flows}}</architecture>
      <api_integration>{{endpoints_and_authentication}}</api_integration>
      <deployment>{{deployment_strategy_and_environment}}</deployment>
      <value>{{strategic_and_business_value}}</value>
    </sections>
  </deliverable>

save_as: {{agent_name}}-app-idea.md
store_as: app_idea`,
  },
  {
    title: 'Step 3: Synthesized Report',
    description:
      'Merge insights from multiple agent reports into unified perspective',
    content: `agent_prompt:
  task: "Synthesize multiple agent app reports into consolidated report."

  input_files:
    - "{{app_report}}" # From Step 1
    - "{{app_idea}}" # From Step 2
    - "Other agent reports if available"

  instructions:
    - "Read the app reports from previous steps."
    - "Identify overlapping content and unify terminology."
    - "Merge insights into a single synthesized perspective."
    - "Highlight areas of consensus across agents."
    - "Include unique contributions without duplication."
    - "Structure using COSTAR framework."
    - "Apply curated vocabulary (Action + Scope + Modifier + Output)."
    - "Include tech stack, UI, workflow, architecture, deployment, value."

  output:
    filename_pattern: "{{agent_name}}-app-synthesis.md"
    format: "markdown"

  deliverable:
    sections:
      - context: "{{consolidated_context}}"
      - objective:
          - "{{consolidated_purpose}}"
          - "{{consolidated_workings}}"
          - "{{consolidated_value}}"
      - tech_stack: "{{merged_technologies_frameworks}}"
      - ui_design: "{{synthesized_ui_strategy}}"
      - workflow: "{{consolidated_user_and_system_flows}}"
      - architecture: "{{integrated_architecture_overview}}"
      - deployment: "{{recommended_deployment_strategy}}"

save_as: {{agent_name}}-app-synthesis.md
store_as: app_synthesis`,
  },
  {
    title: 'Step 4: Implementation Roadmap',
    description:
      'Create phased execution plan with 12 phases from prerequisites to ready-to-code',
    content: `agent_prompt:
  name: "agent-app-roadmap"
  framework: "POWER"
  task: "Produce phased roadmap to setup, install, and begin coding."

  input_files:
    - "{{app_report}}" # From Step 1
    - "{{app_idea}}" # From Step 2
    - "{{app_synthesis}}" # From Step 3

  constraints:
    - "Do NOT generate code, commands, or snippets."
    - "Write imperatives as steps; keep tool-agnostic."
    - "Use numbered phases and steps within each phase."
    - "Include acceptance criteria, owners, and estimates."

  power:
    purpose: Create execution-ready roadmap for environment prep and feature work.
    o: Deliver phased plan (0→11) with steps, dependencies, and criteria.
    work: Parse inputs for tech stack, modules, APIs, schemas; align roadmap.
    examples: Structured phases only (no commands), use placeholders.
    requirements: Each phase includes: scope, steps, criteria, owner, duration.

  roadmap_phases:
    - phase_0: Prerequisites Audit
    - phase_1: Repo Bootstrap
    - phase_2: Dependencies Install
    - phase_3: Configuration & Secrets
    - phase_4: Local Run Readiness
    - phase_5: Quality Gates
    - phase_6: Project Structure
    - phase_7: API/Data Integration
    - phase_8: CI/CD Scaffold
    - phase_9: Observability & Security
    - phase_10: Developer Onboarding
    - phase_11: Ready-to-Code Gate

save_as: {{agent_name}}-app-roadmap.md`,
  },
  {
    title: 'Step 5: UI Mockup Generation',
    description:
      'Generate static HTML mockup showing application structure and layout for visualization',
    content: `<prompt name="app-mock" framework="COSTAR">
  <task>Read project files and generate a UI mockup in HTML.</task>

  <input_files>
    - "{{app_report}}" # From Step 1
    - "{{app_idea}}" # From Step 2
    - "{{app_synthesis}}" # From Step 3
    - "{{app_roadmap}}" # From Step 4
    - "README.md, ARCHITECTURE.md, COMPONENTS.md, API.md, SCHEMA.md"

  <output>
    <filename_pattern>{{agent_name}}-app-mock.html</filename_pattern>
    <format>html</format>
    <location>project root</location>

  <instructions>
    <step>Scan directory for project documentation and components.</step>
    <step>Extract structural and UI details from COMPONENTS.md, API.md, and ARCHITECTURE.md.</step>
    <step>Mock up UI layout in plain HTML (semantic markup only).</step>
    <step>Include sections: header, sidebar/nav, main content, footer.</step>
    <step>Create placeholder HTML elements for each module/component.</step>
    <step>Do not implement functionality — mockup for layout reference only.</step>

  <costar>
    <context>Project documentation exists and must be converted into UI mockup for visualization.</context>
    <objective>Generate static HTML mockup showing application structure and layout.</objective>
    <style>Semantic HTML, minimal, readable using div, section, header, footer, nav, article elements.</style>
    <tone>Concise, technical, structured.</tone>
    <audience>
      <developers>Structural reference for coding UI.</developers>
      <designers>Visualize component placement and hierarchy.</designers>
    </audience>
    <response>
      <sections>Header | Navigation Sidebar | Main Content | Component Placeholders | Footer</sections>
    </response>
  </costar>

save_as: {{agent_name}}-app-mock.html`,
  },
];
