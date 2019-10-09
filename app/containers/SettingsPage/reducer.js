import produce from 'immer';
import {
  SAVE_USER_SETTINGS_SUCCESS,
  LOAD_USER_SETTINGS,
  LOAD_USER_SETTINGS_ERROR,
  LOAD_USER_SETTINGS_SUCCESS,
  SAVE_USER_SETTINGS,
  SAVE_USER_SETTINGS_ERROR,
  UPDATE_USER_SETTINGS,
  UPDATE_USER_SETTINGS_PANEL,
} from 'containers/SettingsPage/constants';

export const initialState = {
  settings: {
    loading: null,
    error: null,
    data: null,
  },
  form: {
    expanded: null,
    loading: false,
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
        draft.settings.data = null;
        break;
      case LOAD_USER_SETTINGS_SUCCESS:
        draft.settings.loading = false;
        draft.settings.error = null;
        draft.settings.data = action.data;
        draft.form.data = action.data;
        break;
      case LOAD_USER_SETTINGS_ERROR:
        draft.settings.loading = false;
        draft.settings.error = action.error;
        draft.settings.data = null;
        break;
      case UPDATE_USER_SETTINGS:
        draft.form.data[action.key] = action.value;
        break;
      case SAVE_USER_SETTINGS:
        draft.form.loading = true;
        break;
      case SAVE_USER_SETTINGS_SUCCESS:
        draft.form.loading = false;
        draft.form.error = null;
        break;
      case SAVE_USER_SETTINGS_ERROR:
        draft.form.loading = false;
        draft.form.error = action.error;
        break;
      case UPDATE_USER_SETTINGS_PANEL:
        if (!draft.form.loading) {
          draft.form.expanded = action.panel;
          draft.form.data = draft.settings.data;
        }
        break;
    }
  });

export default settingsPageReducer;
