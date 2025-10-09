-- Create custom_cards table with JSONB validation
create table if not exists public.custom_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null check (char_length(title) <= 50),
  icon_name text not null,
  links jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,

  -- JSONB validation for links array structure
  constraint valid_links_structure check (
    jsonb_typeof(links) = 'array' and
    jsonb_array_length(links) >= 1 and
    jsonb_array_length(links) <= 16
  )
);

-- Create index for faster user queries
create index custom_cards_user_id_idx on public.custom_cards(user_id);

-- Create index for ordering by created_at
create index custom_cards_created_at_idx on public.custom_cards(created_at);

-- Create function to validate each link object
create or replace function validate_link_object(link jsonb)
returns boolean as $$
begin
  return (
    link ? 'id' and
    link ? 'label' and
    link ? 'href' and
    jsonb_typeof(link->'id') = 'string' and
    jsonb_typeof(link->'label') = 'string' and
    jsonb_typeof(link->'href') = 'string' and
    char_length(link->>'label') > 0 and
    char_length(link->>'label') <= 30 and
    char_length(link->>'href') > 0
  );
end;
$$ language plpgsql immutable;

-- Add constraint to validate all links in array
alter table public.custom_cards add constraint valid_links_content check (
  (select bool_and(validate_link_object(link))
   from jsonb_array_elements(links) as link)
);

-- Enable RLS
alter table public.custom_cards enable row level security;

-- Policy: Users can view their own cards
create policy "Users can view own custom cards"
  on public.custom_cards
  for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own cards
create policy "Users can insert own custom cards"
  on public.custom_cards
  for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own cards
create policy "Users can update own custom cards"
  on public.custom_cards
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own cards
create policy "Users can delete own custom cards"
  on public.custom_cards
  for delete
  using (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger update_custom_cards_updated_at
  before update on public.custom_cards
  for each row
  execute function public.update_updated_at_column();
