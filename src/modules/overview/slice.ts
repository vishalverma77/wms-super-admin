import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AnalyticsOverviewState,
  AnalyticsOverviewData,
  AnalyticsQuery,
} from "./types";

const initialState: AnalyticsOverviewState = {
  data: null,
  loading: false,
  error: null,
};

export const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    fetchOverviewRequest: (
      state,
      _action: PayloadAction<AnalyticsQuery | undefined>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchOverviewSuccess: (
      state,
      action: PayloadAction<AnalyticsOverviewData>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchOverviewFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOverviewRequest,
  fetchOverviewSuccess,
  fetchOverviewFailure,
} = overviewSlice.actions;
export default overviewSlice.reducer;
