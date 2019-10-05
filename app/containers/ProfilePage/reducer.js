import produce from 'immer';
import {
  LOAD_PROFILE,
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE_SUCCESS,
  UPDATE_PROFILE_EDIT_MODAL_IS_OPEN,
  UPDATE_PROFILE_EDIT_MODAL_FORM_GENERAL,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  UPDATE_PROFILE_EDIT_MODAL_IMAGES_LOADED,
  UPDATE_PROFILE_EDIT_MODAL_PROFILE_IMAGE_LOADED,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS_SUCCESS,
  LOAD_WORKER_PROFILE_GOOD_REVIEWS_ERROR,
  LOAD_WORKER_PROFILE_BAD_REVIEWS,
  LOAD_WORKER_PROFILE_BAD_REVIEWS_SUCCESS,
  LOAD_WORKER_PROFILE_BAD_REVIEWS_ERROR,
  UPDATE_PROFILE_SELECTED_REVIEWS,
  UPDATE_PROFILE_EDIT_PHOTOS_MODAL_IS_OPEN,
  LOAD_OWNER_PROFILE_GOOD_REVIEWS_SUCCESS,
  LOAD_OWNER_PROFILE_GOOD_REVIEWS_ERROR,
  LOAD_OWNER_PROFILE_BAD_REVIEWS, LOAD_OWNER_PROFILE_BAD_REVIEWS_SUCCESS, LOAD_OWNER_PROFILE_BAD_REVIEWS_ERROR,
} from 'containers/ProfilePage/constants';
import { clean } from 'utils/object';

export const getUpdateFields = form =>
  clean({
    about: form.about,
    languages: form.languages,
    imagesUrls: form.images
      ? form.images.filter(image => image.uploaded).map(image => image.url)
      : undefined,
    imageUrl: form.image ? form.image.url : undefined,
  });

