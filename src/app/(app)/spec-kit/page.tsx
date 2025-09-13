import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
import { Button } from '@/components/buttons';
import {
  Package,
  Workflow,
  ExternalLink,
  BookOpen,
  Bot,
  GitBranch,
} from 'lucide-react';

export default function SpecKitPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <SimpleCollapsibleContainer
            title="Overview"
            icon={<Workflow className="h-5 w-5" />}
          >
            <div className="space-y-5 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">What It Is</h4>
                <p className="text-muted-foreground">
                  Spec‑Kit is an MIT‑licensed toolkit that{' '}
                  <em>flips the script on traditional software development</em>{' '}
                  by making specifications executable. Instead of specs serving
                  code, code serves specifications—creating a systematic
                  approach to building software that prioritizes{' '}
                  <strong>intent and requirements</strong> over immediate
                  implementation.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Core Philosophy</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    <strong>Specifications as Primary Artifact:</strong> The
                    spec is the source of truth, with code generated from it
                  </li>
                  <li>
                    <strong>Executable Specifications:</strong> Specs are
                    precise, complete, and unambiguous enough to generate
                    working systems
                  </li>
                  <li>
                    <strong>Intent‑Driven Development:</strong> Focus on the{' '}
                    <em>what</em> and <em>why</em> before the <em>how</em>
                  </li>
                  <li>
                    <strong>Multi‑Step Refinement:</strong> Systematic
                    validation and iterative improvement of specifications
                  </li>
                  <li>
                    <strong>Separation of Concerns:</strong>{' '}
                    <code>/specify</code> = WHAT/WHY, <code>/plan</code> = HOW,{' '}
                    <code>/tasks</code> = EXECUTION
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Key Benefits</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Accelerates software development through structured approach
                  </li>
                  <li>Enables technology‑independent development</li>
                  <li>Supports creative and iterative processes</li>
                  <li>
                    Eliminates gap between specification and implementation
                  </li>
                  <li>
                    Works with multiple AI coding agents (Claude, Copilot,
                    Gemini)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Workflow</h4>
                <div className="text-muted-foreground space-y-3 text-xs">
                  <div>
                    <div className="mb-1 font-medium">
                      1. Bootstrap (CLI, in your shell)
                    </div>
                    <div className="bg-muted mb-1 rounded p-2 font-mono text-xs">
                      uvx --from git+https://github.com/github/spec-kit.git
                      specify init --here --ai claude
                    </div>
                    <div>Sets up repo structure and templates.</div>
                  </div>
                  <div>
                    <div className="mb-1 font-medium">
                      2. Specification Cycle (inside your coding agent's chat)
                    </div>
                    <div className="ml-4 space-y-1">
                      <div>
                        <code>/specify</code> → draft a <strong>spec.md</strong>{' '}
                        focused on outcomes, users, and scope
                      </div>
                      <div>
                        <code>/plan</code> → draft a <strong>plan.md</strong>{' '}
                        defining stack, architecture, and trade‑offs
                      </div>
                      <div>
                        <code>/tasks</code> → draft a <strong>tasks.md</strong>{' '}
                        breaking the plan into atomic steps
                      </div>
                    </div>
                    <div className="mt-2 border-l-2 border-yellow-200 bg-yellow-50 p-2">
                      <strong>⚠️ Important:</strong> These slash commands run{' '}
                      <strong>inside the coding agent's chat</strong>, not in
                      the shell.
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 font-medium">3. Implementation</div>
                    <div>
                      Ask your coding agent:{' '}
                      <code>implement specs/&lt;feature&gt;/plan.md</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Guardrails & Memory</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Projects include <code>memory/constitution.md</code> and{' '}
                    <code>constitution_update_checklist.md</code>
                  </li>
                  <li>
                    These documents define{' '}
                    <strong>
                      constraints, compliance rules, and design system
                      guardrails
                    </strong>{' '}
                    for agents
                  </li>
                  <li>
                    Plans and tasks should always cross‑check against these
                    guardrails
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Ideal Use Cases</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    <strong>Greenfield Projects:</strong> Start from zero with
                    clear specifications
                  </li>
                  <li>
                    <strong>Creative Exploration:</strong> A/B test different
                    technical approaches
                  </li>
                  <li>
                    <strong>Legacy Modernization:</strong> Iterative refactoring
                    and feature addition
                  </li>
                  <li>
                    <strong>Enterprise Development:</strong> Align with
                    compliance and design systems
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Requirements</h4>
                <div className="text-muted-foreground text-xs">
                  <strong>System:</strong> Linux/macOS or Windows with WSL2 •
                  Python 3.11+ • Git • <code>uv</code>
                  <br />
                  <strong>AI Agent:</strong> Claude Code, GitHub Copilot Chat,
                  or Gemini CLI
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Common Gotchas</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Running <code>/specify</code> in the shell won't work—use
                    the agent chat
                  </li>
                  <li>
                    Initializing in a subfolder may cause path issues; prefer
                    repo root
                  </li>
                  <li>
                    Keep specs free of implementation details; keep plans free
                    of product creep
                  </li>
                </ul>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Spec-Kit Workflow"
            icon={<Workflow className="h-5 w-5" />}
          >
            <div className="space-y-6 text-sm">
              <div>
                <div className="mb-2 font-semibold">Initialize (CLI)</div>
                <div className="mt-2 ml-4 space-y-2">
                  <InputCommandBlock
                    baseCommand="uvx --from git+https://github.com/github/spec-kit.git specify init {{input}}"
                    placeholder="PROJECT_NAME"
                  />
                  <div className="bg-muted rounded p-2 font-mono text-xs">
                    cd PROJECT_NAME
                    <br />
                    specify init --here --ai &lt;copilot|claude|gemini&gt;
                    <br />
                    specify check
                  </div>
                </div>
                <ul className="text-muted-foreground mt-2 ml-4 list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Creates <code>specs/</code>,{' '}
                    <code>memory/constitution.md</code>, <code>scripts/</code>,
                    templates/
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-2 font-semibold">Scaffold guardrails</div>
                <div className="text-muted-foreground ml-4 text-xs">
                  Review and update <code>memory/constitution.md</code> +{' '}
                  <code>constitution_update_checklist.md</code> to reflect
                  constraints, compliance, and design rules.
                </div>
              </div>

              <div>
                <div className="mb-2 font-semibold">Specify (Agent chat)</div>
                <div className="mt-2 ml-4">
                  <InputCommandBlock
                    baseCommand="/specify {{input}}"
                    placeholder="Problem, users, success, scope (WHAT/WHY)"
                  />
                </div>
                <ul className="text-muted-foreground mt-2 ml-4 list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Outputs <code>specs/&lt;feature&gt;/spec.md</code> with user
                    stories & acceptance criteria
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-2 font-semibold">Plan (Agent chat)</div>
                <div className="mt-2 ml-4">
                  <InputCommandBlock
                    baseCommand="/plan {{input}}"
                    placeholder="Tech stack, constraints, architecture (HOW)"
                  />
                </div>
                <ul className="text-muted-foreground mt-2 ml-4 list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Outputs <code>plan.md</code> (+ optionally{' '}
                    <code>contracts/</code>, <code>research.md</code>)
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-2 font-semibold">Tasks (Agent chat)</div>
                <div className="mt-2 ml-4">
                  <SimpleCommandBlock command="/tasks" />
                </div>
                <ul className="text-muted-foreground mt-2 ml-4 list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Outputs <code>tasks.md</code> (or <code>tasks/</code>) with
                    atomic, verifiable tasks
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-2 font-semibold">Implement (Agent chat)</div>
                <div className="mt-2 ml-4">
                  <SimpleCommandBlock command="implement specs/&lt;feature&gt;/plan.md" />
                </div>
                <ul className="text-muted-foreground mt-2 ml-4 list-disc space-y-1 pl-5 text-xs">
                  <li>
                    Generates source, config, and tests. Run locally, iterate on
                    errors, then optionally open a PR
                  </li>
                </ul>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="AI Agent Instructions"
            icon={<Bot className="h-5 w-5" />}
          >
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="mb-2 font-semibold">Agent Purpose</h4>
                <p className="text-muted-foreground text-xs">
                  A specialized agent designed to extract all necessary
                  information for creating optimal <code>/specify</code> and{' '}
                  <code>/plan</code> commands through structured conversations
                  that separate the WHAT/WHY from the HOW.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Core Principles</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    <strong>Executable Specifications:</strong> Create specs
                    that are "precise, complete, and unambiguous enough to
                    generate working systems"
                  </li>
                  <li>
                    <strong>Separate Concerns:</strong> Always distinguish
                    between WHAT/WHY (specification) and HOW (implementation)
                  </li>
                  <li>
                    <strong>Progressive Discovery:</strong> Build understanding
                    through structured questioning, starting with any level of
                    vagueness
                  </li>
                  <li>
                    <strong>Explicit Uncertainty:</strong> Mark all ambiguities
                    and incomplete information clearly
                  </li>
                  <li>
                    <strong>Testable Requirements:</strong> All success criteria
                    must be measurable and verifiable
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Conversation Flow</h4>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 font-medium">
                      Phase 1: Problem Discovery (/specify)
                    </div>
                    <ol className="text-muted-foreground list-decimal space-y-1 pl-5 text-xs">
                      <li>What problem are you solving?</li>
                      <li>Who are the primary users?</li>
                      <li>Why is solving this important?</li>
                      <li>What would perfect success look like?</li>
                      <li>How would we test this works?</li>
                      <li>What's in/out of scope?</li>
                      <li>What parts are still unclear?</li>
                    </ol>
                  </div>

                  <div>
                    <div className="mb-1 font-medium">
                      Phase 2: Technical Discovery (/plan)
                    </div>
                    <div className="text-muted-foreground mb-2 text-xs">
                      <strong>Before generating /plan:</strong> Research latest
                      versions, verify best practices, check official docs
                    </div>
                    <ol className="text-muted-foreground list-decimal space-y-1 pl-5 text-xs">
                      <li>What technologies are you comfortable with?</li>
                      <li>Any technical requirements or limitations?</li>
                      <li>How will this be deployed and accessed?</li>
                      <li>
                        We'll use modern best practices - any specific tech
                        interests?
                      </li>
                      <li>What's your experience level for explanation?</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">
                  Modern Tech Stack Guidance
                </h4>
                <div className="grid gap-4 text-xs md:grid-cols-2">
                  <div>
                    <div className="mb-2 font-medium">Frontend Web:</div>
                    <div className="text-muted-foreground space-y-1">
                      <div>• React with Next.js/Vite</div>
                      <div>• Vue with Nuxt</div>
                      <div>• Svelte with SvelteKit</div>
                      <div>• TypeScript over JavaScript</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium">Backend:</div>
                    <div className="text-muted-foreground space-y-1">
                      <div>• Node.js with Express/Fastify</div>
                      <div>• Python with FastAPI</div>
                      <div>• Go for APIs</div>
                      <div>• Serverless functions</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Quality Standards</h4>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
                  <li>
                    <strong>Modern by Default:</strong> Always recommend
                    current, well-maintained technologies
                  </li>
                  <li>
                    <strong>Production Quality:</strong> Real dev solutions, not
                    quick hacks
                  </li>
                  <li>
                    <strong>Best Practices First:</strong> Industry standards
                    and proper architecture
                  </li>
                  <li>
                    <strong>Research Required:</strong> Verify latest versions
                    and official documentation
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Command Templates</h4>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 font-medium">/specify Template:</div>
                    <div className="bg-muted rounded p-3 font-mono text-xs">
                      /specify I need to build [SOLUTION] for [TARGET USERS] who
                      currently [CURRENT SITUATION].
                      <br />
                      <br />
                      The main problem is [SPECIFIC PROBLEM] which causes
                      [IMPACT/PAIN POINTS].
                      <br />
                      <br />
                      Success looks like [SUCCESS CRITERIA] and users should be
                      able to [KEY CAPABILITIES].
                      <br />
                      <br />
                      Acceptance criteria: [TESTABLE SCENARIOS THAT MUST WORK].
                      <br />
                      <br />
                      This solution should [SCOPE INCLUSIONS] but will NOT
                      [SCOPE EXCLUSIONS].
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 font-medium">/plan Template:</div>
                    <div className="bg-muted rounded p-3 font-mono text-xs">
                      /plan I want to build this using [TECH STACK] because
                      [REASONS].
                      <br />
                      <br />
                      For frontend: [APPROACH] with [TECHNOLOGIES]
                      <br />
                      For data: [STORAGE APPROACH] using [TECHNOLOGIES]
                      <br />
                      For deployment: [STRATEGY]
                      <br />
                      <br />
                      Constraints: [SKILL LEVEL], [TIME], [EXISTING SYSTEMS]
                      <br />
                      <br />
                      Prioritize [GOALS] over [TRADE-OFFS].
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">
                  Sample Conversation Starters
                </h4>
                <div className="text-muted-foreground space-y-3 text-xs">
                  <div>
                    <strong>For Brief Ideas:</strong> "Great starting point!
                    Let's explore what 'better' means for you. What frustrates
                    you about current solutions?"
                  </div>
                  <div>
                    <strong>For Brainstorming:</strong> "Perfect! What domain
                    interests you? Even a vague direction gives us a starting
                    point."
                  </div>
                  <div>
                    <strong>For Stuck Users:</strong> "That's perfect - let's
                    work through this together. What's not working that made you
                    think 'there has to be a better way'?"
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-3">
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <a
                    href="/docs/spec-kit-agent-instructions.md"
                    className="flex items-center gap-1.5"
                  >
                    <BookOpen className="h-3 w-3" />
                    View Full Agent Instructions
                  </a>
                </Button>
              </div>
            </div>
          </SimpleCollapsibleContainer>

          {/* Resource Links - Official repository and AI assistants for Spec-Kit workflows */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <Button variant="default" size="lg" asChild className="text-sm">
              <a
                href="https://github.com/github/spec-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GitBranch className="h-4 w-4" />
                View Spec-Kit on GitHub
              </a>
            </Button>

            <Button variant="default" size="lg" asChild className="text-sm">
              <a
                href="https://chatgpt.com/g/g-68c44ae2a6d48191bff7582ff93706fe-spec-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                Try Spec-Kit GPT Assistant
              </a>
            </Button>

            <Button variant="default" size="lg" asChild className="text-sm">
              <a
                href="https://gemini.google.com/gem/58f94737a9dd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                Try Spec-Kit Gemini Gem
              </a>
            </Button>

            <Button variant="default" size="lg" asChild className="text-sm">
              <a
                href="https://claude.ai/project/01993efd-072d-7443-a95a-4e682b55eafd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                Try Spec-Kit Claude Project
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
