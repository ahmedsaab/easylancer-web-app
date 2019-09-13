import { call, put, takeLeading, takeLatest } from 'redux-saga/effects';
import * as client from 'utils/client';
import {
  loadUserError,
  loadUserSuccess,
  updateUserModeError,
} from 'containers/App/actions';
import { LOAD_USER, UPDATE_USER_MODE } from 'containers/App/constants';

export function* fetchUser() {
  try {
    const user = yield call(client.getMe);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
  }
}

export function* updateUserMode({ role }) {
  try {
    const user = yield call(client.updateMe, {
      settings: { role },
    });
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(updateUserModeError(err));
  }
}

export default function* appData() {
  yield takeLeading(LOAD_USER, fetchUser);
  yield takeLatest(UPDATE_USER_MODE, updateUserMode);
}
