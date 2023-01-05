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
      throw new Error();
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
    error: false,
    filters: {},
  },
  reducers: {
    clearError(state) {
      state.error = false;
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
    builder.addCase(fetchUsersList.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearError, setFilters } = mainPageSlice.actions;

export default mainPageSlice.reducer;
