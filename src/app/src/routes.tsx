import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import ResultPage from './pages/Main/Result';
import TakeImagePage from './pages/TakeImage';
import FeedbackPage from './pages/Main/Feedback';

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
