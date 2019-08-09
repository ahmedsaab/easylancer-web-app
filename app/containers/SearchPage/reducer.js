import produce from 'immer';
import {
  LOAD_TASKS,
  LOAD_TASKS_ERROR,
  LOAD_TASKS_SUCCESS,
} from 'containers/SearchPage/constants';

export const initialState = {
  filters: {},
  data: {
    loading: false,
    tasks: [],
    error: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const searchPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASKS:
        draft.data.loading = true;
        break;

      case LOAD_TASKS_SUCCESS:
        draft.data.tasks = action.data;
        draft.data.loading = false;
        break;

      case LOAD_TASKS_ERROR:
        draft.data.error = action.error;
        draft.data.loading = false;
        break;
    }
  });

export default searchPageReducer;
