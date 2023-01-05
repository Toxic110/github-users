import { useAppSelector } from '@hooks';

export const userPageSelectors = {
  user: () => useAppSelector((state) => state.userPage.user),
  loading: () => useAppSelector((state) => state.userPage.loading),
};
