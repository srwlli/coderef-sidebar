-- Complete Projects Table Setup with Real Projects
-- Execute this in Supabase SQL Editor

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
CREATE POLICY "Users can only see their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- 5. Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Insert real projects
INSERT INTO projects (user_id, username, project_name, description, notes, tags) VALUES
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'My Sports Rank', 'Sports ranking and analytics platform', 'Real-time sports data and ranking system', ARRAY['sports', 'analytics', 'ranking']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'MyStudyApp', 'Study and learning management application', 'Educational platform for study materials', ARRAY['education', 'learning', 'study']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Workflows', 'User activity tracking and workflow optimization platform', 'Analyzes patterns and suggests productivity improvements', ARRAY['productivity', 'workflows', 'optimization']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'UDS', 'Universal Data System', 'Data management and processing system', ARRAY['data', 'system', 'processing']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Smart Phrases', 'AI-powered writing assistant', 'Contextual phrase suggestions and writing improvement', ARRAY['ai', 'writing', 'assistant']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Coderef', 'Code reference management system', 'Intelligent code categorization and search', ARRAY['development', 'reference', 'code']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Coderef2', 'Code reference system v2', 'Enhanced version of code reference management', ARRAY['development', 'reference', 'code']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Formed', 'Form builder and management system', 'Create and manage custom forms', ARRAY['forms', 'builder', 'management']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Agents', 'AI agent management platform', 'Manage and deploy AI agents', ARRAY['ai', 'agents', 'management']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Highway Games', 'Gaming platform project', 'Entertainment and gaming application', ARRAY['gaming', 'entertainment', 'platform']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'My Dash', 'Personal dashboard application', 'Customizable personal dashboard', ARRAY['dashboard', 'personal', 'productivity']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Paper Trail', 'Document tracking system', 'Track and manage document workflows', ARRAY['documents', 'tracking', 'workflow']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'ICaughtA', 'Catch tracking application', 'Track and log caught items or achievements', ARRAY['tracking', 'logging', 'achievements']);

-- 7. Verify setup
SELECT
  'Projects table created' as step,
  COUNT(*) as project_count
FROM projects
WHERE user_id = 'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf';

-- 8. Show all projects
SELECT
  id,
  project_name,
  username,
  tags,
  created_at
FROM projects
WHERE user_id = 'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf'
ORDER BY project_name;
