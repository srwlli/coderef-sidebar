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

          {/* Code Scan Chain */}
          <CodeScanChainContainer
            title="Code Scan Chain"
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

          {/* Latest Updates Research Prompts */}
          <SimpleCollapsibleContainer
            title="Latest Updates Research Prompts"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="space-y-6">
              {/* COSTAR Framework */}
              <SimpleCollapsibleContainer
                title="COSTAR Framework"
                className="border border-blue-200 dark:border-blue-800"
              >
                <div className="space-y-4">
                  <CollapsiblePrompt
                    title="Short (50-150 words)"
                    description="Current technology research for informed decision-making"
                    content={`Context: You are conducting research for users who need current information on technology stacks and technical tools to make informed decisions about adoption, upgrades, or implementation planning.

Objective: Conduct autonomous research focusing on latest releases and official sources to generate structured reports with current version information, release notes, and official documentation insights.

Style: Technical and informative, presenting findings in clear, factual manner using established industry terminology while maintaining accessibility for decision-makers.

Tone: Professional and authoritative, demonstrating reliability through quality source selection and accurate information synthesis without speculation or bias.

Audience: Technical teams, architects, and decision-makers who need current, official information about technology releases and updates for planning and implementation decisions.

Response: Generate research report with Executive Summary, Latest Release Information, Official Source Analysis, Key Updates and Features, and Next Steps for implementation or evaluation.`}
                  />

                  <CollapsiblePrompt
                    title="Medium (150-300 words)"
                    description="Comprehensive technology analysis with security and performance assessment"
                    content={`Context: You are performing comprehensive research for technology professionals who require detailed analysis of technical tools and stacks including latest releases, performance characteristics, security considerations, and industry adoption patterns. Users need reliable information for strategic planning, risk assessment, and technology roadmap development across diverse organizational contexts.

Objective: Execute thorough research combining official sources with performance benchmarks, security advisories, and industry trend analysis to generate actionable intelligence that supports informed technology decisions, upgrade planning, and strategic implementation initiatives.

Style: Analytical and comprehensive, integrating multiple authoritative sources to present balanced evaluation of technology options. Maintain technical precision while ensuring accessibility for both technical implementers and strategic decision-makers requiring business context and risk assessment.

Tone: Authoritative and objective, presenting research findings with confidence backed by quality sources while acknowledging uncertainties and providing balanced perspective on advantages, limitations, and implementation considerations.

Audience: Software architects, technical leads, engineering managers, security specialists, and technology strategists who require comprehensive understanding of current technology landscape for strategic planning, vendor evaluation, security compliance, and long-term technology roadmap development.

Response: Deliver structured research report including Executive Summary with key findings, Latest Release Analysis with version comparisons, Performance and Security Assessment with benchmarking data, Industry Adoption Trends with case studies, Official Documentation Review, Risk and Compatibility Analysis, and Strategic Recommendations with implementation priorities and timelines.`}
                  />

                  <CollapsiblePrompt
                    title="Long (300-500 words)"
                    description="Enterprise technology intelligence with strategic roadmap development"
                    content={`Context: You are conducting enterprise-level technology research for organizations making critical technology decisions across complex software ecosystems, infrastructure environments, and business requirements. Research subjects include emerging technologies, established platforms, security frameworks, performance optimization tools, and strategic technology platforms that impact organizational capability, competitive advantage, and operational excellence. Users operate in environments requiring comprehensive analysis of technical merit, business value, implementation complexity, and long-term strategic implications.

Objective: Execute comprehensive research methodology that synthesizes official documentation, performance analysis, security evaluation, industry trends, expert opinions, and practical implementation guidance to generate strategic technology intelligence. Provide detailed assessment that enables informed decision-making about technology adoption, migration planning, security compliance, performance optimization, and long-term technology strategy development across organizational units and business functions.

Style: Employ rigorous analytical methodology combining authoritative source analysis with strategic business context and practical implementation guidance. Present findings with appropriate technical depth for senior engineering audiences while maintaining strategic clarity for executive stakeholders requiring technology investment decisions, risk assessment, and competitive positioning analysis.

Tone: Maintain authoritative professional approach balancing technical objectivity with strategic insight and practical wisdom. Present comprehensive analysis that acknowledges complexity while providing clear guidance for decision-making, risk management, and implementation planning. Balance optimism about technology potential with realistic assessment of implementation challenges and organizational impact.

Audience: Enterprise architects, engineering directors, technology officers, security leadership, procurement specialists, and executive stakeholders requiring comprehensive technology analysis for strategic planning, budget allocation, vendor selection, regulatory compliance, competitive positioning, and organizational technology transformation initiatives across multiple business units and operational contexts.

Response: Generate comprehensive research analysis encompassing Executive Summary with strategic recommendations, Technology Overview with market positioning and competitive analysis, Latest Release Comprehensive Analysis including feature comparisons and roadmap evaluation, Performance and Scalability Assessment with quantitative benchmarking and capacity planning guidance, Security and Compliance Evaluation including vulnerability analysis and regulatory alignment, Industry Adoption Analysis with enterprise case studies and lessons learned, Migration and Implementation Planning with detailed roadmaps and resource requirements, Risk Assessment and Mitigation Strategies, Total Cost of Ownership Analysis, and Strategic Technology Roadmap with phased implementation recommendations, success metrics, and long-term value projections.`}
                  />
                </div>
              </SimpleCollapsibleContainer>

              {/* POWER Framework */}
              <SimpleCollapsibleContainer
                title="POWER Framework"
                className="border border-green-200 dark:border-green-800"
              >
                <div className="space-y-4">
                  <CollapsiblePrompt
                    title="Short (50-150 words)"
                    description="Autonomous research with structured reporting on official sources"
                    content={`Purpose: Conduct autonomous research on technology stacks and technical tools to provide current information on latest releases and official sources for informed technology decisions.

Output: Structured research report including Executive Summary, Latest Version Information, Official Release Notes Analysis, Key Feature Updates, and Implementation Recommendations.

Work: Research official documentation, release repositories, and authoritative sources to identify current versions, recent updates, security patches, and feature enhancements for specified technologies.

Examples: Version Analysis: "React 18.2.0 released March 2024 with concurrent features and performance improvements" | Security Update: "Node.js 20.11.1 addresses CVE-2024-27982 HTTP request smuggling vulnerability" | Feature Highlight: "TypeScript 5.4 introduces NoInfer utility type and improved inference"

Requirements: Focus exclusively on official sources and verified information. Include version numbers, release dates, and official documentation links. Prioritize security updates and breaking changes. Provide clear next steps for evaluation or implementation.`}
                  />

                  <CollapsiblePrompt
                    title="Medium (150-300 words)"
                    description="Strategic technology planning with performance analysis and industry trends"
                    content={`Purpose: Execute comprehensive technology research that combines latest release information with performance analysis, security assessment, and industry trends to support strategic technology planning and decision-making processes.

Output: Complete research report featuring Executive Summary with key insights, Latest Release Analysis with version comparisons and feature evaluation, Performance and Security Assessment with benchmarking data and vulnerability analysis, Industry Adoption Trends with usage statistics and case studies, and Strategic Implementation Guidance with priorities and timelines.

Work: Conduct systematic research across official sources, performance benchmarking platforms, security advisory databases, and industry analysis reports. Analyze version changes, performance improvements, security patches, compatibility requirements, and adoption patterns using authoritative sources and verified data.

Examples:
- Release Analysis: "Next.js 14 introduces Turbopack (beta) with 53% faster local development, Server Actions (stable), and partial prerendering for improved performance"
- Performance Benchmark: "Comparative analysis shows 40% improvement in build times versus previous version, based on official benchmarks and community testing"
- Security Assessment: "Zero critical vulnerabilities in latest release, with proactive security measures including dependency scanning and automated security updates"
- Industry Trend: "Adoption rate increased 34% among Fortune 500 companies in Q4 2024, with primary drivers being performance improvements and developer experience enhancements"

Requirements: Integrate multiple authoritative sources including official documentation, performance testing platforms, security databases, and industry research. Provide quantitative data where available with source citations. Include compatibility matrices and upgrade considerations. Offer prioritized recommendations based on organizational needs and risk tolerance.`}
                  />

                  <CollapsiblePrompt
                    title="Long (300-500 words)"
                    description="Enterprise-grade research with comprehensive strategic implementation roadmap"
                    content={`Purpose: Execute enterprise-grade technology research providing comprehensive analysis of technical tools and stacks including latest releases, performance characteristics, security posture, industry adoption patterns, migration planning, and strategic implementation guidance to support critical organizational technology decisions and long-term strategic planning initiatives.

Output: Generate exhaustive research analysis delivering Executive Summary with strategic insights, Comprehensive Release Analysis including feature comparison matrices and roadmap evaluation, Quantitative Performance Assessment with benchmarking data and scalability analysis, Thorough Security Evaluation including vulnerability assessment and compliance alignment, Industry Adoption Analysis with enterprise case studies and implementation patterns, Migration and Compatibility Planning with detailed upgrade paths and effort estimation, Risk Assessment with mitigation strategies, and Strategic Implementation Roadmap with phased approach and resource requirements.

Work: Implement systematic research methodology spanning official documentation repositories, performance testing platforms, security advisory databases, industry analyst reports, enterprise case studies, community feedback platforms, and expert opinion sources. Analyze technical specifications, performance metrics, security practices, compatibility requirements, licensing considerations, support ecosystems, and long-term viability factors using established evaluation frameworks and quantitative analysis methods.

Examples:
- Comprehensive Release Analysis: "Kubernetes 1.29 'Mandala' introduces 49 enhancements including ReadWriteOncePod volume access mode (stable), contextual logging improvements, and enhanced security policies with 12 features graduating to stable, 19 entering beta, representing significant maturation in enterprise orchestration capabilities"
- Performance Deep Dive: "Benchmark analysis across 15 scenarios shows 23% reduction in resource utilization, 31% improvement in startup times, and 45% better scaling performance under high-load conditions, validated through independent testing by Cloud Native Computing Foundation and enterprise implementations"
- Security and Compliance Assessment: "Security posture enhanced with 27 security-related improvements, including pod security standards enforcement, supply chain security enhancements, and RBAC refinements, achieving compliance with SOC 2 Type II, ISO 27001, and FedRAMP requirements based on official compliance documentation and third-party audits"
- Enterprise Adoption Intelligence: "Analysis of 500+ enterprise implementations reveals 67% adoption rate among container-orchestration users, with average implementation timeline of 8-12 weeks, primary success factors including existing container expertise, dedicated platform teams, and comprehensive training programs, ROI achievement averaging 156% within 18 months post-implementation"

Requirements: Deliver comprehensive analysis with statistical significance and authoritative source documentation, include specific version comparisons and feature matrices, provide quantitative performance data with benchmarking methodologies, assess security posture with vulnerability analysis and compliance mapping, analyze total cost of ownership with implementation effort estimation, offer detailed migration planning with risk assessment and mitigation strategies, include industry benchmarking and peer analysis, and provide measurable success criteria with implementation timeline projections and resource requirement specifications.`}
                  />
                </div>
              </SimpleCollapsibleContainer>

              {/* Five S Framework */}
              <SimpleCollapsibleContainer
                title="Five S Framework"
                className="border border-purple-200 dark:border-purple-800"
              >
                <div className="space-y-4">
                  <CollapsiblePrompt
                    title="Short (50-150 words)"
                    description="Technology monitoring with systematic evaluation processes"
                    content={`Set the Scene: Technology teams need current, reliable information about latest releases and updates for tools and stacks they're considering or currently using to make informed decisions about upgrades, adoption, or planning.

Specify Task: Research official sources to identify latest versions, release notes, key updates, and documentation for specified technology stacks or tools, generating clear summary report with essential information for decision-making.

Simplify Language: Present findings using straightforward technical terms that any developer or technical decision-maker can understand immediately. Focus on practical implications rather than theoretical details.

Structure Response: Organize research with clear sections: Current Version Summary, What's New in Latest Release, Important Updates to Know, Official Resources, and What to Do Next.

Share Feedback: Include regular research intervals for technology tracking, provide templates for ongoing monitoring, and enable teams to build systematic technology evaluation processes.`}
                  />

                  <CollapsiblePrompt
                    title="Medium (150-300 words)"
                    description="Strategic technology intelligence with team collaboration framework"
                    content={`Set the Scene: Development and infrastructure teams operate in rapidly evolving technology landscapes where staying current with releases, security updates, performance improvements, and industry trends directly impacts project success, system security, and operational efficiency. Teams need reliable research that combines official information with practical insights for strategic planning and implementation decisions.

Specify Task: Conduct comprehensive technology research that examines latest releases, performance benchmarks, security considerations, and industry adoption patterns for specified tools or stacks. Generate practical research report that enables informed decision-making about technology adoption, upgrade planning, security compliance, and strategic implementation with clear guidance for next steps and implementation priorities.

Simplify Language: Communicate research findings using accessible technical language that serves both developers and decision-makers across different experience levels. Transform complex release notes and technical documentation into practical insights focusing on "what this means for our team" and "what we should do about it" rather than abstract technical specifications.

Structure Response: Design research report with intuitive organization: Executive Overview for quick decisions, Latest Release Highlights with practical implications, Performance and Security Insights with real-world impact, Industry Trends and Adoption Patterns, Implementation Considerations with effort estimates, and Action Plan with prioritized next steps and timelines.

Share Feedback: Establish ongoing technology monitoring framework through regular research cycles, team feedback sessions on research effectiveness and practical applicability, tracking mechanisms for monitoring technology evolution and team needs, and collaborative processes for maintaining current technology intelligence and strategic planning alignment.`}
                  />

                  <CollapsiblePrompt
                    title="Long (300-500 words)"
                    description="Enterprise technology intelligence with organizational learning capabilities"
                    content={`Set the Scene: Modern technology organizations must navigate complex ecosystems of rapidly evolving tools, frameworks, platforms, and infrastructure components that directly impact development productivity, system performance, security posture, and competitive advantage. Technology leaders and development teams require comprehensive research that synthesizes official releases, performance data, security intelligence, industry trends, and practical implementation guidance to make strategic technology decisions that balance innovation opportunity with operational stability and business requirements across diverse organizational contexts and project portfolios.

Specify Task: Execute thorough technology research methodology that examines latest releases and official sources while incorporating performance analysis, security assessment, industry adoption patterns, migration considerations, and strategic implementation planning. Generate comprehensive research analysis that serves immediate tactical decision-making needs while supporting long-term technology strategy development, risk management, compliance requirements, and competitive positioning through detailed evaluation of technical capabilities, business value, implementation complexity, and organizational impact factors.

Simplify Language: Present comprehensive research findings using clear, practical language that enables understanding and action across diverse stakeholders including developers, architects, security specialists, project managers, and business decision-makers. Transform complex technical documentation, performance studies, and industry analysis into actionable insights that emphasize practical implications, implementation requirements, business impact, and strategic considerations rather than theoretical concepts or academic discussions that don't translate to immediate organizational value.

Structure Response: Create comprehensive research documentation with user-friendly organization featuring Executive Dashboard with key decisions and recommendations, Technology Overview with current landscape and positioning, Latest Release Analysis with practical change implications, Performance and Capability Assessment with benchmarking and scalability considerations, Security and Compliance Evaluation with risk analysis and mitigation guidance, Industry Intelligence with adoption trends and case studies, Implementation Planning with detailed roadmaps and resource requirements, Risk Assessment with business continuity and change management considerations, and Strategic Roadmap with phased approach and success measurement criteria.

Share Feedback: Implement systematic technology intelligence process through regular research cycles aligned with organizational planning timelines, comprehensive feedback collection mechanisms for validating research accuracy and practical utility, collaborative knowledge sharing practices that enable cross-team insights and lessons learned, progress tracking systems for monitoring technology evolution and implementation outcomes, and continuous methodology refinement based on changing organizational needs, technology landscape evolution, and strategic priority shifts. Enable organizational learning through documented research processes, successful implementation patterns, and strategic decision outcomes that inform future technology evaluation and adoption initiatives.`}
                  />
                </div>
              </SimpleCollapsibleContainer>

              {/* CRISPE Framework */}
              <SimpleCollapsibleContainer
                title="CRISPE Framework"
                className="border border-orange-200 dark:border-orange-800"
              >
                <div className="space-y-4">
                  <CollapsiblePrompt
                    title="Short (50-150 words)"
                    description="Technology research analyst with adaptive methodology"
                    content={`Capacity/Role: You are a technology research analyst specializing in current technology trends, official release tracking, and technical tool evaluation for development and infrastructure teams.

Insight: Staying current with technology releases and official sources is critical for informed decision-making about adoption, upgrades, security, and strategic planning in rapidly evolving technical environments.

Statement: Conduct focused research on latest releases and official documentation for specified technology stacks or tools, generating actionable intelligence for technology planning and implementation decisions.

Personality: Be thorough and precise while maintaining practical focus on actionable insights. Present findings with authority based on official sources while remaining accessible to technical teams.

Experiment: Adapt research depth and focus based on technology maturity and organizational context. Explore multiple official sources and cross-reference information for accuracy and completeness.`}
                  />

                  <CollapsiblePrompt
                    title="Medium (150-300 words)"
                    description="Senior technology consultant with strategic planning expertise"
                    content={`Capacity/Role: You function as a senior technology research consultant with expertise in technology landscape analysis, performance evaluation, security assessment, and strategic technology planning across diverse organizational contexts and technical environments.

Insight: Effective technology research requires synthesis of official releases with performance data, security intelligence, and industry trends to provide comprehensive understanding that supports both immediate implementation decisions and long-term strategic planning while balancing innovation opportunity with operational stability and risk management.

Statement: Execute comprehensive technology research combining latest release analysis with performance benchmarking, security assessment, and industry adoption patterns to generate strategic intelligence that enables informed decision-making about technology adoption, upgrade planning, risk assessment, and competitive positioning within organizational constraints and business objectives.

Personality: Maintain analytical rigor balanced with practical insight, presenting research findings with authority while remaining accessible to diverse audiences including technical implementers, security specialists, and strategic decision-makers. Demonstrate expertise through comprehensive source analysis while providing clear guidance for action and implementation.

Experiment: Dynamically adapt research methodology based on technology type, organizational maturity, and decision context. Explore multiple analytical approaches including official source analysis, performance benchmarking, industry trend evaluation, and risk assessment while providing flexible recommendations that accommodate different implementation scenarios and resource constraints.`}
                  />

                  <CollapsiblePrompt
                    title="Long (300-500 words)"
                    description="Distinguished technology intelligence specialist with enterprise transformation capabilities"
                    content={`Capacity/Role: You operate as a distinguished technology intelligence specialist and strategic research consultant with comprehensive expertise in technology market analysis, enterprise technology assessment, performance optimization research, security landscape evaluation, and organizational technology transformation strategy. Your specialized knowledge encompasses emerging technology trends, established platform evolution, industry best practices, regulatory compliance requirements, and strategic technology planning methodologies, enabling sophisticated research that serves both immediate tactical needs and long-term organizational technology strategy across complex business environments and competitive markets.

Insight: Comprehensive technology research represents critical organizational capability that transforms rapidly evolving technology landscapes into strategic understanding and actionable intelligence, enabling informed decision-making about technology investments, competitive positioning, risk management, and innovation opportunity while balancing cutting-edge capability adoption with operational stability, security requirements, and business continuity. The fundamental challenge involves synthesizing diverse information sources including official documentation, performance studies, security intelligence, industry analysis, and practical implementation experience to produce reliable guidance that serves multiple stakeholder needs and organizational objectives.

Statement: Deploy sophisticated technology research methodology that integrates official source analysis with comprehensive performance evaluation, security assessment, industry trend analysis, and strategic implementation planning to generate exhaustive technology intelligence covering technical capabilities, business value propositions, implementation complexity, risk factors, competitive implications, and long-term strategic considerations. Deliver research that serves as foundation for technology adoption decisions, strategic planning initiatives, security compliance programs, performance optimization projects, and competitive advantage development while providing practical implementation guidance that acknowledges organizational constraints, resource availability, and business priorities.

Personality: Project authoritative research expertise balanced with strategic consulting insight that encourages informed decision-making and organizational learning. Present complex technology analysis with clarity and confidence while remaining accessible to diverse audiences including technical leadership, business stakeholders, security specialists, and executive decision-makers. Demonstrate analytical depth through comprehensive evaluation methodology while maintaining practical focus on implementable recommendations that deliver measurable business value and sustainable competitive advantage.

Experiment: Innovatively adapt research approaches based on technology characteristics, organizational context, industry requirements, and strategic objectives. Explore cutting-edge research methodologies combining automated intelligence gathering with expert analysis, quantitative performance evaluation with qualitative industry insights, and technical assessment with business impact analysis. Investigate multiple evaluation frameworks accommodating different decision criteria, risk tolerance levels, and implementation scenarios while providing flexible strategic recommendations that enable organizations to customize technology adoption and implementation strategies based on unique competitive requirements, operational constraints, and long-term business objectives.`}
                  />
                </div>
              </SimpleCollapsibleContainer>
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
        </div>
      </main>
    </div>
  );
}
