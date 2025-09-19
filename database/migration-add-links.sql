-- Migration: Add links column to projects table
-- Date: 2025-09-19
-- Description: Replace individual URL fields with a single JSONB links array

-- Add new links column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- Create a function to migrate existing URL data to links array
-- This handles cases where individual URL columns might exist
CREATE OR REPLACE FUNCTION migrate_project_urls() RETURNS void AS $$
DECLARE
    project_record RECORD;
    links_array JSONB := '[]'::jsonb;
BEGIN
    -- Only proceed if any of the old URL columns exist
    IF EXISTS (
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'projects'
        AND column_name IN ('git', 'supabase', 'local_link', 'deployed_link')
    ) THEN

        -- Iterate through all projects
        FOR project_record IN
            SELECT id,
                   COALESCE(git, '') as git,
                   COALESCE(supabase, '') as supabase,
                   COALESCE(local_link, '') as local_link,
                   COALESCE(deployed_link, '') as deployed_link
            FROM projects
            WHERE links = '[]'::jsonb OR links IS NULL
        LOOP
            links_array := '[]'::jsonb;

            -- Add Git repository link if exists
            IF project_record.git IS NOT NULL AND project_record.git != '' THEN
                links_array := links_array || jsonb_build_object(
                    'url', project_record.git,
                    'title', 'Git Repository',
                    'description', ''
                );
            END IF;

            -- Add Supabase project link if exists
            IF project_record.supabase IS NOT NULL AND project_record.supabase != '' THEN
                links_array := links_array || jsonb_build_object(
                    'url', project_record.supabase,
                    'title', 'Database/Supabase',
                    'description', ''
                );
            END IF;

            -- Add local development link if exists
            IF project_record.local_link IS NOT NULL AND project_record.local_link != '' THEN
                links_array := links_array || jsonb_build_object(
                    'url', project_record.local_link,
                    'title', 'Local Development',
                    'description', ''
                );
            END IF;

            -- Add deployed link if exists
            IF project_record.deployed_link IS NOT NULL AND project_record.deployed_link != '' THEN
                links_array := links_array || jsonb_build_object(
                    'url', project_record.deployed_link,
                    'title', 'Live Demo',
                    'description', ''
                );
            END IF;

            -- Update the project with the new links array
            UPDATE projects
            SET links = links_array
            WHERE id = project_record.id;

        END LOOP;

        RAISE NOTICE 'Migration completed. URL data converted to links array.';

        -- Optionally drop old columns (commented out for safety)
        -- Uncomment these lines after verifying the migration worked correctly
        /*
        ALTER TABLE projects DROP COLUMN IF EXISTS git;
        ALTER TABLE projects DROP COLUMN IF EXISTS supabase;
        ALTER TABLE projects DROP COLUMN IF EXISTS local_link;
        ALTER TABLE projects DROP COLUMN IF EXISTS deployed_link;
        */

    ELSE
        RAISE NOTICE 'No URL columns found to migrate.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the migration
SELECT migrate_project_urls();

-- Drop the migration function (cleanup)
DROP FUNCTION IF EXISTS migrate_project_urls();

-- Add index on links for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_links_gin ON projects USING gin(links);

-- Add comments for documentation
COMMENT ON COLUMN projects.links IS 'JSONB array of project links with url, title, and description fields';

RAISE NOTICE 'Links column migration completed successfully!';