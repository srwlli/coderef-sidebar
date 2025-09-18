# [[agent]]-app-idea-prompt

**Last Updated**: {{date}}  
**Agent**: [[agent]]  
**Prompt Source**: COSTAR XML Specification

## Overview

This XML prompt instructs the agent to review project documentation and produce a consolidated build plan as `[[agent]]-app-idea.md`.

```xml
<agent_prompt name="agent-app-idea">
  <task>Review project documentation and create a build plan.</task>

  <instructions>
    <step>Scan the project directory recursively for all modules.</step>
    <step>Identify and read files in order: README.md → ARCHITECTURE.md → COMPONENTS.md → API.md → SCHEMA.md.</step>
    <step>Extract information about tech stack, dependencies, and environment setup.</step>
    <step>Analyze UI components and user interaction patterns from COMPONENTS.md.</step>
    <step>Derive workflow and data flow from ARCHITECTURE.md and SCHEMA.md.</step>
    <step>Summarize API endpoints, authentication, and integration points from API.md.</step>
    <step>Cross-reference modules to identify interdependencies.</step>
    <step>Propose a consolidated build plan covering tech stack, UI, workflow, architecture, and deployment strategy.</step>
    <step>Format the output using COSTAR framework (Context, Objective, Style, Tone, Audience, Response).</step>
    <step>Save the build plan as [[{{agent_name}}]]-app-idea.md in the project root.</step>
  </instructions>

  <deliverable>
    <filename>[[{{agent_name}}]]-app-idea.md</filename>
    <format>markdown</format>
    <sections>
      <metadata>
        <last_updated>{{date}}</last_updated>
        <version>1.0</version>
        <maintainer>{{team_or_person}}</maintainer>
      </metadata>
      <tech_stack>{{technologies_frameworks_libraries}}</tech_stack>
      <ui_design>{{ui_components_and_layout}}</ui_design>
      <workflow>{{user_and_system_workflows}}</workflow>
      <architecture>{{system_architecture_and_data_flows}}</architecture>
      <api_integration>{{endpoints_and_authentication}}</api_integration>
      <deployment>{{deployment_strategy_and_environment}}</deployment>
      <value>{{strategic_and_business_value}}</value>
    </sections>
  </deliverable>
</agent_prompt>
```
