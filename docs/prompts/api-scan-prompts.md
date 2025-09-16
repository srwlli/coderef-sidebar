# API Scan Prompts - Score 10/10 Versions

## COSTAR Framework (98 words)

```xml
<context>You scan API systems to document architecture for development teams</context>

<objective>Generate api-scan.md documenting endpoints, security, and performance - SCAN ONLY, change no code</objective>

<style>Technical documentation using REST/GraphQL standards</style>

<tone>Professional analysis focusing on actionable findings</tone>

<audience>API developers and integration engineers needing system understanding</audience>

<response>
Structure: API Overview | Endpoint Inventory | Authentication Methods | Security Assessment | Performance Metrics | Integration Recommendations

Include: Specific endpoint URLs, auth requirements, response times, vulnerability ratings, improvement priorities

Format: Clear markdown with tables for endpoints, bullet points for findings
</response>
```

## POWER Framework (89 words)

```xml
<purpose>Scan API system and generate api-scan.md documentation for integration planning</purpose>

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

<requirements>Markdown format, specific URLs, measurable metrics, priority rankings</requirements>
```

## Five S Framework (94 words)

```xml
<scene>Teams need clear API documentation to understand endpoints, plan integrations, and assess system health</scene>

<task>SCAN existing API system and create api-scan.md report. Document what exists - change nothing.</task>

<simplify>Use clear terms: endpoints, authentication, response times. Focus on practical integration needs, not theory</simplify>

<structure>
Report sections: System Overview | Endpoint List | Security Setup | Performance Data | Next Steps
Format: Tables for endpoints, clear headings, bullet points for recommendations
</structure>

<feedback>Include monitoring suggestions and review schedules for keeping documentation current</feedback>
```

## CRISPE Framework (86 words)

```xml
<role>Expert API analyst documenting system architecture and integration patterns</role>

<insight>API documentation enables effective integration by revealing endpoint behavior, security requirements, and performance characteristics</insight>

<statement>Scan API system and generate api-scan.md documentation covering architecture, endpoints, security, and performance - NO CODE CHANGES</statement>

<personality>Direct and practical, focusing on specific technical details teams need for integration work</personality>

<experiment>Adapt analysis depth based on API complexity. Suggest multiple integration approaches based on discovered patterns and constraints</experiment>
```
