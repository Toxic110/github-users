import { useAppSelector } from '@hooks';

export const mainPageSelectors = {
  usersSelector: () => useAppSelector((state) => state.mainPage.users.items),
  filtersSelector: () => useAppSelector((state) => state.mainPage.filters),
  errorSelector: () => useAppSelector((state) => state.mainPage.error),
  loadingSelector: () => useAppSelector((state) => state.mainPage.loading),
  totalCountSelector: () =>
    useAppSelector((state) => Math.ceil(state.mainPage.users.total_count / 100000)),
};
