import produce from 'immer';
import {
  UPDATE_TASK_FORM,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
  SEND_TASK,
} from './constants';

export const initialState = {
  form: {
    price: 0,
    payment: 'card',
    title: '',
    description: '',
  },
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const createTaskModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASK_FORM:
        draft.form[action.key] = action.value;
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
