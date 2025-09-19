-- Seed Projects Table
-- Run this after creating the projects table to populate with your existing projects

-- Note: Replace 'your-user-id-here' with your actual user ID from auth.users table
-- You can get your user ID by running: SELECT id, email FROM auth.users;

INSERT INTO projects (user_id, username, project_name, description, tags) VALUES

-- Core Development Projects
('your-user-id-here', 'your-username', 'coderef', 'Code reference and snippet management system for developers', ARRAY['development', 'reference', 'tools']),
('your-user-id-here', 'your-username', 'coderef2', 'Enhanced version of the code reference management system', ARRAY['development', 'reference', 'tools', 'v2']),

-- Education & Learning
('your-user-id-here', 'your-username', 'MyStudyApp', 'Comprehensive study and learning management application', ARRAY['education', 'learning', 'productivity']),

-- AI & Writing Tools
('your-user-id-here', 'your-username', 'Smart Phrases', 'AI-powered writing assistant with contextual suggestions', ARRAY['ai', 'writing', 'assistant', 'nlp']),
('your-user-id-here', 'your-username', 'Agents', 'AI agent management and deployment platform', ARRAY['ai', 'agents', 'automation', 'ml']),

-- Sports & Analytics
('your-user-id-here', 'your-username', 'My Sports Rank', 'Sports ranking and analytics platform with real-time data', ARRAY['sports', 'analytics', 'ranking', 'data']),

-- Gaming & Entertainment
('your-user-id-here', 'your-username', 'iCaughta', 'Achievement and catch tracking application', ARRAY['gaming', 'tracking', 'achievements']),
('your-user-id-here', 'your-username', 'Highway Games', 'Gaming platform and entertainment application', ARRAY['gaming', 'entertainment', 'platform']),

-- Productivity & Organization
('your-user-id-here', 'your-username', 'noted', 'Digital note-taking and organization system', ARRAY['productivity', 'notes', 'organization']),
('your-user-id-here', 'your-username', 'My Dash', 'Personal dashboard with customizable widgets and data views', ARRAY['dashboard', 'personal', 'productivity', 'widgets']),
('your-user-id-here', 'your-username', 'Workflows', 'User activity tracking and workflow optimization platform', ARRAY['productivity', 'workflows', 'optimization', 'analytics']),
('your-user-id-here', 'your-username', 'Organized', 'Advanced organization and task management system', ARRAY['productivity', 'organization', 'tasks']),

-- Form & Document Management
('your-user-id-here', 'your-username', 'formed', 'Dynamic form builder and management system', ARRAY['forms', 'builder', 'management', 'web']),
('your-user-id-here', 'your-username', 'Paper trail', 'Document tracking and workflow management system', ARRAY['documents', 'tracking', 'workflow', 'management']),

-- Data & Systems
('your-user-id-here', 'your-username', 'UDS', 'Universal Data System for data processing and management', ARRAY['data', 'system', 'processing', 'backend']),

-- Landing & Portfolio
('your-user-id-here', 'your-username', 'Project 16', 'Portfolio and project landing page showcase', ARRAY['portfolio', 'showcase', 'landing', 'web']);

-- Verify the insertion
SELECT
  project_name,
  description,
  array_length(tags, 1) as tag_count,
  created_at
FROM projects
WHERE user_id = 'your-user-id-here'
ORDER BY project_name;

-- Alternative query to check total count
SELECT COUNT(*) as total_projects
FROM projects
WHERE user_id = 'your-user-id-here';