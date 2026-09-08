import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { trialUsersSaga } from './trialUsersSaga';
import { revenueSaga } from './revenueSaga';

export function* rootSaga(): Generator<any, any, any> {
  yield all([
    authSaga(),
    trialUsersSaga(),
    revenueSaga(),
  ]);
}
