import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RevenueTransaction {
  id: string;
  client: string;
  email: string;
  plan: string;
  billingCycle: string;
  date: string;
  method: string;
  amount: number;
  formattedAmount: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Active' | 'Cancelled';
  rawStatus: string;
  paidCount: number;
}

export interface PlanBreakdownItem {
  planName: string;
  activeCount: number;
  totalRevenue: number;
  mrr: number;
}

export interface RevenueData {
  mrr: number;
  arr: number;
  totalRevenue: number;
  pendingRevenue: number;
  failedRevenue: number;
  activeSubscribersCount: number;
  activePayingTenantsCount: number;
  activeTrialsCount: number;
  newSignups30d: number;
  totalSubscriptionsCount: number;
  currency: string;
  planBreakdown: PlanBreakdownItem[];
  transactions: RevenueTransaction[];
}

export interface RevenueState {
  data: RevenueData | null;
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  data: null,
  loading: false,
  error: null,
};

export const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    fetchRevenueRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRevenueSuccess: (state, action: PayloadAction<RevenueData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRevenueFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRevenueRequest, fetchRevenueSuccess, fetchRevenueFailure } = revenueSlice.actions;
export default revenueSlice.reducer;
