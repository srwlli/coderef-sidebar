# [[agent]]-app-mock-prompt

**Last Updated**: {{date}}  
**Agent**: [[agent]]  
**Prompt Source**: UI Mockup XML Specification

## Overview

This XML defines a prompt for an agent to scan project files, extract structural/functional information, and produce a UI mockup in HTML.  
The output must be saved as **[agent]-app-mock.html** in the root directory.

```xml
<prompt name="app-mock" framework="COSTAR">
  <task>Read project files and generate a UI mockup in HTML.</task>

  <io>
    <input>
      <files>All files in project directory</files>
      <scope>README.md, ARCHITECTURE.md, COMPONENTS.md, API.md, SCHEMA.md</scope>
    </input>
    <output>
      <location>./</location>
      <filename_pattern>[agent]-app-mock.html</filename_pattern>
      <format>html</format>
      <validation>
        <rule>Filename MUST follow [agent]-app-mock.html.</rule>
        <rule>Save ONLY in project root.</rule>
        <rule>Reject output if filetype, name, or location do not comply.</rule>
      </validation>
    </output>
  </io>

  <instructions>
    <step>Scan the directory for project documentation and components.</step>
    <step>Extract structural and UI-relevant details from COMPONENTS.md, API.md, and ARCHITECTURE.md.</step>
    <step>Mock up UI layout in plain HTML (no styling frameworks, just semantic markup).</step>
    <step>Include representative sections: header, sidebar/nav, main content, and footer.</step>
    <step>For each module or component, create placeholder HTML elements with descriptive labels.</step>
    <step>Do not implement functionality — mockup is for layout reference only.</step>
    <step>Save the file as [agent]-app-mock.html in the root.</step>
  </instructions>

  <costar>
    <context>Project documentation and component files exist and must be converted into a UI mockup for visualization.</context>
    <objective>Generate a static HTML mockup showing the structure and layout of the application UI.</objective>
    <style>Semantic HTML, minimal, readable. Use div, section, header, footer, nav, article elements where appropriate.</style>
    <tone>Concise, technical, structured.</tone>
    <audience>
      <developers>For use as a structural reference when coding the UI.</developers>
      <designers>To visualize component placement and hierarchy.</designers>
    </audience>
    <response>
      <deliverable>[agent]-app-mock.html</deliverable>
      <sections>
        <section>Header</section>
        <section>Navigation Sidebar</section>
        <section>Main Content Area</section>
        <section>Component Placeholders</section>
        <section>Footer</section>
      </sections>
    </response>
  </costar>
</prompt>
```
