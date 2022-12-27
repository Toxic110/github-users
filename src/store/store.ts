import { configureStore } from '@reduxjs/toolkit';

import mainPage from './slices/main-page-slice';

export const store = configureStore({
  reducer: {
    mainPage,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
