import {
  LOAD_USER_SETTINGS,
  LOAD_USER_SETTINGS_SUCCESS,
  LOAD_USER_SETTINGS_ERROR,
  UPDATE_USER_SETTINGS,
  SAVE_USER_SETTINGS,
  SAVE_USER_SETTINGS_ERROR,
  SAVE_USER_SETTINGS_SUCCESS, UPDATE_USER_SETTINGS_PANEL,
} from 'containers/SettingsPage/constants';

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

export function updateUserSettings(key, value) {
  return {
    type: UPDATE_USER_SETTINGS,
    key,
    value,
  };
}

export function saveUserSettings(payload, onAlert) {
  return {
    type: SAVE_USER_SETTINGS,
    payload,
    onAlert,
  };
}

export function userSettingsSaved() {
  return {
    type: SAVE_USER_SETTINGS_SUCCESS,
  };
}

export function userSettingsSavingError(error) {
  return {
    type: SAVE_USER_SETTINGS_ERROR,
    error,
  };
}

export function updateUserSettingsPanel(panel) {
  return {
    type: UPDATE_USER_SETTINGS_PANEL,
    panel,
  };
}
