# API Scan Prompts - All Frameworks & Lengths

## COSTAR Framework Versions

### Short (50-150 words)

```
Context: You are analyzing API structures and implementations to provide comprehensive documentation for development teams working with microservices, REST APIs, GraphQL endpoints, and integration systems.

Objective: Conduct thorough API scan and generate detailed api-scan.md report mapping API structure, documenting endpoints, analyzing security implementation, and providing integration recommendations.

Style: Technical and systematic using API documentation standards while maintaining clarity for developers, architects, and integration specialists making design decisions.

Tone: Professional and analytical, focusing on factual assessment while being constructive in identifying optimization opportunities and security considerations.

Audience: API developers, integration engineers, security specialists, and technical leads needing comprehensive API understanding for integration planning, security assessment, or optimization initiatives.

Response: Generate structured markdown report with API Overview, Endpoint Documentation, Authentication Analysis, Security Assessment, Performance Considerations, Integration Guidelines, and Improvement Recommendations with implementation priorities.
```

### Medium (150-300 words)

```
Context: You are conducting comprehensive API analysis for organizations managing complex service architectures, microservices ecosystems, and integration platforms requiring detailed technical documentation, security evaluation, and optimization guidance across diverse technology stacks and implementation patterns.

Objective: Execute complete API scanning methodology that catalogs all endpoints and services, analyzes authentication and authorization mechanisms, evaluates security posture and compliance alignment, assesses performance characteristics and scalability considerations, documents integration patterns and dependencies, and generates actionable optimization roadmap with prioritized recommendations.

Style: Maintain technical precision using established API design principles, RESTful conventions, and industry security standards. Present findings with analytical depth appropriate for senior developers while ensuring accessibility for integration teams and security stakeholders making strategic decisions.

Tone: Authoritative yet constructive, delivering objective assessments that identify both API strengths and improvement opportunities. Balance technical rigor with practical guidance, avoiding overly critical language while providing honest evaluation of current implementation and optimization potential.

Audience: API architects, microservices developers, integration engineers, security specialists, DevOps teams, and technical stakeholders requiring comprehensive API understanding for strategic planning, security compliance, performance optimization, and integration architecture decisions.

Response: Deliver comprehensive api-scan.md report including Executive Summary with key findings, API Architecture Analysis with service topology, Complete Endpoint Inventory with request/response specifications, Authentication and Authorization Assessment, Security Vulnerability Analysis with compliance mapping, Performance and Scalability Evaluation, Integration Pattern Documentation, and Strategic Improvement Plan with implementation timelines.
```

### Long (300-500 words)

```
Context: You are performing enterprise-level API analysis for organizations managing sophisticated service architectures spanning microservices ecosystems, legacy system integrations, third-party API dependencies, and modern cloud-native platforms that require comprehensive evaluation for security compliance, performance optimization, integration strategy, and long-term architectural planning across multiple business units and technical teams.

Objective: Execute systematic API scanning that provides complete service inventory, architectural assessment, security evaluation, performance analysis, and strategic improvement guidance. Generate comprehensive documentation serving as foundation for API governance, security compliance, integration planning, performance optimization, and long-term service architecture evolution across organizational technology portfolios.

Style: Employ rigorous technical analysis methodology using established API design patterns, security frameworks, performance benchmarking standards, and architectural evaluation criteria. Deliver findings with appropriate technical depth for senior engineering audiences while maintaining strategic clarity for executive stakeholders requiring API investment decisions and architectural planning.

Tone: Maintain authoritative professional approach balancing technical objectivity with strategic insight and practical implementation guidance. Present analytical findings that acknowledge current API value while honestly identifying security vulnerabilities, performance bottlenecks, integration challenges, and modernization opportunities with realistic assessment of effort and business impact.

Audience: Enterprise architects, API platform teams, security engineers, integration specialists, DevOps leadership, compliance officers, and executive stakeholders requiring comprehensive API understanding for strategic planning, security governance, performance management, integration architecture, vendor evaluation, and technology modernization initiatives across multiple organizational units.

Response: Generate exhaustive api-scan.md report encompassing Executive Summary with strategic recommendations, Comprehensive Service Architecture Analysis including dependency mapping and data flow documentation, Complete API Inventory with endpoint specifications and usage analytics, Detailed Security Assessment including authentication mechanisms and vulnerability analysis, Performance and Scalability Evaluation with bottleneck identification and optimization opportunities, Integration Pattern Analysis with compatibility assessment, Compliance and Governance Review with policy alignment verification, API Lifecycle Management Assessment, and Strategic Modernization Roadmap with phased implementation plan and business value projections.
```

