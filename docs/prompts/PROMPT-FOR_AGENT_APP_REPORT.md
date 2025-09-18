# [[agent]]-app-report-prompt

**Last Updated**: {{date}}  
**Agent**: [[agent]]  
**Prompt Source**: Project Report Generation (COSTAR XML Specification)

## Overview

This file defines the structured XML prompt used by an agent to generate a full project report by scanning modules and synthesizing knowledge.

```xml
<project_report_generation>
  <metadata>
    <last_updated>{{date}}</last_updated>
    <version>1.0</version>
    <maintainer>{{team_or_person}}</maintainer>
  </metadata>

  <output>
    <location>./</location>
    <filename_pattern>{{agent_name}}-app-report.md</filename_pattern>
    <format>markdown</format>
    <include_sections>
      <section>metadata</section>
      <section>instructions</section>
      <section>dos</section>
      <section>response_structure</section>
      <section>modules</section>
    </include_sections>
  </output>

  <instructions>
    <step>Scan the project directory recursively.</step>
    <step>Identify all modules: each contains README.md, ARCHITECTURE.md, COMPONENTS.md, API.md, and SCHEMA.md.</step>
    <step>For each module, read files in the following order: README → ARCHITECTURE → COMPONENTS → API → SCHEMA.</step>
    <step>Extract knowledge incrementally and update the project report as you go.</step>
    <step>Maintain a consolidated knowledge graph across all modules.</step>
    <step>Cross-link modules if APIs or schemas reference each other.</step>
    <step>Enforce COSTAR framework structure (Context, Objective, Style, Tone, Audience, Response).</step>
    <step>Use curated vocabulary (Action + Scope + Modifier + Output).</step>
    <step>Ensure outputs follow reporting template with metadata, overview, and AI-focused footer.</step>
  </instructions>

  <dos>
    <do>DO document what the project is: purpose, modules, high-level scope.</do>
    <do>DO explain how it works: architecture, components, data flows, API patterns.</do>
    <do>DO record its value: technical benefits, business impact, ROI.</do>
    <do>DO validate schema definitions and API references for consistency.</do>
    <do>DO preserve modular boundaries but unify the report for a global overview.</do>
    <do>DO capture examples (code snippets, schema objects, API calls) where available.</do>
    <do>DO enforce standard headers/footers in generated docs.</do>
    <do>DO maintain placeholders {{like_this}} for project-specific values where unknown.</do>
    <do>DO ensure audience accessibility: technical leads, developers, stakeholders.</do>
  </dos>

  <response_structure>
    <context>{{system_overview}}</context>
    <objective>
      <item>{{what_it_is}}</item>
      <item>{{how_it_works}}</item>
      <item>{{its_value}}</item>
    </objective>
    <style>{{documentation_style}}</style>
    <tone>{{tone_setting}}</tone>
    <audience>
      <technical_leads>{{integration_focus}}</technical_leads>
      <developers>{{implementation_focus}}</developers>
      <stakeholders>{{business_focus}}</stakeholders>
    </audience>
    <response>
      <what_it_is>{{project_overview}}</what_it_is>
      <how_it_works>{{workflow_description}}</how_it_works>
      <value>{{strategic_value}}</value>
    </response>
  </response_structure>

  <modules>
    <module>
      <name>{{module_name}}</name>
      <context>{{module_context}}</context>
      <objective>
        <item>{{module_purpose}}</item>
        <item>{{module_mechanics}}</item>
        <item>{{module_value}}</item>
      </objective>
      <style>{{module_style}}</style>
      <tone>{{module_tone}}</tone>
      <audience>
        <technical_leads>{{module_integration_focus}}</technical_leads>
        <developers>{{module_dev_focus}}</developers>
        <stakeholders>{{module_business_focus}}</stakeholders>
      </audience>
      <response>
        <what_it_is>{{module_overview}}</what_it_is>
        <how_it_works>{{module_architecture_and_api}}</how_it_works>
        <value>{{module_benefits}}</value>
      </response>
    </module>
  </modules>
</project_report_generation>
```
