'use client';

import React, { useState } from 'react';
import { ActiveCopyButton } from '../buttons/ActiveCopyButton';

interface InputCommandBlockProps {
  baseCommand: string;
  placeholder: string;
  defaultValue?: string;
}

export function InputCommandBlock({
  baseCommand,
  placeholder,
  defaultValue = '',
}: InputCommandBlockProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const generateCommand = () => {
    const value = inputValue.trim() || placeholder;
    return baseCommand.replace(/\{\{input\}\}/g, value);
  };

  const currentCommand = generateCommand();

  const handleTextSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className="mb-3 flex items-stretch gap-3">
      <div
        onClick={handleTextSelect}
        className="flex min-h-[48px] flex-1 cursor-pointer items-center overflow-x-auto rounded-md border border-gray-300 bg-gray-50 p-3.5 font-mono text-sm break-all text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
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
