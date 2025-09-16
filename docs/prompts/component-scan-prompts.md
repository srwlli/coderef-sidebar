# Component Scan Prompts - Score 10/10 Versions

## COSTAR Framework (92 words)

```xml
<context>You analyze software components to document architecture for development teams</context>

<objective>Generate component-report.md documenting structure, dependencies, and quality - SCAN ONLY, change no code</objective>

<style>Technical documentation using software engineering standards</style>

<tone>Professional analysis focusing on refactoring opportunities</tone>

<audience>Component developers and architects needing maintenance understanding</audience>

<response>
Structure: Component Overview | Architecture Patterns | Dependency Map | Quality Metrics | Performance Analysis | Refactoring Recommendations

Include: Design patterns used, coupling metrics, test coverage, performance bottlenecks, improvement priorities

Format: Clear markdown with dependency diagrams, metrics tables
</response>
```

## POWER Framework (87 words)

```xml
<purpose>Scan software component and generate component-report.md for maintenance planning</purpose>

<output>
- Component Overview with design patterns
- Dependency Map (internal/external with coupling metrics)
- Quality Assessment (complexity, coverage, maintainability)
- Performance Profile with bottlenecks
- Refactoring Roadmap with priorities
</output>

<work>SCAN ONLY - analyze component structure, map dependencies, assess quality metrics. Change no code.</work>

<examples>
Pattern: "Repository pattern with dependency injection"
Dependency: "Circular dependency: UserService ↔ NotificationService"
Quality: "Cyclomatic complexity: 12 (high), 78% test coverage"
</examples>

<requirements>Markdown format, specific metrics, coupling analysis, priority rankings</requirements>
```

## Five S Framework (91 words)

```xml
<scene>Teams need component documentation to understand structure, plan refactoring, and assess technical debt</scene>

<task>SCAN existing software component and create component-report.md documentation. Analyze what exists - change nothing.</task>

<simplify>Use clear terms: dependencies, coupling, test coverage, complexity. Focus on maintenance needs, not theory</simplify>

<structure>
Report sections: Component Summary | Design Patterns | Dependency Analysis | Quality Metrics | Performance Data | Improvement Plan
Format: Tables for metrics, diagrams for dependencies, bullet points for recommendations
</structure>

<feedback>Include refactoring schedules and monitoring recommendations for maintaining component health</feedback>
```

## CRISPE Framework (84 words)

```xml
<role>Expert component analyst documenting module architecture and technical debt</role>

<insight>Component analysis reveals structural patterns, dependency relationships, and quality characteristics needed for effective maintenance</insight>

<statement>Scan software component and generate component-report.md covering structure, dependencies, quality, and refactoring opportunities - NO CODE CHANGES</statement>

<personality>Direct and practical, focusing on specific architectural details and measurable improvements teams need</personality>

<experiment>Adapt analysis based on component complexity. Suggest multiple refactoring approaches based on discovered patterns and constraints</experiment>
```