export const initialState = {
  id: null,
  profile: {
    data: null,
    loading: true,
    error: null,
    photosLimit: 10,
  },
  editModal: {
    isOpenProfile: false,
    isOpenPhotos: false,
    isLoading: false,
    form: {
      about: null,
      imageUrl: null,
      languages: [],
      imagesUrls: [],
      images: null,
      image: null,
      location: {
        city: null,
        country: null,
      },
    },
  },
  workerReviews: {
    selected: true,
    good: {
      data: null,
      loading: null,
      error: null,
      page: null,
      hasNext: null,
    },
    bad: {
      data: null,
      loading: null,
      error: null,
      page: null,
      hasNext: null,
    },
  },
  ownerReviews: {
    selected: true,
    good: {
      data: null,
      loading: null,
      error: null,
      page: null,
      hasNext: null,
    },
    bad: {
      data: null,
      loading: null,
      error: null,
      page: null,
      hasNext: null,
    },
  },
  tasks: {
    data: null,
    loading: null,
    error: null,
    page: null,
    hasNext: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PROFILE:
        draft.profile.loading = true;
        draft.id = action.id;
        break;
      case LOAD_PROFILE_SUCCESS:
        draft.profile.data = action.data;
        draft.profile.loading = false;
        draft.editModal.form = {
          ...action.data,
        };
        break;
      case LOAD_PROFILE_ERROR:
        draft.profile.error = action.error;
        draft.profile.loading = false;
        break;
      case LOAD_WORKER_PROFILE_GOOD_REVIEWS:
        if (action.page === 1) {
          draft.workerReviews.good = initialState.workerReviews.good;
        }
        draft.workerReviews.good.loading = true;
        draft.workerReviews.good.error = null;
        break;
      case LOAD_WORKER_PROFILE_GOOD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.workerReviews.good.data = draft.workerReviews.good.data.concat(
            action.data,
          );
        } else {
          draft.workerReviews.good.data = action.data;
        }
        draft.workerReviews.good.page = action.page;
        draft.workerReviews.good.hasNext = action.hasNext;
        draft.workerReviews.good.error = null;
        draft.workerReviews.good.loading = false;
        break;
      case LOAD_WORKER_PROFILE_GOOD_REVIEWS_ERROR:
        draft.workerReviews.good.error = action.error;
        draft.workerReviews.good.loading = false;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS:
        if (action.page === 1) {
          draft.workerReviews.bad = initialState.workerReviews.bad;
        }
        draft.workerReviews.bad.loading = true;
        draft.workerReviews.bad.error = null;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.workerReviews.bad.data = draft.workerReviews.bad.data.concat(
            action.data,
          );
        } else {
          draft.workerReviews.bad.data = action.data;
        }
        draft.workerReviews.bad.page = action.page;
        draft.workerReviews.bad.hasNext = action.hasNext;
        draft.workerReviews.bad.error = null;
        draft.workerReviews.bad.loading = false;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS_ERROR:
        draft.workerReviews.bad.error = action.error;
        draft.workerReviews.bad.loading = false;
        break;
      case LOAD_OWNER_PROFILE_GOOD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.ownerReviews.good.data = draft.ownerReviews.good.data.concat(
            action.data,
          );
        } else {
          draft.ownerReviews.good.data = action.data;
        }
        draft.ownerReviews.good.page = action.page;
        draft.ownerReviews.good.hasNext = action.hasNext;
        draft.ownerReviews.good.error = null;
        draft.ownerReviews.good.loading = false;
        break;
      case LOAD_OWNER_PROFILE_GOOD_REVIEWS_ERROR:
        draft.ownerReviews.good.error = action.error;
        draft.ownerReviews.good.loading = false;
        break;
      case LOAD_OWNER_PROFILE_BAD_REVIEWS:
        if (action.page === 1) {
          draft.ownerReviews.bad = initialState.ownerReviews.bad;
        }
        draft.ownerReviews.bad.loading = true;
        draft.ownerReviews.bad.error = null;
        break;
      case LOAD_OWNER_PROFILE_BAD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.ownerReviews.bad.data = draft.ownerReviews.bad.data.concat(
            action.data,
          );
        } else {
          draft.ownerReviews.bad.data = action.data;
        }
        draft.ownerReviews.bad.page = action.page;
        draft.ownerReviews.bad.hasNext = action.hasNext;
        draft.ownerReviews.bad.error = null;
        draft.ownerReviews.bad.loading = false;
        break;
      case LOAD_OWNER_PROFILE_BAD_REVIEWS_ERROR:
        draft.ownerReviews.bad.error = action.error;
        draft.ownerReviews.bad.loading = false;
        break;
      case UPDATE_PROFILE_EDIT_MODAL_IS_OPEN:
        draft.editModal.isOpenProfile = action.isOpen;
        if (!action.isOpenProfile) {
          draft.editModal.form = { ...draft.profile.data };
          draft.editModal.isDirty = false;
        }
        break;
      case UPDATE_PROFILE_EDIT_PHOTOS_MODAL_IS_OPEN:
        draft.editModal.isOpenPhotos = action.isOpen;
        if (!action.isOpenPhotos) {
          draft.editModal.form = { ...draft.profile.data };
          draft.editModal.isDirty = false;
        }
        break;
      case UPDATE_PROFILE_EDIT_MODAL_FORM_GENERAL:
        draft.editModal.form[action.key] = action.value;
        break;
      case EDIT_PROFILE:
        draft.editModal.isLoading = true;
        break;
      case EDIT_PROFILE_SUCCESS:
        draft.editModal.isOpenProfile = false;
        draft.editModal.isOpenPhotos = false;
        draft.editModal.isLoading = false;
        draft.editModal.form = initialState.editModal.form;
        break;
      case EDIT_PROFILE_ERROR:
        draft.editModal.isLoading = false;
        break;
      case UPDATE_PROFILE_EDIT_MODAL_IMAGES_LOADED:
        draft.editModal.form.images = action.files.map((file, i) => ({
          data: file.data,
          id: `file_${i}`,
          url: file.url,
          uploaded: true,
        }));
        break;
      case UPDATE_PROFILE_EDIT_MODAL_PROFILE_IMAGE_LOADED:
        draft.editModal.form.image = {
          data: action.file.data,
          id: null,
          url: action.file.url,
          uploaded: true,
        };
        break;
    }
  });

export default profilePageReducer;
