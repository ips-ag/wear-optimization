import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import ResultPage from './pages/Main/Result';
import TakeImage from './pages/Main/TakeImage';

export const ROUTES = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detect',
    element: <Main />,
    children: [
      {
        path: '/detect',
        element: <TakeImage />,
      },
      {
        path: '/detect/result',
        element: <ResultPage />,
      },
    ],
  },
]);
