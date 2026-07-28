import { call, put, takeLatest, select, all } from "redux-saga/effects";
import apiClient from "../../api/api";
import {
  fetchSubscriptionsRequest,
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  fetchContactSalesRequest,
  fetchContactSalesSuccess,
  fetchContactSalesFailure,
} from "./slice";
import { SUBSCRIPTIONS_ENDPOINTS } from "./endpoints";
import type { RootState } from "../../store";
import type { EnterpriseContactItem } from "./types";

const getToken = (state: RootState) => state.auth.token;

function* handleFetchSubscriptions(): Generator<any, any, any> {
  try {
    const token: string | null = yield select(getToken);
    const authHeaderToken = token || localStorage.getItem("token");

    const response = (yield call(
      [apiClient, apiClient.get],
      SUBSCRIPTIONS_ENDPOINTS.list,
      {
        headers: authHeaderToken
          ? { Authorization: `Bearer ${authHeaderToken}` }
          : {},
      },
    )) as { data: any };

    const payload = Array.isArray(response.data)
      ? response.data
      : response.data?.subscriptions || [];

    yield put(fetchSubscriptionsSuccess(payload));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      err.response?.data?.message || "Failed to fetch subscriptions.";
    yield put(fetchSubscriptionsFailure(errorMessage));
  }
}

function* handleFetchContactSales(): Generator<any, any, any> {
  try {
    const token: string | null = yield select(getToken);
    const authHeaderToken = token || localStorage.getItem("token");

    const response = (yield call(
      [apiClient, apiClient.get],
      SUBSCRIPTIONS_ENDPOINTS.contactSales,
      {
        headers: authHeaderToken
          ? { Authorization: `Bearer ${authHeaderToken}` }
          : {},
      },
    )) as { data: any };

    const rawData = Array.isArray(response.data)
      ? response.data
      : response.data?.contacts || response.data?.items || [];

    const mappedData: EnterpriseContactItem[] = rawData.map((item: any, idx: number) => {
      const name = item.fullName || item.name || item.contactName || "Lead Request";
      const email = item.email || item.contactEmail || "-";
      const phone = item.mobileNumber || item.phone || item.phoneNumber || "-";
      const company = item.companyName || item.company || item.organization || "-";
      const rawDate = item.createdAt || item.requestDate || item.date;
      const requestDate = rawDate
        ? new Date(rawDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "-";
      const status = item.status || "New";

      return {
        id: item.id || `cs-${idx}`,
        name,
        email,
        phone,
        company,
        requestDate,
        status,
      };
    });

    yield put(fetchContactSalesSuccess(mappedData));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      err.response?.data?.message || "Failed to fetch contact sales requests.";
    yield put(fetchContactSalesFailure(errorMessage));
  }
}

export function* subscriptionsSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(fetchSubscriptionsRequest.type, handleFetchSubscriptions),
    takeLatest(fetchContactSalesRequest.type, handleFetchContactSales),
  ]);
}
