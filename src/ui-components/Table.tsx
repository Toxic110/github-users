import { useMemo } from 'react';
interface ITable {
  headers: string[];
  tableContent: React.ReactNode;
}

export const Table: React.FC<ITable> = ({ headers, tableContent }) => {
  const repeatCount = useMemo(() => headers.length, [headers]);

  return (
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
    </div>
  );
};
