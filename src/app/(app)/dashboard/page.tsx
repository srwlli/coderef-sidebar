'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, ListCard } from '@/components/cards';
import {
  Bot,
  Github,
  Database,
  Cloud,
  Globe,
  Sparkles,
  MessageSquare,
  GitBranch,
  Settings,
  Workflow,
  Figma,
} from 'lucide-react';
import Link from 'next/link';
import { useViewPreference } from '@/hooks/use-view-preference';
import { ActionModal } from '@/components/modals/action-modal';
import { getCardActions } from '@/lib/card-actions';
import { LucideIcon } from 'lucide-react';
import { useLongPress } from '@/hooks/use-long-press';
import { useRouter } from 'next/navigation';

interface SelectedCard {
  title: string;
  icon: LucideIcon;
}

type DashboardItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

interface GridCardItemProps {
  item: DashboardItem;
  IconComponent: LucideIcon;
  onLongPress: () => void;
}

function GridCardItem({ item, IconComponent, onLongPress }: GridCardItemProps) {
  const router = useRouter();
  const { style, ...handlers } = useLongPress({
    onLongPress,
    onClick: () => {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.href);
      }
    },
  });

  return (
    <div className="block" style={style} {...handlers}>
      <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
          <IconComponent className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
          <CardTitle className="text-xs leading-tight sm:text-sm">
            {item.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

const dashboardItems: DashboardItem[] = [
  // Internal Tools
  {
    title: 'Prompts',
    href: '/ai-tools/prompts',
    icon: MessageSquare,
  },
  {
    title: 'Git Commands',
    href: '/git-commands',
    icon: GitBranch,
  },
  {
    title: 'Next.js Setup',
    href: '/workflows/nextjs-setup',
    icon: Settings,
  },
  // Platforms & Services
  {
    title: 'Noted',
    href: 'https://noted-bay-three.vercel.app/',
    icon: Globe,
    external: true,
  },
  {
    title: 'Vercel',
    href: 'https://vercel.com/teamhart',
    icon: Cloud,
    external: true,
  },
  {
    title: 'Anthropic Console',
    href: 'https://console.anthropic.com/dashboard',
    icon: Globe,
    external: true,
  },
  {
    title: 'GitHub',
    href: 'https://github.com/dashboard',
    icon: Github,
    external: true,
  },
  {
    title: 'Supabase',
    href: 'https://supabase.com/dashboard/org/wskblpimfkjbkgayzxqj',
    icon: Database,
    external: true,
  },
  {
    title: 'Google Stitch',
    href: 'https://stitch.withgoogle.com/?pli=1',
    icon: Sparkles,
    external: true,
  },
  {
    title: 'Figma',
    href: 'https://www.figma.com/files/team/1500256681417245761/recents-and-sharing?fuid=1500256678774338537',
    icon: Figma,
    external: true,
  },
  {
    title: 'n8n Workflows',
    href: 'http://localhost:5678/home/workflows',
    icon: Workflow,
    external: true,
  },
  // AI Tools
  {
    title: 'ChatGPT',
    href: 'https://chat.openai.com',
    icon: Bot,
    external: true,
  },
  {
    title: 'Claude',
    href: 'https://claude.ai',
    icon: Bot,
    external: true,
  },
  {
    title: 'Gemini',
    href: 'https://gemini.google.com',
    icon: Bot,
    external: true,
  },
  {
    title: 'DeepSeek',
    href: 'https://chat.deepseek.com',
    icon: Bot,
    external: true,
  },
  {
    title: 'Grok',
    href: 'https://grok.x.ai',
    icon: Bot,
    external: true,
  },
  {
    title: 'Le Chat',
    href: 'https://chat.mistral.ai',
    icon: Bot,
    external: true,
  },
  {
    title: 'Perplexity',
    href: 'https://perplexity.ai',
    icon: Bot,
    external: true,
  },
  {
    title: 'Lovable',
    href: 'https://lovable.dev/',
    icon: Bot,
    external: true,
  },
  {
    title: 'Replit',
    href: 'https://replit.com',
    icon: Bot,
    external: true,
  },
  {
    title: 'GitHub Copilot',
    href: 'https://github.com/features/copilot',
    icon: Bot,
    external: true,
  },
  {
    title: 'Cursor',
    href: 'https://cursor.sh',
    icon: Bot,
    external: true,
  },
  {
    title: 'V0',
    href: 'https://v0.dev',
    icon: Bot,
    external: true,
  },
];

export default function Dashboard() {
  const [view] = useViewPreference();
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const router = useRouter();

  const handleLongPress = (item: DashboardItem) => {
    setSelectedCard({
      title: item.title,
      icon: item.icon,
    });
    setShowModal(true);
  };

  return (
    <>
      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <GridCardItem
                key={item.href}
                item={item}
                IconComponent={IconComponent}
                onLongPress={() => handleLongPress(item)}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {dashboardItems.map((item, index) => (
            <ListCard
              key={index}
              title={item.title}
              href={item.href}
              icon={item.icon}
              external={item.external}
              onLongPress={() => handleLongPress(item)}
            />
          ))}
        </div>
      )}

      {/* Action Modal */}
      {selectedCard && (
        <ActionModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          cardTitle={selectedCard.title}
          cardIcon={selectedCard.icon}
          actions={getCardActions(selectedCard.title)}
        />
      )}
    </>
  );
}
