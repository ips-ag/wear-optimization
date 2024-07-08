import { RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';
import { DevTools } from 'jotai-devtools';

import 'jotai-devtools/styles.css';

function App() {
  return (
    <>
      <DevTools />
      <RouterProvider router={ROUTES} />
    </>
  );
}

export default App;
