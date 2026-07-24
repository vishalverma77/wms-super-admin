import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { trialUsersSaga } from './trialUsersSaga';

export function* rootSaga() {
  yield all([
    authSaga(),
    trialUsersSaga(),
  ]);
}
