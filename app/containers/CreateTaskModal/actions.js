import {
  SEND_TASK,
  SEND_TASK_FAIL,
  SEND_TASK_SUCCESS,
  UPDATE_TASK_FORM_GENERAL,
  UPDATE_TASK_FORM_LOCATION,
  UPDATE_TASK_FORM_COUNTRY,
} from './constants';

export function updateTaskModalFormGeneral(key, value) {
  return {
    type: UPDATE_TASK_FORM_GENERAL,
    key,
    value,
  };
}

export function updateTaskModalFormCountry(country) {
  return {
    type: UPDATE_TASK_FORM_COUNTRY,
    country,
  };
}

export function updateTaskModalFormLocation(address, location) {
  return {
    type: UPDATE_TASK_FORM_LOCATION,
    address,
    location,
  };
}

export function sendTaskModal() {
  return {
    type: SEND_TASK,
  };
}

export function taskCreateSuccess(id) {
  return {
    type: SEND_TASK_SUCCESS,
    id,
  };
}

export function taskCreateError(error) {
  return {
    type: SEND_TASK_FAIL,
    error,
  };
}
