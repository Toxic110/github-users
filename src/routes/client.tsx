import { NotFound } from '@components';
import { URLS } from '@constants';
import { MainPage, UserPage } from '@pages';
import { createBrowserRouter } from 'react-router-dom';

export const clientRouter = createBrowserRouter([
  {
    path: URLS.HOME_PAGE,
    element: <MainPage />,
    errorElement: <NotFound />,
  },
  {
    path: URLS.USER_PAGE,
    element: <UserPage />,
    errorElement: <NotFound />,
  },
]);
