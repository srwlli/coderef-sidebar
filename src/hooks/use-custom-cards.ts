import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useAppStore } from '@/stores/use-app-store';

/**
 * Hook to manage custom cards with auto-fetch on authentication
 * Abstracts Zustand store complexity and provides clean API
 */
export function useCustomCards() {
  const { user } = useAuth();
  const {
    customCards,
    isLoadingCards,
    cardsError,
    fetchCustomCards,
    addCustomCard,
    updateCustomCard,
    deleteCustomCard,
    clearCardsError,
  } = useAppStore();

  // Auto-fetch cards when user authenticates
  useEffect(() => {
    if (user) {
      fetchCustomCards();
    }
  }, [user?.id, fetchCustomCards]);

  return {
    cards: customCards,
    isLoading: isLoadingCards,
    error: cardsError,
    addCard: addCustomCard,
    updateCard: updateCustomCard,
    deleteCard: deleteCustomCard,
    clearError: clearCardsError,
  };
}
