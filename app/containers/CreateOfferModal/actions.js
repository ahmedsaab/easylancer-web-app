/*
 *
 * CreateOfferModal actions
 *
 */

import {
  SEND_OFFER,
  UPDATE_MESSAGE,
  UPDATE_PAYMENT,
  UPDATE_PRICE,
  SEND_SUCCESS,
  SEND_FAIL,
} from 'containers/CreateOfferModal/constants';

export function updateOfferModalPrice(price) {
  return {
    type: UPDATE_PRICE,
    price,
  };
}

export function updateOfferModalPayment(payment) {
  return {
    type: UPDATE_PAYMENT,
    payment,
  };
}

export function updateOfferModalMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
}

export function sendOfferModal() {
  return {
    type: SEND_OFFER,
  };
}

export function offerSentSuccess() {
  return {
    type: SEND_SUCCESS,
  };
}

export function offerSentError(error) {
  return {
    type: SEND_FAIL,
    error,
  };
}
