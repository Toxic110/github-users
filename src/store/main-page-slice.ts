import type { IUser } from '@interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: {
    loading: false,
    users: [] as IUser[],
  },
  reducers: {
    setLoader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    getUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
  },
});

export const { setLoader, getUsers } = mainPageSlice.actions;

export default mainPageSlice.reducer;
