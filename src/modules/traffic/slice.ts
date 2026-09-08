import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AnalyticsTrafficState,
  AnalyticsTrafficData,
  AnalyticsQuery,
} from "./types";

const initialState: AnalyticsTrafficState = {
  data: null,
  loading: false,
  error: null,
};

export const trafficSlice = createSlice({
  name: "traffic",
  initialState,
  reducers: {
    fetchTrafficRequest: (
      state,
      _action: PayloadAction<AnalyticsQuery | undefined>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrafficSuccess: (
      state,
      action: PayloadAction<AnalyticsTrafficData>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchTrafficFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTrafficRequest, fetchTrafficSuccess, fetchTrafficFailure } =
  trafficSlice.actions;
export default trafficSlice.reducer;
