import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/api";
import { TRAFFIC_ENDPOINTS } from "./endpoints";
import {
  fetchTrafficRequest,
  fetchTrafficSuccess,
  fetchTrafficFailure,
} from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AnalyticsQuery,
  AnalyticsTrafficData,
  ApiErrorResponse,
} from "./types";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function* handleFetchTraffic(
  action: PayloadAction<AnalyticsQuery | undefined>,
) {
  try {
    const response = (yield call(
      [apiClient, apiClient.get],
      TRAFFIC_ENDPOINTS.traffic,
      {
        params: action.payload,
        headers: getAuthHeader(),
      },
    )) as { data: { data?: AnalyticsTrafficData } & AnalyticsTrafficData };
    const data: AnalyticsTrafficData = response.data.data ?? response.data;
    yield put(fetchTrafficSuccess(data));
  } catch (error: unknown) {
    const err = error as ApiErrorResponse;
    const message =
      err.response?.data?.message || "Failed to fetch traffic analytics";
    yield put(fetchTrafficFailure(message));
  }
}

export function* trafficSaga() {
  yield takeLatest(fetchTrafficRequest.type, handleFetchTraffic);
}
