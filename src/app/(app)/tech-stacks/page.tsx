'use client';

import {
  Layers,
  Code2,
  Database,
  Server,
  TestTube,
  Package,
  Zap,
  Activity,
  BookOpen,
  Target,
  Users,
  Rocket,
  Smartphone,
  Palette,
  Globe,
  Settings,
} from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
export default function TechStacksPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-6xl">
        <div className="space-y-6">
          <SimpleCollapsibleContainer
            title="Tech Stack Summaries - Real-World Applications"
            icon={<BookOpen className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-900">
                      <Code2 className="h-4 w-4" />
                      Next.js - Enterprise & Scale
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 font-medium text-blue-800">
                          Real-World:
                        </p>
                        <p className="text-blue-700">
                          Netflix, TikTok Web, Hulu, Twitch, GitHub Copilot
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-blue-800">
                          Best For:
                        </p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• E-commerce platforms</li>
                          <li>• SaaS dashboards</li>
                          <li>• B2B enterprise apps</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-blue-800">
                          Sweet Spot:
                        </p>
                        <p className="text-blue-700">
                          Large teams needing proven solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-purple-900">
                      <Zap className="h-4 w-4" />
                      Qwik - Performance-First
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 font-medium text-purple-800">
                          Real-World:
                        </p>
                        <p className="text-purple-700">
                          Builder.io, Partytown, emerging e-commerce
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-purple-800">
                          Best For:
                        </p>
                        <ul className="space-y-1 text-purple-700">
                          <li>• Landing pages</li>
                          <li>• Global e-commerce</li>
                          <li>• Mobile-first PWAs</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-purple-800">
                          Sweet Spot:
                        </p>
                        <p className="text-purple-700">
                          When milliseconds impact revenue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-orange-900">
                      <Activity className="h-4 w-4" />
                      SvelteKit - Developer Productivity
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 font-medium text-orange-800">
                          Real-World:
                        </p>
                        <p className="text-orange-700">
                          NY Times, Apple docs, Spotify tools
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-orange-800">
                          Best For:
                        </p>
                        <ul className="space-y-1 text-orange-700">
                          <li>• Startups shipping fast</li>
                          <li>• Data dashboards</li>
                          <li>• Developer tools</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1 font-medium text-orange-800">
                          Sweet Spot:
                        </p>
                        <p className="text-orange-700">
                          Small expert teams valuing DX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SimpleCollapsibleContainer
                title="Decision Matrix"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="grid gap-4 text-sm md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h5 className="mb-2 font-semibold">Choose Next.js when:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ Building for enterprise</li>
                      <li>✓ Need proven patterns</li>
                      <li>✓ Hiring is a concern</li>
                      <li>✓ Extensive integrations needed</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h5 className="mb-2 font-semibold">Choose Qwik when:</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ Performance impacts KPIs</li>
                      <li>✓ Global/mobile users</li>
                      <li>✓ Core Web Vitals critical</li>
                      <li>✓ Emerging markets focus</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h5 className="mb-2 font-semibold">
                      Choose SvelteKit when:
                    </h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ Small expert team</li>
                      <li>✓ DX is priority</li>
                      <li>✓ Building internal tools</li>
                      <li>✓ Rapid iteration needed</li>
                    </ul>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Use Cases Comparison"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Use Case</th>
                          <th className="p-2 text-left">Best Stack</th>
                          <th className="p-2 text-left">Why</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Multi-tenant SaaS</td>
                          <td className="p-2 font-medium text-blue-600">
                            Next.js
                          </td>
                          <td className="p-2 text-xs">
                            Enterprise auth, complex permissions
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">E-commerce storefront</td>
                          <td className="p-2 font-medium text-purple-600">
                            Qwik
                          </td>
                          <td className="p-2 text-xs">
                            Instant loads increase conversions
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Admin dashboard</td>
                          <td className="p-2 font-medium text-orange-600">
                            SvelteKit
                          </td>
                          <td className="p-2 text-xs">
                            Complex interactions, fast development
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Marketing site</td>
                          <td className="p-2 font-medium text-purple-600">
                            Qwik
                          </td>
                          <td className="p-2 text-xs">
                            SEO + performance critical
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Real-time collab</td>
                          <td className="p-2 font-medium text-blue-600">
                            Next.js
                          </td>
                          <td className="p-2 text-xs">
                            tRPC subscriptions, WebSocket support
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Developer tools</td>
                          <td className="p-2 font-medium text-orange-600">
                            SvelteKit
                          </td>
                          <td className="p-2 text-xs">
                            Best DX, fast iterations
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Performance & Rankings"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <h5 className="mb-3 font-semibold text-green-900">
                      Performance Ranking
                    </h5>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-green-700">1.</span>
                        <span className="text-green-800">Qwik</span>
                        <span className="text-xs text-green-600">
                          (Resumability)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-green-700">2.</span>
                        <span className="text-green-800">SvelteKit</span>
                        <span className="text-xs text-green-600">
                          (Compiler)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-green-700">3.</span>
                        <span className="text-green-800">Next.js</span>
                        <span className="text-xs text-green-600">
                          (Optimized)
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h5 className="mb-3 font-semibold text-blue-900">
                      Ecosystem Ranking
                    </h5>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">1.</span>
                        <span className="text-blue-800">Next.js</span>
                        <span className="text-xs text-blue-600">(Massive)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">2.</span>
                        <span className="text-blue-800">SvelteKit</span>
                        <span className="text-xs text-blue-600">(Growing)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">3.</span>
                        <span className="text-blue-800">Qwik</span>
                        <span className="text-xs text-blue-600">
                          (Emerging)
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h5 className="mb-3 font-semibold text-purple-900">
                      DX Ranking
                    </h5>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-purple-700">1.</span>
                        <span className="text-purple-800">SvelteKit</span>
                        <span className="text-xs text-purple-600">
                          (Vite + Svelte)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-purple-700">2.</span>
                        <span className="text-purple-800">Next.js</span>
                        <span className="text-xs text-purple-600">
                          (Mature)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-purple-700">3.</span>
                        <span className="text-purple-800">Qwik</span>
                        <span className="text-xs text-purple-600">
                          (Learning curve)
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </SimpleCollapsibleContainer>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Tier 3 Tech Stack (Standard / Mainstream)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  Tier 3 architectures reflect mature, widely adopted
                  technologies ideal for teams needing stability,
                  maintainability, and ecosystem support. These stacks provide
                  predictable deployments with well-established tooling.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="🌐 Web Architectures"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      1. React + Vite + Express API
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> SPAs, dashboards, portals
                      </p>
                      <p>
                        <strong>Rendering:</strong> Client-side rendering (CSR)
                      </p>
                      <p>
                        <strong>API:</strong> REST (Express.js)
                      </p>
                      <p>
                        <strong>ORM:</strong> Prisma / Sequelize / TypeORM
                      </p>
                      <p>
                        <strong>State:</strong> Redux / Zustand / Context API
                      </p>
                      <p>
                        <strong>Styling:</strong> SCSS, Tailwind, Material UI
                      </p>
                      <p>
                        <strong>Deployment:</strong> Docker, Railway, Heroku,
                        VPS
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      2. Vue 3 + Vite + Node.js REST API
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> Admin panels, internal tools
                      </p>
                      <p>
                        <strong>Rendering:</strong> CSR
                      </p>
                      <p>
                        <strong>API:</strong> REST or GraphQL
                      </p>
                      <p>
                        <strong>State:</strong> Pinia / Vuex
                      </p>
                      <p>
                        <strong>Styling:</strong> Vuetify, Tailwind,
                        BootstrapVue
                      </p>
                      <p>
                        <strong>Deployment:</strong> Render, Railway,
                        traditional servers
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      3. Angular + NestJS
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> Enterprise-scale internal
                        apps
                      </p>
                      <p>
                        <strong>Rendering:</strong> CSR + optional SSR (Angular
                        Universal)
                      </p>
                      <p>
                        <strong>API:</strong> REST + OpenAPI support (NestJS)
                      </p>
                      <p>
                        <strong>State:</strong> NgRx / RxJS
                      </p>
                      <p>
                        <strong>Styling:</strong> Angular Material, SCSS
                      </p>
                      <p>
                        <strong>Deployment:</strong> Docker, Kubernetes, VPS,
                        enterprise infra
                      </p>
                    </div>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="📱 Mobile Architectures"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      1. React Native CLI + Express Backend
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> Standard mobile apps
                      </p>
                      <p>
                        <strong>API:</strong> REST or GraphQL
                      </p>
                      <p>
                        <strong>State:</strong> Redux, Zustand
                      </p>
                      <p>
                        <strong>UI Kit:</strong> React Native Paper, NativeBase
                      </p>
                      <p>
                        <strong>Deployment:</strong> Fastlane + App Store / Play
                        Store
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      2. Ionic + Angular
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> Hybrid apps (web + native)
                      </p>
                      <p>
                        <strong>UI:</strong> Angular + Ionic components
                      </p>
                      <p>
                        <strong>State:</strong> NgRx / services
                      </p>
                      <p>
                        <strong>Deployment:</strong> Capacitor → App Stores or
                        Web
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      3. Native Android (Kotlin) + Firebase
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> Platform-first native apps
                      </p>
                      <p>
                        <strong>Backend:</strong> Firebase (Firestore, Auth,
                        Functions)
                      </p>
                      <p>
                        <strong>State:</strong> ViewModel + LiveData
                      </p>
                      <p>
                        <strong>Deployment:</strong> Google Play Store
                      </p>
                    </div>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="✅ Why Choose Tier 3?"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <h4 className="mb-3 font-semibold text-green-900">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>
                        • 🏗 <strong>Mature Ecosystem</strong> - Long-standing
                        community and tool support
                      </li>
                      <li>
                        • 📦 <strong>Broad Talent Pool</strong> - Easy to hire
                        and scale dev teams
                      </li>
                      <li>
                        • ⚙️ <strong>Standard DevOps</strong> - Supports Docker,
                        CI/CD, VPS hosting
                      </li>
                      <li>
                        • 🔁 <strong>Incrementally Upgradeable</strong> - Easy
                        to modernize or refactor
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <h4 className="mb-3 font-semibold text-orange-900">
                      When to Use Tier 3:
                    </h4>
                    <ul className="space-y-2 text-sm text-orange-800">
                      <li>
                        • Building <strong>internal tools</strong> or{' '}
                        <strong>admin UIs</strong>
                      </li>
                      <li>• Want to avoid bleeding-edge tech debt</li>
                      <li>
                        • The <strong>performance profile</strong> doesn't
                        demand edge/SSR
                      </li>
                      <li>
                        • Need <strong>predictable deployments</strong> and{' '}
                        <strong>stable libraries</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </SimpleCollapsibleContainer>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Tier 4 Tech Stack (Modern / Production-Ready)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  Tier 4 architectures provide the best balance of modern DX and
                  production-readiness, ideal for teams that want performance,
                  maintainability, and mainstream support without the complexity
                  of cutting-edge solutions.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="🌐 Web Architectures"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      1. Astro + React Islands + Tailwind
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> Content-heavy sites (docs,
                        blogs, marketing)
                      </p>
                      <p>
                        <strong>Rendering:</strong> SSG + Partial Hydration
                        (Islands)
                      </p>
                      <p>
                        <strong>Styling:</strong> Tailwind
                      </p>
                      <p>
                        <strong>Routing:</strong> File-based (Astro Pages)
                      </p>
                      <p>
                        <strong>Data:</strong> Markdown, CMS, or REST API
                      </p>
                      <p>
                        <strong>Deployment:</strong> Vercel, Netlify
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      2. Next.js Pages Router + REST API
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> Admin panels, dashboards,
                        light SPAs
                      </p>
                      <p>
                        <strong>Rendering:</strong> SSR/SSG/ISR (selective)
                      </p>
                      <p>
                        <strong>API:</strong> REST via `/api` routes
                      </p>
                      <p>
                        <strong>ORM:</strong> Prisma or TypeORM
                      </p>
                      <p>
                        <strong>Styling:</strong> Tailwind or Styled Components
                      </p>
                      <p>
                        <strong>Deployment:</strong> Vercel
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      3. Nuxt 3 + Pinia + REST
                    </h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>
                        <strong>Use Case:</strong> Vue-centric business apps
                      </p>
                      <p>
                        <strong>Rendering:</strong> SSR + Static + SPA
                      </p>
                      <p>
                        <strong>State:</strong> Pinia
                      </p>
                      <p>
                        <strong>API:</strong> REST/GraphQL
                      </p>
                      <p>
                        <strong>Styling:</strong> Tailwind or WindiCSS
                      </p>
                      <p>
                        <strong>Deployment:</strong> Netlify, Cloudflare
                      </p>
                    </div>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="📱 Mobile Architectures"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      1. Expo (React Native) + REST
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> General mobile apps
                      </p>
                      <p>
                        <strong>State:</strong> Zustand or Context
                      </p>
                      <p>
                        <strong>API:</strong> REST or GraphQL (Apollo)
                      </p>
                      <p>
                        <strong>UI Kit:</strong> NativeBase / Tamagui / custom
                      </p>
                      <p>
                        <strong>Deployment:</strong> EAS Build + App Store/Play
                        Store
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      2. Flutter + Firebase
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> MVPs, startups,
                        multi-platform UIs
                      </p>
                      <p>
                        <strong>Backend:</strong> Firebase Auth, Firestore,
                        Cloud Functions
                      </p>
                      <p>
                        <strong>State:</strong> Riverpod or Bloc
                      </p>
                      <p>
                        <strong>Deployment:</strong> Play Store, App Store
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <h4 className="mb-3 font-semibold text-purple-900">
                      3. Capacitor + Vue (Quasar/Nuxt)
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        <strong>Use Case:</strong> Hybrid apps with web+native
                        UI
                      </p>
                      <p>
                        <strong>UI:</strong> Vue + Quasar
                      </p>
                      <p>
                        <strong>API:</strong> REST or local storage
                      </p>
                      <p>
                        <strong>Native Access:</strong> Capacitor plugins
                      </p>
                      <p>
                        <strong>Deployment:</strong> iOS/Android and PWA from
                        one codebase
                      </p>
                    </div>
                  </div>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="💡 Use Cases & Characteristics"
                icon={<Layers className="text-foreground h-4 w-4" />}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <h4 className="mb-3 font-semibold text-orange-900">
                      Ideal For:
                    </h4>
                    <ul className="space-y-2 text-sm text-orange-800">
                      <li>
                        • <strong>SaaS dashboards</strong> - Admin panels and
                        business applications
                      </li>
                      <li>
                        • <strong>B2C mobile apps</strong> - Consumer-facing
                        mobile applications
                      </li>
                      <li>
                        • <strong>CMS-powered marketing sites</strong> -
                        Content-heavy websites
                      </li>
                      <li>
                        • <strong>MVPs with mobile-first UX</strong> - Rapid
                        prototyping and validation
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <h4 className="mb-3 font-semibold text-green-900">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li>
                        • ✅ <strong>Modern DX</strong> - Great developer
                        experience with proven tools
                      </li>
                      <li>
                        • ✅ <strong>Production-Ready</strong> - Stable,
                        well-supported technologies
                      </li>
                      <li>
                        • ✅ <strong>Performance</strong> - Optimized for
                        real-world usage
                      </li>
                      <li>
                        • ✅ <strong>Maintainability</strong> - Long-term
                        support and community
                      </li>
                      <li>
                        • ✅ <strong>Mainstream Support</strong> - Large
                        ecosystems and documentation
                      </li>
                    </ul>
                  </div>
                </div>
              </SimpleCollapsibleContainer>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Next.js Full Stack Architecture (Tier 5 – Elite)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-900">Purpose</h4>
                <p className="text-sm text-blue-800">
                  This document defines a production-grade full-stack
                  architecture using Next.js App Router, compliant with Lloyd
                  Tier 5 specifications. It includes core stack choices,
                  deployment model, file structure, and up-to-date version
                  references with documentation links.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">Frontend</td>
                        <td className="p-2">
                          <a
                            href="https://nextjs.org/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Next.js
                          </a>
                        </td>
                        <td className="p-2 font-bold">15.5.3</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/vercel/next.js/releases/tag/v15.5.3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Release Notes
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Styling</td>
                        <td className="p-2">
                          <a
                            href="https://tailwindcss.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Tailwind CSS
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.13</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/tailwindlabs/tailwindcss/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">State Management</td>
                        <td className="p-2">
                          <a
                            href="https://docs.pmnd.rs/zustand/getting-started/introduction"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zustand
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.5.0</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/pmndrs/zustand/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Remote State</td>
                        <td className="p-2">
                          <a
                            href="https://tanstack.com/query/latest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            TanStack Query
                          </a>
                        </td>
                        <td className="p-2 font-bold">5.34.2</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/TanStack/query/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">API Layer</td>
                        <td className="p-2">
                          <a
                            href="https://trpc.io/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            tRPC
                          </a>
                        </td>
                        <td className="p-2 font-bold">11.5.1</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/trpc/trpc/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zod
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.8</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/colinhacks/zod/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">ORM</td>
                        <td className="p-2">
                          <a
                            href="https://www.prisma.io/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Prisma
                          </a>
                        </td>
                        <td className="p-2 font-bold">6.16.1</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/prisma/prisma/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Database</td>
                        <td className="p-2">PostgreSQL</td>
                        <td className="p-2">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://www.postgresql.org/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            PostgreSQL Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Type System</td>
                        <td className="p-2">TypeScript</td>
                        <td className="p-2 font-bold">5.4.3</td>
                        <td className="p-2">
                          <a
                            href="https://www.typescriptlang.org/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://vitest.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Vitest
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.6.3</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/vitest-dev/vitest/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI Testing</td>
                        <td className="p-2">
                          <a
                            href="https://testing-library.com/docs/react-testing-library/intro/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Testing Library
                          </a>
                        </td>
                        <td className="p-2 font-bold">14.2.1</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/testing-library/react-testing-library/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://playwright.dev/docs/intro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Playwright
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.44.0</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/microsoft/playwright/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">
                          <a
                            href="https://vercel.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Vercel
                          </a>{' '}
                          /{' '}
                          <a
                            href="https://developers.cloudflare.com/pages/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Cloudflare
                          </a>
                        </td>
                        <td className="p-2">N/A</td>
                        <td className="p-2 text-xs">Cloud-hosted Edge/CDN</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Containerization</td>
                        <td className="p-2">
                          <a
                            href="https://docs.docker.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Docker
                          </a>
                        </td>
                        <td className="p-2 font-bold">24.0+</td>
                        <td className="p-2">
                          <a
                            href="https://docs.docker.com/engine/release-notes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/tier5-app
├── app/                    # App Router-based pages & layouts
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (Server Component)
│   ├── api/                # Route handlers (tRPC optional)
│   └── users/              # Example dynamic route (/users/:id)
├── components/             # Reusable UI components
│   ├── ui/                 # Atoms & primitives (e.g., Button, Card)
│   └── features/           # Contextual UI (e.g., UserProfile)
├── lib/                    # Utility functions & typed clients
│   └── trpc/               # tRPC client & hooks
├── server/                 # Server-only logic
│   ├── db/                 # Prisma schema & client
│   └── api/                # tRPC routers, procedures
├── config/                 # App configuration (env, constants)
├── public/                 # Static assets (images, favicon, etc.)
├── styles/                 # Global styles & Tailwind config
├── tests/                  # Unit + integration tests
└── Dockerfile              # Optional: Docker multi-stage build`}
                </pre>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="API Layer: tRPC Example"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`// server/api/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../db/client';

const t = initTRPC.create();

export const appRouter = t.router({
  users: t.router({
    getById: t.procedure.input(z.string()).query(({ input }) =>
      prisma.user.findUnique({ where: { id: input } })
    ),
  }),
});

export type AppRouter = typeof appRouter;`}
                </pre>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Dockerfile (Edge-Ready)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <TestTube className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>
                      ✅ End-to-end type safety (tRPC + Prisma + TypeScript)
                    </li>
                    <li>✅ Streaming SSR with React Server Components</li>
                    <li>✅ Edge-ready with zero-config deployment on Vercel</li>
                    <li>
                      ✅ Modular codebase separation (client/server/shared)
                    </li>
                    <li>✅ Full testing pipeline (unit, integration, E2E)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite)
                    </li>
                    <li>
                      <strong>Focus:</strong> Performance, DX, Deployment
                      Readiness
                    </li>
                    <li>
                      <strong>Verified:</strong> Type-safe, Edge-Optimized,
                      Modular, Tested
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-12</td>
                        <td className="p-2">Initial architecture draft</td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                      <tr>
                        <td className="p-2">1.1.0</td>
                        <td className="p-2">2025-09-12</td>
                        <td className="p-2">
                          Added real-time version research
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Qwik Full Stack Architecture (Tier 5 – Elite)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 font-semibold text-purple-900">Purpose</h4>
                <p className="text-sm text-purple-800">
                  This document defines a production-grade full-stack
                  architecture using Qwik Framework, compliant with Lloyd Tier 5
                  specifications. It emphasizes performance, edge-resume
                  rendering, modularity, and type safety, with the latest
                  version references and docs.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">Frontend</td>
                        <td className="p-2">
                          <a
                            href="https://qwik.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Qwik
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.16.0</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/@builder.io/qwik"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://github.com/BuilderIO/qwik/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Styling</td>
                        <td className="p-2">
                          <a
                            href="https://tailwindcss.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Tailwind CSS
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.13</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/tailwindcss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">State Management</td>
                        <td className="p-2">
                          <a
                            href="https://qwik.dev/docs/signal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Qwik Signals
                          </a>
                        </td>
                        <td className="p-2 font-bold">Built-in</td>
                        <td className="p-2 text-xs">Built into Qwik</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">API Layer</td>
                        <td className="p-2">
                          <a
                            href="https://qwik.dev/docs/endpoints/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Qwik City Endpoints
                          </a>
                        </td>
                        <td className="p-2 font-bold">Built-in</td>
                        <td className="p-2 text-xs">
                          Qwik file-based endpoints
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zod
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.8</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/zod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">ORM</td>
                        <td className="p-2">
                          <a
                            href="https://orm.drizzle.team/docs/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Drizzle ORM
                          </a>
                        </td>
                        <td className="p-2 font-bold">0.44.5</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/drizzle-orm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Database</td>
                        <td className="p-2">PostgreSQL</td>
                        <td className="p-2">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://www.postgresql.org/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            PostgreSQL Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Type System</td>
                        <td className="p-2">TypeScript</td>
                        <td className="p-2 font-bold">5.4.3</td>
                        <td className="p-2">
                          <a
                            href="https://www.typescriptlang.org/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://vitest.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Vitest
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.6.3</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/vitest-dev/vitest/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI Testing</td>
                        <td className="p-2">
                          <a
                            href="https://testing-library.com/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Testing Library
                          </a>
                        </td>
                        <td className="p-2 font-bold">14.2.1</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/testing-library/react-testing-library/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://playwright.dev/docs/intro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Playwright
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.44.0</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/microsoft/playwright/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">
                          <a
                            href="https://developers.cloudflare.com/pages/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Cloudflare Pages
                          </a>
                        </td>
                        <td className="p-2">N/A</td>
                        <td className="p-2 text-xs">
                          Edge-deployed & CDN native
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Containerization</td>
                        <td className="p-2">
                          <a
                            href="https://docs.docker.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Docker
                          </a>
                        </td>
                        <td className="p-2 font-bold">24.0+</td>
                        <td className="p-2">
                          <a
                            href="https://docs.docker.com/engine/release-notes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/qwik-app
