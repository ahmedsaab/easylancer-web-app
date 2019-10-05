import {
  LOAD_USER_SETTINGS,
  LOAD_USER_SETTINGS_SUCCESS,
  LOAD_USER_SETTINGS_ERROR,
} from './constants';

export function loadUserSettings() {
  return {
    type: LOAD_USER_SETTINGS,
  };
}

export function userSettingsLoaded(data) {
  return {
    type: LOAD_USER_SETTINGS_SUCCESS,
    data,
  };
}

export function userSettingsLoadingError(error) {
  return {
    type: LOAD_USER_SETTINGS_ERROR,
    error,
  };
}
