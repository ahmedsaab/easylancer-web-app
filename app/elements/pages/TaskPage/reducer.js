import produce from 'immer';
import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_OFFERS_ERROR,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_OFFERS_SUCCESS,
} from 'elements/pages/TaskPage/constants';

export const initialState = {
  id: null,
  task: {
    data: null,
    loading: true,
    error: null,
  },
  offers: {
    data: null,
    loading: true,
    error: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const taskPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASK:
        draft.task.loading = true;
        draft.id = action.id;
        break;

      case LOAD_TASK_SUCCESS:
        draft.task.data = action.data;
        draft.task.loading = false;
        break;

      case LOAD_TASK_ERROR:
        draft.task.error = action.error;
        draft.task.loading = false;
        break;

      case LOAD_TASK_OFFERS_SUCCESS:
        draft.offers.data = action.data;
        draft.offers.loading = false;
        break;

      case LOAD_TASK_OFFERS_ERROR:
        draft.offers.loading = false;
        draft.offers.error = action.error;
        break;
    }
  });

export default taskPageReducer;
