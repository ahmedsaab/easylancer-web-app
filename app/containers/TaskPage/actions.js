import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_OFFERS,
  LOAD_TASK_OFFERS_SUCCESS,
  LOAD_TASK_OFFERS_ERROR,
} from './constants';

export function loadTask(id) {
  return {
    type: LOAD_TASK,
    id,
  };
}

export function loadTaskOffers(id) {
  return {
    type: LOAD_TASK_OFFERS,
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

export function taskOffersLoaded(data) {
  return {
    type: LOAD_TASK_OFFERS_SUCCESS,
    data,
  };
}

export function taskOffersLoadingError(error) {
  return {
    type: LOAD_TASK_OFFERS_ERROR,
    error,
  };
}
