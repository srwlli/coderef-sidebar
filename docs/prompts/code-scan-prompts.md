# Short Code Scan Prompts - All 4 Frameworks

## COSTAR Framework (119 words)

```xml
<context>You analyze codebases systematically using 4-phase approach: Discovery → Architecture → Data Flow → Deep Analysis</context>

<objective>Generate code-scan.md report with project type identification, entry points, component mapping, and improvement priorities - SCAN ONLY, change no code</objective>

<style>Technical documentation following progressive analysis methodology</style>

<tone>Professional assessment focusing on actionable architectural insights</tone>

<audience>Development teams needing systematic codebase understanding for maintenance and refactoring decisions</audience>

<response>
Phase 1: Project type, tech stack, directory structure, entry points
Phase 2: Component dependencies, design patterns, core abstractions
Phase 3: Data flow, APIs, external integrations
Phase 4: Code quality issues, security gaps, performance bottlenecks

Format: Structured markdown with dependency diagrams, concrete deliverables
</response>
```

## POWER Framework (108 words)

```xml
<purpose>Systematically scan codebase using 4-phase methodology to generate actionable code-scan.md documentation</purpose>

<o>
Phase 1: Project type, tech stack, entry points, directory structure
Phase 2: Component dependencies, design patterns, core abstractions
Phase 3: Data flow mapping, APIs, external integrations
Phase 4: Quality issues, security gaps, performance bottlenecks
</o>

<work>SCAN ONLY - progressively analyze from overview to deep implementation details. Change no code.</work>

<examples>
Entry Point: "main.py - Flask app with /api routes"
Dependency: "UserService → Database → Redis cache"
Pattern: "Repository pattern with dependency injection"
Issue: "SQL injection risk in auth module (HIGH)"
</examples>

<requirements>Concrete deliverables: dependency graphs, flow diagrams, specific line references for issues</requirements>
```

## Five S Framework (105 words)

```xml
<scene>Teams need systematic codebase analysis using proven 4-phase methodology for effective maintenance and architectural decisions</scene>

<task>SCAN codebase progressively: Discovery → Architecture → Data Flow → Deep Analysis. Generate code-scan.md. Change no code.</task>

<simplify>Use clear phases: identify project type first, then components, then data flow, finally quality issues. Focus on concrete findings</simplify>

<structure>
Report phases: Project Overview | Component Map | Data Flow Analysis | Quality Assessment
Include: Entry points, dependency graphs, API endpoints, specific improvement priorities
</structure>

<feedback>Provide phase-by-phase analysis enabling teams to understand codebase systematically and plan targeted improvements</feedback>
```

## CRISPE Framework (98 words)

```xml
<role>Expert code analyst using systematic 4-phase methodology for comprehensive codebase understanding</role>

<insight>Progressive analysis from discovery to deep implementation reveals architectural patterns and optimization opportunities more effectively than generic scanning</insight>

<statement>Execute 4-phase scan: Discovery → Architecture → Data Flow → Deep Analysis. Generate code-scan.md - NO CODE CHANGES</statement>

<personality>Systematic and methodical, focusing on concrete deliverables like dependency graphs, entry points, and specific quality issues</personality>

<experiment>Adapt analysis depth based on project type (web app, data science, mobile). Customize focus for contribution prep, refactoring, or security audit goals</experiment>
```
