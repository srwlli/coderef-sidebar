import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-12 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <div className="flex-1">{/* Future: breadcrumbs or page title */}</div>
      <div className="flex items-center gap-4">
        {/* Future: user profile, notifications, etc */}
      </div>
    </header>
  );
}
