import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TrialUsersState, TrialUser } from "./types";

const initialState: TrialUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const trialUsersSlice = createSlice({
  name: "trialUsers",
  initialState,
  reducers: {
    fetchTrialUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrialUsersSuccess: (state, action: PayloadAction<TrialUser[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchTrialUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTrialUsersRequest,
  fetchTrialUsersSuccess,
  fetchTrialUsersFailure,
} = trialUsersSlice.actions;

export default trialUsersSlice.reducer;
