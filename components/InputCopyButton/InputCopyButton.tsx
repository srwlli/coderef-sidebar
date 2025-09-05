'use client';

import React, { useState } from 'react';
import CopyButton from '../CopyButton/CopyButton';

interface InputCopyButtonProps {
  title?: string;
  baseCommand: string;
  placeholder: string;
  defaultValue?: string;
  docs?: Array<{ label: string; url: string }>;
  inputLabel?: string;
  className?: string;
}

export default function InputCopyButton({
  title,
  baseCommand,
  placeholder,
  defaultValue = '',
  docs,
  inputLabel,
  className = '',
}: InputCopyButtonProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const generateCommand = () => {
    const value = inputValue.trim() || placeholder;
    return baseCommand.replace(/\{\{input\}\}/g, value);
  };

  // Generate command once per render to ensure CopyButton gets the latest value
  const currentCommand = generateCommand();

  const handleTextSelect = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <div className={`mb-6 ${className}`}>
      {title && (
        <div className="mb-3 flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-400">
          {title}
        </div>
      )}

      {inputLabel && (
        <div className="mb-3 flex items-center gap-2">
          <span className="min-w-[100px] text-sm text-gray-600 sm:min-w-[80px] dark:text-gray-400">
            {inputLabel}:
          </span>
          <input
            type="text"
            className="min-w-[200px] rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 font-mono text-sm text-gray-900 transition-all duration-200 focus:border-blue-600 focus:outline-none sm:min-w-[120px] dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      )}

      <div className="mb-3 flex items-stretch gap-3">
        <div
          className="flex min-h-[48px] flex-1 cursor-pointer items-center overflow-x-auto rounded-md border border-gray-300 bg-gray-50 p-3.5 font-mono text-sm break-all text-gray-900 transition-all duration-200 select-all hover:border-blue-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-blue-400 dark:hover:bg-gray-700"
          onClick={(e) => handleTextSelect(e.currentTarget)}
        >
          {currentCommand}
        </div>

        <CopyButton content={currentCommand} className="flex-shrink-0" />
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
  );
}
