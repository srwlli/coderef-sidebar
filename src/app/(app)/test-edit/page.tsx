'use client';

import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { TestEditForm } from '@/components/forms/TestEditForm';
import { DbProject } from '@/lib/forms/formTypes';

export default function TestEditPage() {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<DbProject | null>(
    null
  );

  console.log('🔍 TestEditPage - projects:', projects);

  if (isLoading) {
    return <div className="p-8">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Error loading projects: {error.message}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="p-8">No projects found. Create a project first.</div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">🧪 Test Edit Form Page</h1>

      {!selectedProject ? (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Select a project to test edit:
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="block w-full rounded border border-gray-300 p-3 text-left hover:bg-gray-50"
              >
                <div className="font-medium">{project.project_name}</div>
                <div className="text-sm text-gray-600">
                  {project.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedProject(null)}
            className="mb-4 px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            ← Back to project list
          </button>

          <TestEditForm
            initialData={selectedProject}
            onSuccess={(data) => {
              console.log('✅ Test form success:', data);
              alert('Test update successful! Check console for details.');
            }}
            onCancel={() => setSelectedProject(null)}
          />
        </div>
      )}
    </div>
  );
}
