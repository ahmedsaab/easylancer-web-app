import {
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from '@redux-saga/core/effects';
import * as client from 'utils/client';
import {
  LOAD_USER_SETTINGS,
  SAVE_USER_SETTINGS,
} from 'containers/SettingsPage/constants';
import {
  updateUserSettingsPanel,
  userSettingsLoaded,
  userSettingsLoadingError,
  userSettingsSaved,
  userSettingsSavingError,
} from 'containers/SettingsPage/actions';
import { loadUser } from 'containers/App/actions';

export function* getUserSettings() {
  try {
    const settings = yield call(client.getSettings);
    yield put(userSettingsLoaded(settings));
  } catch (err) {
    yield put(userSettingsLoadingError(err));
  }
}

export function* saveUserSettings({ payload, onAlert }) {
  try {
    const settings = yield call(client.saveSettings, payload);
    yield put(userSettingsSaved());
    yield put(userSettingsLoaded(settings));
    yield put(updateUserSettingsPanel(null));
    if (payload.firstName || payload.lastName) {
      yield put(loadUser());
    }
    yield onAlert(true);
  } catch (err) {
    yield put(userSettingsSavingError(err));
    yield onAlert(false);
  }
}

export default function* settingsPage() {
  yield takeLatest(LOAD_USER_SETTINGS, getUserSettings);
  yield takeLeading(SAVE_USER_SETTINGS, saveUserSettings);
}
