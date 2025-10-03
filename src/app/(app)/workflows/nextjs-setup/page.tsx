import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { InputCommandBlock, SimpleCommandBlock } from '@/components/inputs';
import { Package, Settings, TestTube } from 'lucide-react';

export default function NextjsSetupPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="Package Installation"
        icon={<Package className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Core Next.js Setup</div>
            <InputCommandBlock
              baseCommand="npx create-next-app@latest {{input}} --typescript --tailwind --app --turbopack --use-npm"
              placeholder="project-name"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Backend & Database</div>
            <SimpleCommandBlock command="npm install @supabase/supabase-js @supabase/ssr" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Form Handling & Validation
            </div>
            <SimpleCommandBlock command="npm install react-hook-form zod @hookform/resolvers" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Animation</div>
            <SimpleCommandBlock command="npm install framer-motion" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Development Tools</div>
            <SimpleCommandBlock command="npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier" />
            <SimpleCommandBlock command="npm install -D husky lint-staged" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">UI Component System</div>
            <SimpleCommandBlock command="npx shadcn@latest init" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Additional Utilities</div>
            <SimpleCommandBlock command="npm install dayjs next-themes zustand @tanstack/react-query sonner" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Git Hooks Setup</div>
            <SimpleCommandBlock command="npx husky init" />
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Configuration Files"
        icon={<Settings className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">
              Environment Variables (.env.local)
            </div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
              <br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Prettier Configuration (.prettierrc)
            </div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              {`{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}`}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Package.json (add lint-staged)
            </div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              {`"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,md}": ["prettier --write"]
}`}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              ESLint Configuration (eslint.config.mjs)
            </div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              {`const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];`}
            </div>
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Development & Testing Commands"
        icon={<TestTube className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Development Server</div>
            <SimpleCommandBlock command="npm run dev" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Build & Test</div>
            <SimpleCommandBlock command="npm run build" />
            <SimpleCommandBlock command="npm run lint" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Git Commands</div>
            <SimpleCommandBlock command="git status" />
            <SimpleCommandBlock command="git add ." />
            <InputCommandBlock
              baseCommand="git commit -m '{{input}}'"
              placeholder="commit message"
            />
            <SimpleCommandBlock command="git push" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              Project Structure Check
            </div>
            <div className="bg-muted rounded p-3 font-mono text-xs">
              {`Expected structure:
├── src/
│   ├── app/
│   ├── components/
│   │   └── ui/              # shadcn components
│   └── lib/
│       └── utils.ts         # cn() utility
├── .husky/
├── public/
├── .env.local
├── .prettierrc
├── components.json
└── package.json`}
            </div>
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
