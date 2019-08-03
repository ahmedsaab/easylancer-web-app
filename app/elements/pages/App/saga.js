import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as client from 'utils/client';
import { loadUserError, loadUserSuccess } from 'elements/pages/App/actions';
import { LOAD_USER } from 'elements/pages/App/constants';
import auth from 'utils/auth';

export function* fetchUser() {
  try {
    const user = yield call(client.getUser);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
    auth.login();
  }
}

export default function* appData() {
  yield takeLeading(LOAD_USER, fetchUser);
}
