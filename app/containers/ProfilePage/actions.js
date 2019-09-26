import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
} from './constants';

export function loadProfile(id) {
  return {
    type: LOAD_PROFILE,
    id,
  };
}

export function profileLoaded(data) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
  };
}

export function profileLoadingError(error) {
  return {
    type: LOAD_PROFILE_ERROR,
    error,
  };
}
