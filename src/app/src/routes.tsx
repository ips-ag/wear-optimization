import { createBrowserRouter } from 'react-router-dom';
import Detect from './pages/Detection';
import FeedbackPage from './pages/Detection/Feedback';
import ResultPage from './pages/Detection/Result';
import HomePage from './pages/Home';

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/result',
    element: <Detect />,
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
