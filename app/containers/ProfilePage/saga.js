import { call, put, takeLatest } from '@redux-saga/core/effects';
import * as client from 'utils/client';
import { LOAD_PROFILE } from 'containers/ProfilePage/constants';
import {
  profileLoaded,
  profileLoadingError,
} from 'containers/ProfilePage/actions';

export function* getProfile({ id }) {
  try {
    const profile = yield call(client.getProfile, id);
    yield put(profileLoaded(profile));
  } catch (err) {
    yield put(profileLoadingError(err));
  }
}

export default function* profilePage() {
  yield takeLatest(LOAD_PROFILE, getProfile);
}