├── src/
│   ├── components/          # Qwik components (resumable by default)
│   ├── routes/              # File-based routing with endpoints
│   ├── lib/                 # Utilities and helpers
│   ├── db/                  # Drizzle schema & client
│   └── styles/              # Tailwind & global styles
├── public/                  # Static assets
├── drizzle.config.ts        # ORM config
├── qwik.config.ts           # Qwik app config
└── Dockerfile               # Optional container build`}
                </pre>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="API Layer Example (Qwik Endpoint)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`// src/routes/api/user.tsx
import { z } from 'zod';
import { drizzleClient } from '~/db/client';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useUser = routeLoader$(async ({ query }) => {
  const id = z.string().parse(query.get('id'));
  return drizzleClient.query.users.findFirst({ where: { id } });
});`}
                </pre>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Dockerfile (Optional Build)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server/entry.js"]`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <Zap className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>
                      ✅ Near-zero JavaScript shipped by default (resumability)
                    </li>
                    <li>
                      ✅ File-based routing with endpoint handlers (API + UI in
                      one)
                    </li>
                    <li>
                      ✅ Excellent edge performance with CDN-native deployment
                    </li>
                    <li>✅ Simple state model using Signals</li>
                    <li>✅ Type-safe ORM and Zod integration</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite)
                    </li>
                    <li>
                      <strong>Focus:</strong> Performance, Edge-native
                      rendering, Minimal JS, DX
                    </li>
                    <li>
                      <strong>Verified:</strong> Resumable architecture,
                      Edge-Optimized, Type-Safe
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-12</td>
                        <td className="p-2">Initial architecture draft</td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                      <tr>
                        <td className="p-2">1.1.0</td>
                        <td className="p-2">2025-09-12</td>
                        <td className="p-2">Added latest verified versions</td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="SvelteKit Full Stack Architecture (Tier 5 – Elite)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h4 className="mb-2 font-semibold text-orange-900">Purpose</h4>
                <p className="text-sm text-orange-800">
                  Defines a production-grade full-stack architecture using
                  SvelteKit, matching Lloyd's Tier 5 standards: performance,
                  edge/SSR, type-safety, modularity, etc.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">
                          Frontend / Framework
                        </td>
                        <td className="p-2">
                          <a
                            href="https://svelte.dev/docs/kit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            SvelteKit
                          </a>
                        </td>
                        <td className="p-2 font-bold">2.39.1</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/@sveltejs/kit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://github.com/sveltejs/kit/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI / Compiler</td>
                        <td className="p-2">
                          <a
                            href="https://svelte.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Svelte
                          </a>
                        </td>
                        <td className="p-2 font-bold">5.38.10</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/svelte"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Styling</td>
                        <td className="p-2">
                          <a
                            href="https://tailwindcss.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Tailwind CSS
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.13</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/tailwindlabs/tailwindcss/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">ORM / Data Layer</td>
                        <td className="p-2">
                          <a
                            href="https://orm.drizzle.team/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Drizzle ORM
                          </a>
                        </td>
                        <td className="p-2 font-bold">0.44.5</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/drizzle-orm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://github.com/drizzle-team/drizzle-orm/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Migration / DB Tool</td>
                        <td className="p-2">
                          <a
                            href="https://orm.drizzle.team/docs/latest-releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Drizzle Kit
                          </a>
                        </td>
                        <td className="p-2 font-bold">0.31.4</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/drizzle-kit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Type System</td>
                        <td className="p-2">TypeScript</td>
                        <td className="p-2 font-bold">5.9.2</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/microsoft/typescript/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zod
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.8</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/zod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://vitest.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Vitest
                          </a>
                        </td>
                        <td className="p-2 font-bold">3.2.4</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/vitest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://vitest.dev/guide/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://playwright.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Playwright
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.55.0</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/playwright"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://playwright.dev/docs/release-notes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">Vercel / Netlify / Cloudflare</td>
                        <td className="p-2">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            CF Guide
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://docs.netlify.com/build/frameworks/framework-setup-guides/sveltekit/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Netlify
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Containerization</td>
                        <td className="p-2">Docker</td>
                        <td className="p-2 font-bold">24.0+</td>
                        <td className="p-2">
                          <a
                            href="https://docs.docker.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/sveltekit-app
