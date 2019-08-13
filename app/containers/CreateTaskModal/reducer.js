import produce from 'immer';
import {
  UPDATE_TASK_TITLE,
  UPDATE_TASK_PRICE,
  UPDATE_TASK_PAYMENT,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
  SEND_TASK,
} from './constants';

export const initialState = {
  form: {
    price: 0,
    payment: 'card',
    title: '',
  },
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const createTaskModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASK_PRICE:
        draft.form.price = action.price;
        break;

      case UPDATE_TASK_PAYMENT:
        draft.form.payment = action.payment;
        break;

      case UPDATE_TASK_TITLE:
        draft.form.title = action.title;
        break;

      case SEND_TASK:
        draft.loading = true;
        break;

      case SEND_TASK_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.form = initialState.form;
        break;

      case SEND_TASK_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default createTaskModalReducer;
