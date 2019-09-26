import produce from 'immer';
import {
  LOAD_PROFILE,
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE_SUCCESS,
} from './constants';

export const initialState = {
  profile: {
    data: null,
    loading: true,
    error: null,
    photosLimit: 10,
  },
  reviews: {
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
        break;
      case LOAD_PROFILE_SUCCESS:
        draft.profile.data = action.data;
        draft.profile.loading = false;
        break;
      case LOAD_PROFILE_ERROR:
        draft.profile.error = action.error;
        draft.profile.loading = false;
        break;
    }
  });

export default profilePageReducer;
