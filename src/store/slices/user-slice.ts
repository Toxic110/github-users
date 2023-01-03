import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { applicationService } from '@services';

export const fetchUser = createAsyncThunk(
  'users/get-users',
  async function ({ id }: { id: string }) {
    try {
      const response = await applicationService.getUser(id);

      return response;
    } catch (error) {
      throw new Error();
    }
  },
);

const userSlice = createSlice({
  name: 'userPage',
  initialState: {
    loading: false,
    user: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
