'use client';

import React, { useState } from 'react';

interface CollapsibleContainerProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export default function CollapsibleContainer({
  title,
  icon,
  description,
  children,
  defaultExpanded = false,
  className = '',
}: CollapsibleContainerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {/* Header */}
      <div
        className="cursor-pointer p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-medium text-gray-700 dark:text-gray-300">
              {icon && (
                <span className="text-gray-500 dark:text-gray-400">{icon}</span>
              )}
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <span
            className={`ml-4 text-sm text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 px-6 pb-6 dark:border-gray-700">
          <div className="pt-6">{children}</div>
        </div>
      )}
    </div>
  );
}
