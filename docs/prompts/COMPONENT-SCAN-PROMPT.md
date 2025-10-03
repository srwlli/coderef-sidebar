<power>
  <purpose>Scan all components, index completely, report relationships and specifications</purpose>
  <output>
    <file>COMPONENT-SCAN.md</file>
    <location>@components/</location>
    <sections>
      - Component Inventory (name, path, type)
      - Props/Parameters Matrix (component, prop, type, required, default)
      - Dependencies Graph (imports, exports, circular refs)
      - Usage Analytics (frequency, locations, patterns)
      - Hierarchy Tree (parent-child relationships)
      - Complexity Metrics (LOC, cyclomatic, coupling)
    </sections>
  </output>
  <work>
    <scope>All component files in project</scope>
    <extraction>Props, state, methods, events, slots</extraction>
    <analysis>Relationships, patterns, reusability</analysis>
  </work>
  <examples>
    <example>HeaderNav.tsx: 5 props, 3 children, 2 dependencies</example>
    <example>DataTable.jsx: 12 props, 8 methods, 5 events</example>
  </examples>
  <requirements>
    <validation>All components discovered and indexed</validation>
    <metadata>Timestamp, version, total count</metadata>
    <format>Markdown tables and lists</format>
  </requirements>
</power>