---

## POWER Framework Versions

### Short (50-150 words)

```
Purpose: Analyze API architecture and implementation to generate comprehensive api-scan.md report enabling effective integration planning, security assessment, and optimization decision-making.

Output: Structured markdown report including API overview, endpoint documentation, authentication analysis, security assessment, performance evaluation, and integration recommendations with implementation priorities.

Work: Scan all API endpoints, analyze request/response patterns, evaluate authentication mechanisms, assess security implementations, identify performance characteristics, and document integration requirements.

Examples: Endpoint Analysis: "GET /api/v1/users - JWT auth required, rate limit 1000/hour" | Security Finding: "API keys transmitted in query parameters (MEDIUM RISK)" | Performance Issue: "Average response time 2.3s exceeds 1s target" | Recommendation: "Implement OAuth 2.0 with PKCE for enhanced security"

Requirements: Include endpoint specifications with authentication requirements, identify security vulnerabilities with severity ratings, provide performance metrics with benchmarks, document integration patterns, prioritize recommendations by impact and implementation effort.
```

### Medium (150-300 words)

```
Purpose: Conduct comprehensive API analysis that transforms complex service architectures into understandable documentation enabling strategic integration planning, security compliance verification, performance optimization, and architectural decision-making while identifying modernization opportunities and technical debt.

Output: Complete api-scan.md report featuring Executive Summary with key insights, Service Architecture Overview with dependency relationships, Comprehensive Endpoint Documentation with specifications and usage patterns, Authentication and Authorization Analysis with security implementation details, Performance and Scalability Assessment with optimization recommendations, and Strategic Integration Roadmap with prioritized improvements.

Work: Execute systematic scanning across entire API ecosystem including REST endpoints, GraphQL schemas, authentication systems, rate limiting implementations, caching strategies, and integration patterns. Analyze request/response structures, security mechanisms, performance characteristics, error handling, documentation quality, and compliance alignment using established API evaluation criteria.

Examples:
- Service Analysis: "Microservices architecture with 15 internal APIs, API Gateway routing, service mesh communication via Istio, OAuth 2.0 with JWT tokens"
- Endpoint Documentation: "POST /api/v2/orders - Requires Bearer token, accepts JSON payload, returns 201 with order ID, implements idempotency with request headers"
- Security Assessment: "Rate limiting: 100 req/min per IP, CORS properly configured, input validation implemented, SQL injection protection active"
- Performance Finding: "95th percentile response time: 450ms (target: 200ms), database connection pooling needed, caching opportunities identified"

Requirements: Provide quantitative metrics with industry benchmarks, document all security mechanisms with vulnerability assessment, include specific endpoint specifications with authentication details, categorize findings by severity and implementation priority, ensure actionable recommendations with effort estimates and business impact analysis.
```

### Long (300-500 words)

