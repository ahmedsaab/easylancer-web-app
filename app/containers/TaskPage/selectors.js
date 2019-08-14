import { createSelector } from 'reselect';
import { initialState } from 'containers/TaskPage/reducer';
import { selectGlobalUser } from 'containers/App/selectors';

const selectDomain = state => state.taskPage || initialState;

const selectTaskPageTaskData = state =>
  (state.taskPage || initialState).task.data;
const selectTaskPageTaskLoading = state =>
  (state.taskPage || initialState).task.loading;
const selectTaskPageTaskError = state =>
  (state.taskPage || initialState).task.error;

const selectTaskPageOffersData = state =>
  (state.taskPage || initialState).offers.data;
const selectTaskPageOffersLoading = state =>
  (state.taskPage || initialState).offers.loading;
const selectTaskPageOffersError = state =>
  (state.taskPage || initialState).offers.error;

const selectTaskPageOfferData = state =>
  (state.taskPage || initialState).offer.data;
const selectTaskPageOfferActions = state =>
  (state.taskPage || initialState).offer.actions;
const selectTaskPageOfferActionsHire = state =>
  (state.taskPage || initialState).offer.actions.hire;
const selectTaskPageOfferFormData = state =>
  (state.taskPage || initialState).offer.form.data;
const selectTaskPageOfferFormStatus = state =>
  (state.taskPage || initialState).offer.form.status;

const makeSelectTaskPageUserIsTaskOwner = () =>
  createSelector(
    selectTaskPageTaskData,
    selectGlobalUser,
    (task, user) => task && user && task.creatorUser.id === user.id,
  );

const makeSelectOfferIsAssigned = () =>
  createSelector(
    selectTaskPageOfferData,
    selectTaskPageTaskData,
    (offer, task) => offer.id === task.acceptedOffer,
  );

export {
  selectTaskPageTaskData,
  selectTaskPageTaskError,
  selectTaskPageTaskLoading,
  selectTaskPageOffersData,
  selectTaskPageOffersError,
  selectTaskPageOffersLoading,
  selectTaskPageOfferData,
  selectTaskPageOfferActions,
  selectTaskPageOfferActionsHire,
  selectTaskPageOfferFormData,
  selectTaskPageOfferFormStatus,
  makeSelectTaskPageUserIsTaskOwner,
  makeSelectOfferIsAssigned,
};
