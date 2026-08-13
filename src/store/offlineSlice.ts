import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfflineState } from '../types';

const initialState: OfflineState = {
  isOnline: true,
  pendingSyncCount: 0,
};

export const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    // Toggle simulated network status
    setNetworkStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    // Increment count when an invoice is created offline
    incrementPendingSync: (state) => {
      state.pendingSyncCount += 1;
    },
    // Reset count when network connection is restored
    clearPendingSync: (state) => {
      state.pendingSyncCount = 0;
    },
  },
});

export const { setNetworkStatus, incrementPendingSync, clearPendingSync } = offlineSlice.actions;
export default offlineSlice.reducer;