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
            <span>{elem.url}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

interface IMainTable {
  fullWidth: boolean;
}

export const MainTable: React.FC<IMainTable> = ({ fullWidth }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) => state.mainPage.users.total_count) / 100000;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchUsers(page));
  };

  return (
    <div className={classNames('main-table', fullWidth && 'main-table--full-width')}>
      <Table
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={handleChangePage}
        headers={tableHeaders}
        tableContent={<TableContent />}
      />
    </div>
  );
};
