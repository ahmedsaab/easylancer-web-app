/*
 *
 * OfferDetailsModal reducer
 *
 */
import produce from 'immer';
import {
  ACCEPT_OFFER,
  ACCEPT_OFFER_ERROR,
  ACCEPT_OFFER_SUCCESS,
  VIEW_OFFER,
} from 'elements/pages/OfferDetailsModal/constants';

export const initialState = {
  isSending: false,
  offer: null,
};

/* eslint-disable default-case, no-param-reassign */
const offerDetailsModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACCEPT_OFFER:
        draft.isSending = true;
        break;
      case VIEW_OFFER:
        draft.offer = action.offer;
        break;
      case ACCEPT_OFFER_SUCCESS:
        draft.isSending = false;
        break;
      case ACCEPT_OFFER_ERROR:
        draft.isSending = false;
        break;
    }
  });

export default offerDetailsModalReducer;
