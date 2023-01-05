import { useAppDispatch } from '@hooks';
import { fetchUsersList, mainPageSelectors } from '@store';
import { Table } from '@ui';
import classNames from 'classnames';
import { useState } from 'react';

import { TableContent } from './table-content';

/** Интерфейс таблицы. */
interface IMainTable {
  /** Признак отображения на всю ширину. */
  fullWidth: boolean;
}

/** Интерфейс заголовков таблицы. */
export interface ITableHeaders {
  /** Заголовок. */
  title: string;
  /** Признак сортировки. */
  sort?: boolean;
}

const tableHeaders = [
  { title: 'Аватар' },
  { title: 'Логин', sort: true },
  { title: 'Тип' },
  { title: 'Ссылка' },
];

export const MainTable: React.FC<IMainTable> = ({ fullWidth }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useAppDispatch();
  const totalCount = mainPageSelectors.totalCountSelector();
  const items = mainPageSelectors.usersSelector();

  if (!items) {
    return null;
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchUsersList({ page }));
  };

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    dispatch(fetchUsersList({ page: currentPage, pageSize }));
  };

  return (
    <div className={classNames('main-table', fullWidth && 'main-table--full-width')}>
      {items.length === 0 ? (
        <div className="main-table__not-found">Пользователи не нашлись</div>
      ) : (
        <Table
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={handleChangePage}
          pageSize={pageSize}
          setPageSize={handleChangePageSize}
          headers={tableHeaders}
          tableContent={<TableContent headers={tableHeaders} items={items} />}
          searchItems={items}
        />
      )}
    </div>
  );
};
