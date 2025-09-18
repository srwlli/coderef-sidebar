-- Enhanced noted table with rich content support
CREATE TABLE noted (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (LENGTH(title) <= 255 AND LENGTH(title) > 0),
  description TEXT NOT NULL CHECK (LENGTH(description) <= 2000 AND LENGTH(description) > 0),
  project_name TEXT CHECK (project_name IS NULL OR LENGTH(project_name) <= 255),
  tags TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE noted ENABLE ROW LEVEL SECURITY;

-- Policies for user data access
CREATE POLICY "Users can view own notes" ON noted
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON noted
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON noted
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON noted
  FOR DELETE USING (auth.uid() = user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_noted_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_noted_updated_at_trigger
  BEFORE UPDATE ON noted
  FOR EACH ROW
  EXECUTE FUNCTION update_noted_updated_at();

-- Indexes for performance
CREATE INDEX idx_noted_user_id ON noted(user_id);
CREATE INDEX idx_noted_created_at ON noted(created_at DESC);
CREATE INDEX idx_noted_project_name ON noted(project_name) WHERE project_name IS NOT NULL;
CREATE INDEX idx_noted_tags ON noted USING GIN(tags);

-- Storage bucket for images and screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'noted-files',
  'noted-files',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Storage policies
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'noted-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Example JSONB structure for links field:
-- [
--   {
--     "url": "https://example.com",
--     "title": "Example Site",
--     "description": "Optional description"
--   }
-- ]

-- Example JSONB structure for images/screenshots:
-- [
--   {
--     "url": "https://storage.supabase.co/...",
--     "alt": "Alt text",
--     "caption": "Optional caption",
--     "filename": "original-name.jpg",
--     "size": 1024000,
--     "type": "image/jpeg"
--   }
-- ]