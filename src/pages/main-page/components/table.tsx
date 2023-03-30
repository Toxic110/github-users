import { URLS } from '@constants';
import { useAppDispatch, useAppSelector, useSort } from '@hooks';
import { ISortTypes, IUser } from '@interface';
import { fetchUsersList, mainPageSelectors } from '@store';
import { Table } from '@ui';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Интерфейс заголовков таблицы. */
export interface ITableHeaders {
  /** Заголовок. */
  title: string;
  /** Признак сортировки. */
  sort?: boolean;
}

/** Интерфейс контента таблицы. */
interface ITableContent {
  /** Заголовки таблицы. */
  headers: ITableHeaders[];
  /** Контент таблицы. */
  items: IUser[];
}

const tableHeaders = [
  { title: 'Аватар' },
  { title: 'Логин', sort: true },
  { title: 'Тип' },
  { title: 'Ссылка' },
];

const TableContent: React.FC<ITableContent> = ({ headers, items }) => {
  const navigate = useNavigate();
  const { sortTypes, onSortChange, currentSort } = useSort();

  const handleSort = (elem: ITableHeaders) => {
    if (elem.sort) {
      return onSortChange();
    }
  };

  const handleRowClick = (id: number) => {
    navigate(URLS.USER_PAGE.replace(':id', String(id)));
  };

  return (
    <>
      <thead>
        <tr>
          {headers.map((elem) => (
            <th
              key={elem.title}
              onClick={() => handleSort(elem)}
              style={{ cursor: elem.sort ? 'pointer' : 'default' }}
            >
              <span>{elem.title}</span>
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
                className="main-table__link"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
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

export const MainTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(mainPageSelectors.totalCountSelector);
  const items = useAppSelector(mainPageSelectors.usersSelector);
  const isShowSidebar = useAppSelector(mainPageSelectors.isShowSidebar);

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
    <div className={classNames('main-table', isShowSidebar && 'main-table--full-width')}>
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
