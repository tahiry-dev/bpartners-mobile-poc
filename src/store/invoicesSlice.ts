import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../types';

interface InvoicesState {
  list: Invoice[];
}

// Initial mock data to display a populated cashflow chart immediately
const initialState: InvoicesState = {
  list: [
    {
      id: 'inv-001',
      clientName: 'Dupuis SARL',
      totalAmount: 3000,
      createdAt: new Date().toISOString(),
      syncStatus: 'SYNCED',
      installments: [
        { id: 'inst-1', dueDate: '2026-08-15', percentage: 30, amount: 900, status: 'PAID' },
        { id: 'inst-2', dueDate: '2026-09-15', percentage: 70, amount: 2100, status: 'PENDING' },
      ],
    },
  ],
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    // Add a new invoice (handles both online and offline creation)
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.list.unshift(action.payload);
    },
    // Sync all pending offline invoices when connection comes back
    syncPendingInvoices: (state) => {
      state.list.forEach((invoice) => {
        if (invoice.syncStatus === 'PENDING_SYNC') {
          invoice.syncStatus = 'SYNCED';
        }
      });
    },
  },
});

export const { addInvoice, syncPendingInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;