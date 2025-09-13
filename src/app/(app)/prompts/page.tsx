import { CollapsiblePrompt } from '@/components/collapsibles';
import { MessageSquare } from 'lucide-react';

export default function PromptsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <CollapsiblePrompt
          title="Code Review Assistant"
          description="A comprehensive prompt for reviewing code quality, performance, and best practices"
          content="Please review this code and provide feedback on:

1. Code quality and readability
2. Performance optimizations
3. Security considerations
4. Best practices adherence
5. Potential bugs or issues
6. Suggestions for improvement

Focus on constructive feedback that helps improve the codebase while maintaining functionality."
        />

        <CollapsiblePrompt
          title="Bug Analysis & Debugging"
          description="Systematic approach to identifying and fixing bugs in code"
          content="Please analyze this code for bugs and issues:

1. Identify potential runtime errors
2. Check for logical inconsistencies
3. Look for edge cases that might fail
4. Examine error handling and validation
5. Suggest debugging strategies
6. Provide fix recommendations

Include step-by-step debugging approach and preventive measures for similar issues."
        />

        <CollapsiblePrompt
          title="Documentation Generator"
          description="Generate comprehensive documentation for code components and functions"
          content="Please create documentation for this code:

1. Write clear function/component descriptions
2. Document all parameters and return types
3. Provide usage examples
4. List any dependencies or requirements
5. Include edge cases and error scenarios
6. Add inline comments for complex logic

Format as markdown with proper headings and code blocks for easy integration."
        />

        <CollapsiblePrompt
          title="Performance Optimization"
          description="Analyze and suggest performance improvements for code efficiency"
          content="Please analyze this code for performance optimization:

1. Identify performance bottlenecks
2. Suggest algorithmic improvements
3. Review memory usage patterns
4. Check for unnecessary computations
5. Recommend caching strategies
6. Analyze database query efficiency
7. Suggest profiling approaches

Provide specific optimization recommendations with expected impact measurements."
        />

        <CollapsiblePrompt
          title="Spec-Kit Tech Context"
          description="Comprehensive technical context prompt for AI agents using spec-kit to maximize planning capabilities"
          content={`You are providing technical context to spec-kit to maximize its understanding and planning capabilities. Provide comprehensive technical information about the existing project, constraints, and development environment.

## Instructions
Save this completed context as \`speckit-tech-context.md\` in your project root directory. This file will serve as a reference for all spec-kit sessions and can be updated as your project evolves.

## Current Architecture
**Frontend Stack:**
- Framework: [e.g., Next.js 14, React 18, Vue 3]
- Language: [e.g., TypeScript, JavaScript]
- Styling: [e.g., Tailwind CSS, styled-components, CSS modules]
- State Management: [e.g., Zustand, Redux, Context API, none]
- Build Tool: [e.g., Vite, Webpack, Next.js built-in]

**Backend Stack:**
- Runtime: [e.g., Node.js 18, Deno, Bun]
- Framework: [e.g., Express, Next.js API routes, FastAPI, none]
- Database: [e.g., PostgreSQL, MongoDB, SQLite, Supabase]
- ORM/Query Tool: [e.g., Prisma, Drizzle, raw SQL, none]
- Authentication: [e.g., NextAuth, Auth0, custom JWT, none]

**Infrastructure:**
- Hosting: [e.g., Vercel, Netlify, AWS, self-hosted]
- Database Hosting: [e.g., Railway, PlanetScale, AWS RDS, local]
- CDN: [e.g., Cloudflare, AWS CloudFront, none]
- Monitoring: [e.g., Sentry, LogRocket, none]

## Development Environment
**Team Context:**
- Team Size: [number] developers
- Skill Levels: [e.g., "2 senior React devs, 1 junior full-stack"]
- Available Time: [e.g., "2 weeks", "ongoing maintenance", "weekend project"]
- Learning Goals: [e.g., "want to learn TypeScript", "avoid new technologies"]

**Tooling:**
- Package Manager: [e.g., npm, yarn, pnpm, bun]
- Version Control: [e.g., Git with GitHub, GitLab, Bitbucket]
- CI/CD: [e.g., GitHub Actions, none, Vercel auto-deploy]
- Testing: [e.g., Jest, Vitest, Playwright, none]
- Linting: [e.g., ESLint + Prettier, Biome, none]

## Constraints & Requirements
**Technical Constraints:**
- Performance Requirements: [e.g., "sub-2s page loads", "handle 1000 concurrent users", "works on mobile"]
- Browser Support: [e.g., "modern browsers only", "IE11 support needed", "mobile-first"]
- Accessibility: [e.g., "WCAG AA compliance", "basic a11y", "no specific requirements"]
- Security: [e.g., "GDPR compliant", "SOC2", "basic security practices"]

**Business Constraints:**
- Budget: [e.g., "no additional service costs", "$50/month budget", "cost not a factor"]
- Timeline: [e.g., "MVP in 2 weeks", "launch before Q4", "no deadline pressure"]
- Maintenance: [e.g., "minimal ongoing maintenance", "active development team", "set-and-forget"]

**Integration Requirements:**
- External APIs: [e.g., "Stripe payments", "SendGrid email", "Google OAuth", "none"]
- Third-party Services: [e.g., "analytics (GA4)", "error tracking (Sentry)", "CMS (Contentful)"]
- Existing Systems: [e.g., "integrate with legacy PHP admin", "connects to ERP system", "none"]

## Existing Codebase Context
**Project Structure:**
- Monorepo: [yes/no, if yes: tool used like Nx, Turborepo]
- Folder Structure: [e.g., "standard Next.js", "feature-based", "domain-driven"]
- Code Standards: [e.g., "strict TypeScript", "functional programming preferred", "follows Airbnb ESLint"]

**Key Files/Patterns:**
- Database Schema: [brief description of main entities]
- API Patterns: [e.g., "REST endpoints", "GraphQL", "tRPC", "server actions"]
- Component Patterns: [e.g., "compound components", "render props", "custom hooks"]
- Data Fetching: [e.g., "React Query", "SWR", "fetch in useEffect", "server components"]

## Migration/Legacy Considerations
**Current Pain Points:**
- Technical Debt: [e.g., "outdated dependencies", "no test coverage", "performance issues"]
- Known Issues: [e.g., "slow database queries", "bundle size too large", "mobile UX problems"]
- Planned Changes: [e.g., "migrating to TypeScript", "upgrading to Next.js 14", "redesigning UI"]

## Example Usage
Current project is a Next.js 13 e-commerce app with TypeScript, Tailwind CSS, and Zustand for state management. Backend uses Next.js API routes with Prisma ORM connecting to PostgreSQL hosted on Railway. Authentication via NextAuth with Google OAuth. Deployed on Vercel with Stripe for payments.

Team: 2 intermediate React developers, 4 weeks available, wanting to learn advanced TypeScript patterns. Using npm, GitHub Actions for CI/CD, Jest for testing, ESLint + Prettier for code quality.

Constraints: Must handle 500 concurrent users, modern browsers only, basic accessibility, GDPR compliant. $100/month service budget, MVP needed in 3 weeks, will have ongoing development.

This context enables spec-kit to generate plans that integrate seamlessly with your existing architecture, respect your constraints, and match your team's capabilities.`}
        />
      </main>
    </div>
  );
}
