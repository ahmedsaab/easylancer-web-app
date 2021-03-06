/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_USER = 'app/App/LOAD_USER';
export const LOAD_USER_SUCCESS = 'app/App/LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'app/App/LOAD_USER_ERROR';
export const SET_BODY_SCROLL = 'app/App/SET_BODY_SCROLL';
export const UPDATE_USER_MODE = 'app/App/UPDATE_USER_MODE';
export const UPDATE_USER_MODE_ERROR = 'app/App/UPDATE_USER_MODE_ERROR';
