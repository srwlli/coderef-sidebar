import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import {
  SimpleCommandBlock,
  InputCommandBlock,
  SelectCommandBlock,
} from '@/components/inputs';
import { FileText, History } from 'lucide-react';

export default function MCPPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="Foundation Docs"
        icon={<FileText className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">List Templates</div>
            <SimpleCommandBlock command="mcp__docs-mcp__list_templates()" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Generate All Foundation Docs
            </div>
            <InputCommandBlock
              baseCommand='mcp__docs-mcp__generate_foundation_docs(project_path="{{input}}")'
              placeholder="."
              defaultValue="."
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Generate Individual Doc
            </div>
            <SelectCommandBlock
              baseCommand='mcp__docs-mcp__generate_individual_doc(project_path=".", template_name="{{input}}")'
              options={[
                { value: 'readme', label: 'readme' },
                { value: 'architecture', label: 'architecture' },
                { value: 'api', label: 'api' },
                { value: 'components', label: 'components' },
                { value: 'schema', label: 'schema' },
                { value: 'user-guide', label: 'user-guide' },
              ]}
            />
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Changelog"
        icon={<History className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Get Changelog</div>
            <InputCommandBlock
              baseCommand='mcp__docs-mcp__get_changelog(project_path="{{input}}")'
              placeholder="."
              defaultValue="."
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Update Changelog</div>
            <InputCommandBlock
              baseCommand='mcp__docs-mcp__update_changelog(project_path=".", version="{{input}}")'
              placeholder="1.0.0"
            />
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
