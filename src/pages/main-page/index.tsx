import { Loader } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsers } from '@store';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { Sidebar } from './components/sidebar';
import { MainTable } from './components/table';

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleArrowClick = () => setIsOpen((prev) => !prev);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.mainPage.loading);

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, []);

  return (
    <div className="main-page">
      <div
        className={classNames(
          'main-page__open-sidebar',
          isOpen && 'main-page__open-sidebar--show',
        )}
        onClick={handleArrowClick}
      />
      <Sidebar hide={isOpen} onClose={setIsOpen} />
      <MainTable fullWidth={isOpen} />
      {loading && <Loader />}
    </div>
  );
};
