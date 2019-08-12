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
  SEND_OFFER_FAIL,
  SEND_OFFER,
  SEND_OFFER_SUCCESS,
  UPDATE_OFFER_MESSAGE,
  UPDATE_OFFER_PAYMENT,
  UPDATE_OFFER_PRICE,
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
    form: {
      data: {
        message: '',
        price: 0,
        payment: 'card',
      },
      status: null,
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

      case UPDATE_OFFER_PRICE:
        draft.offer.form.data.price = action.price;
        break;

      case UPDATE_OFFER_PAYMENT:
        draft.offer.form.data.payment = action.payment;
        break;

      case UPDATE_OFFER_MESSAGE:
        draft.offer.form.data.message = action.message;
        break;

      case SEND_OFFER:
        draft.offer.form.status = 'loading';
        break;

      case SEND_OFFER_SUCCESS:
        draft.offer.form.status = 'success';
        break;

      case SEND_OFFER_FAIL:
        draft.offer.form.status = 'failed';
        break;
    }
  });

export default taskPageReducer;
