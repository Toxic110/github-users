import { useAppSelector } from '@hooks';

export const userPageSelectors = {
  userSelector: () => useAppSelector((state) => state.userPage.user),
  loadingSelector: () => useAppSelector((state) => state.userPage.loading),
  errorSelector: () => useAppSelector((state) => state.userPage.error),
};
