import { configureStore } from '@reduxjs/toolkit';

import { mainPageReducer } from './slices/main-page-slice';
import { userPageReducer } from './slices/user-page-slice';

export const store = configureStore({
  reducer: {
    mainPageReducer,
    userPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
