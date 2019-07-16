import produce from 'immer';
import { LOAD_TASK, LOAD_TASK_ERROR, LOAD_TASK_SUCCESS } from './constants';

export const initialState = {
  id: null,
  data: null,
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const taskPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASK:
        draft.loading = true;
        draft.id = action.id;
        break;

      case LOAD_TASK_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;

      case LOAD_TASK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default taskPageReducer;
