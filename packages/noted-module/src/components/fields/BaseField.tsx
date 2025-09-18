'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { FieldConfig } from '../../lib/types';

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

  const isFlexContainer = className?.includes('h-full flex');

  return (
    <div
      className={cn(
        isFlexContainer ? 'flex h-full flex-col' : 'space-y-2',
        className
      )}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={config.key}
          className={cn(
            'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            isFlexContainer && 'flex-shrink-0'
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-sm',
            isFlexContainer && 'flex-shrink-0'
          )}
        >
          {description}
        </p>
      )}

      {/* Field */}
      <div
        className={cn(isFlexContainer ? 'flex flex-1 flex-col' : 'space-y-1')}
      >
        {children}

        {/* Error message */}
        {error && (
          <p
            className={cn(
              'text-destructive text-sm font-medium',
              isFlexContainer && 'flex-shrink-0'
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
