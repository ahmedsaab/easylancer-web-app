import {
  ACCEPT_OFFER,
  ACCEPT_OFFER_SUCCESS,
  ACCEPT_OFFER_ERROR,
  VIEW_OFFER,
} from 'elements/pages/OfferDetailsModal/constants';

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

export function viewOffer(offer) {
  return {
    type: VIEW_OFFER,
    offer,
  };
}
