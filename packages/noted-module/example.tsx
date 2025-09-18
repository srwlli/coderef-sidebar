// Example usage of the noted-form-module
// This file demonstrates how to use the package in any React/Next.js app

import React from 'react';
import { NotedForm } from './src';
import { createClient } from '@supabase/supabase-js';

// Initialize your Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Example toast function (you can use any toast library)
const toast = ({ title, description, type }: {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info';
}) => {
  console.log(`${type.toUpperCase()}: ${title} - ${description}`);
  // Replace with your actual toast implementation
  // e.g., react-hot-toast, sonner, etc.
};

// Example usage in a React component
export function ExampleNotedPage() {
  // Your user object from authentication
  const user = {
    id: 'user-id-here',
    // ... other user properties
  };

  return (
    <div className="container mx-auto p-8">
      {/* Your page wrapper */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Note</h1>

        {/* The NotedForm component */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <NotedForm
            supabaseClient={supabase}
            user={user}
            toast={toast}
            onSuccess={(data) => {
              console.log('Note saved successfully:', data);
              // Handle success (redirect, refresh, etc.)
            }}
            onCancel={() => {
              console.log('Form cancelled');
              // Handle cancellation
            }}
            mode="create"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// For editing existing notes
export function ExampleEditNotePage() {
  const user = { id: 'user-id-here' };

  // Your existing note data
  const existingNote = {
    id: 1,
    user_id: 'user-id-here',
    title: 'Existing Note',
    description: 'This is an existing note description',
    project_name: 'My Project',
    tags: ['tag1', 'tag2'],
    links: [{ url: 'https://example.com', title: '', description: '' }],
    images: [],
    screenshots: [],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Note</h1>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <NotedForm
            supabaseClient={supabase}
            user={user}
            toast={toast}
            mode="edit"
            initialData={existingNote}
            onSuccess={(data) => {
              console.log('Note updated successfully:', data);
            }}
            onCancel={() => {
              console.log('Edit cancelled');
              // Navigate back or close modal
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleNotedPage;