/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  SET_BODY_SCROLL,
  UPDATE_USER_MODE,
  UPDATE_USER_MODE_ERROR,
} from 'containers/App/constants';
import { disableBodyScroll, enableBodyScroll } from 'utils/stylesHelper';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  user: null,
  settings: {
    mode: 'OWNER',
    language: 'EN',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER:
        draft.loading = true;
        draft.error = null;
        draft.user = null;
        break;

      case LOAD_USER_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.user = action.user;
        draft.settings = action.user.settings;
        break;

      case LOAD_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.user = null;
        break;

      case UPDATE_USER_MODE:
        draft.settings.role = action.role;
        break;

      case UPDATE_USER_MODE_ERROR:
        draft.settings.role = draft.user.settings.role;
        break;

      case SET_BODY_SCROLL:
        allowBodyScroll(action.scroll);
        break;
    }
  });

const allowBodyScroll = allow => {
  if (allow) {
    enableBodyScroll();
  } else {
    disableBodyScroll();
  }
};

export default appReducer;
