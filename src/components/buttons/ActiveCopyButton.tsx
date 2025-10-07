'use client';

import React, { useState, useId } from 'react';
import { useAppStore } from '@/stores/use-app-store';

interface ActiveCopyButtonProps {
  content?: string;
  onCopy?: () => void;
  className?: string;
}

export function ActiveCopyButton({
  content,
  onCopy,
  className = '',
}: ActiveCopyButtonProps) {
  const [copying, setCopying] = useState(false);
  const buttonId = useId();

  // Use Zustand store for global "last copied" tracking
  const { lastCopiedId, setLastCopied } = useAppStore((state) => ({
    lastCopiedId: state.lastCopiedId,
    setLastCopied: state.setLastCopied,
  }));

  const isLastClicked = lastCopiedId === buttonId;

  const handleCopy = async () => {
    if (!content) return;

    setCopying(true);

    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for environments without clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopying(false);

      // Set this button as the last clicked one globally
      setLastCopied(buttonId);

      onCopy?.();
    } catch (error) {
      setCopying(false);
      console.error('Failed to copy text:', error);
    }
  };

  const buttonClasses = `
    px-5 py-3 text-sm h-12 w-[90px]
    bg-gray-600 dark:bg-gray-700 text-white border-none rounded-md
    font-medium flex items-center justify-center
    transition-colors duration-1000 ease-out cursor-pointer
    hover:bg-gray-700 dark:hover:bg-gray-600
    ${isLastClicked ? 'bg-green-600 dark:bg-green-500' : ''}
    ${className}
  `.trim();

  const getButtonText = () => {
    if (copying) return 'Copying...';
    if (isLastClicked && !copying) return 'Copied!';
    return 'Copy';
  };

  return (
    <button onClick={handleCopy} className={buttonClasses} disabled={copying}>
      {getButtonText()}
    </button>
  );
}
