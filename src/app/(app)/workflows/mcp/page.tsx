import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { SimpleCommandBlock, InputCommandBlock } from '@/components/inputs';
import { FileText } from 'lucide-react';

export default function MCPPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="MCP Documentation Commands"
        icon={<FileText className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Initial Setup
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                1. Foundation Docs (20 min)
              </div>
              <InputCommandBlock
                baseCommand="Generate foundation documentation for my project at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                2. Standards (5 min)
              </div>
              <InputCommandBlock
                baseCommand="Establish standards for my project at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">3. Audit (3 min)</div>
              <InputCommandBlock
                baseCommand="Audit codebase at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                4. Fix violations (1 hour, optional)
              </div>
              <SimpleCommandBlock command="Fix major violations in the audit report" />
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Ongoing Maintenance
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Update individual docs after changes
              </div>
              <InputCommandBlock
                baseCommand="Generate individual doc for my project at {{input}} using template [name]"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Re-establish standards after major refactor
              </div>
              <InputCommandBlock
                baseCommand="Establish standards for my project at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Re-audit after changes
              </div>
              <InputCommandBlock
                baseCommand="Audit codebase at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Plan new features</div>
              <InputCommandBlock
                baseCommand="Create an implementation plan for [feature] at {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
