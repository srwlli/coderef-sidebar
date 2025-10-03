'use client';

import { CodeScanChainContainer } from '@/components/collapsibles/CodeScanChainContainer';
import CollapsiblePrompt from '@/components/collapsibles/CollapsiblePrompt';
import { appGenerationChainSteps } from './app-generation-chain';
import { Brain, Rocket, Settings, FileText, Users } from 'lucide-react';

export default function PromptsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Prompt Engineer Instructions */}
          <CollapsiblePrompt
            title="Prompt Engineer Instructions"
            icon={<Settings className="h-5 w-5" />}
            description="Complete operating instructions for structured prompt engineering using COSTAR, POWER, Five S, and CRISPE frameworks with XML standards and controlled vocabulary."
            content={`<operating_instructions>
  <sources>
    <file>prompt-engineer-guide.md</file>
    <file>prompt-engineer-framework.md</file>
    <file>prompt-engineer-xml-guide.md</file>
    <file>prompt-engineer-report-output-template.md</file>
    <file>prompt-engineer-vocabulary.md</file>
  </sources>

  <core_principles>
    <principle>Use COSTAR, POWER, Five S, and CRISPE frameworks</principle>
    <principle>Apply structured, modular, and maintainable methods</principle>
    <principle>Enforce strict word count ranges</principle>
    <principle>Deliver outputs as Blueprints, Specifications, Reports, Checklists, or Guides</principle>
    <principle>Validate outputs against templates</principle>
  </core_principles>

  <frameworks>
    <COSTAR>Context, Objective, Style, Tone, Audience, Response</COSTAR>
    <POWER>Purpose, Output, Work, Examples, Requirements</POWER>
    <FiveS>Scene, Task, Simplify, Structure, Feedback</FiveS>
    <CRISPE>Role, Insight, Statement, Personality, Experiment</CRISPE>
  </frameworks>

  <xml_standards>
    <rule>Use structured XML schemas for prompts and work orders</rule>
    <rule>Include context, objective, tasks, deliverables, acceptance_criteria, metadata</rule>
    <rule>Ensure binary pass/fail states</rule>
    <rule>Avoid ambiguity—verbs explicit, scope restricted, outputs measurable</rule>
  </xml_standards>

  <report_template>
    <sections>
      <section>Overview</section>
      <section>Findings</section>
      <section>Recommendations</section>
      <section>Validation</section>
    </sections>
    <requirement>Attach validation checklist to reports</requirement>
  </report_template>

  <vocabulary>
    <formula>Action + Scope + Modifier + Output</formula>
    <rule>No vague verbs</rule>
    <rule>Concrete, measurable actions only</rule>
    <rule>Maintain consistent terminology</rule>
    <example>Analyze + Codebase + Optimized + Blueprint</example>
  </vocabulary>

  <word_counts>
    <short>75 ±5 words</short>
    <medium>100 ±5 words</medium>
    <long>150 ±10 words</long>
    <report>200 ±10 words</report>
  </word_counts>

  <summary>
    Use frameworks with XML-structured outputs, controlled vocabulary, reporting templates,
    and word count rules. Produce only requested output types and maintain deterministic compliance.
  </summary>
</operating_instructions>`}
          />

          {/* Documentation Prompt Chain */}
          <CodeScanChainContainer
            title="Documentation Prompt Chain (5-Step)"
            icon={<Brain className="h-5 w-5" />}
            steps={[
              {
                title: 'Step 1: README Generation',
                description:
                  'Generate README.md as the discovery entry document with overview, quickstart, and usage examples',
                content: `framework: POWER

purpose: Generate README.md as the discovery entry document.

output: Must follow required header/footer format with [Project Name], [Date], [Version], [Maintainer]. Include overview, quickstart steps, usage examples, prerequisites, and troubleshooting patterns.

work: Scan project root, configs, and entry points. Do not modify code.

examples:
- Installation command with sample output
- Common error message and resolution

requirements: Must include command sequences, decision trees, and AI-focused footer.

save_as: README.md
store_as: readme_summary`,
              },
              {
                title: 'Step 2: Architecture Documentation',
                description:
                  'Generate ARCHITECTURE.md as the system design reference with topology and data flow',
                content: `framework: POWER

purpose: Generate ARCHITECTURE.md as the system design reference.

output: Must follow required header/footer with [Date] and [Version]. Include topology, module boundaries, stack decisions, and data flow. Reference project overview from README.md ({{readme_summary}}).

work: Parse structure and dependency graphs. Scan only.

examples:
- ASCII diagram of system topology
- Dependency map with explanation

requirements: Must include rationale for design choices and AI-focused footer.

save_as: ARCHITECTURE.md
store_as: architecture_summary`,
              },
              {
                title: 'Step 3: API Documentation',
                description:
                  'Generate API.md as the technical interface reference with endpoints and schemas',
                content: `framework: POWER

purpose: Generate API.md as the technical interface reference.

output: Must follow required header/footer with [Date] and [Version]. Document endpoints, schemas, authentication, and error handling. Reference README.md ({{readme_summary}}) and ARCHITECTURE.md ({{architecture_summary}}).

work: Parse controllers, routes, and services. No execution.

examples:
- cURL request and response sample
- Error response JSON object

requirements: Must include pagination, rate limits, and AI-focused footer.

save_as: API.md
store_as: api_summary`,
              },
              {
                title: 'Step 4: Components Documentation',
                description:
                  'Generate COMPONENTS.md as the component library reference with props and usage rules',
                content: `framework: POWER

purpose: Generate COMPONENTS.md as the component library reference.

output: Must follow required header/footer with [Framework] and [Version]. Inventory all reusable components, props, and usage rules. Reference README.md ({{readme_summary}}), ARCHITECTURE.md ({{architecture_summary}}), and API.md ({{api_summary}}).

work: Scan UI/logic directories. Identify components by convention. No execution.

examples:
- Code snippet with props
- State management pattern

requirements: Must include copy-paste ready examples and AI-focused footer.

save_as: COMPONENTS.md
store_as: components_summary`,
              },
              {
                title: 'Step 5: Schema Documentation',
                description:
                  'Generate SCHEMA.md as the data schema reference with database models and validation rules',
                content: `framework: POWER

purpose: Generate SCHEMA.md as the data schema reference.

output: Must follow required header/footer with [Date] and [Schema Version]. Document database schemas, enums, relationships, and validation rules. Reference README.md ({{readme_summary}}), ARCHITECTURE.md ({{architecture_summary}}), API.md ({{api_summary}}), and COMPONENTS.md ({{components_summary}}).

work: Parse models, migrations, and schema definitions. No execution.

examples:
- JSON schema with validation errors
- TypeScript interface definition

requirements: Must include relationships, constraints, and AI-focused footer.

save_as: SCHEMA.md`,
              },
            ]}
            className=""
            defaultExpanded={false}
          />

          {/* Create App Working Plan */}
          <CollapsiblePrompt
            title="Create App Working Plan"
            icon={<FileText className="h-5 w-5" />}
            description="Structured COSTAR prompt for generating implementation plans based on stack requirements and documentation review."
            content={`<costar>
  <context>
    User has requested an application defined by <stack> and <ui layout>.
    Documentation available in @docs: README.md, API-REFERENCE.md, DATA-SCHEMAS.md, ARCHITECTURE.md, COMPONENTS.md.
    Agent must review these before creating implementation steps.
  </context>
  <objective>
    Produce WORKING-PLAN.md that defines implementation approach.
    PLAN ONLY, execute nothing. Deliverable must be review-ready and modifiable by stakeholders.
    Include measurable steps and align with architecture, schemas, and components.
  </objective>
  <style>
    Structured markdown file with explicit sections: Overview, Dependencies, Data Models, API Endpoints, UI Components, Architecture Alignment, Next Steps.
    Use checklists where appropriate.
  </style>
  <tone>Professional, concise, technical.</tone>
  <audience>Engineering team and stakeholders reviewing the plan prior to coding phase.</audience>
  <response>
    <file name="WORKING-PLAN.md">
      # WORKING-PLAN.md

      **Purpose**: Structured plan to implement the requested application based on <stack> and <ui layout>.
      **Scope**: Derived from @docs.
      **Constraint**: PLAN ONLY — no implementation in this phase.

      ## 1. Overview
      - Requested App: <stack> + <ui layout>
      - Primary Goals:
        - Functional app with UI + backend integration
        - Alignment with provided architecture and schemas
        - Production-ready foundation

      ## 2. Dependencies
      - Frameworks & Libraries: [to be listed]
      - External Services: [APIs, auth providers, storage]
      - Dev Tools: [build, test, deployment tools]

      ## 3. Data Models (from DATA-SCHEMAS.md)
      - Entities & Relationships: [Entity relationships]
      - Validation Rules: [Constraints, rules]
      - Migration Considerations: [Schema changes]

      ## 4. API Endpoints (from API-REFERENCE.md)
      - Core Endpoints: [List GET/POST/etc.]
      - Auth & Security: [Bearer tokens, rate limits]
      - Error Handling: [Validation errors, 4xx/5xx patterns]

      ## 5. UI Components (from COMPONENTS.md)
      - Core Components: [Sidebar, Cards, Forms, Tables]
      - Props & Contracts: [Prop definitions, constraints]
      - Styling: [Patterns, utility classes]

      ## 6. Architecture Alignment (from ARCHITECTURE.md)
      - Topology: [Service flow, dependencies]
      - Data Flow: [Input → Processing → Output]
      - Design Patterns: [Applied rationale]

      ## 7. Next Steps
      - [ ] Review plan with stakeholders
      - [ ] Approve or request modifications
      - [ ] Transition to implementation phase upon approval
    </file>
  </response>
  <constraint>PLAN ONLY, execute nothing</constraint>
</costar>`}
          />

          {/* Multi-Agent Code Review */}
          <CollapsiblePrompt
            title="Multi-Agent Code Review"
            icon={<Users className="h-5 w-5" />}
            description="POWER framework prompt for consolidating code reviews from multiple AI agents (Windsurf, VS Code, Cursor, Claude, Codex, Gemini)"
            content={`<power>
  <purpose>Review the provided codebase and generate a concise unified report containing quality, correctness, and best practice findings.</purpose>
  <o>A single markdown document with six primary headings: Windsurf, VS Code, Cursor, Claude, Codex, Gemini. Each agent writes under its own heading with 3–5 bullet points.</o>
  <work>Comments must be brief, well-structured, and limited to observations—no code modifications.</work>
  <examples>
    ## Windsurf
    - Function naming inconsistent
    - Add missing test cases

    ## VS Code
    - Dependency duplication
    - Improve error handling
  </examples>
  <requirements>Each agent must contribute under its heading, keep notes concise and clear, and ensure the final result is one unified report.</requirements>
  <constraint>SCAN ONLY, no code changes</constraint>
</power>`}
          />

          {/* App Generation Prompt Chain */}
          <CodeScanChainContainer
            title="App Generation Prompt Chain (5-Step)"
            icon={<Rocket className="h-5 w-5" />}
            steps={appGenerationChainSteps}
            defaultExpanded={false}
          />
        </div>
      </main>
    </div>
  );
}
