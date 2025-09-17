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
  // Noted application tech stack
  const techStackData = {
    core: [
      {
        name: 'Next.js',
        version: '14.x',
        description: 'React framework with App Router',
      },
      {
        name: 'React',
        version: '18.x',
        description: 'Component-based UI library',
      },
      {
        name: 'TypeScript',
        version: '^5',
        description: 'Type safety and IntelliSense',
      },
      {
        name: 'Tailwind CSS',
        version: '^3',
        description: 'Utility-first styling',
      },
      {
        name: 'ESLint',
        version: '^8',
        description: 'Code linting and quality',
      },
    ],
    ui: [
      {
        name: 'ShadCN/UI',
        version: 'Latest',
        description: 'Accessible component library',
      },
      {
        name: 'Radix UI',
        version: 'Latest',
        description: 'Headless UI primitives',
      },
      {
        name: 'Lucide Icons',
        version: 'Latest',
        description: 'Beautiful icon set',
      },
      {
        name: 'Framer Motion',
        version: 'Latest',
        description: 'Smooth animations',
      },
    ],
    state: [
      {
        name: 'React Query',
        version: '^4',
        description: 'Server state management',
      },
      {
        name: 'Supabase',
        version: '^2',
        description: 'Database and real-time',
      },
      { name: 'React Hook Form', version: '^7', description: 'Form handling' },
      {
        name: 'Zod',
        version: '^3',
        description: 'Schema validation',
      },
    ],
    utility: [
      {
        name: 'date-fns',
        version: 'Latest',
        description: 'Date formatting utilities',
      },
      {
        name: 'clsx',
        version: 'Latest',
        description: 'Conditional className utility',
      },
      {
        name: 'tailwind-merge',
        version: 'Latest',
        description: 'Merge Tailwind classes',
      },
      {
        name: 'next-themes',
        version: 'Latest',
        description: 'Theme switching support',
      },
    ],
  };

  // Noted application statistics
  const projectStats = {
    notes: 247,
    projects: 12,
    totalWords: 18650,
    tags: 85,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">noted</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A smart notepad application for capturing thoughts, ideas, and
              notes. Seamlessly organize your notes and link them to projects
              for better productivity and knowledge management.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {projectStats.notes}
                </div>
                <div className="text-muted-foreground text-sm">Notes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projectStats.projects}
                </div>
                <div className="text-muted-foreground text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {projectStats.totalWords.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">Total Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {projectStats.tags.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">Tags</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/dashboard" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Create Note</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/noted" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Browse Notes</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/noted" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Project Notes</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/noted" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Settings className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Note Settings</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* App Purpose */}
        <SimpleCollapsibleContainer
          title="Applications Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is Noted?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Noted is a powerful notepad application designed for developers
                and knowledge workers. It provides a seamless way to capture
                thoughts, ideas, code snippets, and project-related notes in one
                centralized location with smart organization and project
                integration.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Quick Note Creation:</strong> Instantly capture
                    thoughts with our streamlined one-form interface
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Project Integration:</strong> Link notes to specific
                    projects or keep them as standalone entries
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Multiple Note Types:</strong> Support for text,
                    links, lists, and comments with rich formatting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Smart Tagging:</strong> Organize notes with flexible
                    tagging system for easy retrieval
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Search & Filter:</strong> Quickly find notes by
                    content, project, or tags with powerful search
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Personal Knowledge Base
                  </h5>
                  <p className="text-sm text-blue-700">
                    Maintain a personal repository of ideas, code snippets, and
                    project notes for individual productivity.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Project Documentation
                  </h5>
                  <p className="text-sm text-green-700">
                    Document project decisions, meeting notes, and development
                    insights linked to specific projects.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Learning & Research
                  </h5>
                  <p className="text-sm text-purple-700">
                    Capture learning notes, technical research, and reference
                    materials for future use.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Quick Captures
                  </h5>
                  <p className="text-sm text-orange-700">
                    Rapidly jot down meeting notes, ideas, and todos without
                    disrupting your workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* App Features */}
        <SimpleCollapsibleContainer
          title="Applications Features"
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
                    <h5 className="font-medium text-blue-900">Note Creation</h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Streamlined note creation with rich text support and instant
                    project linking capabilities.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Organization System
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Smart tagging and categorization with project-based
                    organization for easy note retrieval.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Content Types
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Support for multiple note types including text, links,
                    lists, and comments with rich formatting.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Search & Discovery
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Powerful search functionality with filtering by content,
                    projects, tags, and note types.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Instant Capture</h5>
                  <p className="text-muted-foreground text-sm">
                    Quick note creation interface that doesn't interrupt your
                    workflow or thinking process.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Smart Linking</h5>
                  <p className="text-muted-foreground text-sm">
                    Automatically detect and format links, with support for
                    internal project references.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Contextual Tags</h5>
                  <p className="text-muted-foreground text-sm">
                    Intelligent tagging suggestions based on note content and
                    project context.
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
                    <h5 className="font-medium">Data Security</h5>
                    <p className="text-muted-foreground text-sm">
                      Secure note storage with user authentication and row-level
                      security for privacy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Real-time Updates</h5>
                    <p className="text-muted-foreground text-sm">
                      Instant synchronization of notes across sessions with
                      optimistic updates for smooth UX.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Export & Backup</h5>
                    <p className="text-muted-foreground text-sm">
                      Export notes in multiple formats with automated backup and
                      data portability options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Application Stack */}
        <SimpleCollapsibleContainer
          title="Applications Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Applications Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">Note-First</h5>
                  <p className="text-sm text-blue-700">
                    Optimized for rapid note capture with minimal friction and
                    maximum organization
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Forms-Based
                  </h5>
                  <p className="text-sm text-green-700">
                    Built on a flexible form system for consistent note creation
                    and editing experiences
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Real-time
                  </h5>
                  <p className="text-sm text-purple-700">
                    Live synchronization with optimistic updates for seamless
                    note taking experience
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
