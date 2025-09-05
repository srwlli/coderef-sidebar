import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-12 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <div className="font-semibold">
        <span className="text-blue-600">code</span>
        <span className="text-black">ref</span>
      </div>
    </header>
  );
}
