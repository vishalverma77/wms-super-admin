import { call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/api";
import {
  fetchRevenueRequest,
  fetchRevenueSuccess,
  fetchRevenueFailure,
} from "./slice";
import { REVENUE_ENDPOINTS } from "./endpoints";
import type { RootState } from "../../store";

const getToken = (state: RootState) => state.auth.token;

function* handleFetchRevenue(): Generator<any, any, any> {
  try {
    const token: string | null = yield select(getToken);
    const authHeaderToken = token || localStorage.getItem("token");

    const response = (yield call(
      [apiClient, apiClient.get],
      REVENUE_ENDPOINTS.stats,
      {
        headers: {
          ...(authHeaderToken ? { Authorization: `Bearer ${authHeaderToken}` } : {}),
        },
      },
    )) as { data: any };

    yield put(fetchRevenueSuccess(response.data));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      err.response?.data?.message || "Failed to fetch revenue analytics.";
    yield put(fetchRevenueFailure(errorMessage));
  }
}

export function* revenueSaga(): Generator<any, any, any> {
  yield takeLatest(fetchRevenueRequest.type, handleFetchRevenue);
}
