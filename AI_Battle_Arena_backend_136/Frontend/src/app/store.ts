// ============================================================
// APP STORE — Redux Toolkit Store Configuration
// ============================================================
import { configureStore } from '@reduxjs/toolkit';
import { battleApi } from '@features/battle/services/battleApi';
import battleReducer from '@features/battle/battleSlice';
import historyReducer from '@features/history/historySlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    // Feature slices
    battle: battleReducer,
    history: historyReducer,
    ui: uiReducer,
    // RTK Query APIs
    [battleApi.reducerPath]: battleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(battleApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
