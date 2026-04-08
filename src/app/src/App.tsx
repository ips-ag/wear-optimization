import { RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';
import { DevTools } from 'jotai-devtools';
import { Toaster } from '@/components/ui/toaster';

import 'jotai-devtools/styles.css';

function App() {
  return (
    <>
      <DevTools />
      <Toaster />
      <RouterProvider router={ROUTES} />
    </>
  );
}

export default App;
