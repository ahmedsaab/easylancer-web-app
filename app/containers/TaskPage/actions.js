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
  CANCEL_TASK,
  CANCEL_TASK_SUCCESS,
  CANCEL_TASK_ERROR,
  UPDATE_CANCEL_MODAL_IS_OPEN,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  UPDATE_EDIT_MODAL_IS_OPEN,
  UPDATE_EDIT_MODAL_FORM_GENERAL,
  UPDATE_EDIT_MODAL_FORM_LOCATION,
  UPDATE_EDIT_MODAL_FORM_PUSH_TAG,
  UPDATE_EDIT_MODAL_FORM_REMOVE_TAG,
  UPDATE_EDIT_MODAL_IMAGES_LOADED,
  LOAD_EDIT_MODAL_IMAGES,
  FINISH_TASK_ERROR,
  FINISH_TASK_SUCCESS,
  FINISH_TASK,
  UPDATE_FINISH_MODAL_FORM_GENERAL,
  UPDATE_FINISH_MODAL_IS_OPEN,
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

export function updateCancelModalIsOpen(isOpen) {
  return {
    type: UPDATE_CANCEL_MODAL_IS_OPEN,
    isOpen,
  };
}

export function cancelTask() {
  return {
    type: CANCEL_TASK,
  };
}

export function cancelTaskSuccess() {
  return {
    type: CANCEL_TASK_SUCCESS,
  };
}

export function cancelTaskError(error) {
  return {
    type: CANCEL_TASK_ERROR,
    error,
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

export function updateEditModalFormGeneral(key, value) {
  return {
    type: UPDATE_EDIT_MODAL_FORM_GENERAL,
    key,
    value,
  };
}

export function updateEditModalFormLocation(address, location) {
  return {
    type: UPDATE_EDIT_MODAL_FORM_LOCATION,
    address,
    location,
  };
}

export function updateEditModalPushTag(tag) {
  return {
    type: UPDATE_EDIT_MODAL_FORM_PUSH_TAG,
    tag,
  };
}

export function updateEditModalRemoveTag(index) {
  return {
    type: UPDATE_EDIT_MODAL_FORM_REMOVE_TAG,
    index,
  };
}

export function loadEditModalImages(urls) {
  return {
    type: LOAD_EDIT_MODAL_IMAGES,
    urls,
  };
}

export function updateEditModalImagesLoaded(files) {
  return {
    type: UPDATE_EDIT_MODAL_IMAGES_LOADED,
    files,
  };
}

export function updateEditModalIsOpen(isOpen) {
  return {
    type: UPDATE_EDIT_MODAL_IS_OPEN,
    isOpen,
  };
}

export function editTask() {
  return {
    type: EDIT_TASK,
  };
}

export function editTaskSuccess() {
  return {
    type: EDIT_TASK_SUCCESS,
  };
}

export function editTaskError(error) {
  return {
    type: EDIT_TASK_ERROR,
    error,
  };
}

export function updateFinishModalIsOpen(isOpen) {
  return {
    type: UPDATE_FINISH_MODAL_IS_OPEN,
    isOpen,
  };
}

export function updateFinishModalFormGeneral(key, value) {
  return {
    type: UPDATE_FINISH_MODAL_FORM_GENERAL,
    key,
    value,
  };
}

export function finishTask() {
  return {
    type: FINISH_TASK,
  };
}

export function finishTaskSuccess() {
  return {
    type: FINISH_TASK_SUCCESS,
  };
}

export function finishTaskError(error) {
  return {
    type: FINISH_TASK_ERROR,
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