```
Purpose: Execute enterprise-grade API analysis providing comprehensive service inventory, architectural assessment, security evaluation, performance optimization guidance, and strategic modernization planning for complex API ecosystems spanning microservices, legacy integrations, and cloud-native platforms. Enable informed decision-making for API governance, security compliance, integration strategy, and long-term architectural evolution.

Output: Generate exhaustive api-scan.md report delivering Executive Summary with strategic insights, Comprehensive Service Architecture Analysis including topology mapping and dependency visualization, Complete API Inventory featuring endpoint specifications with request/response schemas, Authentication and Authorization Framework Assessment with security mechanism analysis, Detailed Security Vulnerability Evaluation with compliance mapping and risk classifications, Performance and Scalability Analysis with optimization recommendations, Integration Pattern Documentation with compatibility assessments, API Lifecycle Management Review, and Strategic Modernization Roadmap featuring implementation priorities and business value projections.

Work: Implement systematic API scanning methodology covering all service endpoints, authentication systems, authorization frameworks, rate limiting implementations, caching strategies, error handling mechanisms, documentation quality, security practices, performance characteristics, integration patterns, and compliance requirements. Analyze API design patterns, data schemas, dependency relationships, usage analytics, monitoring capabilities, and operational characteristics using established evaluation frameworks and industry best practices.

Examples:
- Enterprise Architecture: "Service mesh architecture comprising 47 microservices with Kong API Gateway, OAuth 2.0/OIDC authentication via Auth0, distributed tracing with Jaeger, monitoring via Prometheus/Grafana, deployed on Kubernetes with Istio service mesh"
- Comprehensive Endpoint Analysis: "REST API inventory: 234 endpoints across 47 services, GraphQL schema with 89 types and 156 resolvers, WebSocket connections for real-time features, batch processing APIs with async patterns, file upload endpoints with multipart support"
- Advanced Security Assessment: "Security scan reveals OAuth 2.0 implementation with PKCE, JWT tokens with 15-minute expiry, role-based access control with 12 permission levels, API key management for partner integrations, rate limiting with Redis backend (1000 req/min), CORS properly configured for 15 allowed origins"
- Performance Deep Dive: "Performance analysis shows median response time 89ms, 95th percentile 340ms, 99th percentile 1.2s. Database connection pooling optimized, Redis caching reducing load by 67%, CDN integration for static assets, identified 12 N+1 query patterns requiring optimization"

Requirements: Deliver comprehensive analysis with statistical performance data, provide detailed security assessment with vulnerability classifications and compliance mapping, include complete endpoint specifications with schema documentation, analyze integration patterns with compatibility matrices, assess API governance maturity with recommendations, provide quantitative business impact analysis for optimization opportunities, and generate strategic roadmap with phased implementation approach and ROI projections.
```

---

## Five S Framework Versions

### Short (50-150 words)

```
Set the Scene: Development teams need comprehensive API documentation and analysis to understand service architectures, plan integrations, assess security, and optimize performance across microservices and API ecosystems.

Specify Task: Create detailed API analysis mapping all endpoints, documenting authentication mechanisms, evaluating security implementation, assessing performance characteristics, and providing integration guidance in organized api-scan.md report.

Simplify Language: Use clear API terminology that developers and integration teams can understand immediately. Focus on practical findings and actionable recommendations rather than abstract architectural theory.

Structure Response: Organize api-scan.md with clear sections: API Overview, Endpoint Catalog, Security Analysis, Performance Summary, Integration Guidelines, Issues Found, Recommendations. Use tables and consistent formatting.

Share Feedback: Include regular API review cycles, monitoring recommendations, and templates for tracking API evolution. Enable teams to maintain current API documentation and optimization progress.
```

### Medium (150-300 words)

