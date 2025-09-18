'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/cards';
import { Check, ChevronDown, Plus, FolderOpen } from 'lucide-react';
import { ProjectSelectFieldConfig } from '@/lib/forms/formTypes';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface ProjectSelectFieldProps {
  config: ProjectSelectFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
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
}: ProjectSelectFieldProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { user } = useAuth();

  // Load projects on mount
  useEffect(() => {
    if (isSupabaseConfigured() && supabase && user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!supabase || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
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
  };

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

  const selectedProject = projects.find(p => p.project_name === value);
  const allowCustom = config.allowCustom !== false;

  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor={config.key}>
          {config.label}
          {config.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {config.description && (
          <p className="text-sm text-muted-foreground mt-1">
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
          className="w-full justify-between h-10 px-3"
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
              {value || config.placeholder || 'Select a project'}
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Dropdown */}
        {isOpen && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  Loading projects...
                </div>
              ) : (
                <>
                  {/* Clear Selection */}
                  {value && (
                    <button
                      type="button"
                      onClick={() => selectProject('')}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors border-b"
                    >
                      <span className="text-muted-foreground">Clear selection</span>
                    </button>
                  )}

                  {/* Project List */}
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => selectProject(project.project_name)}
                        className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {project.project_name}
                          </div>
                          {project.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {project.description}
                            </div>
                          )}
                        </div>
                        {value === project.project_name && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-sm text-muted-foreground">
                      No projects found
                    </div>
                  )}

                  {/* Custom Project Input */}
                  {allowCustom && (
                    <>
                      <div className="border-t">
                        {showCustomInput ? (
                          <div className="p-3 space-y-2">
                            <Input
                              value={customValue}
                              onChange={(e) => setCustomValue(e.target.value)}
                              placeholder="Enter project name"
                              onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
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
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
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
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Project Info */}
      {selectedProject && (
        <div className="text-xs text-muted-foreground">
          {selectedProject.description && (
            <span>📝 {selectedProject.description}</span>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}