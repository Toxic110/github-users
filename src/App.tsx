import './assets/styles/app.scss';

import { Modal } from '@ui';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="app__header">
        <span>Github users</span>
        <div onClick={() => setIsOpen(true)}>показать портал</div>
        <Modal
          isOpen={isOpen}
          onClose={setIsOpen}
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
