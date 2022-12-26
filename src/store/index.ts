import { configureStore } from '@reduxjs/toolkit';

import mainPage from './main-page-slice';

export const store = configureStore({
  reducer: {
    mainPage,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
