import produce from 'immer';
import {
  SEND_FAIL,
  SEND_OFFER,
  SEND_SUCCESS,
  UPDATE_MESSAGE,
  UPDATE_PAYMENT,
  UPDATE_PRICE,
} from 'elements/pages/CreateOfferModal/constants';

export const initialState = {
  message: '',
  price: 0,
  payment: 'card',
  status: null,
};

/* eslint-disable default-case, no-param-reassign */
const createOfferModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_PRICE:
        draft.price = action.price;
        break;

      case UPDATE_PAYMENT:
        draft.payment = action.payment;
        break;

      case UPDATE_MESSAGE:
        draft.message = action.message;
        break;

      case SEND_OFFER:
        draft.status = 'loading';
        break;

      case SEND_SUCCESS:
        draft.status = 'success';
        break;

      case SEND_FAIL:
        draft.status = 'failed';
        break;
    }
  });

export default createOfferModalReducer;
