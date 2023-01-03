import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsers } from '@store';
import { Table } from '@ui';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Интерфейс таблицы. */
interface IMainTable {
  /** Признак отображения на всю ширину. */
  fullWidth: boolean;
}

export interface ITableHeaders {
  name: string;
  sort?: boolean;
}

interface ISortTypes {
  up: {
    class: string;
    fn(): number;
  };
  down: {
    class: string;
    fn(): number;
  };
  default: {
    class: string;
    fn(): number;
  };
}

const tableHeaders = [
  { name: 'Аватар' },
  { name: 'Логин', sort: true },
  { name: 'Тип' },
  { name: 'Ссылка' },
];

export const MainTable: React.FC<IMainTable> = ({ fullWidth }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) =>
    Math.ceil(state.mainPage.users.total_count / 100000),
  );
  const items = useAppSelector((state) => state.mainPage.users.items);
  const [currentSort, setCurrentSort] = useState<string>('default');

  if (!items) {
    return null;
  }

  const TableContent = () => {
    const sortTypes: ISortTypes = {
      up: {
        class: 'sort-up',
        fn: () => 1,
      },
      down: {
        class: 'sort-down',
        fn: () => -1,
      },
      default: {
        class: 'sort-default',
        fn: () => 0,
      },
    };

    const onSortChange = () => {
      let nextSort = 'default';

      if (currentSort === 'down') nextSort = 'up';
      else if (currentSort === 'up') nextSort = 'default';
      else if (currentSort === 'default') nextSort = 'down';

      setCurrentSort(nextSort);
    };

    const handleSort = (elem: ITableHeaders) => {
      if (elem.sort) {
        return onSortChange();
      }
    };

    const handleRowClick = (id: number) => {
      navigate(`/user/${id}`);
    };

    return (
      <>
        <thead>
          <tr>
            {tableHeaders.map((elem) => (
              <th
                key={elem.name}
                onClick={() => handleSort(elem)}
                style={{ cursor: elem.sort ? 'pointer' : 'default' }}
              >
                <span>{elem.name}</span>
                {elem.sort && (
                  <span
                    className={`ui-table__sort-icon ui-table__sort-icon--${
                      sortTypes[currentSort as keyof ISortTypes].class
                    }`}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...items].sort(sortTypes[currentSort as keyof ISortTypes].fn).map((elem) => (
            <tr key={elem.id} onClick={() => handleRowClick(elem.id)}>
              <td>
                <img
                  className="main-table__user-avatar"
                  src={elem.avatar_url}
                  alt="avatar"
                />
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
      </>
    );
  };

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
