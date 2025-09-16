-- Add a new project
-- Execute this in Supabase SQL Editor

INSERT INTO projects (user_id, username, project_name, description, notes, tags)
VALUES (
  'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf',
  'srwlli',
  'YOUR_PROJECT_NAME',
  'PROJECT_DESCRIPTION',
  'PROJECT_NOTES',
  ARRAY['tag1', 'tag2', 'tag3']
);

-- Verify the insert
SELECT
  id,
  project_name,
  username,
  tags,
  created_at
FROM projects
WHERE user_id = 'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf'
ORDER BY created_at DESC
LIMIT 1;