import { supabase } from '@/lib/supabase';
import type { CustomCard } from '@/stores/use-app-store';
import {
  type CustomCardRow,
  dbToApp,
  appToInsert,
  appToUpdate,
} from './field-mapping';

/**
 * Fetch all custom cards for authenticated user
 * SECURITY: user_id obtained internally from auth.getUser()
 */
export async function fetchCustomCardsFromSupabase(): Promise<CustomCard[]> {
  if (!supabase) throw new Error('Supabase not configured');

  // Get authenticated user (NEVER from caller)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Query with user_id from session
  const { data, error } = await supabase
    .from('custom_cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Convert all rows from snake_case to camelCase
  return (data as CustomCardRow[]).map(dbToApp);
}

/**
 * Create custom card in Supabase
 * SECURITY: user_id obtained internally from auth.getUser()
 */
export async function createCustomCardInSupabase(
  card: Omit<CustomCard, 'id' | 'createdAt'>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  // Get authenticated user (NEVER from caller)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Convert app model to insert payload with user_id from session
  const insertPayload = appToInsert(card, user.id);

  const { data, error } = await supabase
    .from('custom_cards')
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;

  // Convert returned row to app model
  return dbToApp(data as CustomCardRow);
}

/**
 * Update custom card in Supabase
 * SECURITY: user_id obtained internally from auth.getUser()
 */
export async function updateCustomCardInSupabase(
  id: string,
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  // Get authenticated user (NEVER from caller)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Convert app updates to DB payload
  const updatePayload = appToUpdate(updates);

  const { data, error } = await supabase
    .from('custom_cards')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id) // Defense in depth: double-check ownership
    .select()
    .single();

  if (error) throw error;

  // Convert returned row to app model
  return dbToApp(data as CustomCardRow);
}

/**
 * Delete custom card from Supabase
 * SECURITY: user_id obtained internally from auth.getUser()
 */
export async function deleteCustomCardFromSupabase(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  // Get authenticated user (NEVER from caller)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('custom_cards')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // Defense in depth: prevent deleting other users' cards

  if (error) throw error;
}
