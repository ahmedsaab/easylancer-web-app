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
  UPDATE_ASSIGNED_MODAL_IS_OPEN,
  UPDATE_WITHDRAW_MODAL_IS_OPEN,
  RESET_OFFER_FORM_STATUS,
  UPDATE_OFFER_FORM_IS_OPEN,
  WITHDRAW_OFFER,
  WITHDRAW_OFFER_SUCCESS,
  WITHDRAW_OFFER_ERROR,
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
    withdrawModal: {
      isOpen: false,
      isLoading: false,
    },
    assignedModalIsOpen: false,
    data: null,
    actions: {
      hire: null,
      withdraw: null,
    },
    form: {
      data: {
        message: '',
        price: '',
        payment: 'card',
      },
      status: null,
      isOpen: false,
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

      case RESET_OFFER_FORM_STATUS:
        draft.offer.form.status = initialState.offer.form.status;
        break;

      case UPDATE_OFFER_FORM_IS_OPEN:
        if (action.isOpen) {
          draft.offer.form.isOpen = true;
        } else {
          draft.offer.form = initialState.offer.form;
        }
        break;

      case UPDATE_ASSIGNED_MODAL_IS_OPEN:
        draft.offer.assignedModalIsOpen = action.isOpen;
        break;

      case WITHDRAW_OFFER:
        draft.offer.withdrawModal.isLoading = true;
        break;

      case UPDATE_WITHDRAW_MODAL_IS_OPEN:
        draft.offer.withdrawModal.isOpen = action.isOpen;
        break;

      case WITHDRAW_OFFER_SUCCESS:
      case WITHDRAW_OFFER_ERROR:
        draft.offer.withdrawModal.isLoading = false;
        draft.offer.withdrawModal.isOpen = false;
        break;
    }
  });

export default taskPageReducer;
