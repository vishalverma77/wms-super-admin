import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload, CredentialsPayload } from "./types";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  username: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.username = action.payload.username;
      state.token = action.payload.token || null;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginFailure, setCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;
