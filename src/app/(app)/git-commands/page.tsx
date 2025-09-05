import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
import { GitBranch } from 'lucide-react';

export default function GitCommandsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <SimpleCollapsibleContainer
            title="Basic Git Commands"
            icon={<GitBranch className="h-5 w-5" />}
          >
            <SimpleCommandBlock command="git status" />
            <SimpleCommandBlock command="git add ." />
            <InputCommandBlock
              baseCommand="git commit -m '{{input}}'"
              placeholder="commit message"
            />
            <SimpleCommandBlock command="git push" />
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
