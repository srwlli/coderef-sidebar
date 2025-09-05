import {
  CollapsibleContainer,
  SimpleCommandBlock,
} from '@/components/collapsibles';
import { InputCommandBlock } from '@/components/inputs';
import { GitBranch } from 'lucide-react';

export default function GitCommandsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <CollapsibleContainer
            title="Basic Git Commands"
            icon={<GitBranch className="h-5 w-5" />}
            description="Essential commands for daily git usage"
          >
            <SimpleCommandBlock command="git status" />
            <SimpleCommandBlock command="git add ." />
            <InputCommandBlock
              baseCommand="git commit -m '{{input}}'"
              placeholder="commit message"
            />
            <SimpleCommandBlock command="git push" />
          </CollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
