import {
  SEND_TASK,
  SEND_TASK_FAIL,
  SEND_TASK_SUCCESS,
  UPDATE_TASK_PAYMENT,
  UPDATE_TASK_PRICE,
  UPDATE_TASK_TITLE,
} from './constants';

export function updateTaskModalPrice(price) {
  return {
    type: UPDATE_TASK_PRICE,
    price,
  };
}

export function updateTaskModalPayment(payment) {
  return {
    type: UPDATE_TASK_PAYMENT,
    payment,
  };
}

export function updateTaskModalTitle(message) {
  return {
    type: UPDATE_TASK_TITLE,
    message,
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
