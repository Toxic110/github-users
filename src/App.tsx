import './assets/styles/app.scss';

import { useAppDispatch, useAppSelector } from '@hooks';
import { clearError } from '@store';
import { Modal } from '@ui';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.mainPage.error);
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
        <div onClick={() => setIsOpen(true)}>показать портал</div>
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
