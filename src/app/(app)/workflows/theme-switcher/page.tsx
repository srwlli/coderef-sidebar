import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { SimpleCommandBlock } from '@/components/inputs';
import { Palette, Smartphone } from 'lucide-react';

export default function ThemeSwitcherPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="Next.js Projects"
        icon={<Palette className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Navigate to Project</div>
            <SimpleCommandBlock command="cd your-nextjs-project" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Link Theme Core</div>
            <SimpleCommandBlock command="pnpm link --global @loudpacks/theme-core" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Link Theme Web</div>
            <SimpleCommandBlock command="pnpm link --global @loudpacks/theme-web" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Install Dependencies</div>
            <SimpleCommandBlock command="pnpm install" />
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="React Native Projects"
        icon={<Smartphone className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Navigate to Project</div>
            <SimpleCommandBlock command="cd your-react-native-project" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Link Theme Core</div>
            <SimpleCommandBlock command="pnpm link --global @loudpacks/theme-core" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Link Theme Native</div>
            <SimpleCommandBlock command="pnpm link --global @loudpacks/theme-native" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Install Dependencies</div>
            <SimpleCommandBlock command="pnpm install" />
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
