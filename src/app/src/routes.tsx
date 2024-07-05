import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import TakeImagePage from './pages/TakeImage';
import FeedbackPage from './pages/Main/Feedback';
import ResultPage from './pages/Main/Result';

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES = createBrowserRouter([
  {
    path: '/',
    element: <TakeImagePage />,
  },
  {
    path: '/detect',
    element: <Home />,
  },
  {
    path: '/result',
    element: <Main />,
    children: [
      {
        path: '/result',
        element: <ResultPage />,
      },
      {
        path: '/result/feedback',
        element: <FeedbackPage />,
      },
    ],
  },
]);
