'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { LinksFieldConfig, LinkObject } from '@/lib/forms/formTypes';

interface LinksFieldProps {
  config: LinksFieldConfig;
  value: LinkObject[];
  onChange: (value: LinkObject[]) => void;
  error?: string;
  disabled?: boolean;
}

export function LinksField({
  config,
  value = [],
  onChange,
  error,
  disabled = false,
}: LinksFieldProps) {
  const [newUrl, setNewUrl] = useState('');

  const addLink = () => {
    if (!newUrl.trim()) return;

    const updatedLinks = [...value, { url: newUrl, title: '', description: '' }];
    onChange(updatedLinks);
    setNewUrl('');
  };

  const removeLink = (index: number) => {
    const updatedLinks = value.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };

  const updateLink = (index: number, field: keyof LinkObject, newValue: string) => {
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
          <p className="text-sm text-muted-foreground mt-1">
            {config.description}
          </p>
        )}
      </div>

      {/* Existing Links */}
      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((link, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span className="font-medium text-sm">Link {index + 1}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLink(index)}
                  disabled={disabled}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  disabled={disabled}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link */}
      {canAddMore && (
        <div className="border border-dashed rounded-lg p-3 space-y-3">
          <div className="flex gap-2">
            <Input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              disabled={disabled}
              placeholder="https://example.com"
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
        <p className="text-sm text-muted-foreground">
          Maximum {maxLinks} links allowed
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}