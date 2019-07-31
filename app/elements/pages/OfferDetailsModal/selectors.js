import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/OfferDetailsModal/reducer';

/**
 * Direct selector to the offerDetailsModal state domain
 */

const selectOfferDetailsModalDomain = state =>
  state.offerDetailsModal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OfferDetailsModal
 */

const makeSelectOfferDetailsModal = () =>
  createSelector(
    selectOfferDetailsModalDomain,
    substate => substate,
  );

export default makeSelectOfferDetailsModal;
export { selectOfferDetailsModalDomain };
