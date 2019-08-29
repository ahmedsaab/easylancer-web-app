import {
  UPDATE_TASK_FORM_REMOVE_TAG,
  SEND_TASK,
  SEND_TASK_FAIL,
  SEND_TASK_SUCCESS,
  UPDATE_TASK_FORM_GENERAL,
  UPDATE_TASK_FORM_LOCATION,
  UPDATE_TASK_FORM_COUNTRY,
  UPDATE_TASK_FORM_PUSH_TAG,
  FETCH_TAGS,
  UPDATE_STEP,
  RESET,
} from 'containers/CreateTaskModal/constants';

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

export function fetchAndSetTags() {
  return {
    type: FETCH_TAGS,
  };
}

export function updateTaskModalFormLocation(address, location) {
  return {
    type: UPDATE_TASK_FORM_LOCATION,
    address,
    location,
  };
}

export function updateTaskModalPushTag(tag) {
  return {
    type: UPDATE_TASK_FORM_PUSH_TAG,
    tag,
  };
}

export function updateTaskModalRemoveTag(index) {
  return {
    type: UPDATE_TASK_FORM_REMOVE_TAG,
    index,
  };
}

export function updateTaskModalStep(step) {
  return {
    type: UPDATE_STEP,
    step,
  };
}

export function updateTaskModalReset() {
  return {
    type: RESET,
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
