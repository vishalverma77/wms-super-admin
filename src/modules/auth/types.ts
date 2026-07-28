export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CredentialsPayload {
  username: string;
  token?: string;
}
