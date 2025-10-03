# Database Schema Overview

This document summarizes the active database structures used by the Sidebar App after removing the legacy notes module.

## Projects Table (`projects`)

- **Purpose**: Stores user-owned project entries displayed throughout the dashboard.
- **Primary Keys**: `id` (serial), `user_id` (UUID referencing `auth.users`).
- **Core Columns**:
  - `project_name` (`varchar(255)`) — required.
  - `description` (`text`) — optional long-form copy.
  - `notes` (`text`) — optional supplemental details.
  - `tags` (`text[]`) — optional categorisation, capped via application logic.
  - `created_at` / `updated_at` (`timestamptz`) — managed by database defaults.
- **Policies**: Row Level Security restricts access to the owning user (`user_id = auth.uid()`).
- **Indexes**: Retain `idx_projects_user_id` and `idx_projects_created_at` for common sorted queries.

### Recommended Validation

Application-side logic validates:

- Project name length within 1–255 characters.
- Tags limited to sensible counts to avoid noisy arrays.
- Optional fields trimmed before submission.

## Supporting Tables

The application integrates with Supabase auth (`auth.users`) for identity management and leverages the default storage buckets for asset uploads used across projects and workflows.

## Legacy Structures

- A `noted` table remains in the Supabase project for historical data but is no longer accessed by the application.
- Any migrations involving the former notes module can be archived safely; new development should exclude the legacy table.

## Migration Checklist

When extending the schema:

1. Add new columns via SQL migration files under `database/`.
2. Update Supabase policies if new user-owned data is introduced.
3. Regenerate TypeScript types that mirror database rows.
4. Document the changes here to keep the schema summary current.
