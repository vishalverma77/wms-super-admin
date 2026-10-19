import { all, fork } from "redux-saga/effects";
import { authSaga } from "../modules/auth/saga";
import { trialUsersSaga } from "../modules/trial-users/saga";
import { overviewSaga } from "../modules/overview/saga";
import { landingSaga } from "../modules/landing/saga";
import { trafficSaga } from "../modules/traffic/sagas";
import { eventsSaga } from "../modules/events/saga";
import { subscriptionsSaga } from "../modules/subscriptions/saga";
import { plansSaga } from "../modules/plans/sagas";
import { revenueSaga } from "../modules/revenue/sagas";

export function* rootSaga(): Generator<any, any, any> {
  yield all([
    fork(authSaga),
    fork(trialUsersSaga),
    fork(overviewSaga),
    fork(landingSaga),
    fork(trafficSaga),
    fork(eventsSaga),
    fork(subscriptionsSaga),
    fork(plansSaga),
    fork(revenueSaga),
  ]);
}