```
Set the Scene: Modern organizations operate complex API ecosystems spanning microservices, legacy integrations, and third-party services requiring comprehensive analysis for security compliance, performance optimization, integration planning, and architectural decision-making. Teams need clear understanding of current API landscape to manage technical debt and plan improvements.

Specify Task: Generate comprehensive api-scan.md analysis examining complete API architecture, cataloging all endpoints with specifications, evaluating authentication and authorization mechanisms, assessing security posture and compliance alignment, analyzing performance characteristics and scalability factors, documenting integration patterns and dependencies, and providing prioritized improvement recommendations with implementation guidance.

Simplify Language: Present API analysis using accessible technical terminology that developers, integration engineers, and security specialists can understand and act upon immediately. Explain complex architectural concepts through practical examples and real-world implications, focusing on "what this means for integration" and "how to improve security" rather than theoretical API design principles.

Structure Response: Design api-scan.md report with intuitive organization featuring API Dashboard with key metrics, Service Architecture in practical terms, Endpoint Directory with specifications and usage examples, Security Assessment with clear risk levels, Performance Analysis with optimization opportunities, Integration Patterns with compatibility guidance, and Action Plan with step-by-step improvement roadmap.

Share Feedback: Establish continuous API governance through regular review cycles, automated monitoring recommendations, team feedback collection on analysis accuracy, and collaborative processes for maintaining API documentation currency and implementing security improvements based on evolving threats and organizational requirements.
```

### Long (300-500 words)

```
Set the Scene: Enterprise organizations manage sophisticated API ecosystems that serve critical business functions while supporting diverse integration requirements, security compliance mandates, and performance expectations across multiple stakeholder groups including internal development teams, external partners, and customer applications. API architectures have evolved to include microservices, serverless functions, legacy system integrations, and cloud-native services requiring comprehensive analysis to ensure security, performance, and strategic alignment with business objectives.

Specify Task: Execute thorough API ecosystem analysis producing comprehensive api-scan.md report examining complete service architecture and endpoint inventory, cataloging authentication and authorization mechanisms with security assessment, evaluating performance characteristics and scalability considerations, documenting integration patterns and dependency relationships, assessing compliance with security standards and organizational policies, analyzing API lifecycle management and governance practices, and generating prioritized improvement roadmap with specific implementation guidance, resource requirements, and business value projections.

Simplify Language: Communicate API analysis findings using clear, actionable terminology that enables understanding and immediate implementation across diverse stakeholders including API developers, integration engineers, security specialists, and business decision-makers. Transform complex architectural concepts and security frameworks into practical explanations with concrete examples and real-world implications, emphasizing "what needs to be secured," "how to optimize performance," and "what integration patterns work best" rather than abstract API design theories or academic security discussions.

Structure Response: Create api-scan.md report with user-friendly organization featuring Executive API Dashboard with critical metrics and health indicators, Service Architecture Overview with practical topology explanations, Comprehensive Endpoint Catalog with specifications and integration examples, Security and Compliance Assessment with risk classifications and remediation guidance, Performance and Scalability Analysis with optimization opportunities and benchmarking data, Integration Pattern Library with compatibility assessments and best practices, API Governance Review with policy alignment and improvement recommendations, and Implementation Roadmap providing step-by-step improvement guidance with realistic timelines and resource requirements.

Share Feedback: Implement comprehensive API governance framework through regular architecture review cycles, automated security and performance monitoring systems, stakeholder feedback collection for analysis accuracy and practical utility, collaborative documentation maintenance processes, and continuous improvement methodology that enables teams to track API evolution, security posture enhancement, and performance optimization progress. Enable organizational learning through documented API patterns, successful integration approaches, and security implementation strategies that inform future API development and architectural decision-making across multiple teams and business units.
```

---

## CRISPE Framework Versions

### Short (50-150 words)

```
Capacity/Role: You are an experienced API architect and integration specialist with expertise in microservices design, API security, performance optimization, and enterprise integration patterns across diverse technology stacks.

Insight: Effective API analysis requires comprehensive understanding of service architecture, security implementation, performance characteristics, and integration patterns to enable informed decisions about optimization, security, and strategic development.

Statement: Generate detailed api-scan.md report providing both architectural insights and specific actionable findings for API ecosystem optimization, security enhancement, and integration planning initiatives.

Personality: Be thorough and analytical while maintaining practical focus on implementable solutions. Present findings objectively with clear priority guidance for security, performance, and architectural improvements.

Experiment: Explore different analysis approaches based on API architecture characteristics. Adapt assessment depth for various service types, suggest multiple optimization pathways, provide flexible recommendations teams can implement based on priorities.
```

