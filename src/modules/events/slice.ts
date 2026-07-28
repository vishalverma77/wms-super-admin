import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AnalyticsEventsState,
  AnalyticsEventsData,
  AnalyticsQuery,
} from "./types";

const initialState: AnalyticsEventsState = {
  data: null,
  loading: false,
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    fetchEventsRequest: (
      state,
      _action: PayloadAction<AnalyticsQuery | undefined>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action: PayloadAction<AnalyticsEventsData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } =
  eventsSlice.actions;
export default eventsSlice.reducer;
