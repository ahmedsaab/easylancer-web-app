import { LOAD_TASK, LOAD_TASK_ERROR, LOAD_TASK_SUCCESS } from './constants';

export function loadTask(id) {
  return {
    type: LOAD_TASK,
    id,
  };
}

export function taskLoaded(data) {
  return {
    type: LOAD_TASK_SUCCESS,
    data,
  };
}

export function taskLoadingError(error) {
  return {
    type: LOAD_TASK_ERROR,
    error,
  };
}
