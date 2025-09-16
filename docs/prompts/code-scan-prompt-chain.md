# Structured Code Scan Chain - 3-Step Process

## Chain Step 1: Discovery

```xml
<purpose>Phase 1: Identify codebase fundamentals</purpose>

<o>
- Project type and programming languages
- Main entry points (files that start the application)
- Directory structure overview
- Key configuration files found
</o>

<work>SCAN ONLY - focus on project identification, no deep analysis</work>

<examples>
Entry point: "app.py - Flask application"
Config: "requirements.txt, .env files"
Structure: "src/, tests/, docs/ directories"
</examples>

<requirements>
Save as root/coderef/code-scan/discovery.md with:
- Table of Contents with section links
- All findings in bulleted lists
- Metrics tables (file counts, directory counts, language breakdown)
- Structured markdown with ## headers
- Clear section hierarchy (## Project Type, ## Entry Points, ## Structure, ## Configuration)
</requirements>
```

## Chain Step 2: Architecture

```xml
<purpose>Phase 2: Map architecture using discovery.md findings</purpose>

<o>
- Component relationships and dependencies
- Design patterns identified (MVC, Repository, Factory, etc.)
- Core classes/functions and their purposes
- Database and external service connections
</o>

<work>Read root/coderef/code-scan/discovery.md, then SCAN architecture based on those findings</work>

<examples>
Pattern: "Repository pattern in data access layer"
Dependency: "UserService → Database → Redis cache"
Component: "AuthController handles login/logout endpoints"
</examples>

<requirements>
Save as root/coderef/code-scan/architecture.md with:
- Table of Contents with clickable links
- Component dependency lists in bullet format
- Architecture metrics (coupling scores, component counts, pattern usage)
- Structured tables for component relationships
- Clear sections (## Components, ## Dependencies, ## Patterns, ## External Services)
</requirements>
```

## Chain Step 3: Final Report

```xml
<purpose>Synthesize discovery + architecture into comprehensive code-scan.md</purpose>

<o>
- Integrated project overview with key metrics
- Component dependency graph in structured list format
- Quality issues ranked by priority with precise counts
- Specific recommendations with effort estimates and priorities
</o>

<work>Read root/coderef/code-scan/discovery.md and root/coderef/code-scan/architecture.md, then COMBINE all findings</work>

<examples>
Issue: "3 circular dependencies found in auth module (HIGH priority)"
Metric: "Code complexity: 847 total lines, avg 12.3 per function"
Recommendation: "Refactor UserService interface (Effort: Medium, Impact: High)"
</examples>

<requirements>
Save as root/coderef/code-scan/code-scan.md with:
- Complete Table of Contents with numbered sections and page links
- Executive Summary in precise bullet points with metrics
- All findings organized in numbered and bulleted lists
- Comprehensive metrics tables (complexity, coverage, dependency counts, file statistics)
- Priority-ranked recommendations with effort estimates (High/Medium/Low)
- Structured markdown with consistent header hierarchy (# ## ### ####)
- Clear sections: Executive Summary, Project Overview, Architecture Analysis, Quality Assessment, Recommendations
</requirements>
```

## Output Structure Requirements

### Mandatory Format Elements:

- **Table of Contents**: Clickable links to all major sections
- **Metrics Tables**: Quantitative data in markdown table format
- **Bulleted Lists**: All findings organized with `-` or `*`
- **Priority Rankings**: HIGH/MEDIUM/LOW classifications
- **Header Hierarchy**: Consistent `#` `##` `###` structure
- **Effort Estimates**: Specific time/complexity assessments

### Directory Structure:

```
root/
└── coderef/
    └── code-scan/
        ├── discovery.md
        ├── architecture.md
        └── code-scan.md (final report)
```

This chain ensures each step builds systematically while maintaining strict structural requirements for consistent, actionable documentation.
