import {
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from '@redux-saga/core/effects';
import * as client from 'utils/client';
import {
  EDIT_PROFILE,
  LOAD_PROFILE,
  LOAD_PROFILE_EDIT_MODAL_IMAGES,
  LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
} from 'containers/ProfilePage/constants';
import {
  editProfileError,
  editProfileSuccess,
  loadProfile,
  profileLoaded,
  profileLoadingError,
  updateProfileEditModalImagesLoaded,
  updateProfileEditModalProfileImageLoaded,
} from 'containers/ProfilePage/actions';
import history from 'utils/history';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageId,
} from 'containers/ProfilePage/selectors';
import { getUpdateFields } from 'containers/ProfilePage/reducer';

export function* getProfile({ id }) {
  try {
    const profile = yield call(client.getProfile, id);
    yield put(profileLoaded(profile));
  } catch (err) {
    yield put(profileLoadingError(err));
  }
}

export function* editProfile() {
  const form = yield select(makeSelectProfilePageEditModalProp('form'));
  const id = yield select(makeSelectProfilePageId());

  try {
    yield call(client.updateProfile, id, getUpdateFields(form));
    yield put(editProfileSuccess());
    yield put(loadProfile(id));
    history.push(`/profile/${id}`);
  } catch (err) {
    yield put(editProfileError(err));
    console.log(err);
  }
}

export function* loadProfileEditImages() {
  const { imagesUrls } = yield select(
    makeSelectProfilePageEditModalProp('form'),
  );

  try {
    const files = yield call(client.loadImages, imagesUrls);
    yield put(updateProfileEditModalImagesLoaded(files));
  } catch (err) {
    console.log(err);
  }
}

export function* loadProfileEditProfileImage({ url }) {
  try {
    const files = yield call(client.loadImages, [url]);
    yield put(updateProfileEditModalProfileImageLoaded(files[0]));
  } catch (err) {
    console.log(err);
  }
}

export default function* profilePage() {
  yield takeLatest(LOAD_PROFILE, getProfile);
  yield takeLatest(LOAD_PROFILE_EDIT_MODAL_IMAGES, loadProfileEditImages);
  yield takeLatest(
    LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
    loadProfileEditProfileImage,
  );
  yield takeLeading(EDIT_PROFILE, editProfile);
}
