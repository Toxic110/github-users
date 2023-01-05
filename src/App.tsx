import './assets/styles/app.scss';

import { URLS } from '@constants';
import { useAppDispatch } from '@hooks';
import { clearError, mainPageSelectors, userPageSelectors } from '@store';
import { Modal } from '@ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clientRouters } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMainPage = mainPageSelectors.errorSelector();
  const errorUserPage = userPageSelectors.errorSelector();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (errorMainPage || errorUserPage) {
      setIsOpen(true);
    }
  }, [errorMainPage, errorUserPage]);

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(clearError());
  };

  return (
    <>
      <header className="app__header">
        <span className="app__header-title" onClick={() => navigate(URLS.HOME_PAGE)}>
          Github users
        </span>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="Ошибка!"
          message="Сервис временно не доступен, попробуйте позже"
        />
      </header>
      <main>{clientRouters()}</main>
    </>
  );
}

export default App;
