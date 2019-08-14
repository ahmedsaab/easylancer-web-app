import { call, put, takeLeading } from 'redux-saga/effects';
import * as client from 'utils/client';
import { loadUserError, loadUserSuccess } from 'containers/App/actions';
import { LOAD_USER } from 'containers/App/constants';

export function* fetchUser() {
  try {
    const user = yield call(client.getUser);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
  }
}

export default function* appData() {
  yield takeLeading(LOAD_USER, fetchUser);
}
