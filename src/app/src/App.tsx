import { DevTools } from 'jotai-devtools';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { syncManager } from './services/db';

import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import 'jotai-devtools/styles.css';

function App() {
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnline = async () => {
      toast({
        title: "You're back online!",
        description: 'Processing pending analyses...',
        status: 'success',
      });
      await syncManager.processPendingQueue();
      queryClient.invalidateQueries({ queryKey: ['analysisHistory'] });
      queryClient.invalidateQueries({ queryKey: ['recentAnalyses'] });
      toast({
        title: 'Analysis complete',
        description: 'Your analysis is ready to view',
        status: 'success',
      });
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [queryClient, toast]);

  return (
    <>
      <DevTools />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
