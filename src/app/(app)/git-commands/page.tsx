'use client';

import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
import { GitBranch, FolderPlus, Cloud } from 'lucide-react';

export default function GitCommandsPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="Git Init Workflow"
        icon={<FolderPlus className="h-5 w-5" />}
        defaultExpanded={false}
      >
        <SimpleCommandBlock command="git init" />
        <SimpleCommandBlock command="git add ." />
        <InputCommandBlock
          baseCommand="git commit -m '{{input}}'"
          placeholder="initial commit"
        />
        <InputCommandBlock
          baseCommand="git remote add origin {{input}}"
          placeholder="repository URL (create at github.com/new)"
          onFieldClick={() => window.open('https://github.com/new', '_blank')}
        />
        <SimpleCommandBlock command="git branch -M main" />
        <SimpleCommandBlock command="git push -u origin main" />
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Basic Git Commands"
        icon={<GitBranch className="h-5 w-5" />}
        defaultExpanded={false}
      >
        <SimpleCommandBlock command="git status" />
        <SimpleCommandBlock command="git add ." />
        <InputCommandBlock
          baseCommand="git commit -m '{{input}}'"
          placeholder="commit message"
        />
        <SimpleCommandBlock command="git push" />
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Vercel Deployment Workflow"
        icon={<Cloud className="h-5 w-5" />}
        defaultExpanded={false}
      >
        <SimpleCommandBlock command="npm install -g vercel" />
        <SimpleCommandBlock command="vercel login" />
        <SimpleCommandBlock command="vercel" />
        <SimpleCommandBlock command="vercel --prod" />
        <SimpleCommandBlock command="vercel domains" />
        <SimpleCommandBlock command="vercel env" />
        <SimpleCommandBlock command="vercel logs" />
      </SimpleCollapsibleContainer>
    </div>
  );
}
