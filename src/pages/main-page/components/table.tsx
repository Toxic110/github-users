import { useAppSelector } from '@hooks';
import { Table } from '@ui';
import classNames from 'classnames';

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
  const totalCount = useAppSelector((state) => state.mainPage.users.total_count);

  return (
    <div className={classNames('main-table', fullWidth && 'main-table--full-width')}>
      <Table
        totalCount={totalCount}
        headers={tableHeaders}
        tableContent={<TableContent />}
      />
    </div>
  );
};
