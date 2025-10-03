# Tech Stack Summaries - Real-World Applications

## Next.js Stack - Enterprise & Scale

### Real-World Examples

- Netflix (parts)
- TikTok Web
- Hulu
- Twitch
- GitHub Copilot site

### Best For

- E-commerce platforms (Shopify-scale apps)
- SaaS dashboards with complex auth/permissions
- Content-heavy sites needing ISR (news sites, blogs)
- B2B applications with enterprise SSO requirements

### Use Cases

- Multi-tenant platforms with role-based access
- Real-time collaborative tools (using tRPC subscriptions)
- Marketing sites with A/B testing and personalization
- Applications requiring extensive third-party integrations

### Sweet Spot

When you need battle-tested solutions, have a large team, or require extensive documentation/community support

---

## Qwik Stack - Performance-First

### Real-World Examples

- Builder.io
- Partytown deployments
- Emerging in e-commerce

### Best For

- Landing pages with perfect Core Web Vitals
- Global e-commerce with users on slow networks/devices
- News sites competing on speed (think Google News)
- Progressive web apps targeting mobile-first markets

### Use Cases

- Product catalogs with thousands of items
- Documentation sites with instant navigation
- Marketing funnels where every millisecond affects conversion
- Applications targeting emerging markets with 3G/slow connections

### Sweet Spot

When bounce rate directly impacts revenue, serving global audiences with varying connection speeds

---

## SvelteKit Stack - Developer Productivity

### Real-World Examples

- The New York Times (some projects)
- Apple (docs)
- Spotify (internal tools)

### Best For

- Startups needing to ship fast with small teams
- Interactive dashboards and data visualizations
- Developer tools and technical documentation
- Real-time applications (chat, collaboration tools)

### Use Cases

- Admin panels with complex forms/interactions
- Data-heavy dashboards with real-time updates
- Portfolio sites and creative agencies
- Internal tools where DX impacts team velocity
- JAMstack sites with occasional dynamic features

### Sweet Spot

When you have a skilled small team that values clean code and fast iteration over ecosystem size

---

## Decision Matrix

- **Choose Next.js**: You're building for enterprise, need proven patterns, hiring is a concern
- **Choose Qwik**: Performance metrics directly impact business KPIs, serving global/mobile users
- **Choose SvelteKit**: You want the best DX, have a small expert team, building internal/creative tools

---

## Stack Comparison

### Common Across All Three

- TypeScript + Zod for type safety
- Tailwind CSS for styling
- Modern testing with Vitest/Playwright
- Edge-ready deployment options
- Drizzle ORM (Qwik/SvelteKit) or Prisma (Next.js)

### Rankings

- **Performance**: Qwik > SvelteKit > Next.js
- **Ecosystem**: Next.js > SvelteKit > Qwik
- **Developer Experience**: SvelteKit > Next.js > Qwik

---

## Key Differentiators

### Next.js

- **Strengths**: Massive ecosystem, tRPC for type-safe APIs, Vercel's seamless deployment
- **Trade-off**: Heavier bundle size compared to others, more complex setup
- **Choose if**: You need extensive third-party integrations and enterprise support

### Qwik

- **Strengths**: Revolutionary resumability (near-zero JS), built-in lazy loading
- **Trade-off**: Smaller ecosystem, newer framework with less community resources
- **Choose if**: Initial load performance is your #1 priority

### SvelteKit

- **Strengths**: Compile-time optimizations, minimal runtime, superb DX with Vite
- **Trade-off**: Smaller job market, less enterprise adoption than Next.js
- **Choose if**: You want the best developer experience with great performance
