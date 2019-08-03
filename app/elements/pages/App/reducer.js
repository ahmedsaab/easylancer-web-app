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
} from 'elements/pages/App/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  user: null,
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
        break;

      case LOAD_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.user = null;
        break;
    }
  });

export default appReducer;
