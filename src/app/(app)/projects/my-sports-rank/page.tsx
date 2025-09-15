'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/cards/Card';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import {
  FolderOpen,
  Code,
  Package,
  Layers,
  Shield,
  TestTube,
  Target,
  Home,
  FileText,
  Star,
  GitBranch,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

// Default project landing page with mock data
// TODO: Replace with actual project data when individual projects are defined
export default function ProjectLandingPage() {
  // Tech stack data from draft-tracker analysis
  const techStackData = {
    core: [
      {
        name: 'Next.js',
        version: '15.5.2',
        description: 'App Router framework with Turbopack optimization',
      },
      {
        name: 'React',
        version: '19.1.0',
        description: 'Modern React with concurrent features',
      },
      {
        name: 'TypeScript',
        version: '^5',
        description: 'Type-safe development with strict configuration',
      },
      {
        name: 'Supabase',
        version: '^2.57.0',
        description: 'Real-time database with PostgreSQL backend',
      },
    ],
    ui: [
      {
        name: 'Tailwind CSS',
        version: '^4',
        description: 'Utility-first CSS framework for mobile optimization',
      },
      {
        name: 'Shadcn UI',
        version: 'latest',
        description: 'Radix UI components with consistent design system',
      },
      {
        name: 'Lucide React',
        version: '^0.542.0',
        description: 'Modern icon library for sports interfaces',
      },
      {
        name: 'Next Themes',
        version: '^0.4.6',
        description: 'Theme management for dark/light modes',
      },
    ],
    state: [
      {
        name: 'React Context',
        version: '19.1.0',
        description: 'Optimized state management for real-time updates',
      },
      {
        name: 'Supabase Realtime',
        version: '^2.57.0',
        description: 'Live database subscriptions with fallback polling',
      },
      {
        name: 'Custom Hooks',
        version: 'N/A',
        description: 'useSupabaseRealtime and usePollingFallback for sync',
      },
      {
        name: 'Zod',
        version: '^4.1.5',
        description: 'Runtime type validation for API safety',
      },
    ],
    utility: [
      {
        name: 'ESLint',
        version: '^9',
        description: 'Code quality and consistency enforcement',
      },
      {
        name: 'Vercel',
        version: 'latest',
        description: 'Deployment platform with edge optimization',
      },
      {
        name: 'UUID',
        version: '^11.1.0',
        description: 'Unique identifier generation for draft sessions',
      },
      {
        name: 'Sonner',
        version: '^2.0.7',
        description: 'Toast notifications for draft updates',
      },
    ],
  };

  // Project statistics from draft-tracker analysis
  const projectStats = {
    pages: 15,
    components: 25,
    linesOfCode: 8500,
    documentation: 1200,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">My Sports Rank</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A real-time fantasy football draft tracking application built for
              mobile-first usage. Track draft picks, player rankings, and team
              selections with live updates across all connected devices for the
              BBFL (Big Boy Fantasy League).
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {projectStats.pages}
                </div>
                <div className="text-muted-foreground text-sm">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projectStats.components}
                </div>
                <div className="text-muted-foreground text-sm">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {projectStats.linesOfCode.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">
                  Lines of Code
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {projectStats.documentation.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">
                  Documentation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="https://draft-tracker-ff5pf58p6-teamhart.vercel.app"
            className="block"
          >
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Project</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link
            href="https://github.com/srwlli/draft-tracker/blob/main/README.md"
            className="block"
          >
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Documentation</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link
            href="https://github.com/srwlli/draft-tracker"
            className="block"
          >
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Git</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link
            href="https://draft-tracker-ff5pf58p6-teamhart.vercel.app/dashboard"
            className="block"
          >
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Settings className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Workflow</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* App Purpose */}
        <SimpleCollapsibleContainer
          title="My Sports Rank Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is this project?</h4>
              <p className="text-muted-foreground leading-relaxed">
                My Sports Rank is a real-time fantasy football draft tracking
                application designed for mobile-first usage. It enables fantasy
                sports enthusiasts to track draft picks, manage player rankings,
                and monitor team selections with live synchronization across all
                connected devices for the BBFL (Big Boy Fantasy League).
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Real-time Updates:</strong> Live synchronization
                    across all connected users with polling fallback system
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Mobile Optimization:</strong> Touch-and-hold
                    drafting with confirmation dialogs and responsive design
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Dual Access Modes:</strong> Admin controls with
                    drafting capabilities and viewer-only mode for participants
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Position Filtering:</strong> Advanced filtering by
                    QB, RB, WR, TE, DEF, K positions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Live Statistics:</strong> Real-time draft statistics
                    grid showing picks by position and team
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Fantasy League Commissioners
                  </h5>
                  <p className="text-sm text-blue-700">
                    Draft administrators needing real-time control and undo
                    functionality for managing league drafts.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    League Participants
                  </h5>
                  <p className="text-sm text-green-700">
                    Fantasy players wanting live draft updates and player
                    tracking without administrative controls.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Mobile Draft Events
                  </h5>
                  <p className="text-sm text-purple-700">
                    In-person drafts requiring mobile-optimized touch interfaces
                    and confirmation dialogs.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Remote Draft Management
                  </h5>
                  <p className="text-sm text-orange-700">
                    Distributed leagues needing secure URL-based access without
                    login requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* App Features */}
        <SimpleCollapsibleContainer
          title="My Sports Rank Features"
          icon={<Star className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Core Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">Core Functionality</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FolderOpen className="h-5 w-5 text-blue-600" />
                    <h5 className="font-medium text-blue-900">
                      Draft Management
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Real-time pick tracking with admin controls and undo
                    functionality for comprehensive draft oversight.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Player Database
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Comprehensive player rankings with position-based filtering
                    system for strategic drafting.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Live Synchronization
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Supabase real-time subscriptions with polling fallback for
                    reliable cross-device updates.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Mobile Interface
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Touch-optimized drafting with confirmation dialogs and
                    loading states preventing double-clicks.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Mobile-First Design</h5>
                  <p className="text-muted-foreground text-sm">
                    Touch-and-hold interactions optimized for mobile draft
                    environments with responsive layouts.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Real-time Feedback</h5>
                  <p className="text-muted-foreground text-sm">
                    Instant UI updates with loading states preventing
                    double-clicks during draft selections.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Professional Branding</h5>
                  <p className="text-muted-foreground text-sm">
                    BBFL-themed interface with consistent visual identity for
                    fantasy league branding.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">
                Technical Capabilities
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Shield className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Security Model</h5>
                    <p className="text-muted-foreground text-sm">
                      Admin access via server-set HttpOnly cookies with
                      timing-safe validation for secure draft management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Performance Optimization</h5>
                    <p className="text-muted-foreground text-sm">
                      Race condition prevention and optimized real-time
                      synchronization for smooth draft experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">No Login Required</h5>
                    <p className="text-muted-foreground text-sm">
                      URL-based access system with secure admin token management
                      eliminating user registration barriers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Application Stack */}
        <SimpleCollapsibleContainer
          title="My Sports Rank Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Fantasy Sports Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
                  <p className="text-sm text-blue-700">
                    Mobile-first real-time fantasy sports application with live
                    synchronization
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Components
                  </h5>
                  <p className="text-sm text-green-700">
                    Modular React architecture with Shadcn UI components and
                    real-time contexts
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">State</h5>
                  <p className="text-sm text-purple-700">
                    React Context with optimized real-time sync and Supabase
                    subscriptions
                  </p>
                </div>
              </div>
            </div>

            {/* Core Technologies */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Core Framework
              </h4>
              <div className="grid gap-3">
                {techStackData.core.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        {tech.description}
                      </span>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800">
                      {tech.version}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UI/UX & State Management Combined */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* UI/UX */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <Package className="h-4 w-4 text-black" />
                  UI/UX Libraries
                </h4>
                <div className="grid gap-3">
                  {techStackData.ui.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <span className="font-medium">{tech.name}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          {tech.description}
                        </span>
                      </div>
                      <span className="rounded bg-green-100 px-2 py-1 font-mono text-sm text-green-800">
                        {tech.version}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Management */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <Shield className="h-4 w-4 text-black" />
                  State & Data
                </h4>
                <div className="grid gap-3">
                  {techStackData.state.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <span className="font-medium">{tech.name}</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          {tech.description}
                        </span>
                      </div>
                      <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-sm text-yellow-800">
                        {tech.version}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Utilities */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <TestTube className="h-4 w-4 text-black" />
                Development Utilities
              </h4>
              <div className="grid gap-3">
                {techStackData.utility.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        {tech.description}
                      </span>
                    </div>
                    <span className="rounded bg-purple-100 px-2 py-1 font-mono text-sm text-purple-800">
                      {tech.version}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>
      </main>
    </div>
  );
}
