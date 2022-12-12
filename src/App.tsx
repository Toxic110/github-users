import './assets/styles/app.scss';

import { Pagination } from '@ui';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <header className="app__header">
        <span>Github users</span>
      </header>
      <main>
        <RouterProvider router={clientRouter} />
        {/* 
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={100}
          onPageChange={(page: number) => setCurrentPage(page)}
        /> */}
      </main>
    </>
  );
}

export default App;
