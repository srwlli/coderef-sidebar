'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { BaseField } from './BaseField';
import { TagsFieldConfig } from '../../lib/types';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface TagFieldProps {
  config: TagsFieldConfig;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function TagField({
  config,
  value = [],
  onChange,
  error,
  disabled,
  className,
}: TagFieldProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    key,
    placeholder,
    maxTags,
    allowCustomTags = true,
    suggestions = [],
  } = config;

  const availableSuggestions = suggestions.filter(
    (suggestion) =>
      !value.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    if (value.includes(trimmedTag)) return;

    if (maxTags && value.length >= maxTags) return;

    onChange([...value, trimmedTag]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (allowCustomTags) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag if backspace is pressed and input is empty
      removeTag(value[value.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setInputValue('');
    }
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setShowSuggestions(newValue.length > 0 && availableSuggestions.length > 0);
  };

  return (
    <BaseField config={config} error={error} className={className}>
      <div className="space-y-2">
        {/* Tags display */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 text-sm"
              >
                <span>{tag}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:bg-muted-foreground/20 ml-1 flex h-3 w-3 items-center justify-center rounded-full"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="h-2 w-2" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="relative">
          <Input
            id={key}
            name={key}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              setShowSuggestions(
                inputValue.length > 0 && availableSuggestions.length > 0
              )
            }
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={
              maxTags && value.length >= maxTags
                ? `Maximum ${maxTags} tags reached`
                : placeholder || 'Type and press Enter to add tags'
            }
            disabled={disabled || (maxTags ? value.length >= maxTags : false)}
            className={cn(
              error && 'border-destructive focus-visible:ring-destructive'
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${key}-error` : undefined}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && availableSuggestions.length > 0 && (
            <div className="bg-popover border-border absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border shadow-md">
              {availableSuggestions.slice(0, 8).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm"
                  onClick={() => addTag(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tag count indicator */}
        {maxTags && (
          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {value.length} / {maxTags} tags
            </span>
          </div>
        )}
      </div>
    </BaseField>
  );
}