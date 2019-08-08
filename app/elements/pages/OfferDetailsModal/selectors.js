import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/OfferDetailsModal/reducer';
import { selectTaskDataAcceptedOffer } from 'elements/pages/TaskPage/selectors';

const selectOfferDetailsModalDomain = state =>
  state.offerDetailsModal || initialState;

const selectOfferDetailsId = state => state.offerDetailsModal.offer.id;
//

const makeSelectOfferDetailsModal = () =>
  createSelector(
    selectOfferDetailsModalDomain,
    domain => domain,
  );

const makeSelectOfferDetailsIsAssigned = () =>
  createSelector(
    selectOfferDetailsId,
    selectTaskDataAcceptedOffer,
    (offerId, acceptedOfferId) => offerId === acceptedOfferId,
  );

const makeSelectOfferDetailsIsSending = () =>
  createSelector(
    selectOfferDetailsModalDomain,
    domain => domain.isSending,
  );

const makeSelectOfferDetailsendError = () =>
  createSelector(
    selectOfferDetailsModalDomain,
    domain => domain.sendError,
  );

const makeSelectOfferDetailsOffer = () =>
  createSelector(
    selectOfferDetailsModalDomain,
    domain => domain.offer,
  );

export default makeSelectOfferDetailsModal;
export {
  selectOfferDetailsModalDomain,
  makeSelectOfferDetailsIsSending,
  makeSelectOfferDetailsOffer,
  makeSelectOfferDetailsendError,
  makeSelectOfferDetailsIsAssigned,
};
