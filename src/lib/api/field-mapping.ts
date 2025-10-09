import type { CustomCard, CustomLink } from '@/stores/use-app-store';

/**
 * Database row from Supabase (snake_case)
 */
export interface CustomCardRow {
  id: string;
  user_id: string;
  title: string;
  icon_name: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
  created_at: string;
  updated_at: string;
}

/**
 * Insert payload to Supabase (snake_case)
 */
export interface CustomCardInsert {
  user_id: string;
  title: string;
  icon_name: string;
  links: {
    id: string;
    label: string;
    href: string;
  }[];
}

/**
 * Update payload to Supabase (snake_case)
 */
export interface CustomCardUpdate {
  title?: string;
  icon_name?: string;
  links?: {
    id: string;
    label: string;
    href: string;
  }[];
}

/**
 * Convert database row (snake_case) to app model (camelCase)
 */
export function dbToApp(row: CustomCardRow): CustomCard {
  return {
    id: row.id,
    // user_id is NOT included in CustomCard (only used in DB queries)
    title: row.title,
    iconName: row.icon_name,
    links: row.links, // Already correct format
    createdAt: row.created_at,
    // updatedAt is NOT included in CustomCard (internal DB field)
  };
}

/**
 * Convert app model (camelCase) to insert payload (snake_case)
 * Requires user_id from auth context
 */
export function appToInsert(
  card: Omit<CustomCard, 'id' | 'createdAt'>,
  userId: string
): CustomCardInsert {
  return {
    user_id: userId,
    title: card.title,
    icon_name: card.iconName,
    links: card.links, // Already correct format
  };
}

/**
 * Convert app model updates (camelCase) to update payload (snake_case)
 */
export function appToUpdate(
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
): CustomCardUpdate {
  const payload: CustomCardUpdate = {};

  if (updates.title !== undefined) {
    payload.title = updates.title;
  }

  if (updates.iconName !== undefined) {
    payload.icon_name = updates.iconName;
  }

  if (updates.links !== undefined) {
    payload.links = updates.links;
  }

  return payload;
}

/**
 * Type guard: Check if object is a valid database row
 */
export function isCustomCardRow(obj: unknown): obj is CustomCardRow {
  if (!obj || typeof obj !== 'object') return false;
  const row = obj as Record<string, unknown>;

  return (
    typeof row.id === 'string' &&
    typeof row.user_id === 'string' &&
    typeof row.title === 'string' &&
    typeof row.icon_name === 'string' &&
    Array.isArray(row.links) &&
    typeof row.created_at === 'string' &&
    typeof row.updated_at === 'string'
  );
}
