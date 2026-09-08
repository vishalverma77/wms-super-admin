import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RevenueState, RevenueData } from "./types";

const initialState: RevenueState = {
  data: null,
  loading: false,
  error: null,
};

export const revenueSlice = createSlice({
  name: "revenue",
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

export const {
  fetchRevenueRequest,
  fetchRevenueSuccess,
  fetchRevenueFailure,
} = revenueSlice.actions;

export default revenueSlice.reducer;
