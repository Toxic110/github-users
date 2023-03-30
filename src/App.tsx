import './assets/styles/app.scss';

import { URLS } from '@constants';
import { useAppDispatch, useAppSelector, useResize } from '@hooks';
import {
  mainPageActions,
  mainPageSelectors,
  userPageActions,
  userPageSelectors,
} from '@store';
import { Modal } from '@ui';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clientRouters } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMainPage = useAppSelector(mainPageSelectors.errorSelector);
  const errorUserPage = useAppSelector(userPageSelectors.errorSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isShowSidebar = useAppSelector(mainPageSelectors.isShowSidebar);
  const handleArrowClick = () => dispatch(mainPageActions.setHideSidebar(!isShowSidebar));
  const { isScreenSm } = useResize();

  useEffect(() => {
    if (errorMainPage || errorUserPage) {
      setIsOpen(true);
    }
  }, [errorMainPage, errorUserPage]);

  useEffect(() => {
    if (isScreenSm) {
      dispatch(mainPageActions.setHideSidebar(true));
    } else {
      dispatch(mainPageActions.setHideSidebar(false));
    }
  }, [isScreenSm]);

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(mainPageActions.clearError());
    dispatch(userPageActions.clearError());
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
          message={errorUserPage || errorMainPage}
        />
      </header>
      <main>{clientRouters()}</main>
    </>
  );
}

export default App;
