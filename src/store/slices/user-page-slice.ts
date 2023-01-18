import { IUserFull } from '@interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { applicationService } from '@services';

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

const userSlice = createSlice({
  name: 'userPage',
  initialState: {
    loading: false,
    user: null as unknown as IUserFull,
    error: '',
  },
  reducers: {
    clearError(state) {
      state.error = '';
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action?.error?.message as string;
    });
  },
});

export const { reducer: userPageReducer, actions: userPageActions } = userSlice;
