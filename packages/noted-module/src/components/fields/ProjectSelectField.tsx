'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Check, ChevronDown, Plus, FolderOpen } from 'lucide-react';
import { ProjectSelectFieldConfig } from '../../lib/types';
import type { SupabaseClient, User } from '@supabase/supabase-js';

interface ProjectSelectFieldProps {
  config: ProjectSelectFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  // Optional props for Supabase integration
  supabaseClient?: SupabaseClient;
  user?: User;
}

interface Project {
  id: number;
  project_name: string;
  description?: string;
}

export function ProjectSelectField({
  config,
  value,
  onChange,
  error,
  disabled = false,
  supabaseClient,
  user,
}: ProjectSelectFieldProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const loadProjects = useCallback(async () => {
    if (!supabaseClient || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('id, project_name, description')
        .eq('user_id', user.id)
        .order('project_name');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }, [supabaseClient, user]);

  // Load projects on mount if Supabase is available
  useEffect(() => {
    if (supabaseClient && user) {
      loadProjects();
    }
  }, [user, supabaseClient, loadProjects]);

  const selectProject = (projectName: string) => {
    onChange(projectName);
    setIsOpen(false);
    setShowCustomInput(false);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setCustomValue('');
      setShowCustomInput(false);
      setIsOpen(false);
    }
  };

  const selectedProject = projects.find((p) => p.project_name === value);
  const allowCustom = config.allowCustom !== false;

  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor={config.key}>
          {config.label}
          {config.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {config.description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {config.description}
          </p>
        )}
      </div>

      <div className="relative">
        {/* Selected Value Display */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className="h-10 w-full justify-between px-3"
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            <span
              className={value ? 'text-foreground' : 'text-muted-foreground'}
            >
              {value || config.placeholder || 'Select a project'}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>

        {/* Dropdown */}
        {isOpen && (
          <div className="bg-popover absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border shadow-md">
            <div className="p-0">
              {loading ? (
                <div className="text-muted-foreground p-3 text-center text-sm">
                  Loading projects...
                </div>
              ) : (
                <>
                  {/* Clear Selection */}
                  {value && (
                    <button
                      type="button"
                      onClick={() => selectProject('')}
                      className="hover:bg-accent w-full border-b px-3 py-2 text-left text-sm transition-colors"
                    >
                      <span className="text-muted-foreground">
                        Clear selection
                      </span>
                    </button>
                  )}

                  {/* Project List */}
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => selectProject(project.project_name)}
                        className="hover:bg-accent flex w-full items-center justify-between px-3 py-2 text-left transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            {project.project_name}
                          </div>
                          {project.description && (
                            <div className="text-muted-foreground truncate text-xs">
                              {project.description}
                            </div>
                          )}
                        </div>
                        {value === project.project_name && (
                          <Check className="text-primary h-4 w-4" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="text-muted-foreground p-3 text-center text-sm">
                      No projects found
                    </div>
                  )}

                  {/* Custom Project Input */}
                  {allowCustom && (
                    <>
                      <div className="border-t">
                        {showCustomInput ? (
                          <div className="space-y-2 p-3">
                            <Input
                              value={customValue}
                              onChange={(e) => setCustomValue(e.target.value)}
                              placeholder="Enter project name"
                              onKeyPress={(e) =>
                                e.key === 'Enter' && handleCustomSubmit()
                              }
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={handleCustomSubmit}
                                disabled={!customValue.trim()}
                              >
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowCustomInput(false);
                                  setCustomValue('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowCustomInput(true)}
                            className="hover:bg-accent flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add custom project</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Project Info */}
      {selectedProject && (
        <div className="text-muted-foreground text-xs">
          {selectedProject.description && (
            <span>📝 {selectedProject.description}</span>
          )}
        </div>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
