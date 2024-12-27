import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { BsDownload } from 'react-icons/bs';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

export default function InstallButton() {
  const [installable, setInstallable] = useState(false);

  // Debug mount
  useEffect(() => {
    console.log('InstallButton mounted');
    return () => console.log('InstallButton unmounted');
  }, []);

  // Debug PWA criteria
  useEffect(() => {
    // Check PWA criteria
    console.log('Checking PWA installation criteria:');
    const hasServiceWorker = 'serviceWorker' in navigator;
    const hasManifest = !!document.querySelector('link[rel="manifest"]');
    const isInstallable = hasServiceWorker && hasManifest;

    console.log('- Service Worker:', hasServiceWorker);
    console.log('- Manifest:', hasManifest);
    console.log('- Is Installable:', isInstallable);

    const handleBeforeInstall = (e: Event) => {
      console.log('Install prompt event received');
      e.preventDefault(); // Prevent automatic prompt
      const promptEvent = e as BeforeInstallPromptEvent;
      window.deferredPrompt = promptEvent;
      setInstallable(true);
    };

    if (window.deferredPrompt) {
      console.log('Found existing prompt');
      setInstallable(true);
    }

    // Debug beforeinstallprompt
    console.log('Adding beforeinstallprompt listener');
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      window.deferredPrompt = null;
      setInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Debug installable state changes
  useEffect(() => {
    console.log('Installable state changed:', installable);
  }, [installable]);

  const handleInstall = useCallback(async () => {
    if (!window.deferredPrompt) return;

    try {
      await window.deferredPrompt.prompt();
      const result = await window.deferredPrompt.userChoice;
      console.log('Install prompt outcome:', result.outcome);
      window.deferredPrompt = null;
      setInstallable(false);
    } catch (err) {
      console.error('Installation failed:', err);
    }
  }, []);

  if (!installable) return null;

  return (
    <Button
      colorScheme="green"
      onClick={handleInstall}
      size="sm"
      leftIcon={<BsDownload />}
      variant="outline"
      rounded="md"
    >
      Install
    </Button>
  );
}
