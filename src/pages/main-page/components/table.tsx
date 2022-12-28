import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsers } from '@store';
import { Table } from '@ui';
import classNames from 'classnames';
import { useState } from 'react';

const tableHeaders = ['Аватар', 'Логин', 'Тип', 'Ссылка'];

const TableContent = () => {
  const items = useAppSelector((state) => state.mainPage.users.items);

  if (!items) {
    return null;
  }

  return (
    <tbody>
      {items.map((elem) => (
        <tr key={elem.id}>
          <td>
            <img className="main-table__user-avatar" src={elem.avatar_url} alt="avatar" />
          </td>
          <td>
            <span>{elem.login}</span>
          </td>
          <td>
            <span>{elem.type}</span>
          </td>
          <td>
            <a
              href={elem.html_url}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              {elem.html_url}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

/** Интерфейс таблицы. */
interface IMainTable {
  /** Признак отображения на всю ширину. */
  fullWidth: boolean;
}

export const MainTable: React.FC<IMainTable> = ({ fullWidth }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) =>
    Math.ceil(state.mainPage.users.total_count / 1000000),
  );
  const items = useAppSelector((state) => state.mainPage.users.items);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchUsers({ page }));
  };

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    dispatch(fetchUsers({ page: currentPage, pageSize }));
  };

  return (
    <div className={classNames('main-table', fullWidth && 'main-table--full-width')}>
      <Table
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={handleChangePage}
        pageSize={pageSize}
        setPageSize={handleChangePageSize}
        headers={tableHeaders}
        tableContent={<TableContent />}
        searchItems={items}
      />
    </div>
  );
};
