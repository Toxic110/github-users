import { IStore } from '@interface';

export const userPageSelectors = {
  userSelector: (state: IStore) => state.userPageReducer.user,
  loadingSelector: (state: IStore) => state.userPageReducer.loading,
  errorSelector: (state: IStore) => state.userPageReducer.error,
};
