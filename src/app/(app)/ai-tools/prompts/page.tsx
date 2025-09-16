'use client';

import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import CollapsiblePrompt from '@/components/collapsibles/CollapsiblePrompt';
import { CodeScanChainContainer } from '@/components/collapsibles/CodeScanChainContainer';
import {
  Brain,
  Lightbulb,
  TrendingUp,
  FileText,
  Network,
  Package,
} from 'lucide-react';

export default function PromptsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Code Scan Prompts */}
          <SimpleCollapsibleContainer
            title="Code Scan Prompts"
            icon={<Brain className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <CollapsiblePrompt
                title="COSTAR Framework (142 words)"
                description="Comprehensive codebase analysis for technical documentation"
                content={`Context: You are analyzing software codebases to provide technical documentation for development teams working with diverse programming languages and architectural patterns.

Objective: Generate comprehensive code-scan.md report documenting codebase structure, identifying key components, assessing quality metrics, and providing actionable improvement recommendations.

Style: Technical and analytical using software engineering best practices while maintaining clarity for developers and technical leads making architectural decisions.

Tone: Professional and objective, focusing on factual assessment while being constructive in identifying optimization opportunities without being overly critical.

Audience: Development teams, software architects, and technical leads needing codebase understanding for maintenance planning, refactoring decisions, or onboarding new developers.

Response: Create structured markdown report with Executive Summary, Architecture Overview, File Structure Map, Technology Stack Analysis, Code Quality Assessment, Security Considerations, and Improvement Recommendations with priority levels and implementation timelines.`}
              />

              <CollapsiblePrompt
                title="POWER Framework (134 words)"
                description="Purpose-driven codebase analysis with clear outputs and examples"
                content={`Purpose: Analyze codebase to generate comprehensive code-scan.md report enabling effective maintenance planning, architectural decisions, and technical improvement initiatives.

Output: Structured markdown report including Executive Summary, Architecture Analysis, File Structure Map, Technology Stack Inventory, Code Quality Metrics, Security Assessment, and Prioritized Improvement Recommendations with implementation guidance.

Work: Scan all source files, analyze programming languages and frameworks, evaluate architectural patterns, assess code organization and documentation quality, identify security vulnerabilities, and determine overall maintainability factors.

Examples:
- Architecture: "MVC pattern with React frontend, Node.js backend, PostgreSQL database"
- Quality Finding: "Code coverage 67%, cyclomatic complexity average 8.2"
- Security Issue: "SQL injection vulnerability in user auth module (HIGH PRIORITY)"
- Recommendation: "Implement automated testing pipeline (Effort: Medium, Impact: High)"

Requirements: Include file count statistics, specific line references for critical issues, consistent markdown formatting, prioritized recommendations by impact and effort.`}
              />

              <CollapsiblePrompt
                title="Five S Framework (139 words)"
                description="Simple and accessible codebase analysis approach"
                content={`Set the Scene: Development teams need clear codebase documentation to understand system architecture, plan maintenance, assess technical debt, and make informed decisions about refactoring and optimization initiatives.

Specify Task: Analyze complete codebase and generate code-scan.md report documenting architecture, file organization, technology stack, code quality metrics, security vulnerabilities, and improvement recommendations with clear priorities.

Simplify Language: Use straightforward technical terms developers understand immediately. Focus on practical findings about code health, architectural patterns, and actionable improvements rather than abstract software engineering theory.

Structure Response: Organize report with Executive Summary, System Architecture, File Structure, Technology Analysis, Quality Assessment, Security Findings, and Improvement Plan. Use clear headings, bullet points, and consistent markdown formatting.

Share Feedback: Include recommendations for regular code reviews, automated quality monitoring, and templates for tracking improvements. Enable teams to maintain code quality and monitor technical debt over time.`}
              />

              <CollapsiblePrompt
                title="CRISPE Framework (128 words)"
                description="Role-based codebase analysis with adaptive methodology"
                content={`Capacity/Role: You are an expert software architect and code analyst with deep expertise in multiple programming languages, architectural patterns, code quality assessment, and security evaluation across diverse technology stacks.

Insight: Effective codebase analysis requires systematic evaluation of architecture, dependencies, quality metrics, and security practices to enable informed decisions about maintenance, refactoring, and strategic technical improvements.

Statement: Generate comprehensive code-scan.md report providing architectural insights, quality assessment, security analysis, and specific actionable recommendations for codebase optimization and technical debt reduction.

Personality: Be thorough and analytical while maintaining practical focus on implementable improvements. Present findings objectively with clear priority guidance for refactoring and optimization efforts.

Experiment: Adapt analysis depth based on codebase characteristics. Suggest multiple improvement pathways and provide flexible recommendations that teams can implement based on their priorities and available resources.`}
              />
            </div>
          </SimpleCollapsibleContainer>

          {/* Code Scan Prompt Chain */}
          <CodeScanChainContainer
            title="Code Scan Prompt Chain"
            icon={<Brain className="h-5 w-5" />}
            steps={[
              {
                title: 'Step 1: Discovery',
                description:
                  'Phase 1: Identify codebase fundamentals - project type, entry points, structure, and configuration',
                content: `<purpose>Phase 1: Identify codebase fundamentals</purpose>

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
</requirements>`,
              },
              {
                title: 'Step 2: Architecture',
                description:
                  'Phase 2: Map architecture using discovery.md findings - components, patterns, dependencies, and services',
                content: `<purpose>Phase 2: Map architecture using discovery.md findings</purpose>

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
</requirements>`,
              },
              {
                title: 'Step 3: Final Report',
                description:
                  'Synthesize discovery + architecture into comprehensive code-scan.md with integrated overview and prioritized recommendations',
                content: `<purpose>Synthesize discovery + architecture into comprehensive code-scan.md</purpose>

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
</requirements>`,
              },
            ]}
            className="border-green-200 dark:border-green-800"
            defaultExpanded={false}
          />

          {/* API Scan Prompts */}
          <SimpleCollapsibleContainer
            title="API Scan Prompts"
            icon={<Network className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <CollapsiblePrompt
                title="COSTAR Framework (98 words)"
                description="Comprehensive API documentation for development teams"
                content={`<context>You scan API systems to document architecture for development teams</context>

<objective>Generate api-scan.md documenting endpoints, security, and performance - SCAN ONLY, change no code</objective>

<style>Technical documentation using REST/GraphQL standards</style>

<tone>Professional analysis focusing on actionable findings</tone>

<audience>API developers and integration engineers needing system understanding</audience>

<response>
Structure: API Overview | Endpoint Inventory | Authentication Methods | Security Assessment | Performance Metrics | Integration Recommendations

Include: Specific endpoint URLs, auth requirements, response times, vulnerability ratings, improvement priorities

Format: Clear markdown with tables for endpoints, bullet points for findings
</response>`}
              />

              <CollapsiblePrompt
                title="POWER Framework (89 words)"
                description="Purpose-driven API analysis with clear outputs and examples"
                content={`<purpose>Scan API system and generate api-scan.md documentation for integration planning</purpose>

<output>
- API Overview with architecture summary
- Endpoint Inventory (URL, method, auth, response format)
- Security Analysis with vulnerability ratings
- Performance Metrics with response times
- Integration Guidelines with compatibility notes
</output>

<work>SCAN ONLY - analyze existing APIs, document patterns, assess security, measure performance. Change no code.</work>

<examples>
Endpoint: "GET /api/v1/users - Bearer token required, 150ms avg response"
Security: "OAuth 2.0 implemented, rate limiting active"
</examples>

<requirements>Markdown format, specific URLs, measurable metrics, priority rankings</requirements>`}
              />

              <CollapsiblePrompt
                title="Five S Framework (94 words)"
                description="Simple and accessible API documentation approach"
                content={`<scene>Teams need clear API documentation to understand endpoints, plan integrations, and assess system health</scene>

<task>SCAN existing API system and create api-scan.md report. Document what exists - change nothing.</task>

<simplify>Use clear terms: endpoints, authentication, response times. Focus on practical integration needs, not theory</simplify>

<structure>
Report sections: System Overview | Endpoint List | Security Setup | Performance Data | Next Steps
Format: Tables for endpoints, clear headings, bullet points for recommendations
</structure>

<feedback>Include monitoring suggestions and review schedules for keeping documentation current</feedback>`}
              />

              <CollapsiblePrompt
                title="CRISPE Framework (86 words)"
                description="Expert API analysis with adaptive methodology"
                content={`<role>Expert API analyst documenting system architecture and integration patterns</role>

<insight>API documentation enables effective integration by revealing endpoint behavior, security requirements, and performance characteristics</insight>

<statement>Scan API system and generate api-scan.md documentation covering architecture, endpoints, security, and performance - NO CODE CHANGES</statement>

<personality>Direct and practical, focusing on specific technical details teams need for integration work</personality>

<experiment>Adapt analysis depth based on API complexity. Suggest multiple integration approaches based on discovered patterns and constraints</experiment>`}
              />
            </div>
          </SimpleCollapsibleContainer>

          {/* Component Scan Prompts */}
          <SimpleCollapsibleContainer
            title="Component Scan Prompts"
            icon={<Package className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <CollapsiblePrompt
                title="COSTAR Framework (92 words)"
                description="Comprehensive component documentation for development teams"
                content={`<context>You analyze software components to document architecture for development teams</context>

<objective>Generate component-report.md documenting structure, dependencies, and quality - SCAN ONLY, change no code</objective>

<style>Technical documentation using software engineering standards</style>

<tone>Professional analysis focusing on refactoring opportunities</tone>

<audience>Component developers and architects needing maintenance understanding</audience>

<response>
Structure: Component Overview | Architecture Patterns | Dependency Map | Quality Metrics | Performance Analysis | Refactoring Recommendations

Include: Design patterns used, coupling metrics, test coverage, performance bottlenecks, improvement priorities

Format: Clear markdown with dependency diagrams, metrics tables
</response>`}
              />

              <CollapsiblePrompt
                title="POWER Framework (87 words)"
                description="Purpose-driven component analysis with clear outputs and examples"
                content={`<purpose>Scan software component and generate component-report.md for maintenance planning</purpose>

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

<requirements>Markdown format, specific metrics, coupling analysis, priority rankings</requirements>`}
              />

              <CollapsiblePrompt
                title="Five S Framework (91 words)"
                description="Simple and accessible component analysis approach"
                content={`<scene>Teams need component documentation to understand structure, plan refactoring, and assess technical debt</scene>

<task>SCAN existing software component and create component-report.md documentation. Analyze what exists - change nothing.</task>

<simplify>Use clear terms: dependencies, coupling, test coverage, complexity. Focus on maintenance needs, not theory</simplify>

<structure>
Report sections: Component Summary | Design Patterns | Dependency Analysis | Quality Metrics | Performance Data | Improvement Plan
Format: Tables for metrics, diagrams for dependencies, bullet points for recommendations
</structure>

<feedback>Include refactoring schedules and monitoring recommendations for maintaining component health</feedback>`}
              />

              <CollapsiblePrompt
                title="CRISPE Framework (84 words)"
                description="Expert component analysis with adaptive methodology"
                content={`<role>Expert component analyst documenting module architecture and technical debt</role>

<insight>Component analysis reveals structural patterns, dependency relationships, and quality characteristics needed for effective maintenance</insight>

<statement>Scan software component and generate component-report.md covering structure, dependencies, quality, and refactoring opportunities - NO CODE CHANGES</statement>

<personality>Direct and practical, focusing on specific architectural details and measurable improvements teams need</personality>

<experiment>Adapt analysis based on component complexity. Suggest multiple refactoring approaches based on discovered patterns and constraints</experiment>`}
              />
            </div>
          </SimpleCollapsibleContainer>

          {/* Working Plan Prompts */}
          <SimpleCollapsibleContainer
            title="Working Plan Prompts"
            icon={<FileText className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <CollapsiblePrompt
                title="COSTAR Framework (88 words)"
                description="Systematic working plans with clear accountability"
                content={`<context>You create systematic working plans for tasks requiring structured implementation with clear accountability</context>

<objective>Generate working-plan-<task>.md with phased breakdown, steps, timelines, and success metrics - PLAN ONLY, execute nothing</objective>

<style>Professional project management using clear documentation standards</style>

<tone>Authoritative yet practical, focusing on implementable actions</tone>

<audience>Project teams and managers needing execution guidance with progress tracking</audience>

<response>
Structure: Executive Summary | Phase Overview | Implementation Steps | Resource Requirements | Timeline | Risk Assessment | Success Metrics

Include: Specific owners, realistic timelines, measurable deliverables, priority rankings

Format: Clear markdown with numbered phases, task tables
</response>`}
              />

              <CollapsiblePrompt
                title="POWER Framework (82 words)"
                description="Purpose-driven working plan with clear outputs and examples"
                content={`<purpose>Create systematic working plan for specified task with phased implementation approach</purpose>

<output>
- Executive Summary with key objectives
- Phase Breakdown with logical progression
- Step-by-step Instructions with owners and timelines
- Resource Requirements and team assignments
- Risk Assessment with mitigation strategies
- Success Metrics with measurement criteria
</output>

<work>PLAN ONLY - analyze task complexity, break into phases, define steps with clear instructions. Execute nothing.</work>

<examples>
Phase: "Discovery & Planning (Weeks 1-2)"
Step: "Stakeholder interviews (Owner: PM, Duration: 3 days)"
Metric: "95% stakeholder satisfaction"
</examples>

<requirements>Save as working-plan-<task>.md, include timelines, specific owners, measurable outcomes</requirements>`}
              />

              <CollapsiblePrompt
                title="Five S Framework (89 words)"
                description="Simple and accessible working plan development approach"
                content={`<scene>Teams need structured plans to implement tasks systematically with clear steps and accountability for successful execution</scene>

<task>CREATE working-plan-<task>.md breaking specified task into phases with steps and timelines. Plan only - execute nothing.</task>

<simplify>Use clear terms: phases, steps, owners, deadlines. Focus on practical implementation, avoid planning jargon</simplify>

<structure>
Plan sections: Executive Summary | Phase Overview | Implementation Steps | Resource Needs | Timeline | Success Metrics
Format: Numbered phases, step tables, clear headings
</structure>

<feedback>Include progress checkpoints and plan adjustment mechanisms for continuous improvement</feedback>`}
              />

              <CollapsiblePrompt
                title="CRISPE Framework (79 words)"
                description="Expert project planning with adaptive methodology"
                content={`<role>Expert project planner specializing in systematic task breakdown and implementation planning</role>

<insight>Effective plans balance comprehensive structure with practical execution, enabling teams to implement complex tasks through clear phases</insight>

<statement>Generate working-plan-<task>.md with systematic phase breakdown, steps, resources, and success measurement - PLANNING ONLY, no execution</statement>

<personality>Thorough and systematic while maintaining practical focus on implementable solutions</personality>

<experiment>Adapt planning depth based on task complexity. Explore multiple implementation approaches while maintaining structured framework</experiment>`}
              />
            </div>
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
