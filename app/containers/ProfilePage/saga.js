import {
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from '@redux-saga/core/effects';
import * as client from 'utils/client';
import {
  EDIT_PROFILE, LOAD_OWNER_PROFILE_BAD_REVIEWS, LOAD_OWNER_PROFILE_GOOD_REVIEWS,
  LOAD_PROFILE,
  LOAD_PROFILE_EDIT_MODAL_IMAGES,
  LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
  LOAD_WORKER_PROFILE_BAD_REVIEWS,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS,
} from 'containers/ProfilePage/constants';
import {
  editProfileError,
  editProfileSuccess,
  loadProfile,
  ownerProfileBadReviewsError,
  ownerProfileBadReviewsLoaded,
  ownerProfileGoodReviewsError,
  ownerProfileGoodReviewsLoaded,
  profileLoaded,
  profileLoadingError,
  updateProfileEditModalImagesLoaded,
  updateProfileEditModalProfileImageLoaded,
  workerProfileBadReviewsError,
  workerProfileBadReviewsLoaded,
  workerProfileGoodReviewsError,
  workerProfileGoodReviewsLoaded,
} from 'containers/ProfilePage/actions';
import history from 'utils/history';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageId,
} from 'containers/ProfilePage/selectors';
import { getUpdateFields } from 'containers/ProfilePage/reducer';
import { loadUser } from 'containers/App/actions';
import { makeSelectGlobalUser } from 'containers/App/selectors';

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
    yield put(loadUser(id));
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

export function* getGoodWorkerReviews({ id, page }) {
  try {
    const data = yield call(client.getWorkerReviews, id, 'DONE', page);

    yield put(
      workerProfileGoodReviewsLoaded({
        hasNext: data.totalPages > data.pageNo,
        data: data.page,
        page: data.pageNo,
      }),
    );
  } catch (err) {
    yield put(workerProfileGoodReviewsError(err));
    console.error(err);
  }
}

export function* getBadWorkerReviews({ id, page }) {
  try {
    const data = yield call(client.getWorkerReviews, id, 'NOT_DONE', page);

    yield put(
      workerProfileBadReviewsLoaded({
        hasNext: data.totalPages > data.pageNo,
        data: data.page,
        page: data.pageNo,
      }),
    );
  } catch (err) {
    yield put(workerProfileBadReviewsError(err));
    console.error(err);
  }
}

export function* getGoodOwnerReviews({ id, page }) {
  try {
    const data = yield call(client.getOwnerReviews, id, 'DONE', page);

    yield put(
      ownerProfileGoodReviewsLoaded({
        hasNext: data.totalPages > data.pageNo,
        data: data.page,
        page: data.pageNo,
      }),
    );
  } catch (err) {
    yield put(ownerProfileGoodReviewsError(err));
    console.error(err);
  }
}

export function* getBadOwnerReviews({ id, page }) {
  try {
    const data = yield call(client.getOwnerReviews, id, 'NOT_DONE', page);

    yield put(
      ownerProfileBadReviewsLoaded({
        hasNext: data.totalPages > data.pageNo,
        data: data.page,
        page: data.pageNo,
      }),
    );
  } catch (err) {
    yield put(ownerProfileBadReviewsError(err));
    console.error(err);
  }
}

export default function* profilePage() {
  yield takeLatest(LOAD_PROFILE, getProfile);
  yield takeLatest(LOAD_PROFILE_EDIT_MODAL_IMAGES, loadProfileEditImages);
  yield takeLeading(EDIT_PROFILE, editProfile);
  yield takeLeading(LOAD_WORKER_PROFILE_GOOD_REVIEWS, getGoodWorkerReviews);
  yield takeLeading(LOAD_WORKER_PROFILE_BAD_REVIEWS, getBadWorkerReviews);
  yield takeLeading(LOAD_OWNER_PROFILE_GOOD_REVIEWS, getGoodOwnerReviews);
  yield takeLeading(LOAD_OWNER_PROFILE_BAD_REVIEWS, getBadOwnerReviews);
  yield takeLatest(
    LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
    loadProfileEditProfileImage,
  );
}
