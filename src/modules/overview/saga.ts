import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/api";
import { OVERVIEW_ENDPOINTS } from "./endpoints";
import {
  fetchOverviewRequest,
  fetchOverviewSuccess,
  fetchOverviewFailure,
} from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AnalyticsQuery } from "./types";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function* handleFetchOverview(
  action: PayloadAction<AnalyticsQuery | undefined>,
): Generator<any, any, any> {
  try {
    const response = yield call(
      [apiClient, apiClient.get],
      OVERVIEW_ENDPOINTS.overview,
      {
        params: action.payload,
        headers: getAuthHeader(),
      },
    );
    const data = response.data?.data ?? response.data;
    yield put(fetchOverviewSuccess(data));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message =
      err.response?.data?.message || "Failed to fetch overview analytics";
    yield put(fetchOverviewFailure(message));
  }
}

export function* overviewSaga(): Generator<any, any, any> {
  yield takeLatest(fetchOverviewRequest.type, handleFetchOverview);
}
