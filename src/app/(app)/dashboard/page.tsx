'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, ListCard } from '@/components/cards';
import {
  Bot,
  Github,
  Database,
  Globe,
  Sparkles,
  MessageSquare,
  GitBranch,
  Settings,
  Workflow,
  Figma,
} from 'lucide-react';
import { useViewPreference } from '@/hooks/use-view-preference';
import { ActionModal } from '@/components/modals/action-modal';
import { getCardActions } from '@/lib/card-actions';
import { LucideIcon } from 'lucide-react';
import { useLongPress } from '@/hooks/use-long-press';
import { useRouter } from 'next/navigation';
import { CustomCard, CustomLink } from '@/stores/use-app-store';
import { getIconComponent } from '@/lib/icon-utils';
import { CustomCardItem } from '@/components/dashboard/CustomCardItem';
import { AddCardButton } from '@/components/dashboard/AddCardButton';
import { CardFormModal } from '@/components/dashboard/CardFormModal';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';
import { useCustomCards } from '@/hooks/use-custom-cards';

interface SelectedCard {
  title: string;
  icon: LucideIcon;
  customCard?: CustomCard | null;
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
  {
    title: 'Noted',
    href: 'https://noted-bay-three.vercel.app/',
    icon: Globe,
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
    title: 'Figma',
    href: 'https://www.figma.com/files/team/1500256681417245761/recents-and-sharing?fuid=1500256678774338537',
    icon: Figma,
    external: true,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [view] = useViewPreference();
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CustomCard | null>(null);

  // Auth protection: redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Get custom cards from hook (auto-fetches on auth)
  const {
    cards: customCards,
    isLoading: isLoadingCards,
    error: cardsError,
    addCard: addCustomCard,
    updateCard: updateCustomCard,
    deleteCard: deleteCustomCard,
  } = useCustomCards();

  // Show loading state during auth check
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Prevent flash of content before redirect
  if (!user) {
    return null;
  }

  const handleLongPress = (item: DashboardItem) => {
    setSelectedCard({
      title: item.title,
      icon: item.icon,
      customCard: null,
    });
    setShowModal(true);
  };

  const handleCustomCardLongPress = (card: CustomCard) => {
    const Icon = getIconComponent(card.iconName);
    setSelectedCard({
      title: card.title,
      icon: Icon,
      customCard: card,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (data: {
    title: string;
    href: string;
    links: CustomLink[];
    iconName: string;
  }) => {
    try {
      if (editingCard) {
        // Update existing card
        await updateCustomCard(editingCard.id, data);
        toast.success('Card updated!');
      } else {
        // Add new card
        await addCustomCard(data);
        toast.success('Card added!');
      }
      setEditingCard(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save card'
      );
    }
  };

  const handleAddCardClick = () => {
    setEditingCard(null);
    setFormOpen(true);
  };

  const handleEditCard = (card: CustomCard) => {
    setEditingCard(card);
    setFormOpen(true);
    setShowModal(false);
  };

  const handleDeleteCard = async (card: CustomCard) => {
    const confirmed = window.confirm(
      `Delete "${card.title}"? This cannot be undone.`
    );
    if (confirmed) {
      try {
        await deleteCustomCard(card.id);
        toast.success('Card deleted');
        setShowModal(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to delete card'
        );
      }
    }
  };

  return (
    <>
      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Custom cards first */}
          {customCards.map((card) => {
            const Icon = getIconComponent(card.iconName);
            return (
              <CustomCardItem
                key={card.id}
                card={card}
                icon={Icon}
                view="grid"
                onLongPress={() => handleCustomCardLongPress(card)}
              />
            );
          })}

          {/* Then default cards */}
          {dashboardItems.map((item) => {
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

          {/* Add card button at the end */}
          <AddCardButton onClick={handleAddCardClick} view="grid" />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Custom cards first */}
          {customCards.map((card) => {
            const Icon = getIconComponent(card.iconName);
            return (
              <CustomCardItem
                key={card.id}
                card={card}
                icon={Icon}
                view="list"
                onLongPress={() => handleCustomCardLongPress(card)}
              />
            );
          })}

          {/* Then default cards */}
          {dashboardItems.map((item) => (
            <ListCard
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              external={item.external}
              onLongPress={() => handleLongPress(item)}
            />
          ))}

          {/* Add card button in list view */}
          <AddCardButton onClick={handleAddCardClick} view="list" />
        </div>
      )}

      {/* Action Modal */}
      {selectedCard && (
        <ActionModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          cardTitle={selectedCard.title}
          cardIcon={selectedCard.icon}
          actions={getCardActions({
            cardTitle: selectedCard.title,
            customCard: selectedCard.customCard,
            onEdit: selectedCard.customCard
              ? () => handleEditCard(selectedCard.customCard!)
              : undefined,
            onDelete: selectedCard.customCard
              ? () => handleDeleteCard(selectedCard.customCard!)
              : undefined,
          })}
        />
      )}

      {/* Card Form Modal */}
      <CardFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingCard(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingCard}
      />
    </>
  );
}
