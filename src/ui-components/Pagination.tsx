import { DOTS, usePagination } from '@hooks';
import { Select } from '@ui';
import classnames from 'classnames';
import { FC } from 'react';

/** Пропсы пагинации. */
interface IPagination {
  /** Функция смены страницы. */
  onPageChange(val: number): void;
  /** Общее количество. */
  totalCount: number;
  /** Колличество после которого отображается троеточие. */
  siblingCount?: number | undefined;
  /** Текущая страница. */
  currentPage: number;
  /** Имя класса. */
  className: string;
  /** Размер страницы. */
  pageSize: number;
  /** Метод измненения размера страницы. */
  onPageSizeChange(val: number | string): void;
}

const paginationCountOptions = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
];

export const Pagination: FC<IPagination> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    className,
    pageSize,
    onPageSizeChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onToStart = () => {
    onPageChange(1);
  };

  const onToEnd = () => {
    onPageChange(lastPage as number);
  };

  return (
    <div className="ui-pagination">
      <div className="ui-pagination-count__wrap">
        <span className="ui-pagination-count__label">Показать по</span>
        <div className="ui-pagination-count__select">
          <Select
            name="pagination-count"
            options={paginationCountOptions}
            extraSmall
            valueSetter={onPageSizeChange}
            defaultValue={paginationCountOptions[0]}
            menuPosition="top"
          />
        </div>
      </div>
      <ul className={classnames('ui-pagination__container', { [className]: className })}>
        <li
          className={classnames('ui-pagination__item', {
            disabled: currentPage === 1,
          })}
          onClick={onToStart}
        >
          <div className="ui-pagination__arrow ui-pagination__arrow--double ui-pagination__arrow--left"></div>
        </li>
        <li
          className={classnames('ui-pagination__item', {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="ui-pagination__arrow ui-pagination__arrow--left" />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`${pageNumber}-${index}`} className="ui-pagination__item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={classnames('ui-pagination__item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames('ui-pagination__item', {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="ui-pagination__arrow ui-pagination__arrow--right" />
        </li>
        <li
          className={classnames('ui-pagination__item', {
            disabled: currentPage === lastPage,
          })}
          onClick={onToEnd}
        >
          <div className="ui-pagination__arrow ui-pagination__arrow--double ui-pagination__arrow--right" />
        </li>
      </ul>
    </div>
  );
};
