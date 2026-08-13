// Invoice Installment 
export interface Installment {
  id: string;
  dueDate: string; // ISO string or YYYY-MM-DD
  percentage: number; // e.g., 30 for 30%
  amount: number;
  status: 'PENDING' | 'PAID';
}

// Invoice Model
export interface Invoice {
  id: string;
  clientName: string;
  totalAmount: number;
  createdAt: string;
  syncStatus: 'SYNCED' | 'PENDING_SYNC'; // For offline capability
  installments: Installment[];
}

// Network & Sync State
export interface OfflineState {
  isOnline: boolean;
  pendingSyncCount: number;
}