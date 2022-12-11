import './assets/styles/app.scss';

import { Button, Input, Pagination, Select } from '@ui';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { clientRouter } from './routes';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const mokeOptions = [
    { label: 'val1', value: 1 },
    { label: 'val2', value: 2 },
  ];

  return (
    <>
      <header className="app__header">
        <span>Github users</span>
      </header>
      <main>
        <RouterProvider router={clientRouter} />
        {/* <Button variabel="primary">test</Button>
      <Input name="name" label="test" />
      <Select name="test" label="select" options={mokeOptions} />
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
