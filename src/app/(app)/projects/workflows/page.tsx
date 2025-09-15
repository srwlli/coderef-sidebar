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

export default function WorkflowsProjectPage() {
  // Tech stack data for Workflows project
  const techStackData = {
    core: [
      {
        name: 'Next.js',
        version: '15.5.2',
        description:
          'Full-stack React framework with App Router for workflow interfaces',
      },
      {
        name: 'React',
        version: '19.1.0',
        description: 'Component-based UI for dynamic workflow visualization',
      },
      {
        name: 'TypeScript',
        version: '^5',
        description: 'Type-safe development for complex workflow logic',
      },
      {
        name: 'Node.js',
        version: '20.x',
        description: 'Runtime for workflow processing and automation scripts',
      },
    ],
    ui: [
      {
        name: 'Tailwind CSS',
        version: '^4',
        description: 'Utility-first styling for responsive workflow dashboards',
      },
      {
        name: 'Shadcn UI',
        version: 'latest',
        description: 'Accessible components for workflow forms and interfaces',
      },
      {
        name: 'Framer Motion',
        version: '^12',
        description: 'Smooth animations for workflow transitions and feedback',
      },
      {
        name: 'React Flow',
        version: '^11',
        description: 'Interactive workflow diagram visualization and editing',
      },
    ],
    state: [
      {
        name: 'Zustand',
        version: '^5',
        description: 'Lightweight state management for workflow tracking',
      },
      {
        name: 'React Query',
        version: '^5',
        description:
          'Server state management for workflow data synchronization',
      },
      {
        name: 'React Hook Form',
        version: '^7',
        description:
          'Form handling for workflow configuration and process creation',
      },
      {
        name: 'Zod',
        version: '^4',
        description:
          'Schema validation for workflow definitions and user inputs',
      },
    ],
    utility: [
      {
        name: 'D3.js',
        version: '^7',
        description: 'Data visualization for workflow analytics and patterns',
      },
      {
        name: 'Puppeteer',
        version: '^22',
        description: 'Browser automation for workflow execution and testing',
      },
      {
        name: 'Cron Parser',
        version: '^4',
        description: 'Schedule parsing for automated workflow triggers',
      },
      {
        name: 'OpenAI API',
        version: '^4',
        description: 'AI-powered workflow suggestions and optimization',
      },
    ],
  };

  // Project statistics
  const projectStats = {
    pages: 18,
    components: 52,
    linesOfCode: 12400,
    documentation: 2800,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">Workflows</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              An intelligent workflow tracking and optimization platform that
              monitors user activity, identifies recurring patterns, and
              suggests automated workflows, widgets, scripts, forms, and
              processes to enhance productivity and streamline operations.
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
          <Link href="/projects/workflows" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Home className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Project</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/workflows" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <FileText className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Documentation</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/workflows" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <GitBranch className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Git</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/projects/workflows" className="block">
            <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-row items-center justify-center p-4 text-center">
                <Settings className="mr-3 h-6 w-6 text-black" />
                <CardTitle className="text-lg">View Workflow</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Workflows Purpose */}
        <SimpleCollapsibleContainer
          title="Workflows Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is Workflows?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Workflows is an AI-powered productivity platform that
                continuously monitors user activity patterns, identifies
                repetitive tasks, and intelligently suggests automated
                solutions. By analyzing user behavior across applications and
                systems, it discovers optimization opportunities and generates
                custom workflows, widgets, scripts, forms, and processes that
                eliminate manual work and enhance efficiency.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Activity Tracking:</strong> Comprehensive monitoring
                    of user interactions across desktop and web applications
                    with privacy-focused analytics
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Pattern Recognition:</strong> Machine learning
                    algorithms that identify recurring workflows and suggest
                    automation opportunities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Intelligent Suggestions:</strong> AI-generated
                    recommendations for workflows, scripts, forms, and widgets
                    tailored to user behavior patterns
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Workflow Builder:</strong> Visual drag-and-drop
                    interface for creating, testing, and deploying custom
                    automation workflows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Performance Analytics:</strong> Detailed metrics on
                    time saved, efficiency gains, and productivity improvements
                    from implemented workflows
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Knowledge Workers
                  </h5>
                  <p className="text-sm text-blue-700">
                    Professionals performing repetitive digital tasks who need
                    automation to focus on higher-value work and reduce manual
                    overhead.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Development Teams
                  </h5>
                  <p className="text-sm text-green-700">
                    Software teams looking to streamline development workflows,
                    automate testing processes, and optimize deployment
                    pipelines.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Operations Teams
                  </h5>
                  <p className="text-sm text-purple-700">
                    IT and operations professionals managing system
                    administration, monitoring, and maintenance tasks requiring
                    automation.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Business Analysts
                  </h5>
                  <p className="text-sm text-orange-700">
                    Data professionals automating report generation, analysis
                    workflows, and business process optimization initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Workflows Features */}
        <SimpleCollapsibleContainer
          title="Workflows Features"
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
                      Activity Monitoring
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Real-time tracking of user interactions with privacy
                    controls, application usage analytics, and workflow pattern
                    detection.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Workflow Generator
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    AI-powered analysis engine that identifies automation
                    opportunities and generates custom workflow solutions based
                    on user patterns.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Script Automation
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Dynamic script generation for task automation, including
                    browser automation, file processing, and API integration
                    workflows.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Widget Creation
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Customizable dashboard widgets and productivity tools
                    generated based on user needs and workflow requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Visual Workflow Builder</h5>
                  <p className="text-muted-foreground text-sm">
                    Intuitive drag-and-drop interface for creating and modifying
                    workflows with real-time preview and testing capabilities.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Smart Recommendations</h5>
                  <p className="text-muted-foreground text-sm">
                    Contextual suggestions appear based on current activity with
                    one-click implementation and customization options.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Privacy Dashboard</h5>
                  <p className="text-muted-foreground text-sm">
                    Comprehensive privacy controls with data retention settings,
                    activity filtering, and secure local processing options.
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
                    <h5 className="font-medium">Privacy-First Architecture</h5>
                    <p className="text-muted-foreground text-sm">
                      Local-first data processing with encrypted storage,
                      minimal cloud dependency, and user-controlled data
                      sharing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Cross-Platform Integration</h5>
                    <p className="text-muted-foreground text-sm">
                      Universal workflow execution across desktop applications,
                      web browsers, and mobile devices with API integrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Machine Learning Engine</h5>
                    <p className="text-muted-foreground text-sm">
                      Advanced pattern recognition and predictive modeling for
                      proactive workflow suggestions and optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Workflows Stack */}
        <SimpleCollapsibleContainer
          title="Workflows Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Workflows Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
                  <p className="text-sm text-blue-700">
                    Electron-based desktop application with web dashboard for
                    comprehensive activity monitoring and workflow management
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Components
                  </h5>
                  <p className="text-sm text-green-700">
                    Modular React components with real-time data visualization,
                    workflow editors, and automation management interfaces
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">State</h5>
                  <p className="text-sm text-purple-700">
                    Event-driven state management with local database storage,
                    real-time sync, and offline-first architecture
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
                Specialized Tools
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
