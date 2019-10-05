import {
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from '@redux-saga/core/effects';
import * as client from 'utils/client';
import { LOAD_USER_SETTINGS } from 'containers/SettingsPage/constants';
import {
  userSettingsLoaded,
  userSettingsLoadingError,
} from 'containers/SettingsPage/actions';

export function* getUserSettings() {
  try {
    const settings = yield call(client.getSettings);
    yield put(userSettingsLoaded(settings));
  } catch (err) {
    yield put(userSettingsLoadingError(err));
  }
}

export default function* settingsPage() {
  yield takeLatest(LOAD_USER_SETTINGS, getUserSettings);
}
