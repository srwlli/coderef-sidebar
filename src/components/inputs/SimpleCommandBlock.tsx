'use client';

import React from 'react';
import { ActiveCopyButton } from '../buttons/ActiveCopyButton';

interface SimpleCommandBlockProps {
  command: string;
}

export function SimpleCommandBlock({ command }: SimpleCommandBlockProps) {
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
        {command}
      </div>
      <ActiveCopyButton content={command} className="flex-shrink-0" />
    </div>
  );
}
