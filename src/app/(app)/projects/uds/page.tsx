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

// UDS documentation framework landing page
// Updated with real project data from comprehensive analysis
export default function ProjectLandingPage() {
  // UDS tech stack data from comprehensive analysis
  const techStackData = {
    core: [
      {
        name: 'Markdown',
        version: 'CommonMark',
        description: 'Primary documentation format with structured standards',
      },
      {
        name: 'YAML',
        version: '1.2',
        description: 'Metadata and configuration specification',
      },
      {
        name: 'Git',
        version: '2.x',
        description: 'Version control and collaboration framework',
      },
      {
        name: 'Semantic Versioning',
        version: '2.0.0',
        description: 'Document and standard versioning system',
      },
    ],
    ui: [
      {
        name: 'Markdown Templates',
        version: 'UDS 1.0',
        description: 'Structured document templates with required sections',
      },
      {
        name: 'YAML Front Matter',
        version: 'Custom',
        description: 'Metadata specification for document headers',
      },
      {
        name: 'Footer Standards',
        version: 'UDS 1.0',
        description: 'Machine-readable metadata blocks for tracking',
      },
      {
        name: 'Agent Profiles',
        version: 'UDS 1.0',
        description: 'AI instruction frameworks for automated generation',
      },
    ],
    state: [
      {
        name: 'Document Metadata',
        version: 'UDS 1.0',
        description: 'YAML front matter and footer block tracking',
      },
      {
        name: 'Version Control',
        version: 'Git 2.x',
        description: 'Document lifecycle and change management',
      },
      {
        name: 'Compliance Tracking',
        version: 'UDS 1.0',
        description: 'Rule validation and standard enforcement',
      },
      {
        name: 'Agent Instructions',
        version: 'UDS 1.0',
        description: 'Behavioral constraints and generation prompts',
      },
    ],
    utility: [
      {
        name: 'Markdown Linters',
        version: 'MD001-MD058',
        description: 'Comprehensive formatting rule validation',
      },
      {
        name: 'EditorConfig',
        version: '0.12.x',
        description: 'Standardized formatting across editors',
      },
      {
        name: 'Language Linters',
        version: 'Various',
        description: 'ESLint, Pylint, CheckStyle, RuboCop, StyleCop support',
      },
      {
        name: 'Pre-commit Hooks',
        version: 'Git 2.x',
        description: 'Automated compliance checking before commits',
      },
    ],
  };

  // Project statistics from UDS analysis
  const projectStats = {
    pages: 8,
    components: 15,
    linesOfCode: 3200,
    documentation: 25000,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">UDS</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A comprehensive documentation framework and standards system
              designed to enforce consistent, high-quality technical
              documentation across software development projects. Provides
              structured markdown standards, automated compliance checking, and
              AI-agent driven documentation generation.
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
          <Link href="#" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Project</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Documentation</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Git</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="#" className="block">
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
          title="UDS Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is this project?</h4>
              <p className="text-muted-foreground leading-relaxed">
                UDS (Unified Documentation Standards) is a comprehensive
                documentation framework designed to enforce consistent,
                high-quality technical documentation across software development
                projects. It provides structured markdown standards with YAML
                front matter, automated compliance checking, and specialized
                AI-agent instruction frameworks for generating standardized
                technical documentation.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Structured YAML Front Matter Standards:</strong>{' '}
                    Enforces consistent metadata across all documents with
                    required fields including title, version, date, authors,
                    tags, and classification
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Automated Footer Metadata System:</strong>{' '}
                    Implements structured footer blocks with machine-readable
                    metadata for document tracking and lifecycle management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Agent-Driven Document Generation:</strong> Provides
                    standardized prompts and instructions for AI agents to
                    generate compliant documentation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Comprehensive Formatting Rules:</strong> Includes
                    detailed markdown standards covering headings, lists,
                    tables, code blocks, and visual styling (MD001-MD058)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Component Documentation Framework:</strong>{' '}
                    Specialized standards for documenting reusable software
                    components with props tables, behavior specs, and
                    accessibility notes
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Enterprise Documentation Standardization
                  </h5>
                  <p className="text-sm text-blue-700">
                    Large organizations requiring consistent documentation
                    format across multiple teams and projects.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    AI-Assisted Technical Writing
                  </h5>
                  <p className="text-sm text-green-700">
                    Projects leveraging AI agents for automated documentation
                    generation with strict compliance requirements.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Open Source Project Documentation
                  </h5>
                  <p className="text-sm text-purple-700">
                    Maintainers needing standardized documentation structure for
                    contributors and users.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Software Component Libraries
                  </h5>
                  <p className="text-sm text-orange-700">
                    Development teams creating reusable components requiring
                    detailed documentation standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* App Features */}
        <SimpleCollapsibleContainer
          title="UDS Features"
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
                      Document Structure Enforcement
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Validates and enforces proper heading hierarchy, table of
                    contents generation, and section ordering according to UDS
                    specifications.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Metadata Management
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Handles document metadata through YAML front matter and
                    structured footer blocks with version tracking and
                    authorship information.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Agent Instruction Framework
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Provides standardized prompts and behavioral constraints for
                    AI agents generating UDS-compliant documentation.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Compliance Validation
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Implements rules for markdown formatting, naming
                    conventions, and structural requirements with automated
                    checking capabilities.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">
                    Structured Document Templates
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Pre-defined templates with required sections including
                    Purpose, Module Contract Specification, Control Contract
                    Specification, and References.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">
                    Human-Readable Instructions
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Footer blocks include multiline instruction fields intended
                    for human interpretation and guidance.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">
                    Progressive Disclosure Standards
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Hierarchical heading structure with table of contents for
                    easy navigation and content discovery.
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
                    <h5 className="font-medium">Multi-Language Support</h5>
                    <p className="text-muted-foreground text-sm">
                      Standards and naming conventions covering Java, Python,
                      JavaScript/TypeScript, C#, C++, Go, Ruby, Swift, PHP, and
                      Rust.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">
                      Database Integration Standards
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive naming conventions for tables, columns,
                      indexes, stored procedures, and views.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Version Control Integration</h5>
                    <p className="text-muted-foreground text-sm">
                      Standards for branch naming, commit messages, and tag
                      conventions with conventional commit support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Application Stack */}
        <SimpleCollapsibleContainer
          title="UDS Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                UDS Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
                  <p className="text-sm text-blue-700">
                    Documentation framework and standards system with AI-agent
                    integration capabilities
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Components
                  </h5>
                  <p className="text-sm text-green-700">
                    Markdown-based templates with YAML metadata, validation
                    rules, and agent instruction frameworks
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">State</h5>
                  <p className="text-sm text-purple-700">
                    Git-based version control with structured metadata tracking
                    and compliance enforcement
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
