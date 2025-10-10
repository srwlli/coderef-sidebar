import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { SimpleCommandBlock } from '@/components/inputs';
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
            <div className="mb-2 text-sm font-medium">List Templates</div>
            <SimpleCommandBlock command="mcp__docs-mcp__list_templates" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Get Template</div>
            <SimpleCommandBlock command="mcp__docs-mcp__get_template" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Generate All Foundation Docs
            </div>
            <SimpleCommandBlock command="mcp__docs-mcp__generate_foundation_docs" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Generate Individual Doc
            </div>
            <SimpleCommandBlock command="mcp__docs-mcp__generate_individual_doc" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Get Changelog</div>
            <SimpleCommandBlock command="mcp__docs-mcp__get_changelog" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Add Changelog Entry</div>
            <SimpleCommandBlock command="mcp__docs-mcp__add_changelog_entry" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Update Changelog</div>
            <SimpleCommandBlock command="mcp__docs-mcp__update_changelog" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Establish Standards</div>
            <SimpleCommandBlock command="mcp__docs-mcp__establish_standards" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Audit Codebase</div>
            <SimpleCommandBlock command="mcp__docs-mcp__audit_codebase" />
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
