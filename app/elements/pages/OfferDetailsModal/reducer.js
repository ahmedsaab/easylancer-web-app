/*
 *
 * OfferDetailsModal reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from 'elements/pages/OfferDetailsModal/constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const offerDetailsModalReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default offerDetailsModalReducer;
