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
const selectTaskPageOfferFormIsOpen = state =>
  (state.taskPage || initialState).offer.form.isOpen;

const selectTaskPageAssignedModalIsOpen = state =>
  (state.taskPage || initialState).offer.assignedModalIsOpen;

const selectTaskPageWithdrawModalIsOpen = state =>
  (state.taskPage || initialState).offer.withdrawModal.isOpen;
const selectTaskPageWithdrawModalIsLoading = state =>
  (state.taskPage || initialState).offer.withdrawModal.isLoading;

const selectTaskPageCancelModalIsOpen = state =>
  (state.taskPage || initialState).cancelModal.isOpen;
const selectTaskPageCancelModalIsLoading = state =>
  (state.taskPage || initialState).cancelModal.isLoading;

const selectTaskPageEditModalIsOpen = state =>
  (state.taskPage || initialState).editModal.isOpen;
const selectTaskPageEditModalIsDirty = state =>
  (state.taskPage || initialState).editModal.isDirty;
const selectTaskPageEditModalIsLoading = state =>
  (state.taskPage || initialState).editModal.isLoading;
const selectTaskPageEditModalForm = state =>
  (state.taskPage || initialState).editModal.form;

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
  selectTaskPageOfferFormIsOpen,
  selectTaskPageAssignedModalIsOpen,
  selectTaskPageWithdrawModalIsOpen,
  selectTaskPageWithdrawModalIsLoading,
  selectTaskPageEditModalIsOpen,
  selectTaskPageEditModalIsDirty,
  selectTaskPageEditModalIsLoading,
  selectTaskPageEditModalForm,
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageCancelModalIsOpen,
  selectTaskPageCancelModalIsLoading,
  makeSelectOfferIsAssigned,
};
