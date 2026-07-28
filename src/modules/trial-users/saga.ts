import { call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/api";
import {
  fetchTrialUsersRequest,
  fetchTrialUsersSuccess,
  fetchTrialUsersFailure,
} from "./slice";
import { TRIAL_USERS_ENDPOINTS } from "./endpoints";
import type { RootState } from "../../store";

const getToken = (state: RootState) => state.auth.token;

function* handleFetchTrialUsers(): Generator<any, any, any> {
  try {
    const token: string | null = yield select(getToken);
    const authHeaderToken = token || localStorage.getItem("token");

    const response = (yield call(
      [apiClient, apiClient.get],
      TRIAL_USERS_ENDPOINTS.list,
      {
        headers: {
          Authorization: `Bearer ${authHeaderToken}`,
        },
      },
    )) as { data: any };

    yield put(fetchTrialUsersSuccess(response.data));
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      err.response?.data?.message || "Failed to fetch trial users.";
    yield put(fetchTrialUsersFailure(errorMessage));
  }
}

export function* trialUsersSaga(): Generator<any, any, any> {
  yield takeLatest(fetchTrialUsersRequest.type, handleFetchTrialUsers);
}
