import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AnalyticsLandingState,
  AnalyticsLandingData,
  AnalyticsQuery,
} from "./types";

const initialState: AnalyticsLandingState = {
  data: null,
  loading: false,
  error: null,
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    fetchLandingRequest: (
      state,
      _action: PayloadAction<AnalyticsQuery | undefined>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchLandingSuccess: (
      state,
      action: PayloadAction<AnalyticsLandingData>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchLandingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLandingRequest, fetchLandingSuccess, fetchLandingFailure } =
  landingSlice.actions;
export default landingSlice.reducer;
