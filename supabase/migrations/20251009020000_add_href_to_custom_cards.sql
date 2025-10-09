-- Add href field to custom_cards and make links optional
-- Migration: Move from links[0] being the main nav to dedicated href field

-- Step 1: Add href column (nullable initially for migration)
alter table public.custom_cards add column href text;

-- Step 2: Migrate existing data (move links[0].href to href column)
update public.custom_cards
set href = links->0->>'href'
where jsonb_array_length(links) > 0;

-- Step 3: Remove first link from links array for all existing cards
update public.custom_cards
set links = (
  select jsonb_agg(link)
  from jsonb_array_elements(links) with ordinality as t(link, idx)
  where idx > 1
)
where jsonb_array_length(links) > 0;

-- Step 4: Set empty array for cards that now have no additional links
update public.custom_cards
set links = '[]'::jsonb
where links is null;

-- Step 5: Make href NOT NULL now that data is migrated
alter table public.custom_cards alter column href set not null;

-- Step 6: Add CHECK constraint for valid URLs
alter table public.custom_cards add constraint valid_href check (
  char_length(href) > 0 and
  (
    -- Allow internal paths starting with /
    href like '/%' or
    -- Allow http/https URLs
    href like 'http://%' or
    href like 'https://%'
  )
);

-- Step 7: Update links array constraint to allow 0-16 links (was 1-16)
alter table public.custom_cards drop constraint valid_links_structure;
alter table public.custom_cards add constraint valid_links_structure check (
  jsonb_typeof(links) = 'array' and
  jsonb_array_length(links) >= 0 and
  jsonb_array_length(links) <= 16
);

-- Step 8: Add index for href column (useful for searches/filters)
create index custom_cards_href_idx on public.custom_cards(href);
