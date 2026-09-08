import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/api";
import { LANDING_ENDPOINTS } from "./endpoints";
import {
  fetchLandingRequest,
  fetchLandingSuccess,
  fetchLandingFailure,
} from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AnalyticsQuery } from "./types";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function* handleFetchLanding(
  action: PayloadAction<AnalyticsQuery | undefined>,
): Generator<any, any, any> {
  try {
    const response = yield call(
      [apiClient, apiClient.get],
      LANDING_ENDPOINTS.landing,
      {
        params: action.payload,
        headers: getAuthHeader(),
      },
    );
    const data = response.data?.data ?? response.data;
    yield put(fetchLandingSuccess(data));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message =
      err.response?.data?.message || "Failed to fetch landing analytics";
    yield put(fetchLandingFailure(message));
  }
}

export function* landingSaga(): Generator<any, any, any> {
  yield takeLatest(fetchLandingRequest.type, handleFetchLanding);
}
