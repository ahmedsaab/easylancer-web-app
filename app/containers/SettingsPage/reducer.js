import produce from 'immer';
import {
  LOAD_USER_SETTINGS,
  LOAD_USER_SETTINGS_ERROR,
  LOAD_USER_SETTINGS_SUCCESS,
} from './constants';

export const initialState = {
  settings: {
    loading: null,
    error: null,
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER_SETTINGS:
        draft.settings.loading = true;
        draft.settings.error = null;
        draft.data = null;
        break;
      case LOAD_USER_SETTINGS_SUCCESS:
        draft.settings.loading = false;
        draft.settings.error = null;
        draft.settings.data = action.data;
        break;
      case LOAD_USER_SETTINGS_ERROR:
        draft.settings.loading = false;
        draft.settings.error = action.error;
        draft.settings.data = null;
        break;
    }
  });

export default settingsPageReducer;
