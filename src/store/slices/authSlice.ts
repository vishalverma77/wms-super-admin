import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  username: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginRequest: (state, _action: PayloadAction<{ username: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; token?: string }>
    ) => {
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

export const { loginRequest, loginFailure, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
