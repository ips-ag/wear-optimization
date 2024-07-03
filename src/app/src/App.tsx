import { RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';

function App() {
  return <RouterProvider router={ROUTES} />;
}

export default App;
