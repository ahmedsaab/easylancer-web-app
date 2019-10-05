import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS_SUCCESS,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS_ERROR,
  LOAD_WORKER_PROFILE_BAD_REVIEWS,
  LOAD_WORKER_PROFILE_BAD_REVIEWS_SUCCESS,
  LOAD_WORKER_PROFILE_BAD_REVIEWS_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  LOAD_PROFILE_EDIT_MODAL_IMAGES,
  UPDATE_PROFILE_EDIT_MODAL_FORM_GENERAL,
  UPDATE_PROFILE_EDIT_MODAL_IMAGES_LOADED,
  LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
  UPDATE_PROFILE_EDIT_MODAL_PROFILE_IMAGE_LOADED,
  UPDATE_PROFILE_EDIT_PHOTOS_MODAL_IS_OPEN,
  UPDATE_PROFILE_EDIT_MODAL_IS_OPEN,
  LOAD_OWNER_PROFILE_GOOD_REVIEWS,
  LOAD_OWNER_PROFILE_GOOD_REVIEWS_SUCCESS,
  LOAD_OWNER_PROFILE_GOOD_REVIEWS_ERROR,
  LOAD_OWNER_PROFILE_BAD_REVIEWS,
  LOAD_OWNER_PROFILE_BAD_REVIEWS_SUCCESS,
  LOAD_OWNER_PROFILE_BAD_REVIEWS_ERROR,
} from 'containers/ProfilePage/constants';

export function loadProfile(id) {
  return {
    type: LOAD_PROFILE,
    id,
  };
}

export function profileLoaded(data) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
  };
}

export function profileLoadingError(error) {
  return {
    type: LOAD_PROFILE_ERROR,
    error,
  };
}

export function loadWorkerProfileGoodReviews(id, page = 1) {
  return {
    type: LOAD_WORKER_PROFILE_GOOD_REVIEWS,
    id,
    page,
  };
}

export function workerProfileGoodReviewsLoaded(data) {
  return {
    type: LOAD_WORKER_PROFILE_GOOD_REVIEWS_SUCCESS,
    ...data,
  };
}

export function workerProfileGoodReviewsError(error) {
  return {
    type: LOAD_WORKER_PROFILE_GOOD_REVIEWS_ERROR,
    error,
  };
}

export function loadWorkerProfileBadReviews(id, page = 1) {
  return {
    type: LOAD_WORKER_PROFILE_BAD_REVIEWS,
    id,
    page,
  };
}

export function workerProfileBadReviewsLoaded(data) {
  return {
    type: LOAD_WORKER_PROFILE_BAD_REVIEWS_SUCCESS,
    ...data,
  };
}

export function workerProfileBadReviewsError(error) {
  return {
    type: LOAD_WORKER_PROFILE_BAD_REVIEWS_ERROR,
    error,
  };
}

export function loadOwnerProfileGoodReviews(id, page = 1) {
  return {
    type: LOAD_OWNER_PROFILE_GOOD_REVIEWS,
    id,
    page,
  };
}

export function ownerProfileGoodReviewsLoaded(data) {
  return {
    type: LOAD_OWNER_PROFILE_GOOD_REVIEWS_SUCCESS,
    ...data,
  };
}

export function ownerProfileGoodReviewsError(error) {
  return {
    type: LOAD_OWNER_PROFILE_GOOD_REVIEWS_ERROR,
    error,
  };
}

export function loadOwnerProfileBadReviews(id, page = 1) {
  return {
    type: LOAD_OWNER_PROFILE_BAD_REVIEWS,
    id,
    page,
  };
}

export function ownerProfileBadReviewsLoaded(data) {
  return {
    type: LOAD_OWNER_PROFILE_BAD_REVIEWS_SUCCESS,
    ...data,
  };
}

export function ownerProfileBadReviewsError(error) {
  return {
    type: LOAD_OWNER_PROFILE_BAD_REVIEWS_ERROR,
    error,
  };
}

export function updateProfileEditModalIsOpen(isOpen) {
  return {
    type: UPDATE_PROFILE_EDIT_MODAL_IS_OPEN,
    isOpen,
  };
}

export function updateProfileEditPhotosModalIsOpen(isOpen) {
  return {
    type: UPDATE_PROFILE_EDIT_PHOTOS_MODAL_IS_OPEN,
    isOpen,
  };
}

export function editProfile() {
  return {
    type: EDIT_PROFILE,
  };
}

export function editProfileSuccess() {
  return {
    type: EDIT_PROFILE_SUCCESS,
  };
}

export function editProfileError(error) {
  return {
    type: EDIT_PROFILE_ERROR,
    error,
  };
}

export function updateProfileEditModalFormGeneral(key, value) {
  return {
    type: UPDATE_PROFILE_EDIT_MODAL_FORM_GENERAL,
    key,
    value,
  };
}

export function loadProfileEditModalImages(urls) {
  return {
    type: LOAD_PROFILE_EDIT_MODAL_IMAGES,
    urls,
  };
}

export function updateProfileEditModalImagesLoaded(files) {
  return {
    type: UPDATE_PROFILE_EDIT_MODAL_IMAGES_LOADED,
    files,
  };
}

export function loadProfileEditModalProfileImage(url) {
  return {
    type: LOAD_PROFILE_EDIT_MODAL_PROFILE_IMAGE,
    url,
  };
}

export function updateProfileEditModalProfileImageLoaded(file) {
  return {
    type: UPDATE_PROFILE_EDIT_MODAL_PROFILE_IMAGE_LOADED,
    file,
  };
}
