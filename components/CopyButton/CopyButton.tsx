'use client';

import React, { useState, useEffect, useId } from 'react';
import {
  getLastCopiedButton,
  setLastCopiedButton,
  subscribeToButtonState,
} from '@/utils/buttonState';

interface CopyButtonProps {
  content?: string;
  onCopy?: () => void;
  variant?: 'normal' | 'header';
  className?: string;
}

export default function CopyButton({
  content,
  onCopy,
  variant = 'normal',
  className = '',
}: CopyButtonProps) {
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

  const baseClasses =
    variant === 'header'
      ? 'px-3 py-2 text-xs h-8 min-w-[60px] sm:min-w-[50px]'
      : 'px-5 py-3 text-sm h-12 min-w-[80px] sm:min-w-[70px]';

  const buttonClasses = `
    ${baseClasses}
    bg-gray-600 dark:bg-gray-700 text-white border-none rounded-md
    font-medium flex items-center justify-center
    transition-all duration-200 ease-in-out cursor-pointer
    hover:bg-gray-700 dark:hover:bg-gray-600 hover:-translate-y-px
    active:translate-y-0
    ${copying ? 'bg-blue-600 dark:bg-blue-500 scale-95' : ''}
    ${isLastClicked && !copying ? 'bg-green-600 dark:bg-green-500' : ''}
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
