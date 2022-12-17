import { Pagination } from '@ui';
import { useMemo, useState } from 'react';
interface ITable {
  headers: string[];
  tableContent: React.ReactNode;
}

export const Table: React.FC<ITable> = ({ headers, tableContent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const repeatCount = useMemo(() => headers.length, [headers]);

  return (
    <div className="ui-table__overflow">
      <div className="ui-table__wrapper">
        <table
          className="ui-table"
          data-repeat={headers.length}
          style={{ gridTemplateColumns: `repeat(${repeatCount}, 1fr)` }}
        >
          <thead>
            <tr>
              {headers.map((elem) => (
                <th key={elem}>
                  <span>{elem}</span>
                </th>
              ))}
            </tr>
          </thead>
          {tableContent}
        </table>
        <div className="ui-table-footer">
          <div className="ui-table-footer__info">
            <div className="ui-table-footer__col">
              <div className="ui-table-footer__text">Всего записей:&nbsp;</div>
              <div className="ui-table-footer__count">0</div>
            </div>
            <div className="ui-table-footer__col">
              <div className="ui-table-footer__text">Найдено:&nbsp;</div>
              <div className="ui-table-footer__count">0</div>
            </div>
          </div>
          <div className="ui-table-footer__pagination">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={100}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
