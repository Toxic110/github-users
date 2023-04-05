import { Loader } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsersList, usersActions, usersSelectors } from '@store';
import classNames from 'classnames';
import { useEffect } from 'react';

import { Sidebar } from './components/sidebar';
import { MainTable } from './components/table';

export const MainPage = () => {
  const isShowSidebar = useAppSelector(usersSelectors.isShowSidebar);
  const dispatch = useAppDispatch();
  const handleArrowClick = () => dispatch(usersActions.setHideSidebar(!isShowSidebar));
  const loading = useAppSelector(usersSelectors.loadingSelector);

  useEffect(() => {
    dispatch(fetchUsersList({}));
  }, []);

  return (
    <div className="main-page">
      <div
        className={classNames(
          'main-page__open-sidebar',
          isShowSidebar && 'main-page__open-sidebar--show',
        )}
        onClick={handleArrowClick}
      />
      <Sidebar />
      <MainTable />
      {loading && <Loader />}
    </div>
  );
};
