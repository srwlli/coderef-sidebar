-- Drop All Tables and Clean Database
-- Execute this in Supabase SQL Editor BEFORE running database-setup.sql

-- 1. Drop views first (they depend on tables)
DROP VIEW IF EXISTS projects_with_username CASCADE;

-- 2. Drop triggers
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;

-- 3. Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- 4. Drop tables (CASCADE will remove dependent objects)
DROP TABLE IF EXISTS projects CASCADE;

-- 5. Remove any orphaned policies (just in case)
-- Note: Policies are automatically dropped when tables are dropped

-- 6. Verify cleanup
SELECT
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename LIKE '%project%';

SELECT
  schemaname,
  viewname
FROM pg_views
WHERE schemaname = 'public'
  AND viewname LIKE '%project%';