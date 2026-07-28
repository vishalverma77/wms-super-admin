import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SubscriptionsState, RazorpaySubscription, EnterpriseContactItem } from "./types";

const initialState: SubscriptionsState = {
  subscriptions: [],
  loading: false,
  error: null,
  contactSales: [],
  contactSalesLoading: false,
  contactSalesError: null,
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    fetchSubscriptionsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSubscriptionsSuccess: (
      state,
      action: PayloadAction<RazorpaySubscription[]>,
    ) => {
      state.loading = false;
      state.subscriptions = action.payload;
    },
    fetchSubscriptionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchContactSalesRequest: (state) => {
      state.contactSalesLoading = true;
      state.contactSalesError = null;
    },
    fetchContactSalesSuccess: (
      state,
      action: PayloadAction<EnterpriseContactItem[]>,
    ) => {
      state.contactSalesLoading = false;
      state.contactSales = action.payload;
    },
    fetchContactSalesFailure: (state, action: PayloadAction<string>) => {
      state.contactSalesLoading = false;
      state.contactSalesError = action.payload;
    },
    markContactSalesContacted: (state, action: PayloadAction<string | number>) => {
      state.contactSales = state.contactSales.map((item) =>
        item.id === action.payload ? { ...item, status: "Contacted" } : item
      );
    },
  },
});

export const {
  fetchSubscriptionsRequest,
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  fetchContactSalesRequest,
  fetchContactSalesSuccess,
  fetchContactSalesFailure,
  markContactSalesContacted,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
