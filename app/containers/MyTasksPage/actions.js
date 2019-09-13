import {
  LOAD_MY_TASKS,
  LOAD_MY_TASKS_ERROR,
  LOAD_MY_TASKS_SUCCESS,
} from './constants';

export function loadMyTasks() {
  return {
    type: LOAD_MY_TASKS,
  };
}

export function myTasksLoaded(data) {
  return {
    type: LOAD_MY_TASKS_SUCCESS,
    data,
  };
}

export function myTasksLoadingError(error) {
  return {
    type: LOAD_MY_TASKS_ERROR,
    error,
  };
}
