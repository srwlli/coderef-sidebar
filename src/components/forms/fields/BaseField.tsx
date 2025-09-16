'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FieldConfig } from '@/lib/forms/formTypes';

interface BaseFieldProps {
  config: FieldConfig;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function BaseField({
  config,
  error,
  children,
  className,
}: BaseFieldProps) {
  const { label, description, required } = config;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <label
        htmlFor={config.key}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      {/* Field */}
      <div className="space-y-1">
        {children}

        {/* Error message */}
        {error && (
          <p className="text-destructive text-sm font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
