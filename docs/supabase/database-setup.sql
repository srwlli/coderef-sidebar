-- Complete Database Setup for Sidebar App
-- Execute this in Supabase SQL Editor

-- 1. Set display_name for the current user
UPDATE auth.users
SET raw_user_meta_data =
  COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"display_name": "srwlli"}'::jsonb
WHERE id = '0f8d1c80-baae-4375-bac7-2a28fe4251db';

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create view for projects with usernames from auth.users
CREATE OR REPLACE VIEW projects_with_username AS
SELECT
  p.id,
  p.user_id,
  p.project_name,
  p.description,
  p.notes,
  p.tags,
  p.created_at,
  p.updated_at,
  COALESCE(u.raw_user_meta_data->>'display_name', 'Anonymous') as username
FROM projects p
LEFT JOIN auth.users u ON p.user_id = u.id;

-- 4. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
CREATE POLICY "Users can only see their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- 7. Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Insert sample projects for the user
INSERT INTO projects (user_id, project_name, description, notes, tags) VALUES
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'My Sports Rank', 'A comprehensive sports ranking application for tracking player and team performance across multiple sports.', 'Need to implement real-time scoring updates and add social features for user interaction.', ARRAY['sports', 'ranking', 'analytics']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Draft Tracker', 'Fantasy sports draft tracking tool with real-time player availability and draft board management.', 'Consider adding mock draft functionality and integration with major fantasy platforms.', ARRAY['fantasy', 'sports', 'draft']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'MyStudyApp', 'Educational platform for creating and managing study materials with spaced repetition algorithms.', 'Focus on improving the user interface and adding collaborative study features.', ARRAY['education', 'learning', 'study']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'UDS', 'Universal Data System for managing and processing large datasets with advanced analytics capabilities.', 'Performance optimization needed for handling datasets over 1TB.', ARRAY['data', 'analytics', 'big-data']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Smart Phrase App', 'AI-powered writing assistant that suggests contextually relevant phrases and improves writing quality.', 'Integrate with more AI models and add support for multiple languages.', ARRAY['ai', 'writing', 'nlp']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Coderef Sorted', 'Code reference management system with intelligent categorization and search functionality.', 'Add version control integration and improve search algorithms.', ARRAY['development', 'reference', 'code']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Task Manager Pro', 'Advanced task management application with project tracking and team collaboration features.', 'Implement calendar integration and add time tracking capabilities.', ARRAY['productivity', 'tasks', 'collaboration']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Weather Analytics', 'Weather data analysis platform with predictive modeling and historical trend analysis.', 'Add more data sources and improve prediction accuracy for long-term forecasts.', ARRAY['weather', 'analytics', 'prediction']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Recipe Optimizer', 'AI-driven recipe optimization tool that adjusts ingredients based on dietary preferences and nutrition goals.', 'Add meal planning features and integration with grocery delivery services.', ARRAY['food', 'nutrition', 'ai']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Fitness Tracker Plus', 'Comprehensive fitness tracking application with workout planning and progress analytics.', 'Integrate with wearable devices and add social challenges feature.', ARRAY['fitness', 'health', 'tracking']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Budget Analyzer', 'Personal finance management tool with spending analysis and budget optimization recommendations.', 'Add investment tracking and automated bill payment reminders.', ARRAY['finance', 'budgeting', 'analysis']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Language Learning Hub', 'Interactive language learning platform with adaptive difficulty and cultural context integration.', 'Add voice recognition for pronunciation practice and expand language offerings.', ARRAY['education', 'language', 'learning']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Photo Gallery Manager', 'Advanced photo organization and editing suite with AI-powered tagging and facial recognition.', 'Improve cloud storage integration and add collaborative album features.', ARRAY['photography', 'organization', 'ai']),
('0f8d1c80-baae-4375-bac7-2a28fe4251db', 'Workflows', 'User activity tracking and workflow optimization platform that analyzes patterns and suggests improvements for enhanced productivity.', 'Focus on machine learning algorithms for pattern recognition and integration with popular productivity tools.', ARRAY['productivity', 'workflows', 'optimization']);

-- 9. Verify setup
SELECT
  'Projects table created' as step,
  COUNT(*) as project_count
FROM projects
WHERE user_id = '0f8d1c80-baae-4375-bac7-2a28fe4251db';

SELECT
  'Username setup verified' as step,
  raw_user_meta_data->>'display_name' as display_name
FROM auth.users
WHERE id = '0f8d1c80-baae-4375-bac7-2a28fe4251db';

-- 10. Test projects_with_username view
SELECT
  id,
  project_name,
  username,
  created_at
FROM projects_with_username
WHERE user_id = '0f8d1c80-baae-4375-bac7-2a28fe4251db'
ORDER BY project_name
LIMIT 5;