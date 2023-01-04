import { useAppSelector } from '@hooks';
import { IUserFull } from '@interface';

export const userPageSelectors = {
  user: () => useAppSelector((state) => state.userPage.user) as unknown as IUserFull,
  loading: () => useAppSelector((state) => state.userPage.loading),
};
