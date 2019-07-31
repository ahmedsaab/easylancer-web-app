import { LOAD_TASKS, LOAD_TASKS_ERROR, LOAD_TASKS_SUCCESS } from 'elements/pages/SearchPage/constants';

export function loadTasks() {
  return {
    type: LOAD_TASKS,
  };
}

export function tasksLoaded(data) {
  return {
    type: LOAD_TASKS_SUCCESS,
    data,
  };
}

export function tasksLoadingError(error) {
  return {
    type: LOAD_TASKS_ERROR,
    error,
  };
}
