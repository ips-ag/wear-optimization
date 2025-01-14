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

  useEffect(() => {
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
