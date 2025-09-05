'use client';

import React, { useState } from 'react';
import CopyButton from '../CopyButton/CopyButton';

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
    <div className="mb-6">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-4 transition-all duration-200 hover:border-blue-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:bg-gray-700">
        <div
          className="flex flex-1 cursor-pointer items-center gap-2"
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
            <span
              className={`text-sm text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            >
              ▶
            </span>
            {title}
          </div>
        </div>
        <CopyButton content={content} variant="header" />
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mb-3">
          <div className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </div>

          <div className="mb-3 flex items-stretch gap-3">
            <div
              className="max-h-96 flex-1 cursor-pointer overflow-x-auto overflow-y-auto rounded-md border border-gray-300 bg-gray-50 p-3.5 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap text-gray-700 transition-all duration-200 select-all hover:border-blue-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gray-700"
              onClick={(e) => handleTextSelect(e.currentTarget)}
            >
              {content}
            </div>

            <CopyButton
              content={content}
              className="flex-shrink-0 self-start"
            />
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
