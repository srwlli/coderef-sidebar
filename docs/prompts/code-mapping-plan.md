# Code Mapping Plan

## Overview

This document outlines a systematic approach for AI agents to map and understand codebases. The process is designed to build understanding progressively, from high-level architecture down to specific implementation details.

## Scan Flow Phases

### Phase 1: Discovery & Overview

**Objective:** Establish foundational understanding of the project

**Key Tasks:**

- Identify the project type, programming language(s), and framework(s)
- Find and analyze configuration files (package.json, requirements.txt, Cargo.toml, etc.)
- Map the directory structure and identify main entry points
- Locate documentation files (README, docs folder, inline comments)
- Identify build systems and deployment configurations

**Deliverables:**

- Project technology stack summary
- Directory structure diagram
- Entry points list
- Available documentation index

### Phase 2: Architecture Analysis

**Objective:** Understand the high-level system design and component relationships

**Key Tasks:**

- Identify main modules/packages and their purposes
- Map dependencies between components
- Find core abstractions (main classes, interfaces, key functions)
- Identify design patterns being used
- Locate configuration and environment management

**Deliverables:**

- Component dependency graph
- Core abstractions catalog
- Design patterns documentation
- Architecture overview diagram

### Phase 3: Data Flow Mapping

**Objective:** Trace how information moves through the system

**Key Tasks:**

- Trace how data moves through the system
- Identify APIs, database interactions, and external integrations
- Map state management approaches
- Document input/output boundaries
- Analyze error handling and logging strategies

**Deliverables:**

- Data flow diagrams
- API endpoint documentation
- Database schema and interaction patterns
- External service integrations map

### Phase 4: Deep Dive Analysis

**Objective:** Analyze implementation details and identify optimization opportunities

**Key Tasks:**

- Analyze complex algorithms or business logic
- Identify potential issues, code smells, or improvement opportunities
- Document testing strategies and coverage
- Note security considerations
- Performance bottleneck identification

**Deliverables:**

- Code quality assessment
- Security vulnerability report
- Performance optimization recommendations
- Testing gap analysis

## Customization Guidelines

### By Project Type

- **Web Applications:** Focus on routing, state management, and API patterns
- **Data Science Projects:** Emphasize data pipelines, model architectures, and experiment tracking
- **System Utilities:** Concentrate on command-line interfaces, system interactions, and resource management
- **Mobile Apps:** Analyze UI patterns, navigation flows, and platform-specific implementations

### By Analysis Goals

- **Contribution Preparation:** Emphasize coding standards, development workflows, and contribution guidelines
- **Refactoring Planning:** Focus on code smells, coupling analysis, and architectural improvements
- **Documentation Creation:** Prioritize user-facing functionality and API documentation
- **Security Audit:** Concentrate on authentication, authorization, and data validation patterns

## Prompt Templates

### Phase 1 Template

```
Analyze this codebase to understand its basic structure:
1. What type of project is this?
2. What languages and frameworks are being used?
3. What does the directory structure tell us about the organization?
4. Where are the main entry points?
5. What documentation is available?
```

### Phase 2 Template

```
Based on the codebase structure, analyze the architecture:
1. What are the main modules/components and their responsibilities?
2. How do these components depend on each other?
3. What are the key abstractions (classes, interfaces, functions)?
4. What design patterns are evident in the code?
5. How is configuration managed?
```

### Phase 3 Template

```
Map the data flow and system interactions:
1. How does data flow through the system?
2. What external services or databases does this connect to?
3. How is state managed throughout the application?
4. What are the main input/output boundaries?
5. How are errors handled and logged?
```

### Phase 4 Template

```
Perform deep analysis for optimization opportunities:
1. What complex algorithms or business logic exist?
2. What code quality issues or improvement opportunities do you see?
3. How comprehensive is the testing strategy?
4. What security considerations should be noted?
5. Are there any performance bottlenecks or optimization opportunities?
```

## Best Practices

- **Iterative Approach:** Complete each phase before moving to the next
- **Context Building:** Use findings from previous phases to inform subsequent analysis
- **Documentation Focus:** Maintain clear, actionable documentation throughout
- **Adaptability:** Adjust the process based on project size and complexity
- **Tool Integration:** Leverage static analysis tools and IDE features when available
