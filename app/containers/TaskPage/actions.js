import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_OFFERS,
  LOAD_TASK_OFFERS_SUCCESS,
  LOAD_TASK_OFFERS_ERROR,
  ACCEPT_OFFER,
  ACCEPT_OFFER_ERROR,
  ACCEPT_OFFER_SUCCESS,
  VIEW_OFFER,
  SEND_OFFER,
  SEND_OFFER_FAIL,
  SEND_OFFER_SUCCESS,
  UPDATE_OFFER_MESSAGE,
  UPDATE_OFFER_PAYMENT,
  UPDATE_OFFER_PRICE,
  UPDATE_OFFER_FORM_IS_OPEN,
  RESET_OFFER_FORM_STATUS,
  UPDATE_ASSIGNED_MODAL_IS_OPEN,
  UPDATE_WITHDRAW_MODAL_IS_OPEN,
  WITHDRAW_OFFER,
  WITHDRAW_OFFER_SUCCESS,
  WITHDRAW_OFFER_ERROR,
} from 'containers/TaskPage/constants';

export function loadTask(id) {
  return {
    type: LOAD_TASK,
    id,
  };
}

export function loadTaskOffers(id) {
  return {
    type: LOAD_TASK_OFFERS,
    id,
  };
}

export function taskLoaded(data) {
  return {
    type: LOAD_TASK_SUCCESS,
    data,
  };
}

export function taskLoadingError(error) {
  return {
    type: LOAD_TASK_ERROR,
    error,
  };
}

export function taskOffersLoaded(data) {
  return {
    type: LOAD_TASK_OFFERS_SUCCESS,
    data,
  };
}

export function taskOffersLoadingError(error) {
  return {
    type: LOAD_TASK_OFFERS_ERROR,
    error,
  };
}

export function acceptOffer(offerId) {
  return {
    type: ACCEPT_OFFER,
    offerId,
  };
}

export function acceptOfferSuccess() {
  return {
    type: ACCEPT_OFFER_SUCCESS,
  };
}

export function acceptOfferError(error) {
  return {
    type: ACCEPT_OFFER_ERROR,
    error,
  };
}

export function viewOffer(offerId) {
  return {
    type: VIEW_OFFER,
    offerId,
  };
}

export function updateOfferModalPrice(price) {
  return {
    type: UPDATE_OFFER_PRICE,
    price,
  };
}

export function updateOfferModalPayment(payment) {
  return {
    type: UPDATE_OFFER_PAYMENT,
    payment,
  };
}

export function updateOfferModalMessage(message) {
  return {
    type: UPDATE_OFFER_MESSAGE,
    message,
  };
}

export function resetOfferFormStatusModal() {
  return {
    type: RESET_OFFER_FORM_STATUS,
  };
}

export function updateOfferFormModalIsOpen(isOpen) {
  return {
    type: UPDATE_OFFER_FORM_IS_OPEN,
    isOpen,
  };
}

export function updateAssignedModalIsOpen(isOpen) {
  return {
    type: UPDATE_ASSIGNED_MODAL_IS_OPEN,
    isOpen,
  };
}

export function updateWithdrawModalIsOpen(isOpen) {
  return {
    type: UPDATE_WITHDRAW_MODAL_IS_OPEN,
    isOpen,
  };
}

export function withdrawOffer() {
  return {
    type: WITHDRAW_OFFER,
  };
}

export function withdrawOfferSuccess() {
  return {
    type: WITHDRAW_OFFER_SUCCESS,
  };
}

export function withdrawOfferError(error) {
  return {
    type: WITHDRAW_OFFER_ERROR,
    error,
  };
}

export function sendOfferModal() {
  return {
    type: SEND_OFFER,
  };
}

export function offerSentSuccess() {
  return {
    type: SEND_OFFER_SUCCESS,
  };
}

export function offerSentError(error) {
  return {
    type: SEND_OFFER_FAIL,
    error,
  };
}
