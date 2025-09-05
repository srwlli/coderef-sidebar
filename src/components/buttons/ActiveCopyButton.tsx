'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  getLastCopiedButton,
  setLastCopiedButton,
  subscribeToButtonState,
} from '@/utils/buttonState';

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
  const [isLastClicked, setIsLastClicked] = useState(false);
  const buttonId = useId();

  // Subscribe to global button state changes
  useEffect(() => {
    const updateLastClicked = () => {
      setIsLastClicked(getLastCopiedButton() === buttonId);
    };

    // Check initial state
    updateLastClicked();

    // Subscribe to changes
    const unsubscribe = subscribeToButtonState(updateLastClicked);

    return unsubscribe;
  }, [buttonId]);

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
      setLastCopiedButton(buttonId);

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