├── src/
│   ├── routes/             # +page.svelte, +page.server.ts, +layout etc
│   ├── lib/                # Utilities, helpers, shared code
│   ├── db/                 # Drizzle/ schema + client
│   ├── components/         # Reusable UI components
│   └── styles/             # Tailwind & global CSS
├── static/                 # Static assets
├── svelte.config.js        # SvelteKit config (adapters, preprocess)
├── drizzle.config.ts       # ORM / migrations config
├── .env                    # Environment / secrets
└── Dockerfile              # Multi-stage build (if using container deployment)`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <Activity className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>✅ Very fast SSR + hydration via Vite build tooling</li>
                    <li>✅ First-class TypeScript support throughout</li>
                    <li>✅ Drizzle ORM is serverless-friendly</li>
                    <li>✅ Deployment flexibility with adapters</li>
                    <li>✅ Less JS overhead, compiler optimizations</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite)
                    </li>
                    <li>
                      <strong>Focus:</strong> Edge/SSR, Type Safety,
                      Performance, Modular Structure
                    </li>
                    <li>
                      <strong>Verified:</strong> All tools versioned and tested
                    </li>
                  </ul>
                </div>
              </div>

              <SimpleCollapsibleContainer
                title="Lloyd T5 Spec Compliance"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Spec Requirement</th>
                        <th className="p-2 text-left">Meets?</th>
                        <th className="p-2 text-left">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">SSR / Hybrid Rendering</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          SvelteKit supports SSR + static + client side as
                          needed
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Edge / Serverless Deployment</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Adapters for Edge, Netlify, Vercel, etc.
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type Safety (TS + Schema)</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Svelte 5 + Drizzle + TypeScript
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">ORM + Migrations</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Drizzle ORM + Drizzle Kit
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Minimal JS overhead</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Svelte's compiler + tree shaking & minimal runtime
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">DX & Tooling</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Vite build, hot reload, strong docs
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Testing / E2E</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Vitest 3.2.4 and Playwright 1.55 verified
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-13</td>
                        <td className="p-2">
                          Initial SvelteKit Architecture Spec
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                      <tr>
                        <td className="p-2">1.1.0</td>
                        <td className="p-2">2025-09-13</td>
                        <td className="p-2">
                          Filled in latest testing/validation versions
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="React Native + Expo + tRPC Full Stack Architecture (Tier 5 – Elite)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-900">Purpose</h4>
                <p className="text-sm text-green-800">
                  Defines a production-grade mobile architecture using React
                  Native, Expo, and tRPC with full type-safety, edge
                  deployability, and modular code structure for web + iOS +
                  Android.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI Framework</td>
                        <td className="p-2">
                          <a
                            href="https://reactnative.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            React Native
                          </a>
                        </td>
                        <td className="p-2 font-bold">0.74.0</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/facebook/react-native/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Bundler / Dev Tool</td>
                        <td className="p-2">
                          <a
                            href="https://docs.expo.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Expo SDK
                          </a>
                        </td>
                        <td className="p-2 font-bold">SDK 50</td>
                        <td className="p-2">
                          <a
                            href="https://blog.expo.dev/expo-sdk-50-c4a224ee4a0f"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            SDK 50 Release
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Navigation</td>
                        <td className="p-2">
                          <a
                            href="https://expo.github.io/router/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Expo Router
                          </a>
                        </td>
                        <td className="p-2 font-bold">2.4.0</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/expo/router/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">API Layer</td>
                        <td className="p-2">
                          <a
                            href="https://trpc.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            tRPC
                          </a>
                        </td>
                        <td className="p-2 font-bold">11.0.0</td>
                        <td className="p-2">
                          <a
                            href="https://trpc.io/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">State Management</td>
                        <td className="p-2">
                          <a
                            href="https://zustand-demo.pmnd.rs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zustand
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.5.3</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/zustand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Auth</td>
                        <td className="p-2">
                          <a
                            href="https://authjs.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Auth.js
                          </a>{' '}
                          /{' '}
                          <a
                            href="https://clerk.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Clerk
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2">
                          <a
                            href="https://authjs.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Auth.js
                          </a>{' '}
                          •{' '}
                          <a
                            href="https://clerk.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Clerk
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zod
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.8</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/zod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Edge Backend</td>
                        <td className="p-2">
                          Vercel Functions / Cloudflare Workers
                        </td>
                        <td className="p-2">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://vercel.com/docs/functions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Vercel Functions
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://jestjs.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Jest
                          </a>{' '}
                          +{' '}
                          <a
                            href="https://testing-library.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Testing Library
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2">
                          <a
                            href="https://jestjs.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Jest Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://wix.github.io/Detox/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Detox
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2">
                          <a
                            href="https://wix.github.io/Detox/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">
                          <a
                            href="https://docs.expo.dev/eas/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            EAS Build
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2">
                          <a
                            href="https://docs.expo.dev/eas/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            EAS Docs
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/react-native-app
├── app/                    # Expo Router pages and routes
│   ├── _layout.tsx         # Navigation layout
│   ├── index.tsx           # Home screen
│   └── auth/               # Auth routes
├── components/             # Reusable UI components
├── lib/                    # Utility functions and tRPC clients
├── server/                 # tRPC routers and server handlers
├── config/                 # Expo config, tsconfig, env
├── .env                    # Secrets and environment variables
└── tests/                  # Unit and e2e tests`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <Smartphone className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>✅ Cross-platform (iOS, Android, Web via Expo Web)</li>
                    <li>✅ Full type-safety with tRPC + Zod</li>
                    <li>
                      ✅ Monorepo-friendly and works with Next.js backends
                    </li>
                    <li>✅ Expo EAS Build supports CI/CD</li>
                    <li>✅ Great DX with fast refresh, Expo Dev Tools</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite)
                    </li>
                    <li>
                      <strong>Focus:</strong> Mobile DX, Type Safety, Edge APIs,
                      Cross-platform
                    </li>
                    <li>
                      <strong>Verified:</strong> React Native 0.74, Expo SDK 50,
                      tRPC 11
                    </li>
                  </ul>
                </div>
              </div>

              <SimpleCollapsibleContainer
                title="Lloyd T5 Spec Compliance"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Spec Requirement</th>
                        <th className="p-2 text-left">Meets?</th>
                        <th className="p-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Native Mobile Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Runs iOS + Android out of the box
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Web Compatibility</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Via Expo Web + React Native Web
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type Safety End-to-End</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">tRPC + TypeScript + Zod</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Edge-Friendly API Layer</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Easily deployable to Vercel, CF Workers
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Auth + Session Handling</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Clerk/Auth.js + secure storage
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">State Management</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Zustand or TanStack Query
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Testing Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Detox + Jest setup for native + unit testing
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-13</td>
                        <td className="p-2">
                          Initial React Native T5 Architecture Spec
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Flutter + Dart Frog + Supabase Full Stack Architecture (Tier 5 – Elite)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                <h4 className="mb-2 font-semibold text-cyan-900">Purpose</h4>
                <p className="text-sm text-cyan-800">
                  Defines a high-performance, type-safe architecture for
                  building mobile apps using Flutter, Dart Frog, and Supabase —
                  ideal for complex mobile UI and edge-compatible APIs.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI Framework</td>
                        <td className="p-2">
                          <a
                            href="https://flutter.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Flutter
                          </a>
                        </td>
                        <td className="p-2 font-bold">3.22.1</td>
                        <td className="p-2">
                          <a
                            href="https://docs.flutter.dev/release/whats-new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Releases
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Language</td>
                        <td className="p-2">
                          <a
                            href="https://dart.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Dart
                          </a>
                        </td>
                        <td className="p-2 font-bold">3.4.0</td>
                        <td className="p-2">
                          <a
                            href="https://dart.dev/guides/whats-new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            What's New
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Backend Framework</td>
                        <td className="p-2">
                          <a
                            href="https://dartfrog.vgv.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Dart Frog
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.1.1</td>
                        <td className="p-2">
                          <a
                            href="https://github.com/VeryGoodOpenSource/dart_frog/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            GitHub
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Edge Storage & Auth</td>
                        <td className="p-2">
                          <a
                            href="https://supabase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Supabase
                          </a>
                        </td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://supabase.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">ORM / SQL Client</td>
                        <td className="p-2">
                          <a
                            href="https://postgrest.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            PostgREST
                          </a>{' '}
                          via Supabase
                        </td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://postgrest.org/en/stable/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">State Management</td>
                        <td className="p-2">
                          <a
                            href="https://riverpod.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Riverpod
                          </a>
                        </td>
                        <td className="p-2 font-bold">3.0.0</td>
                        <td className="p-2">
                          <a
                            href="https://riverpod.dev/docs/introduction"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Auth</td>
                        <td className="p-2">Supabase Auth / OAuth / JWT</td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://supabase.com/docs/guides/auth"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Auth Guide
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://pub.dev/packages/freezed"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            freezed
                          </a>{' '}
                          +{' '}
                          <a
                            href="https://pub.dev/packages/json_serializable"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            json_serializable
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2">
                          <a
                            href="https://pub.dev/packages/freezed"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            pub.dev
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            flutter_test
                          </a>
                        </td>
                        <td className="p-2 font-bold">Built-in</td>
                        <td className="p-2 text-xs">
                          Built-in with Flutter SDK
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://docs.flutter.dev/testing/integration-tests"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            integration_test
                          </a>
                        </td>
                        <td className="p-2 font-bold">Latest</td>
                        <td className="p-2 text-xs">Official E2E solution</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">
                          Play Store / App Store / Firebase
                        </td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://docs.flutter.dev/deployment"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Deployment Docs
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/flutter-app
├── lib/
│   ├── main.dart             # App entry point
│   ├── features/             # Feature modules (screens, state, etc.)
│   ├── shared/               # Common UI components, helpers
│   ├── services/             # Supabase clients, auth, API
│   └── models/               # Data models and validation
├── test/                     # Unit + widget tests
├── integration_test/         # E2E tests
├── pubspec.yaml              # Dependencies and metadata
└── dart_frog/                # API server for local edge testing`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <Palette className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>
                      ✅ Full native performance (compiled) for Android & iOS
                    </li>
                    <li>✅ Dart Frog enables local API dev in Dart</li>
                    <li>
                      ✅ Supabase gives managed Postgres, Auth, and storage
                    </li>
                    <li>✅ Riverpod ensures modular, reactive state mgmt</li>
                    <li>✅ Deep integration with testing, hot reload, CI/CD</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite)
                    </li>
                    <li>
                      <strong>Focus:</strong> Native UX, Edge-Ready APIs,
                      Modular State, Type-Safety
                    </li>
                    <li>
                      <strong>Verified:</strong> Flutter 3.22.1, Dart 3.4.0,
                      Dart Frog 1.1.1
                    </li>
                  </ul>
                </div>
              </div>

              <SimpleCollapsibleContainer
                title="Lloyd T5 Spec Compliance"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Spec Requirement</th>
                        <th className="p-2 text-left">Meets?</th>
                        <th className="p-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Native Mobile Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Compiled Android + iOS apps
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Edge API Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Via Dart Frog or Supabase Functions
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type Safety + Validation</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Dart + Freezed + json_serializable
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">ORM or DB Migrations</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Supabase / PostgREST integration
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">State Management</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Riverpod modular pattern
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Testing Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          flutter_test + integration_test
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-13</td>
                        <td className="p-2">
                          Initial Flutter T5 Architecture Spec
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Capacitor + SvelteKit Full Stack Architecture (Tier 5 – Elite Hybrid Mobile)"
            icon={<Layers className="text-foreground h-5 w-5" />}
            defaultExpanded={false}
          >
            <div className="space-y-6">
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <h4 className="mb-2 font-semibold text-teal-900">Purpose</h4>
                <p className="text-sm text-teal-800">
                  Defines a hybrid-mobile architecture using SvelteKit for UI
                  and backend endpoints, wrapped into native containers using
                  Capacitor, suitable for building performant offline-friendly
                  mobile apps with web-first DX.
                </p>
              </div>

              <SimpleCollapsibleContainer
                title="Stack Overview (Latest Versions as of September 2025)"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Layer</th>
                        <th className="p-2 text-left">Technology</th>
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Docs / Source</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b">
                        <td className="p-2 font-medium">UI Framework</td>
                        <td className="p-2">
                          <a
                            href="https://kit.svelte.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            SvelteKit
                          </a>
                        </td>
                        <td className="p-2 font-bold">2.39.1</td>
                        <td className="p-2">
                          <a
                            href="https://kit.svelte.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Compiler</td>
                        <td className="p-2">
                          <a
                            href="https://svelte.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Svelte
                          </a>
                        </td>
                        <td className="p-2 font-bold">5.38.10</td>
                        <td className="p-2">
                          <a
                            href="https://svelte.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Hybrid Shell</td>
                        <td className="p-2">
                          <a
                            href="https://capacitorjs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Capacitor
                          </a>
                        </td>
                        <td className="p-2 font-bold">5.4.1</td>
                        <td className="p-2">
                          <a
                            href="https://capacitorjs.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Styling</td>
                        <td className="p-2">
                          <a
                            href="https://tailwindcss.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Tailwind CSS
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.13</td>
                        <td className="p-2">
                          <a
                            href="https://tailwindcss.com/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">State Management</td>
                        <td className="p-2">Svelte Stores / Signals</td>
                        <td className="p-2 font-bold">Built-in</td>
                        <td className="p-2">
                          <a
                            href="https://svelte.dev/docs#run-time-svelte-store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Svelte Stores
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">API Layer</td>
                        <td className="p-2">
                          SvelteKit Endpoints / REST / GraphQL
                        </td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://kit.svelte.dev/docs/routing#endpoints"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Endpoints
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">ORM / DB</td>
                        <td className="p-2">
                          <a
                            href="https://orm.drizzle.team/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Drizzle ORM
                          </a>
                        </td>
                        <td className="p-2 font-bold">0.44.5</td>
                        <td className="p-2">
                          <a
                            href="https://www.npmjs.com/package/drizzle-orm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            npm
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Validation</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Zod
                          </a>
                        </td>
                        <td className="p-2 font-bold">4.1.8</td>
                        <td className="p-2">
                          <a
                            href="https://zod.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Auth</td>
                        <td className="p-2">Supabase Auth / OAuth / Custom</td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://supabase.com/docs/guides/auth"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Supabase Auth
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Testing</td>
                        <td className="p-2">
                          <a
                            href="https://vitest.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Vitest
                          </a>
                        </td>
                        <td className="p-2 font-bold">3.2.4</td>
                        <td className="p-2">
                          <a
                            href="https://vitest.dev/guide/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Guide
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">E2E Testing</td>
                        <td className="p-2">
                          <a
                            href="https://playwright.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Playwright
                          </a>
                        </td>
                        <td className="p-2 font-bold">1.55.0</td>
                        <td className="p-2">
                          <a
                            href="https://playwright.dev/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Docs
                          </a>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Deployment</td>
                        <td className="p-2">Android / iOS via Capacitor</td>
                        <td className="p-2 font-bold">N/A</td>
                        <td className="p-2">
                          <a
                            href="https://capacitorjs.com/docs/guides/publishing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Publishing
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <SimpleCollapsibleContainer
                title="Folder Structure"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
                  {`/capacitor-sveltekit-app
├── src/
│   ├── routes/             # SvelteKit endpoints and screens
│   ├── components/         # Shared UI components
│   ├── lib/                # Utilities and helpers
│   ├── db/                 # Drizzle schemas + clients
│   └── styles/             # Tailwind and globals
├── capacitor/              # Native shell config (Android/iOS)
│   └── android/ios/        # Platform folders
├── static/                 # Static assets
├── svelte.config.js        # SvelteKit configuration
├── drizzle.config.ts       # ORM configuration
├── .env                    # Environment variables
└── tests/                  # Vitest and Playwright specs`}
                </pre>
              </SimpleCollapsibleContainer>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
                    <Globe className="h-4 w-4" />
                    Key Advantages
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
                    <li>✅ Hybrid native + web deployment via Capacitor</li>
                    <li>
                      ✅ Uses SvelteKit for backend & frontend in one repo
                    </li>
                    <li>
                      ✅ Edge-compatible via adapters
                      (Netlify/Vercel/Cloudflare)
                    </li>
                    <li>
                      ✅ Great offline performance with static + dynamic
                      rendering
                    </li>
                    <li>
                      ✅ Full TypeScript coverage with Zod, Drizzle, and Signals
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Compliance Tier
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>
                      <strong>Lloyd Tier:</strong> T5 (Elite Hybrid)
                    </li>
                    <li>
                      <strong>Focus:</strong> Hybrid portability, Type Safety,
                      Edge APIs, Minimal Overhead
                    </li>
                    <li>
                      <strong>Verified:</strong> All core stack pieces are
                      current
                    </li>
                  </ul>
                </div>
              </div>

              <SimpleCollapsibleContainer
                title="Lloyd T5 Spec Compliance"
                icon={<Layers className="text-foreground h-4 w-4" />}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Spec Requirement</th>
                        <th className="p-2 text-left">Meets?</th>
                        <th className="p-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Hybrid Mobile Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Via Capacitor + Android/iOS wrappers
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Web + Native App Deployable</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          PWA + native with one codebase
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Edge or Local APIs</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          SvelteKit endpoints, Netlify/Vercel adapters
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">State Management</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Stores / Signals / minimal overhead
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Validation & TS Safety</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Zod + full TypeScript usage
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Testing Support</td>
                        <td className="p-2 font-bold text-green-600">✅</td>
                        <td className="p-2 text-xs">
                          Vitest for unit, Playwright for E2E
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SimpleCollapsibleContainer>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">
                  Revision History
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Version</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">1.0.0</td>
                        <td className="p-2">2025-09-13</td>
                        <td className="p-2">
                          Initial Capacitor + SvelteKit Spec (T5)
                        </td>
                        <td className="p-2">Lloyd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
