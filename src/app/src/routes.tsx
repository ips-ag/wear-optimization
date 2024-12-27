import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import CaptureScreen from './pages/Capture';
import ResultPage from './pages/Detection/Result';
import FeedbackPage from './pages/Detection/Feedback';
import HistoryPage from './pages/History';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/capture',
        element: <CaptureScreen />,
      },
      {
        path: '/result',
        element: <ResultPage />,
      },
      {
        path: '/result/:id',
        element: <ResultPage />,
      },
      {
        path: '/feedback/:id',
        element: <FeedbackPage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
    ],
  },
]);
