import { Loader } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsersList, mainPageActions, mainPageSelectors } from '@store';
import classNames from 'classnames';
import { useEffect } from 'react';

import { Sidebar } from './components/sidebar';
import { MainTable } from './components/table';

export const MainPage = () => {
  const isShowSidebar = useAppSelector(mainPageSelectors.isShowSidebar);
  const dispatch = useAppDispatch();
  const handleArrowClick = () => dispatch(mainPageActions.setHideSidebar(!isShowSidebar));
  const loading = useAppSelector(mainPageSelectors.loadingSelector);

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
