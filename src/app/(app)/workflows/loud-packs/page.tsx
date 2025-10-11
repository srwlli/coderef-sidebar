import { SimpleCollapsibleContainer } from '@/components/collapsibles';
import { SimpleCommandBlock } from '@/components/inputs';
import { Package, Smartphone, Zap } from 'lucide-react';

export default function LoudPacksPage() {
  return (
    <div className="space-y-4">
      <SimpleCollapsibleContainer
        title="Web Packages (Next.js/PWA)"
        icon={<Package className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">
              1. @loudpacks/add-header
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Header with hamburger navigation for Next.js PWAs
            </div>
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-500">
              Version: 1.1.3
            </div>
            <SimpleCommandBlock command='npx "@loudpacks/add-header"' />
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              <strong>Features:</strong>
              <ul className="mt-1 ml-4 list-disc">
                <li>Hamburger menu (left, 12px aligned)</li>
                <li>&quot;Next.js PWA&quot; title (right, padded)</li>
                <li>Slide-out drawer navigation</li>
                <li>Auto-detects tab pages</li>
                <li>Icon mapping (Home, Search, Heart, User, Settings)</li>
                <li>Home appears first in navigation</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              2. @loudpacks/create-nextjs-pwa
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Create Next.js PWA projects
            </div>
            <SimpleCommandBlock command="npx @loudpacks/create-nextjs-pwa" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              3. @loudpacks/theme-core
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Theme core utilities
            </div>
            <SimpleCommandBlock command="npm install @loudpacks/theme-core" />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              4. @loudpacks/theme-web
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Web theme utilities
            </div>
            <SimpleCommandBlock command="npm install @loudpacks/theme-web" />
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="React Native Packages"
        icon={<Smartphone className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">
              @loudpacks/add-header-native
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Header with drawer navigation for React Native
            </div>
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-500">
              Version: 1.0.0
            </div>
            <SimpleCommandBlock command="npx @loudpacks/add-header-native" />
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              <strong>Features:</strong>
              <ul className="mt-1 ml-4 list-disc">
                <li>Native iOS/Android header</li>
                <li>Hamburger drawer menu</li>
                <li>Auto-detects screen files</li>
                <li>Ionicons integration</li>
                <li>React Navigation drawer</li>
                <li>Generates example screens</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">
              @loudpacks/theme-native
            </div>
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              Native theme utilities
            </div>
            <SimpleCommandBlock command="npm install @loudpacks/theme-native" />
          </div>
        </div>
      </SimpleCollapsibleContainer>

      <SimpleCollapsibleContainer
        title="Quick Command Reference"
        icon={<Zap className="h-5 w-5" />}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-medium">Web (Next.js PWA)</div>
            <SimpleCommandBlock command='npx "@loudpacks/add-header"' />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">React Native</div>
            <SimpleCommandBlock command="npx @loudpacks/add-header-native" />
          </div>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
