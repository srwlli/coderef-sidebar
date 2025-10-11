import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import {
  SimpleCommandBlock,
  InputCommandBlock,
  SelectCommandBlock,
} from '@/components/inputs';
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
                baseCommand="mcp__docs-mcp__generate_foundation_docs {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                2. Standards (5 min)
              </div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__establish_standards {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">3. Audit (3 min)</div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__audit_codebase {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                4. Fix violations (1 hour, optional)
              </div>
              <SimpleCommandBlock command="mcp__docs-mcp__fix_violations" />
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
              <SelectCommandBlock
                baseCommand="mcp__docs-mcp__generate_individual_doc {{input}}"
                options={[
                  { value: 'architecture', label: 'Architecture' },
                  { value: 'api', label: 'API Documentation' },
                  { value: 'components', label: 'Components' },
                  { value: 'hooks', label: 'Hooks' },
                  { value: 'utilities', label: 'Utilities' },
                  { value: 'state-management', label: 'State Management' },
                  { value: 'routing', label: 'Routing' },
                  { value: 'styling', label: 'Styling' },
                ]}
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Re-establish standards after major refactor
              </div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__establish_standards {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Re-audit after changes
              </div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__audit_codebase {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Plan new features</div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__create_implementation_plan {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Get Changelog</div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__get_changelog {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">
                Add Changelog Entry
              </div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__add_changelog_entry {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Update Changelog</div>
              <InputCommandBlock
                baseCommand="mcp__docs-mcp__update_changelog {{input}}"
                placeholder="C:\Users\willh\my-react-app"
              />
            </div>
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
