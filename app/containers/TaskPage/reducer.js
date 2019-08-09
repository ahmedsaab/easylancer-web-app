import produce from 'immer';
import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_OFFERS_ERROR,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_OFFERS_SUCCESS,
  ACCEPT_OFFER,
  ACCEPT_OFFER_ERROR,
  ACCEPT_OFFER_SUCCESS,
  VIEW_OFFER,
} from 'containers/TaskPage/constants';

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
  offer: {
    data: null,
    actions: {
      hire: null,
      withdraw: null,
    },
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

      case VIEW_OFFER:
        draft.offer.data = draft.offers.data.find(
          offer => offer.id === action.offerId,
        );
        break;

      case ACCEPT_OFFER:
        draft.offer.actions.hire = 'loading';
        break;

      case ACCEPT_OFFER_SUCCESS:
        draft.offer.actions.hire = 'success';
        break;

      case ACCEPT_OFFER_ERROR:
        draft.offer.actions.hire = 'error';
        break;
    }
  });

export default taskPageReducer;
