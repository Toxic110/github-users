import { ErrorComponent, NotFound } from '@components';
import { URLS } from '@constants';
import { MainPage, UserPage } from '@pages';
import { Route, Routes } from 'react-router-dom';

export const clientRouters = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path={URLS.HOME_PAGE}
        element={<MainPage />}
        errorElement={<ErrorComponent />}
      />
      <Route
        path={URLS.USER_PAGE}
        element={<UserPage />}
        errorElement={<ErrorComponent />}
      />
    </Routes>
  );
};
