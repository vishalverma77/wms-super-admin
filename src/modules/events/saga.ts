import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/api";
import { EVENTS_ENDPOINTS } from "./endpoints";
import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AnalyticsQuery } from "./types";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function* handleFetchEvents(
  action: PayloadAction<AnalyticsQuery | undefined>,
): Generator<any, any, any> {
  try {
    const response = yield call(
      [apiClient, apiClient.get],
      EVENTS_ENDPOINTS.events,
      {
        params: action.payload,
        headers: getAuthHeader(),
      },
    );
    const data = response.data?.data ?? response.data;
    yield put(fetchEventsSuccess(data));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message =
      err.response?.data?.message || "Failed to fetch events analytics";
    yield put(fetchEventsFailure(message));
  }
}

export function* eventsSaga(): Generator<any, any, any> {
  yield takeLatest(fetchEventsRequest.type, handleFetchEvents);
}
