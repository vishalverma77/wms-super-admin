import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginFailure, setCredentials } from '../slices/authSlice';
import { ENDPOINTS } from '../../api/endpoints';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { username, password } = action.payload;
    const response = yield call(axios.post, ENDPOINTS.auth.login, {
      username,
      password,
    });
    
    const apiToken = response.data?.token || response.data?.data?.token || response.data?.data?.accessToken || response.data?.accessToken;
    
    // Store in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    if (apiToken) {
      localStorage.setItem('token', apiToken);
    }
    
    yield put(setCredentials({
      username,
      token: apiToken,
    }));
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    const errorMessage = err.response?.data?.message || 'Invalid username or password. Please try again.';
    yield put(loginFailure(errorMessage));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
