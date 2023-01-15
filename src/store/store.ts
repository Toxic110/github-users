import { configureStore } from '@reduxjs/toolkit';
import { mainPageReducer, userPageReducer } from '@store';

export const store = configureStore({
  reducer: {
    mainPageReducer,
    userPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
