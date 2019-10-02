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
} from 'containers/ProfilePage/constants';

export const getUpdateFields = form => ({
  about: form.about,
  languages: form.languages,
  imagesUrls: form.images
    .filter(image => image.uploaded)
    .map(image => image.url),
  imageUrl: form.image.url,
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
    isOpen: false,
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
  reviews: {
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
          draft.reviews.good = initialState.reviews.good;
        }
        draft.reviews.good.loading = true;
        draft.reviews.good.error = null;
        break;
      case LOAD_WORKER_PROFILE_GOOD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.reviews.good.data = draft.reviews.good.data.concat(action.data);
        } else {
          draft.reviews.good.data = action.data;
        }
        draft.reviews.good.page = action.page;
        draft.reviews.good.hasNext = action.hasNext;
        draft.reviews.good.error = null;
        draft.reviews.good.loading = false;
        break;
      case LOAD_WORKER_PROFILE_GOOD_REVIEWS_ERROR:
        draft.reviews.good.error = action.error;
        draft.reviews.good.loading = false;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS:
        if (action.page === 1) {
          draft.reviews.bad = initialState.reviews.bad;
        }
        draft.reviews.bad.loading = true;
        draft.reviews.bad.error = null;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS_SUCCESS:
        if (action.page > 1) {
          draft.reviews.bad.data = draft.reviews.bad.data.concat(action.data);
        } else {
          draft.reviews.bad.data = action.data;
        }
        draft.reviews.bad.page = action.page;
        draft.reviews.bad.hasNext = action.hasNext;
        draft.reviews.bad.error = null;
        draft.reviews.bad.loading = false;
        break;
      case LOAD_WORKER_PROFILE_BAD_REVIEWS_ERROR:
        draft.reviews.bad.error = action.error;
        draft.reviews.bad.loading = false;
        break;
      case UPDATE_PROFILE_SELECTED_REVIEWS:
        draft.reviews.selected = action.value;
        break;
      case UPDATE_PROFILE_EDIT_MODAL_IS_OPEN:
        draft.editModal.isOpen = action.isOpen;
        if (!action.isOpen) {
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
        draft.editModal.isOpen = false;
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
