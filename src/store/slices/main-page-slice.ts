import type { Filter, IUser } from '@interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
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

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: {
    loading: false,
    users: {
      items: [] as IUser[],
      total_count: 0,
    },
    error: '',
    filters: {},
  },
  reducers: {
    clearError(state) {
      state.error = '';
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message as string;
    });
  },
});

export const { reducer: mainPageReducer, actions: mainPageActions } = mainPageSlice;
