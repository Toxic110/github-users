import { configureStore } from '@reduxjs/toolkit';

import mainPage from './slices/main-page-slice';
import userPage from './slices/user-slice';

export const store = configureStore({
  reducer: {
    mainPage,
    userPage,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
