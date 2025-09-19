'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWACard() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isIOSStandalone =
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true;

    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    // Listen for the app being installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Always show install option for testing
    const timer = setTimeout(() => {
      if (!isInstalled) {
        setCanInstall(true);
        console.log('PWA install option enabled');
      }
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    console.log('Install clicked, deferredPrompt:', !!deferredPrompt);

    if (deferredPrompt) {
      try {
        // Show the install prompt
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsInstalled(true);
        } else {
          console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
        setCanInstall(false);
      } catch (error) {
        console.error('Error showing install prompt:', error);
        showManualInstallInstructions();
      }
    } else {
      // Manual instructions for browsers that don't support the prompt
      showManualInstallInstructions();
    }
  };

  const showManualInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    let instructions = '';

    if (isIOS) {
      instructions =
        'To install this app on iOS:\n1. Tap the Share button (⎍)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm';
    } else if (isAndroid) {
      instructions =
        'To install this app on Android:\n1. Tap the menu (⋮) in your browser\n2. Tap "Add to Home screen" or "Install app"\n3. Tap "Add" or "Install" to confirm';
    } else {
      instructions =
        'To install this app:\n1. Look for an install icon in your browser\'s address bar\n2. Or check your browser\'s menu for "Install" or "Add to Home screen" option';
    }

    console.log('Showing manual install instructions');
    alert(instructions);
  };

  // Return status for parent component
  return {
    isInstalled,
    canInstall,
    isLoading,
    handleInstallClick,
  };
}

export function usePWAInstall() {
  return InstallPWACard();
}
