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
