import { configureStore } from '@reduxjs/toolkit';
import offlineReducer from './offlineSlice';
import invoicesReducer from './invoicesSlice';

export const store = configureStore({
  reducer: {
    offline: offlineReducer,
    invoices: invoicesReducer,
  },
});

// Infer RootState and AppDispatch types for TypeScript usage across components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;