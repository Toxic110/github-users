import { ISortTypes } from '@interface';
import { useState } from 'react';

/**
 * Пользовательский хук для сортировки.
 */
export const useSort = () => {
  const [currentSort, setCurrentSort] = useState<string>('default');

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

  return { sortTypes, onSortChange, currentSort };
};
