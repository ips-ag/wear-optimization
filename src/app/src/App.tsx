import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './laytouts/MainLayout';
import Home from './pages/Home';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/detect',
    element: <Main />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
