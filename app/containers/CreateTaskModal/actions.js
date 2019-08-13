import {
  SEND_TASK,
  SEND_TASK_FAIL,
  SEND_TASK_SUCCESS,
  UPDATE_TASK_FORM,
} from './constants';

export function updateTaskModalForm(key, value) {
  return {
    type: UPDATE_TASK_FORM,
    key,
    value,
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
