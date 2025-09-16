'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { BaseField } from './BaseField';
import { TextFieldConfig } from '@/lib/forms/formTypes';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  config: TextFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function TextField({
  config,
  value,
  onChange,
  error,
  disabled,
  className,
}: TextFieldProps) {
  const { key, placeholder, maxLength, pattern, autoFocus, type } = config;

  const inputType =
    type === 'email' ? 'email' : type === 'url' ? 'url' : 'text';

  return (
    <BaseField config={config} error={error} className={className}>
      <Input
        id={key}
        name={key}
        type={inputType}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        autoFocus={autoFocus}
        disabled={disabled}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${key}-error` : undefined}
      />
    </BaseField>
  );
}
