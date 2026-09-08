import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchRevenueRequest,
  fetchRevenueSuccess,
  fetchRevenueFailure,
} from "../slices/revenueSlice";
import { ENDPOINTS } from "../../api/endpoints";
import type { RootState } from "../index";

const getToken = (state: RootState) => state.auth.token;

function* handleFetchRevenue(): Generator<any, any, any> {
  try {
    const token: string | null = yield select(getToken);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(axios.get, ENDPOINTS.revenue, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    yield put(fetchRevenueSuccess(response.data));
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    const errorMessage =
      err.response?.data?.message || "Failed to fetch revenue analytics.";
    yield put(fetchRevenueFailure(errorMessage));
  }
}

export function* revenueSaga(): Generator<any, any, any> {
  yield takeLatest(fetchRevenueRequest.type, handleFetchRevenue);
}
