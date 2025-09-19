'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Globe,
  Monitor,
  Database,
} from 'lucide-react';
import { LinksFieldConfig, LinkObject } from '@/lib/forms/formTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LinksFieldProps {
  config: LinksFieldConfig;
  value: LinkObject[];
  onChange: (value: LinkObject[]) => void;
  error?: string;
  disabled?: boolean;
}

const linkTypes = [
  {
    value: 'git',
    label: 'Git Repository',
    icon: Github,
    placeholder: 'https://github.com/username/repo',
  },
  {
    value: 'demo',
    label: 'Live Demo',
    icon: Globe,
    placeholder: 'https://myproject.vercel.app',
  },
  {
    value: 'local',
    label: 'Local Development',
    icon: Monitor,
    placeholder: 'http://localhost:3000',
  },
  {
    value: 'database',
    label: 'Database/Supabase',
    icon: Database,
    placeholder: 'https://your-project.supabase.co',
  },
  {
    value: 'custom',
    label: 'Custom Link',
    icon: ExternalLink,
    placeholder: 'https://example.com',
  },
];

export function LinksField({
  config,
  value = [],
  onChange,
  error,
  disabled = false,
}: LinksFieldProps) {
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState('git');

  const addLink = () => {
    if (!newUrl.trim()) return;

    const selectedType = linkTypes.find((type) => type.value === newType);
    const updatedLinks = [
      ...value,
      {
        url: newUrl,
        title: selectedType?.label || 'Custom Link',
        description: '',
      },
    ];
    onChange(updatedLinks);
    setNewUrl('');
    setNewType('git');
  };

  const removeLink = (index: number) => {
    const updatedLinks = value.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };

  const updateLink = (
    index: number,
    field: keyof LinkObject,
    newValue: string
  ) => {
    const updatedLinks = value.map((link, i) =>
      i === index ? { ...link, [field]: newValue } : link
    );
    onChange(updatedLinks);
  };

  const maxLinks = config.maxLinks || 10;
  const canAddMore = value.length < maxLinks;

  return (
    <div className="space-y-4">
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

      {/* Existing Links */}
      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((link, index) => {
            const linkType =
              linkTypes.find(
                (type) =>
                  link.title?.includes(type.label) ||
                  (type.value === 'git' &&
                    (link.url.includes('github') ||
                      link.url.includes('gitlab'))) ||
                  (type.value === 'database' &&
                    link.url.includes('supabase')) ||
                  (type.value === 'local' && link.url.includes('localhost'))
              ) || linkTypes[4]; // default to custom

            const IconComponent = linkType.icon;

            return (
              <div key={index} className="space-y-3 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {link.title || `Link ${index + 1}`}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                    disabled={disabled}
                    className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {config.allowTitleEdit && (
                    <Input
                      type="text"
                      value={link.title || ''}
                      onChange={(e) =>
                        updateLink(index, 'title', e.target.value)
                      }
                      disabled={disabled}
                      placeholder="Link title"
                    />
                  )}
                  <Input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    disabled={disabled}
                    placeholder="https://example.com"
                  />
                  {config.allowDescriptionEdit && (
                    <Input
                      type="text"
                      value={link.description || ''}
                      onChange={(e) =>
                        updateLink(index, 'description', e.target.value)
                      }
                      disabled={disabled}
                      placeholder="Optional description"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Link */}
      {canAddMore && (
        <div className="space-y-3 rounded-lg border border-dashed p-3">
          <div className="mb-2 flex items-center gap-2">
            <Select
              value={newType}
              onValueChange={setNewType}
              disabled={disabled}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {linkTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              disabled={disabled}
              placeholder={
                linkTypes.find((type) => type.value === newType)?.placeholder ||
                'https://example.com'
              }
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLink}
              disabled={disabled || !newUrl.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {!canAddMore && (
        <p className="text-muted-foreground text-sm">
          Maximum {maxLinks} links allowed
        </p>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
