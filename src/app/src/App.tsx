import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { DevTools } from 'jotai-devtools';

import 'jotai-devtools/styles.css';

function App() {
  return (
    <>
      <DevTools />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
