import {
  LOAD_MY_TASKS,
  LOAD_MY_TASKS_ERROR,
  LOAD_MY_TASKS_SUCCESS,
} from './constants';

export function loadMyTasks(list, page = 1) {
  return {
    type: LOAD_MY_TASKS,
    list,
    page,
  };
}

export function myTasksLoaded(list, data) {
  return {
    type: LOAD_MY_TASKS_SUCCESS,
    list,
    ...data,
  };
}

export function myTasksLoadingError(list, error) {
  return {
    type: LOAD_MY_TASKS_ERROR,
    list,
    error,
  };
}
