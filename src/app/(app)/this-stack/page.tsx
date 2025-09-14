import pkg from '../../../../package.json';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { Layers, Code2, Database, Wrench, Info } from 'lucide-react';

export const metadata = {
  title: 'This Stack',
  description: 'Profile of the technologies used in this project',
};

type DepRecord = Record<string, string>;
type PackageJSON = {
  dependencies?: DepRecord;
  devDependencies?: DepRecord;
};

function get(dep: DepRecord, name: string) {
  return dep?.[name];
}

export default function ThisStackPage() {
  const { dependencies: deps = {}, devDependencies: dev = {} } =
    (pkg as PackageJSON) ?? {};

  const core = [
    { name: 'next', version: get(deps, 'next') },
    { name: 'react', version: get(deps, 'react') },
    { name: 'react-dom', version: get(deps, 'react-dom') },
    { name: 'typescript', version: get(dev, 'typescript') },
    { name: 'tailwindcss', version: get(dev, 'tailwindcss') },
  ];

  const ui = [
    {
      name: '@radix-ui/react-dialog',
      version: get(deps, '@radix-ui/react-dialog'),
    },
    {
      name: '@radix-ui/react-tooltip',
      version: get(deps, '@radix-ui/react-tooltip'),
    },
    {
      name: '@radix-ui/react-separator',
      version: get(deps, '@radix-ui/react-separator'),
    },
    {
      name: '@radix-ui/react-slot',
      version: get(deps, '@radix-ui/react-slot'),
    },
    { name: 'lucide-react', version: get(deps, 'lucide-react') },
    {
      name: 'class-variance-authority',
      version: get(deps, 'class-variance-authority'),
    },
    { name: 'clsx', version: get(deps, 'clsx') },
    { name: 'tailwind-merge', version: get(deps, 'tailwind-merge') },
    { name: 'next-themes', version: get(deps, 'next-themes') },
    { name: 'framer-motion', version: get(deps, 'framer-motion') },
  ];

  const dataAndState = [
    {
      name: '@tanstack/react-query',
      version: get(deps, '@tanstack/react-query'),
    },
    { name: 'zustand', version: get(deps, 'zustand') },
    { name: 'dayjs', version: get(deps, 'dayjs') },
  ];

  const formsValidation = [
    { name: 'react-hook-form', version: get(deps, 'react-hook-form') },
    { name: '@hookform/resolvers', version: get(deps, '@hookform/resolvers') },
    { name: 'zod', version: get(deps, 'zod') },
  ];

  const tooling = [
    { name: 'eslint', version: get(dev, 'eslint') },
    { name: 'eslint-config-next', version: get(dev, 'eslint-config-next') },
    {
      name: 'eslint-config-prettier',
      version: get(dev, 'eslint-config-prettier'),
    },
    { name: 'prettier', version: get(dev, 'prettier') },
    { name: 'lint-staged', version: get(dev, 'lint-staged') },
    { name: 'husky', version: get(dev, 'husky') },
    { name: '@tailwindcss/postcss', version: get(dev, '@tailwindcss/postcss') },
    { name: 'postcss (via Next)', version: 'configured' },
  ];

  function Table({ items }: { items: { name: string; version?: string }[] }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Package</th>
              <th className="p-2 text-left">Version</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.name} className="border-b last:border-0">
                <td className="p-2 align-top font-medium">{it.name}</td>
                <td className="text-muted-foreground p-2 align-top">
                  {it.version ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <SimpleCollapsibleContainer
            title="Core"
            icon={<Layers className="h-5 w-5" />}
            defaultExpanded={true}
          >
            <Table items={core} />
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="UI & Styling"
            icon={<Code2 className="h-5 w-5" />}
          >
            <Table items={ui} />
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Data & State"
            icon={<Database className="h-5 w-5" />}
          >
            <Table items={dataAndState} />
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Forms & Validation"
            icon={<Wrench className="h-5 w-5" />}
          >
            <Table items={formsValidation} />
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Tooling"
            icon={<Wrench className="h-5 w-5" />}
          >
            <Table items={tooling} />
          </SimpleCollapsibleContainer>

          <SimpleCollapsibleContainer
            title="Notes & Considerations"
            icon={<Info className="h-5 w-5" />}
          >
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
              <li>
                React 19 + Next 15 require a recent Node LTS (recommend Node
                20.x).
              </li>
              <li>
                Tailwind CSS v4 is configured via PostCSS plugin; no classic
                tailwind.config.js present.
              </li>
              <li>
                Several libraries (React Query, RHF, Zod, Zustand) are installed
                but not yet used in runtime components.
              </li>
              <li>
                Security headers (CSP, Referrer-Policy, etc.) are not yet
                configured in <code>next.config.ts</code>.
              </li>
            </ul>
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
