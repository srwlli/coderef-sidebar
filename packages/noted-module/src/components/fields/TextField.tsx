'use client';

import React from 'react';
import { Input } from '../ui/input';
import { BaseField } from './BaseField';
import { TextFieldConfig } from '../../lib/types';
import { cn } from '../../lib/utils';

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
  const {
    key,
    type,
    placeholder,
    maxLength,
    minLength,
    pattern,
    autoFocus,
  } = config;

  return (
    <BaseField config={config} error={error} className={className}>
      <Input
        id={key}
        name={key}
        type={type}
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoFocus={autoFocus}
        disabled={disabled}
        className={cn(error && 'border-destructive focus-visible:ring-destructive')}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${key}-error` : undefined}
      />
    </BaseField>
  );
}