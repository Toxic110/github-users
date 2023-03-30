import { IStore } from '@interface';

export const mainPageSelectors = {
  usersSelector: (state: IStore) => state.mainPageReducer.users.items,
  filtersSelector: (state: IStore) => state.mainPageReducer.filters,
  errorSelector: (state: IStore) => state.mainPageReducer.error,
  loadingSelector: (state: IStore) => state.mainPageReducer.loading,
  totalCountSelector: (state: IStore) =>
    Math.ceil(state.mainPageReducer.users.total_count / 100000),
  isShowSidebar: (state: IStore) => state.mainPageReducer.isShowSidebar,
};
