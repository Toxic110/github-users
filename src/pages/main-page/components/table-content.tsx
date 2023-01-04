import { URLS } from '@constants';
import { useSort } from '@hooks';
import { ISortTypes, IUser } from '@interface';
import { useNavigate } from 'react-router-dom';

import { ITableHeaders } from './table';

/** Интерфейс контента таблицы. */
interface ITableContent {
  /** Заголовки таблицы. */
  headers: ITableHeaders[];
  /** Контент таблицы. */
  items: IUser[];
}

export const TableContent: React.FC<ITableContent> = ({ headers, items }) => {
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
