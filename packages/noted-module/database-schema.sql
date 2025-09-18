-- Noted table schema for Supabase
-- Required database setup for the noted-form-module package

-- Create the noted table
CREATE TABLE IF NOT EXISTS noted (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_name VARCHAR(255),
  tags JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_noted_user_id ON noted(user_id);
CREATE INDEX IF NOT EXISTS idx_noted_created_at ON noted(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_noted_project_name ON noted(project_name) WHERE project_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_noted_tags ON noted USING GIN(tags) WHERE tags != '[]'::jsonb;

-- Enable Row Level Security
ALTER TABLE noted ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own notes
CREATE POLICY "Users can view their own notes" ON noted
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" ON noted
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON noted
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON noted
  FOR DELETE USING (auth.uid() = user_id);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_noted_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_noted_updated_at
  BEFORE UPDATE ON noted
  FOR EACH ROW
  EXECUTE FUNCTION update_noted_updated_at();

-- Optional: Storage bucket for file uploads (images/screenshots)
-- Uncomment if you plan to use file uploads instead of URLs
/*
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'noted-files',
  'noted-files',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for file uploads
CREATE POLICY "Users can upload their own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
*/

-- JSONB Data Structure Examples:

-- tags: ["bug", "feature", "urgent", "documentation"]

-- links: [
--   {
--     "url": "https://example.com",
--     "title": "",
--     "description": ""
--   }
-- ]

-- images/screenshots: [
--   {
--     "url": "https://example.com/image.jpg",
--     "alt": "Description",
--     "caption": "Optional caption",
--     "filename": "original-name.jpg",
--     "size": 1024000,
--     "type": "image/jpeg"
--   }
-- ]