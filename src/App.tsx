import './assets/styles/app.scss';

import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  return (
    <>
      <header className="app__header">
        <span>Github users</span>
      </header>
      <main>
        <RouterProvider router={clientRouter} />
      </main>
    </>
  );
}

export default App;
