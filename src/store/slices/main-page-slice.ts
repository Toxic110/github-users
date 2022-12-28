import type { IUser } from '@interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { applicationService } from '@services';

export const fetchUsers = createAsyncThunk(
  'users/get-users',
  async function ({ page, pageSize }: { page?: number; pageSize?: number }) {
    try {
      const response = await applicationService.getUsers(page, pageSize);

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
  },
  reducers: {
    clearError(state) {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearError } = mainPageSlice.actions;

export default mainPageSlice.reducer;
