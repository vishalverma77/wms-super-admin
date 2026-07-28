import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/api";
import { loginRequest, loginFailure, setCredentials } from "./slice";
import { AUTH_ENDPOINTS } from "./endpoints";

function* handleLogin(
  action: ReturnType<typeof loginRequest>,
): Generator<any, any, any> {
  try {
    const { username, password } = action.payload;
    const response = yield call(
      [apiClient, apiClient.post],
      AUTH_ENDPOINTS.login,
      {
        username,
        password,
      },
    );

    const apiToken =
      response.data?.token ||
      response.data?.data?.token ||
      response.data?.data?.accessToken ||
      response.data?.accessToken;

    // Store in localStorage
    localStorage.setItem("isAuthenticated", "true");
    if (apiToken) {
      localStorage.setItem("token", apiToken);
    }

    yield put(
      setCredentials({
        username,
        token: apiToken,
      }),
    );
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    const errorMessage =
      err.response?.data?.message ||
      "Invalid username or password. Please try again.";
    yield put(loginFailure(errorMessage));
  }
}

export function* authSaga(): Generator<any, any, any> {
  yield takeLatest(loginRequest.type, handleLogin);
}
