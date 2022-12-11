import './assets/styles/app.scss';

import { Button, Input, Pagination, Select } from '@ui';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const mokeOptions = [
    { label: 'val1', value: 1 },
    { label: 'val2', value: 2 },
  ];

  return (
    <div className="App">
      <header className="app__header">
        <span>Github users</span>
      </header>
      <Button variabel="primary">test</Button>
      <Input name="name" label="test" />
      <Select name="test" label="select" options={mokeOptions} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={100}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;
