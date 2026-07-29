import { call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/api";
import {
  fetchPlansRequest,
  fetchPlansSuccess,
  fetchPlansFailure,
  updatePlanRequest,
  updatePlanSuccess,
  updatePlanFailure,
} from "./slice";
import { PLANS_ENDPOINTS } from "./endpoints";
import type { RootState } from "../../store";
import type {
  FetchPlansApiResponse,
  UpdatePlanApiResponse,
  ApiErrorResponse,
  PlanItem,
} from "./types";

const getToken = (state: RootState): string | null => state.auth.token;

function* handleFetchPlans() {
  try {
    const token = (yield select(getToken)) as string | null;
    const authHeaderToken: string | null =
      token || localStorage.getItem("token");

    const response: FetchPlansApiResponse = yield call(
      [apiClient, apiClient.get],
      PLANS_ENDPOINTS.list,
      {
        headers: {
          Authorization: `Bearer ${authHeaderToken}`,
        },
      },
    );

    let plansList: PlanItem[] = [];
    if (Array.isArray(response)) {
      plansList = response;
    } else if (response && "data" in response && Array.isArray(response.data)) {
      plansList = response.data;
    }

    yield put(fetchPlansSuccess(plansList));
  } catch (error: unknown) {
    const err: ApiErrorResponse = error as ApiErrorResponse;
    const errorMessage: string =
      err.response?.data?.message || "Failed to fetch subscription plans.";
    yield put(fetchPlansFailure(errorMessage));
  }
}

function* handleUpdatePlan(action: ReturnType<typeof updatePlanRequest>) {
  const { id, name, monthlyRate, yearlyDiscount, yearlyRate, color, cardColor, gradientColor, isPopular } = action.payload;
  try {
    const token = (yield select(getToken)) as string | null;
    const authHeaderToken: string | null =
      token || localStorage.getItem("token");

    const response: UpdatePlanApiResponse = (yield call(
      [apiClient, apiClient.patch],
      PLANS_ENDPOINTS.update(id),
      {
        name,
        monthlyRate: Number(monthlyRate),
        yearlyDiscount: Number(yearlyDiscount),
        yearlyRate: Number(yearlyRate),
        color,
        cardColor,
        gradientColor,
        isPopular,
      },
      {
        headers: {
          Authorization: `Bearer ${authHeaderToken}`,
        },
      },
    )) as UpdatePlanApiResponse;

    const updatedItem =
      response && "data" in response && response.data
        ? response.data
        : (response as PlanItem);

    yield put(updatePlanSuccess(updatedItem));
  } catch (error: unknown) {
    const err: ApiErrorResponse = error as ApiErrorResponse;
    const errorMessage: string =
      err.response?.data?.message || "Failed to update plan on server.";
    yield put(updatePlanFailure(errorMessage));
  }
}

export function* plansSaga() {
  yield takeLatest(fetchPlansRequest.type, handleFetchPlans);
  yield takeLatest(updatePlanRequest.type, handleUpdatePlan);
}
