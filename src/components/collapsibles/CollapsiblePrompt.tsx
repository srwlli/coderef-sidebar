'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ActiveCopyButton } from '@/components/buttons/ActiveCopyButton';

interface CollapsiblePromptProps {
  title: string;
  description: string;
  content: string;
  icon?: React.ReactNode;
  docs?: Array<{ label: string; url: string }>;
}

export default function CollapsiblePrompt({
  title,
  description,
  content,
  icon,
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
    <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
        <div
          className="flex flex-1 cursor-pointer items-center gap-3"
          onClick={toggleExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
          <h3 className="flex-1 font-semibold text-gray-600 dark:text-gray-400">
            {title}
          </h3>
        </div>
        <ActiveCopyButton
          content={content}
          className="!h-9 !min-w-[75px] !px-3 !py-2 !text-xs"
        />
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 px-4 pb-4 dark:border-gray-700">
          <div className="mb-4 pt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </div>

          <div className="mb-3">
            <div
              className="max-h-96 w-full cursor-pointer overflow-x-auto overflow-y-auto rounded-md border border-gray-300 bg-gray-50 p-3.5 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap text-gray-700 transition-all duration-200 select-all hover:border-blue-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gray-700"
              onClick={(e) => handleTextSelect(e.currentTarget)}
            >
              {content}
            </div>
          </div>

          {docs && docs.length > 0 && (
            <div className="mt-3 border-b border-gray-300 pb-3 dark:border-gray-600">
              {docs.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 inline-block rounded px-2 py-1 text-sm font-medium text-blue-600 no-underline transition-colors duration-200 hover:bg-blue-50 hover:underline dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  {doc.label}
                </a>
              ))}
            </div>
          )}

          {/* Add divider if no docs */}
          {(!docs || docs.length === 0) && (
            <div className="border-b border-gray-300 dark:border-gray-600"></div>
          )}
        </div>
      )}
    </div>
  );
}
