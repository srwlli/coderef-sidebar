// Project-related types extracted from forms module
// Used by project components for viewing and managing projects

// Link object type for project.links array
export interface ProjectLink {
  url: string;
  title?: string;
  description?: string;
}

// Project data structure (base fields)
export interface ProjectData extends Record<string, unknown> {
  project_name: string;
  description?: string;
  notes?: string;
  tags: string[];
  links: ProjectLink[];
}

// Database project type with all fields from Supabase
export interface DbProject extends ProjectData {
  id: number;
  user_id: string;
  username?: string;
  created_at: string;
  updated_at: string;
}
