import './assets/styles/app.scss';

import { URLS } from '@constants';
import { useAppDispatch, useAppSelector, useResize } from '@hooks';
import { usersActions, usersSelectors } from '@store';
import { Modal } from '@ui';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clientRouters } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(usersSelectors.errorSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isShowSidebar = useAppSelector(usersSelectors.isShowSidebar);
  const handleArrowClick = () => dispatch(usersActions.setHideSidebar(!isShowSidebar));
  const { isScreenSm } = useResize();

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (isScreenSm) {
      dispatch(usersActions.setHideSidebar(true));
    } else {
      dispatch(usersActions.setHideSidebar(false));
    }
  }, [isScreenSm]);

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(usersActions.clearError());
  };

  return (
    <>
      <header className="app__header">
        {!window.location.href.includes('user') && (
          <div
            className={classNames(
              'app__header-sidebar-btn',
              isShowSidebar && 'app__header-sidebar-btn--open',
            )}
            onClick={handleArrowClick}
          ></div>
        )}
        <span className="app__header-title" onClick={() => navigate(URLS.HOME_PAGE)}>
          Github users
        </span>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="Ошибка!"
          message={error}
        />
      </header>
      <main>{clientRouters()}</main>
    </>
  );
}

export default App;
