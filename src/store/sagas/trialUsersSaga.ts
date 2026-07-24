import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTrialUsersRequest,
  fetchTrialUsersSuccess,
  fetchTrialUsersFailure,
} from "../slices/trialUsersSlice";
import { ENDPOINTS } from "../../api/endpoints";
import type { RootState } from "../index";

const getToken = (state: RootState) => state.auth.token;

function* handleFetchTrialUsers() {
  try {
    const token: string | null = yield select(getToken);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(axios.get, ENDPOINTS.users.trialUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put(fetchTrialUsersSuccess(response.data));
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    const errorMessage =
      err.response?.data?.message || "Failed to fetch trial users.";
    yield put(fetchTrialUsersFailure(errorMessage));
  }
}

export function* trialUsersSaga() {
  yield takeLatest(fetchTrialUsersRequest.type, handleFetchTrialUsers);
}
