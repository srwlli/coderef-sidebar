'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ActiveCopyButton } from '@/components/buttons/ActiveCopyButton';

interface CollapsiblePromptProps {
  title: string;
  description: string;
  content: string;
  docs?: Array<{ label: string; url: string }>;
}

export default function CollapsiblePrompt({
  title,
  description,
  content,
  docs,
}: CollapsiblePromptProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTextSelect = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <div className="border-border mb-6 rounded-lg border-2">
      {/* Header */}
      <div
        className="hover:bg-accent flex cursor-pointer items-center justify-between p-4 transition-colors"
        onClick={toggleExpanded}
      >
        <div className="flex flex-1 items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="text-foreground h-5 w-5" />
          ) : (
            <ChevronRight className="text-foreground h-5 w-5" />
          )}
          <h3 className="text-foreground flex-1 font-semibold">{title}</h3>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ActiveCopyButton
            content={content}
            className="!h-9 !min-w-[75px] !px-3 !py-2 !text-xs"
          />
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="bg-background border-t px-4 pb-4">
          <div className="text-muted-foreground mb-4 pt-6 text-sm leading-relaxed">
            {description}
          </div>

          <div className="mb-3">
            <div
              className="border-border bg-muted text-foreground hover:border-primary hover:bg-accent max-h-96 w-full cursor-pointer overflow-x-auto overflow-y-auto rounded-md border p-3.5 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap transition-all duration-200 select-all"
              onClick={(e) => handleTextSelect(e.currentTarget)}
            >
              {content}
            </div>
          </div>

          {docs && docs.length > 0 && (
            <div className="border-border mt-3 border-b pb-3">
              {docs.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-accent mr-4 inline-block rounded px-2 py-1 text-sm font-medium no-underline transition-colors duration-200 hover:underline"
                >
                  {doc.label}
                </a>
              ))}
            </div>
          )}

          {/* Add divider if no docs */}
          {(!docs || docs.length === 0) && (
            <div className="border-border border-b"></div>
          )}
        </div>
      )}
    </div>
  );
}
