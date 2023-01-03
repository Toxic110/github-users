import { NotFound } from '@components';
import { MainPage, UserPage } from '@pages';
import { createBrowserRouter } from 'react-router-dom';

export const clientRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/user/:id',
    element: <UserPage />,
    errorElement: <NotFound />,
  },
]);