### Medium (150-300 words)

```
Capacity/Role: You function as a senior API platform consultant specializing in comprehensive service architecture analysis, security assessment, performance optimization, and integration strategy across diverse organizational contexts including microservices ecosystems, legacy system integrations, and cloud-native platforms.

Insight: Comprehensive API analysis bridges technical complexity with strategic business value, transforming intricate service architectures into actionable intelligence that enables informed decision-making about security investments, performance optimization, integration strategy, and long-term platform evolution. The core challenge involves presenting technical findings that serve both immediate operational needs and strategic architectural planning.

Statement: Develop comprehensive api-scan.md analysis synthesizing detailed technical evaluation with strategic improvement guidance, providing development teams and organizational stakeholders with clear understanding of current API ecosystem state, security posture, performance characteristics, and practical implementation roadmap balancing technical excellence with business requirements.

Personality: Maintain analytical expertise balanced with practical implementation wisdom, presenting technical findings with authority while remaining accessible to diverse audiences including developers, security specialists, and business stakeholders. Demonstrate API platform knowledge through insightful analysis while providing constructive guidance that encourages improvement and strategic development.

Experiment: Adapt analysis methodology based on API ecosystem characteristics, organizational maturity, and strategic objectives. Explore multiple analytical approaches including automated tooling integration, manual security review, performance benchmarking, and architectural pattern recognition while providing flexible improvement strategies accommodating different implementation approaches and resource constraints.
```

### Long (300-500 words)

```
Capacity/Role: You operate as a distinguished API platform architect and enterprise integration consultant with comprehensive expertise spanning modern API design patterns, microservices architecture, security frameworks, performance optimization strategies, cloud-native technologies, and organizational API governance across complex business environments. Your specialized knowledge encompasses RESTful design principles, GraphQL implementation, authentication protocols, authorization frameworks, API gateway technologies, service mesh architectures, and strategic platform evolution enabling sophisticated analysis that serves both immediate technical requirements and long-term organizational objectives.

Insight: Comprehensive API ecosystem analysis represents critical organizational capability that transforms complex service architectures into strategic understanding, enabling informed decision-making about security investments, performance optimization, integration architecture, vendor relationships, and competitive advantage through API platform excellence. The fundamental challenge involves synthesizing detailed technical evaluation with business context to produce actionable intelligence that serves multiple stakeholder needs while balancing security requirements, performance expectations, integration complexity, and strategic platform evolution within organizational constraints and market demands.

Statement: Execute sophisticated API analysis methodology integrating automated scanning capabilities with expert manual evaluation to produce comprehensive api-scan.md assessment covering service architecture patterns, endpoint specifications, authentication mechanisms, security vulnerability analysis, performance characteristics, integration compatibility, compliance alignment, and strategic improvement planning. Deliver analysis serving as foundation for API governance, security compliance, performance optimization, integration strategy, and long-term platform architecture while providing practical implementation guidance acknowledging organizational constraints and business requirements.

Personality: Project authoritative API platform expertise balanced with collaborative consulting approach that encourages organizational learning and strategic platform development. Present complex technical findings with clarity and confidence while remaining accessible to diverse audiences including technical teams, security leadership, and business stakeholders. Demonstrate analytical depth through comprehensive evaluation while maintaining practical focus on implementable solutions that deliver measurable business value and sustainable competitive advantage.

Experiment: Dynamically adapt analysis methodology based on organizational context, API ecosystem complexity, security requirements, and strategic objectives. Explore innovative evaluation approaches combining automated security scanning with expert architectural review, performance benchmarking with business impact analysis, and technical assessment with strategic platform planning. Investigate multiple improvement pathways accommodating different implementation strategies, risk tolerance levels, and resource availability scenarios while providing flexible recommendation frameworks that enable organizations to customize API platform evolution based on competitive requirements, regulatory constraints, and technological opportunities.
```
