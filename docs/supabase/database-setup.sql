-- Projects Table Setup for Sidebar App
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

-- 6. Insert sample projects for your user
INSERT INTO projects (user_id, username, project_name, description, notes, tags) VALUES
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'My Sports Rank', 'A comprehensive sports ranking application for tracking player and team performance across multiple sports.', 'Need to implement real-time scoring updates and add social features for user interaction.', ARRAY['sports', 'ranking', 'analytics']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Draft Tracker', 'Fantasy sports draft tracking tool with real-time player availability and draft board management.', 'Consider adding mock draft functionality and integration with major fantasy platforms.', ARRAY['fantasy', 'sports', 'draft']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'MyStudyApp', 'Educational platform for creating and managing study materials with spaced repetition algorithms.', 'Focus on improving the user interface and adding collaborative study features.', ARRAY['education', 'learning', 'study']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'UDS', 'Universal Data System for managing and processing large datasets with advanced analytics capabilities.', 'Performance optimization needed for handling datasets over 1TB.', ARRAY['data', 'analytics', 'big-data']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Smart Phrase App', 'AI-powered writing assistant that suggests contextually relevant phrases and improves writing quality.', 'Integrate with more AI models and add support for multiple languages.', ARRAY['ai', 'writing', 'nlp']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Coderef Sorted', 'Code reference management system with intelligent categorization and search functionality.', 'Add version control integration and improve search algorithms.', ARRAY['development', 'reference', 'code']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Task Manager Pro', 'Advanced task management application with project tracking and team collaboration features.', 'Implement calendar integration and add time tracking capabilities.', ARRAY['productivity', 'tasks', 'collaboration']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Weather Analytics', 'Weather data analysis platform with predictive modeling and historical trend analysis.', 'Add more data sources and improve prediction accuracy for long-term forecasts.', ARRAY['weather', 'analytics', 'prediction']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Recipe Optimizer', 'AI-driven recipe optimization tool that adjusts ingredients based on dietary preferences and nutrition goals.', 'Add meal planning features and integration with grocery delivery services.', ARRAY['food', 'nutrition', 'ai']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Fitness Tracker Plus', 'Comprehensive fitness tracking application with workout planning and progress analytics.', 'Integrate with wearable devices and add social challenges feature.', ARRAY['fitness', 'health', 'tracking']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Budget Analyzer', 'Personal finance management tool with spending analysis and budget optimization recommendations.', 'Add investment tracking and automated bill payment reminders.', ARRAY['finance', 'budgeting', 'analysis']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Language Learning Hub', 'Interactive language learning platform with adaptive difficulty and cultural context integration.', 'Add voice recognition for pronunciation practice and expand language offerings.', ARRAY['education', 'language', 'learning']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Photo Gallery Manager', 'Advanced photo organization and editing suite with AI-powered tagging and facial recognition.', 'Improve cloud storage integration and add collaborative album features.', ARRAY['photography', 'organization', 'ai']),
('ff0c14c3-92f9-4cc6-ac0e-4b47885112cf', 'srwlli', 'Workflows', 'User activity tracking and workflow optimization platform that analyzes patterns and suggests improvements for enhanced productivity.', 'Focus on machine learning algorithms for pattern recognition and integration with popular productivity tools.', ARRAY['productivity', 'workflows', 'optimization']);

-- 7. Verify setup for your user
SELECT
  'Projects table created' as step,
  COUNT(*) as project_count
FROM projects
WHERE user_id = 'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf';

-- 8. Test projects table
SELECT
  id,
  project_name,
  username,
  created_at
FROM projects
WHERE user_id = 'ff0c14c3-92f9-4cc6-ac0e-4b47885112cf'
ORDER BY project_name
LIMIT 5;