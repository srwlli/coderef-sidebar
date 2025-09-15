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

// Coderef2 project page with mock data
// TODO: Replace with actual project data when project details are defined
export default function Coderef2Page() {
  // Coderef2 tech stack data
  const techStackData = {
    core: [
      {
        name: 'TypeScript',
        version: '^5.0',
        description: 'Primary language with AST parsing',
      },
      {
        name: 'Node.js',
        version: '18.x',
        description: 'Runtime environment for CLI tools',
      },
      {
        name: 'Commander.js',
        version: '^9.0',
        description: 'CLI framework for coderef-cli',
      },
      {
        name: 'Jest',
        version: '^29.0',
        description: 'Testing framework with coverage',
      },
      {
        name: 'Yargs',
        version: '^17.0',
        description: 'Alternative CLI framework',
      },
    ],
    ui: [
      {
        name: 'CLI Interface',
        version: 'Custom',
        description: 'Professional command-line tools',
      },
      {
        name: 'JSON Output',
        version: 'Native',
        description: 'Structured data output formats',
      },
      {
        name: 'Documentation',
        version: 'UDS',
        description: 'Universal Documentation System',
      },
      {
        name: 'Reporting',
        version: 'Advanced',
        description: 'Comprehensive audit and drift reports',
      },
    ],
    state: [
      {
        name: 'SACOS Framework',
        version: 'v1.0',
        description: 'AI constitutional governance',
      },
      {
        name: 'Path Validation',
        version: 'v2.0',
        description: 'Local/network/UNC validation',
      },
      {
        name: 'Index Management',
        version: 'JSON',
        description: 'Coderef index and tracking',
      },
      {
        name: 'Drift Detection',
        version: 'Advanced',
        description: 'Change tracking and similarity',
      },
    ],
    utility: [
      {
        name: 'AST Parser',
        version: 'TypeScript',
        description: 'Advanced syntax tree analysis',
      },
      {
        name: 'Multi-Language',
        version: 'TS/JS/Python',
        description: 'Cross-language support',
      },
      {
        name: 'CI Integration',
        version: 'JSON/CLI',
        description: 'Continuous integration ready',
      },
      {
        name: 'Enterprise Tools',
        version: 'Multi-sig',
        description: 'Deployment and approval workflows',
      },
    ],
  };

  // Coderef2 project statistics
  const projectStats = {
    pages: 127,
    components: 85,
    linesOfCode: 25000,
    documentation: 12700,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">Coderef2</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Enterprise semantic code intelligence platform with AI governance
              capabilities, traceable code tags, and comprehensive documentation
              synchronization for development teams and organizations.
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
          <Link href="/projects/coderef2" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Project</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/coderef2" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Documentation</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/coderef2" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Git</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/coderef2" className="block">
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
          title="Coderef2 Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is Coderef2?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Coderef2 is an enterprise-grade semantic code intelligence
                platform featuring the SACOS (Sovereign AI Constitutional
                Operating System) framework. It provides traceable code tags, AI
                governance with constitutional constraints, drift detection, and
                comprehensive development workflow automation for teams and
                organizations.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Semantic Code Tags:</strong> Traceable
                    @Type/Path#Element:Line tags with metadata tracking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>AI Governance (SACOS):</strong> Constitutional AI
                    enforcement with multi-layer validation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Drift Detection:</strong> Advanced rename similarity
                    and automated change tracking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Enterprise Compliance:</strong> 127 documentation
                    files with comprehensive audit trails
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Multi-Language Support:</strong>{' '}
                    TypeScript/JavaScript/Python with AST parsing capabilities
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Enterprise Teams
                  </h5>
                  <p className="text-sm text-blue-700">
                    Development teams requiring AI governance and compliance
                    tracking for enterprise workflows.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Financial Services
                  </h5>
                  <p className="text-sm text-green-700">
                    Organizations needing 87% microservices adoption compliance
                    with regulatory requirements.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Regulatory Industries
                  </h5>
                  <p className="text-sm text-purple-700">
                    Healthcare and government sectors requiring AI
                    accountability and constitutional compliance.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Development Organizations
                  </h5>
                  <p className="text-sm text-orange-700">
                    Companies implementing AI-governed software development with
                    constitutional frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* App Features */}
        <SimpleCollapsibleContainer
          title="Coderef2 Features"
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
                      Code Intelligence
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Semantic parsing, tagging, and element discovery across
                    codebases with advanced tracking.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      AI Governance (SACOS)
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Constitutional constraints and authorization gates for AI
                    systems with real-time validation.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Development Tools
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    CLI suite with drift detection, validation, and automation
                    for development workflows.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Enterprise Compliance
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Comprehensive audit trails and policy enforcement frameworks
                    for regulatory requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Command Line Interface</h5>
                  <p className="text-muted-foreground text-sm">
                    Professional CLI tools with JSON outputs and CI integration
                    for development workflows.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Documentation System</h5>
                  <p className="text-muted-foreground text-sm">
                    Automated generation with 127 comprehensive documentation
                    files and UDS compliance.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Enterprise Integration</h5>
                  <p className="text-muted-foreground text-sm">
                    Multi-signature deployment protocols and approval workflows
                    for enterprise environments.
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
                    <h5 className="font-medium">Security Framework</h5>
                    <p className="text-muted-foreground text-sm">
                      TPM attestation and multi-signature deployment protocols
                      with enterprise-grade security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Modular Architecture</h5>
                    <p className="text-muted-foreground text-sm">
                      Core library, CLI tools, path validation, and governance
                      layers with clean separation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Testing Suite</h5>
                    <p className="text-muted-foreground text-sm">
                      Jest coverage with comprehensive validation and quality
                      assurance frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Application Stack */}
        <SimpleCollapsibleContainer
          title="Coderef2 Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Coderef2 Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
                  <p className="text-sm text-blue-700">
                    Enterprise semantic intelligence platform with
                    constitutional AI governance and modular design
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Components
                  </h5>
                  <p className="text-sm text-green-700">
                    Modular architecture with core library, CLI suite,
                    validation services, and governance layers
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">State</h5>
                  <p className="text-sm text-purple-700">
                    Immutable constitutional constraints with real-time policy
                    enforcement and comprehensive audit trails
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
