'use client';

import React, { useState } from 'react';
import { ActiveCopyButton } from '../buttons/ActiveCopyButton';
import { ExternalLink } from 'lucide-react';

interface LinkInputCommandBlockProps {
  baseCommand: string;
  placeholder: string;
  linkUrl: string;
  defaultValue?: string;
}

export function LinkInputCommandBlock({
  baseCommand,
  placeholder,
  linkUrl,
  defaultValue = '',
}: LinkInputCommandBlockProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const generateCommand = () => {
    const value = inputValue.trim() || placeholder;
    return baseCommand.replace(/\{\{input\}\}/g, value);
  };

  const currentCommand = generateCommand();

  const handleLinkClick = () => {
    window.open(linkUrl, '_blank');
  };

  return (
    <div className="mb-3 flex items-stretch gap-3">
      <div
        onClick={handleLinkClick}
        className="flex min-h-[48px] flex-1 cursor-pointer items-center overflow-x-auto rounded-md border border-blue-300 bg-blue-50 p-3.5 font-mono text-sm break-all text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
      >
        <ExternalLink className="mr-2 h-4 w-4 flex-shrink-0" />
        {currentCommand}
      </div>

      <input
        type="text"
        className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 font-mono text-sm text-gray-700 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-400"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <ActiveCopyButton content={currentCommand} className="flex-shrink-0" />
    </div>
  );
}
