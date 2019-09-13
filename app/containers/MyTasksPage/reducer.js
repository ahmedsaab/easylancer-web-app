import produce from 'immer';
import {
  LOAD_MY_TASKS,
  LOAD_MY_TASKS_SUCCESS,
  LOAD_MY_TASKS_ERROR,
} from './constants';

export const initialState = {
  data: null,
  loading: true,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const myTasksPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MY_TASKS:
        draft.loading = true;
        break;

      case LOAD_MY_TASKS_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;

      case LOAD_MY_TASKS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default myTasksPageReducer;
