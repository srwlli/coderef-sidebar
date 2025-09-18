'use client';

import React from 'react';
import { Textarea } from '../ui/textarea';
import { BaseField } from './BaseField';
import { TextAreaFieldConfig } from '../../lib/types';
import { cn } from '../../lib/utils';

interface TextAreaFieldProps {
  config: TextAreaFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function TextAreaField({
  config,
  value,
  onChange,
  error,
  disabled,
  className,
}: TextAreaFieldProps) {
  const { key, placeholder, maxLength, rows = 3, autoFocus } = config;

  return (
    <BaseField
      config={config}
      error={error}
      className={cn('flex h-full flex-col', className)}
    >
      <Textarea
        id={key}
        name={key}
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        autoFocus={autoFocus}
        disabled={disabled}
        className={cn(
          'flex-1 resize-none overflow-y-auto text-base leading-relaxed',
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${key}-error` : undefined}
      />
    </BaseField>
  );
}
