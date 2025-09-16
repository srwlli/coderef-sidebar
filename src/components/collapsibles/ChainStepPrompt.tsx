'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ActiveCopyButton } from '@/components/buttons/ActiveCopyButton';

interface ChainStepPromptProps {
  title: string;
  description: string;
  content: string;
  stepNumber?: number;
  defaultExpanded?: boolean;
}

export function ChainStepPrompt({
  title,
  description,
  content,
  stepNumber,
  defaultExpanded = false,
}: ChainStepPromptProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleTextSelect = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <div className="border-border mb-4 rounded-lg border">
      {/* Header */}
      <div className="hover:bg-accent flex items-center justify-between p-3 transition-colors">
        <div
          className="flex flex-1 cursor-pointer items-center gap-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="text-foreground h-4 w-4" />
          ) : (
            <ChevronRight className="text-foreground h-4 w-4" />
          )}

          {stepNumber && (
            <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
              {stepNumber}
            </span>
          )}

          <h4 className="text-foreground flex-1 font-medium">{title}</h4>
        </div>

        <ActiveCopyButton
          content={content}
          className="!h-8 !min-w-[70px] !px-2 !py-1 !text-xs"
        />
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="bg-background border-t px-3 pb-3">
          <div className="text-muted-foreground mb-3 pt-4 text-sm leading-relaxed">
            {description}
          </div>

          <div className="mb-3">
            <div
              className="border-border bg-muted text-foreground hover:border-primary hover:bg-accent max-h-80 w-full cursor-pointer overflow-x-auto overflow-y-auto rounded-md border p-3 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap transition-all duration-200 select-all"
              onClick={(e) => handleTextSelect(e.currentTarget)}
            >
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
