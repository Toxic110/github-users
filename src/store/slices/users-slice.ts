import type { Filter, IStore, IUser, IUserFull } from '@interface';
import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { applicationService } from '@services';

export const fetchUsersList = createAsyncThunk(
  'users/get-users',
  async function ({
    page,
    pageSize,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    filters?: Filter;
  }) {
    try {
      const response = await applicationService.getUsersList(page, pageSize, filters);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Что-то пошло не так!');
    }
  },
);

export const fetchUser = createAsyncThunk(
  'user/get-user',
  async function ({ id }: { id: string }) {
    try {
      const response = await applicationService.getUser(id);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Что-то пошло не так!');
    }
  },
);

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: '',
  totalCount: 0,
  filters: {},
  isShowSidebar: false,
  user: null as unknown as IUserFull,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setHideSidebar(state, action) {
      state.isShowSidebar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCount = action.payload.total_count;
      usersAdapter.setAll(state, action.payload.items);
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message as string;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message as string;
    });
  },
});

export const { reducer: usersReducer, actions: usersActions } = usersSlice;

export const { selectAll: usersItemsSelector } = usersAdapter.getSelectors(
  (state: IStore) => state.usersReducer,
);

export const usersSelectors = {
  filtersSelector: (state: IStore) => state.usersReducer.filters,
  errorSelector: (state: IStore) => state.usersReducer.error,
  loadingSelector: (state: IStore) => state.usersReducer.loading,
  totalCountSelector: (state: IStore) =>
    Math.ceil(state.usersReducer.totalCount / 100000),
  isShowSidebar: (state: IStore) => state.usersReducer.isShowSidebar,
  userSelector: (state: IStore) => state.usersReducer.user,
};
