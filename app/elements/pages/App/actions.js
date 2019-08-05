/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  SET_BODY_SCROLL,
} from 'elements/pages/App/constants';

export function loadUser() {
  return {
    type: LOAD_USER,
  };
}

export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user,
  };
}

export function loadUserError(error) {
  return {
    type: LOAD_USER_ERROR,
    error,
  };
}

export function setBodyScroll(scroll) {
  return {
    type: SET_BODY_SCROLL,
    scroll,
  };
}
