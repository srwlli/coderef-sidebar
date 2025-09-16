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

// Formed project documentation page
// Documents the FormGenerator system built for this application
export default function FormedProjectPage() {
  // Real Formed tech stack data
  const techStackData = {
    core: [
      {
        name: 'React',
        version: '18+',
        description: 'Component architecture foundation',
      },
      {
        name: 'TypeScript',
        version: '^5',
        description: 'Type safety and developer experience',
      },
      {
        name: 'Next.js',
        version: '15',
        description: 'App router and framework',
      },
      { name: 'Zod', version: '^3', description: 'Schema validation engine' },
      {
        name: 'React Hook Form',
        version: '^7',
        description: 'Form state management',
      },
    ],
    ui: [
      {
        name: 'shadcn/ui',
        version: 'Latest',
        description: 'Component primitives and styling',
      },
      {
        name: 'Tailwind CSS',
        version: '^3',
        description: 'Utility-first CSS framework',
      },
      {
        name: 'Lucide React',
        version: 'Latest',
        description: 'Icon component library',
      },
      {
        name: 'Custom Fields',
        version: 'v1.0',
        description: 'Form field component system',
      },
    ],
    state: [
      {
        name: 'React Hook Form',
        version: '^7',
        description: 'Form state and validation',
      },
      {
        name: 'Zod Validation',
        version: '^3',
        description: 'Schema-based validation',
      },
      {
        name: 'Supabase Client',
        version: '^2',
        description: 'Database operations',
      },
      {
        name: 'Custom Toast',
        version: 'v1.0',
        description: 'User feedback system',
      },
    ],
    utility: [
      {
        name: 'Schema Generation',
        version: 'v1.0',
        description: 'Dynamic form configuration',
      },
      {
        name: 'Validation Utils',
        version: 'v1.0',
        description: 'Custom validation helpers',
      },
      {
        name: 'Type Definitions',
        version: 'v1.0',
        description: 'TypeScript field interfaces',
      },
      {
        name: 'Reusable Patterns',
        version: 'v1.0',
        description: 'Cross-project portability',
      },
    ],
  };

  // Real Formed project statistics
  const projectStats = {
    pages: 1,
    components: 7,
    linesOfCode: 800,
    documentation: 1500,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">Formed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A robust, schema-driven form generation system for React
              applications with TypeScript safety and Supabase integration.
              Build reusable forms with minimal code and maximum flexibility.
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
          <Link href="/forms" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Live Demo</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/formed" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Documentation</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="https://github.com" className="block" target="_blank">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Repository</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/ai-tools" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Settings className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">Development</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Formed Purpose */}
        <SimpleCollapsibleContainer
          title="Formed Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is Formed?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Formed is a schema-driven form generation system for React
                applications that provides type-safe, reusable forms with
                minimal configuration. It combines React Hook Form, Zod
                validation, and Supabase integration to create a powerful yet
                simple form development experience.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Schema-Driven:</strong> Define forms with simple
                    configuration objects instead of writing JSX
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Type Safety:</strong> Full TypeScript support with
                    Zod validation for runtime type checking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Reusable Module:</strong> Copy the form system to
                    any React project with minimal setup
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Multiple Field Types:</strong> Text, textarea, tags,
                    email, URL fields with extensible architecture
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Database Integration:</strong> Built-in Supabase
                    support for seamless data operations
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Rapid Development
                  </h5>
                  <p className="text-sm text-blue-700">
                    Quickly generate forms from schema configurations without
                    writing repetitive form code.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Cross-Project Reuse
                  </h5>
                  <p className="text-sm text-green-700">
                    Portable module that can be easily integrated into any React
                    or Next.js project.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Type-Safe Development
                  </h5>
                  <p className="text-sm text-purple-700">
                    Full TypeScript support with compile-time and runtime
                    validation for robust forms.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Database Integration
                  </h5>
                  <p className="text-sm text-orange-700">
                    Seamless Supabase integration for immediate data persistence
                    and user management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Formed Features */}
        <SimpleCollapsibleContainer
          title="Formed Features"
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
                      Schema Configuration
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Define forms using simple configuration objects with field
                    types, validation rules, and UI properties.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Field Component System
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Extensible field components including TextField, TagField,
                    TextAreaField with consistent styling.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Validation Engine
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Zod-based validation with custom rules, real-time feedback,
                    and comprehensive error handling.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Form Generator
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Main component that renders complete forms from schema
                    definitions with React Hook Form integration.
                  </p>
                </div>
              </div>
            </div>

            {/* Developer Experience */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">
                Developer Experience
              </h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Easy Import</h5>
                  <p className="text-muted-foreground text-sm">
                    Copy the form system to any React project with minimal setup
                    and dependencies.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Minimal Configuration</h5>
                  <p className="text-muted-foreground text-sm">
                    Define forms with simple schema objects instead of writing
                    repetitive JSX components.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Extensible Architecture</h5>
                  <p className="text-muted-foreground text-sm">
                    Add new field types easily by extending the existing
                    component system.
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
                    <h5 className="font-medium">Type Safety</h5>
                    <p className="text-muted-foreground text-sm">
                      Full TypeScript integration with compile-time checking and
                      runtime validation using Zod.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Real-time Validation</h5>
                    <p className="text-muted-foreground text-sm">
                      Instant feedback with custom validation rules and
                      comprehensive error messaging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Database Integration</h5>
                    <p className="text-muted-foreground text-sm">
                      Built-in Supabase support for seamless data operations and
                      user authentication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Formed Stack */}
        <SimpleCollapsibleContainer
          title="Formed Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Formed Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Schema-Driven
                  </h5>
                  <p className="text-sm text-blue-700">
                    Configuration-based form generation with type-safe schemas
                    and validation rules
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Field Components
                  </h5>
                  <p className="text-sm text-green-700">
                    Extensible field system with BaseField wrapper and
                    specialized input types
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Form State
                  </h5>
                  <p className="text-sm text-purple-700">
                    React Hook Form integration with Zod validation and
                    real-time feedback
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
