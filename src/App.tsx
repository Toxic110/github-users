import './assets/styles/app.scss';

import { useAppDispatch } from '@hooks';
import { clearError, mainPageSelectors } from '@store';
import { Modal } from '@ui';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const error = mainPageSelectors.errorSelector();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(clearError());
  };

  return (
    <>
      <header className="app__header">
        <span>Github users</span>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="Ошибка!"
          message="Сервер временно не доступен, попробуйте позже"
        />
      </header>
      <main>
        <RouterProvider router={clientRouter} />
      </main>
    </>
  );
}

export default App;
