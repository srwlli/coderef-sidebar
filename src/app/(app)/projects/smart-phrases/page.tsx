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

// Smart Phrases clinical documentation tool landing page
// Updated with real project data from clinical analysis
export default function ProjectLandingPage() {
  // Smart Phrases tech stack data from clinical analysis
  const techStackData = {
    core: [
      {
        name: 'Node.js',
        version: '18.x',
        description: 'Backend runtime environment for clinical data processing',
      },
      {
        name: 'Express.js',
        version: '^4.18',
        description: 'Web framework for clinical API endpoints',
      },
      {
        name: 'TypeScript',
        version: '^5.0',
        description: 'Type-safe development for medical data integrity',
      },
      {
        name: 'React',
        version: '^18.0',
        description: 'Frontend framework for clinical user interface',
      },
    ],
    ui: [
      {
        name: 'Tailwind CSS',
        version: '^3.0',
        description: 'Utility-first styling for medical interface design',
      },
      {
        name: 'Lucide React',
        version: 'latest',
        description: 'Professional medical icons and interface elements',
      },
      {
        name: 'Vite',
        version: '^4.0',
        description:
          'Build tool optimized for clinical application development',
      },
      {
        name: 'Custom Components',
        version: 'N/A',
        description: 'Medical-specific React components for clinical workflows',
      },
    ],
    state: [
      {
        name: 'React Query',
        version: '^4.0',
        description:
          'Data fetching and caching for clinical content management',
      },
      {
        name: 'Fuse.js',
        version: '^6.0',
        description:
          'Fuzzy search for medication and coping strategy discovery',
      },
      {
        name: 'Zod',
        version: '^3.0',
        description: 'Schema validation for medical data integrity',
      },
      {
        name: 'React Hooks',
        version: '18.x',
        description: 'Form state management for clinical data entry',
      },
    ],
    utility: [
      {
        name: 'tsx',
        version: '^3.0',
        description: 'TypeScript execution for clinical data processing',
      },
      {
        name: 'CORS',
        version: '^2.8',
        description: 'Cross-origin resource sharing for clinical API access',
      },
      {
        name: 'JSON Database',
        version: 'N/A',
        description:
          'Structured storage for medication and coping strategy data',
      },
      {
        name: 'Markdown Parser',
        version: 'N/A',
        description:
          'Clinical content processing from evidence-based documentation',
      },
    ],
  };

  // Project statistics from Smart Phrases analysis
  const projectStats = {
    pages: 5,
    components: 12,
    linesOfCode: 2500,
    documentation: 8000,
  };

  return (
    <div className="p-8">
      <main className="mx-auto max-w-4xl space-y-6">
        {/* Project Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-black" />
              <CardTitle className="text-2xl">Smart Phrases</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A clinical documentation efficiency tool specifically designed for
              child psychiatry practices. Transforms evidence-based markdown
              documents into a searchable web application providing standardized
              SmartPhrases for medication education and coping strategies with
              child-friendly explanations.
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
          title="Smart Phrases Purpose"
          icon={<Target className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">What is this project?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Smart Phrases is a clinical documentation efficiency tool
                specifically designed for child psychiatry practices. It
                transforms a collection of evidence-based markdown documents
                into a fully functional, searchable web application that
                provides standardized SmartPhrases for medication education and
                coping strategies with child-friendly explanations at
                appropriate reading levels.
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Comprehensive SmartPhrase Database:</strong> Over 80
                    medication SmartPhrases and multiple coping strategy
                    templates with standardized .LAH codes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span>
                    <strong>Advanced Search & Filtering:</strong> Multi-field
                    search across medication names, brand names, generic names,
                    categories, and content with fuzzy matching
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span>
                    <strong>Clinical Integration Ready:</strong> One-click
                    copy-to-clipboard functionality for seamless EHR integration
                    during patient visits
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>
                    <strong>Evidence-Based Content:</strong> All SmartPhrases
                    include research citations and are organized by clinical
                    categories (ADHD, Depression, Anxiety, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span>
                    <strong>Responsive Medical Interface:</strong> Professional
                    design optimized for clinical workflows on desktop, tablet,
                    and mobile devices
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Target Use Cases</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">
                    Clinical Documentation
                  </h5>
                  <p className="text-sm text-blue-700">
                    Psychiatrists and mental health professionals inserting
                    standardized, evidence-based content into patient notes and
                    treatment plans.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Patient Education
                  </h5>
                  <p className="text-sm text-green-700">
                    Providing child-friendly medication explanations and coping
                    strategy instructions to patients and families.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">
                    Training and Reference
                  </h5>
                  <p className="text-sm text-purple-700">
                    Medical students and residents accessing quick reference
                    materials during clinical rotations.
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <h5 className="mb-2 font-medium text-orange-900">
                    Practice Standardization
                  </h5>
                  <p className="text-sm text-orange-700">
                    Healthcare organizations ensuring consistent information
                    delivery across multiple providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* App Features */}
        <SimpleCollapsibleContainer
          title="Smart Phrases Features"
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
                      Medication Reference System
                    </h5>
                  </div>
                  <p className="text-sm text-blue-700">
                    Complete database of psychiatric medications with
                    brand/generic mapping, dosing information, and
                    child-appropriate explanations.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-green-900">
                      Coping Strategies Repository
                    </h5>
                  </div>
                  <p className="text-sm text-green-700">
                    Evidence-based behavioral interventions and mindfulness
                    techniques formatted for clinical use.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Code className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-purple-900">
                      Smart Search Engine
                    </h5>
                  </div>
                  <p className="text-sm text-purple-700">
                    Fuzzy search across multiple fields with category filtering
                    and type-based organization.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-orange-900">
                      Clinical Workflow Integration
                    </h5>
                  </div>
                  <p className="text-sm text-orange-700">
                    Copy-paste functionality designed for EHR systems with
                    formatted text output.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Features */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">User Experience</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Clean Medical Interface</h5>
                  <p className="text-muted-foreground text-sm">
                    Minimal, professional design with subtle shadows, clean
                    typography, and medical-appropriate color scheme.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">
                    Intelligent Filtering System
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Category-based filtering (Anxiety, ADHD, Depression) with
                    type toggles (medication vs coping-strategy).
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h5 className="mb-2 font-medium">Mobile-Responsive Design</h5>
                  <p className="text-muted-foreground text-sm">
                    Optimized layouts for clinical settings with touch-friendly
                    interfaces and readable text sizes.
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
                    <h5 className="font-medium">Type-Safe Data Processing</h5>
                    <p className="text-muted-foreground text-sm">
                      Zod schema validation ensuring data integrity across the
                      medication database and coping strategies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <Package className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">
                      Performance-Optimized Search
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Fuse.js implementation with weighted search fields and
                      configurable thresholds for clinical relevance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <TestTube className="mt-0.5 h-5 w-5 text-slate-600" />
                  <div>
                    <h5 className="font-medium">Scalable Architecture</h5>
                    <p className="text-muted-foreground text-sm">
                      Express.js API with JSON database, designed for future
                      expansion and integration with clinical systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCollapsibleContainer>

        {/* Application Stack */}
        <SimpleCollapsibleContainer
          title="Smart Phrases Stack"
          icon={<Layers className="h-5 w-5 text-black" />}
          defaultExpanded={false}
        >
          <div className="space-y-6">
            {/* Architecture Overview */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Code className="h-4 w-4 text-black" />
                Smart Phrases Architecture
              </h4>
              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <h5 className="mb-2 font-medium text-blue-900">App Style</h5>
                  <p className="text-sm text-blue-700">
                    Clinical documentation efficiency tool with evidence-based
                    medical content management
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <h5 className="mb-2 font-medium text-green-900">
                    Components
                  </h5>
                  <p className="text-sm text-green-700">
                    React-based medical interface with TypeScript type safety
                    and professional clinical design
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h5 className="mb-2 font-medium text-purple-900">State</h5>
                  <p className="text-sm text-purple-700">
                    React Query for data fetching with Fuse.js search state
                    management for clinical workflows
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
