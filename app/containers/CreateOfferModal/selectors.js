import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateOfferModalDomain = state =>
  state.createOfferModal || initialState;

const makeSelectCreateOfferModal = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => subState,
  );

const makeSelectCreateOfferModalPrice = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => subState.price,
  );

const makeSelectCreateOfferModalMessage = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => subState.message,
  );

const makeSelectCreateOfferModalPayment = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => subState.payment,
  );

const makeSelectCreateOfferModalStatus = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => subState.status,
  );

const makeSelectCreateOfferModalOffer = () =>
  createSelector(
    selectCreateOfferModalDomain,
    subState => ({
      message: subState.message,
      price: subState.price,
      paymentMethod: subState.payment,
    }),
  );

export default makeSelectCreateOfferModal;

export {
  makeSelectCreateOfferModal,
  makeSelectCreateOfferModalPrice,
  makeSelectCreateOfferModalMessage,
  makeSelectCreateOfferModalPayment,
  makeSelectCreateOfferModalStatus,
  makeSelectCreateOfferModalOffer,
};
