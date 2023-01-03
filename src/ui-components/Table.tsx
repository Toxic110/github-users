import type { IUser } from '@interface';
import { Pagination } from '@ui';
import { useMemo } from 'react';
import { ITableHeaders } from 'src/pages/main-page/components/table';

/** Интерфейс таблицы. */
interface ITable {
  // /** Заголовки таблицы. */
  headers: ITableHeaders[];
  /** Контент таблицы. */
  tableContent: React.ReactNode;
  /** Общее колличество. */
  totalCount: number;
  /** Текущая страница. */
  currentPage: number;
  /** Метод смены текущей страницы. */
  setCurrentPage(page: number): void;
  /** Размер страницы. */
  pageSize: number;
  /** Метод изменения размера страницы. */
  setPageSize(val: number): void;
  /** Найденные пользователи. */
  searchItems: IUser[];
}

export const Table: React.FC<ITable> = ({
  headers,
  tableContent,
  totalCount,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  searchItems,
}) => {
  const repeatCount = useMemo(() => headers.length, [headers]);
  const repeatRows = useMemo(
    () => (searchItems.length > pageSize ? pageSize : searchItems.length),
    [pageSize, searchItems],
  );

  return (
    <div className="ui-table__overflow">
      <div className="ui-table__wrapper">
        <table
          className="ui-table"
          data-repeat={headers.length}
          style={{
            gridTemplateColumns: `repeat(${repeatCount}, 1fr)`,
            gridTemplateRows: `60px repeat(${repeatRows}, 120px)`,
          }}
        >
          {tableContent}
        </table>
        <div className="ui-table-footer">
          <div className="ui-table-footer__info">
            <div className="ui-table-footer__col">
              <div className="ui-table-footer__text">Всего записей:&nbsp;</div>
              <div className="ui-table-footer__count">{totalCount}</div>
            </div>
            <div className="ui-table-footer__col">
              <div className="ui-table-footer__text">Найдено:&nbsp;</div>
              <div className="ui-table-footer__count">{searchItems.length}</div>
            </div>
          </div>
          <div className="ui-table-footer__pagination">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalCount}
              onPageChange={(page: number) => setCurrentPage(page)}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
