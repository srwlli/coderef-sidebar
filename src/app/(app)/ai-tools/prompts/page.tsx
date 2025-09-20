'use client';

import { CodeScanChainContainer } from '@/components/collapsibles/CodeScanChainContainer';
import { appGenerationChainSteps } from './app-generation-chain';
import { Brain, Rocket, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PromptsPage() {
  const promptChains = [
    {
      title: 'Documentation Prompt Chain (5-Step)',
      icon: <Brain className="h-5 w-5" />,
      stepCount: 5,
    },
    {
      title: 'App Generation Prompt Chain (5-Step)',
      icon: <Rocket className="h-5 w-5" />,
      stepCount: appGenerationChainSteps.length,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Prompt Chains</h1>
          <Badge variant="outline" className="text-sm">
            {promptChains.length} chains
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Future: Export All, Add Chain, etc. */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <main className="mx-auto max-w-7xl">
          <div className="space-y-6">
            {/* Documentation Prompt Chain */}
            <CodeScanChainContainer
              title="Documentation Prompt Chain (5-Step)"
              icon={<Brain className="h-5 w-5" />}
              steps={[
                {
                  title: 'Step 1: README Generation',
                  description:
                    'Generate README.md as the discovery entry document with overview, quickstart, and usage examples',
                  content: `framework: POWER

purpose: Generate README.md as the discovery entry document.

output: Must follow required header/footer format with [Project Name], [Date], [Version], [Maintainer]. Include overview, quickstart steps, usage examples, prerequisites, and troubleshooting patterns.

work: Scan project root, configs, and entry points. Do not modify code.

examples:
- Installation command with sample output
- Common error message and resolution

requirements: Must include command sequences, decision trees, and AI-focused footer.

save_as: README.md
store_as: readme_summary`,
                },
                {
                  title: 'Step 2: Architecture Documentation',
                  description:
                    'Generate ARCHITECTURE.md as the system design reference with topology and data flow',
                  content: `framework: POWER

purpose: Generate ARCHITECTURE.md as the system design reference.

output: Must follow required header/footer with [Date] and [Version]. Include topology, module boundaries, stack decisions, and data flow. Reference project overview from README.md ({{readme_summary}}).

work: Parse structure and dependency graphs. Scan only.

examples:
- ASCII diagram of system topology
- Dependency map with explanation

requirements: Must include rationale for design choices and AI-focused footer.

save_as: ARCHITECTURE.md
store_as: architecture_summary`,
                },
                {
                  title: 'Step 3: API Documentation',
                  description:
                    'Generate API.md as the technical interface reference with endpoints and schemas',
                  content: `framework: POWER

purpose: Generate API.md as the technical interface reference.

output: Must follow required header/footer with [Date] and [Version]. Document endpoints, schemas, authentication, and error handling. Reference README.md ({{readme_summary}}) and ARCHITECTURE.md ({{architecture_summary}}).

work: Parse controllers, routes, and services. No execution.

examples:
- cURL request and response sample
- Error response JSON object

requirements: Must include pagination, rate limits, and AI-focused footer.

save_as: API.md
store_as: api_summary`,
                },
                {
                  title: 'Step 4: Components Documentation',
                  description:
                    'Generate COMPONENTS.md as the component library reference with props and usage rules',
                  content: `framework: POWER

purpose: Generate COMPONENTS.md as the component library reference.

output: Must follow required header/footer with [Framework] and [Version]. Inventory all reusable components, props, and usage rules. Reference README.md ({{readme_summary}}), ARCHITECTURE.md ({{architecture_summary}}), and API.md ({{api_summary}}).

work: Scan UI/logic directories. Identify components by convention. No execution.

examples:
- Code snippet with props
- State management pattern

requirements: Must include copy-paste ready examples and AI-focused footer.

save_as: COMPONENTS.md
store_as: components_summary`,
                },
                {
                  title: 'Step 5: Schema Documentation',
                  description:
                    'Generate SCHEMA.md as the data schema reference with database models and validation rules',
                  content: `framework: POWER

purpose: Generate SCHEMA.md as the data schema reference.

output: Must follow required header/footer with [Date] and [Schema Version]. Document database schemas, enums, relationships, and validation rules. Reference README.md ({{readme_summary}}), ARCHITECTURE.md ({{architecture_summary}}), API.md ({{api_summary}}), and COMPONENTS.md ({{components_summary}}).

work: Parse models, migrations, and schema definitions. No execution.

examples:
- JSON schema with validation errors
- TypeScript interface definition

requirements: Must include relationships, constraints, and AI-focused footer.

save_as: SCHEMA.md`,
                },
              ]}
              className=""
              defaultExpanded={false}
            />

            {/* App Generation Prompt Chain */}
            <CodeScanChainContainer
              title="App Generation Prompt Chain (5-Step)"
              icon={<Rocket className="h-5 w-5" />}
              steps={appGenerationChainSteps}
              defaultExpanded={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
