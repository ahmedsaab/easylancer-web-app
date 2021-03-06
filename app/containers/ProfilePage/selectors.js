import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfilePageDomain = state => state.profilePage || initialState;

export const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState,
  );

export const makeSelectProfilePageId = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.id,
  );

export const makeSelectProfilePageProfile = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.profile,
  );

export const makeSelectProfilePageEditModal = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.editModal,
  );

export const makeSelectProfilePageProfileProp = prop =>
  createSelector(
    makeSelectProfilePageProfile(),
    subState => subState[prop],
  );

export const makeSelectProfilePageEditModalProp = prop =>
  createSelector(
    makeSelectProfilePageEditModal(),
    subState => subState[prop],
  );

export const makeSelectProfilePageOwnerReviews = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.ownerReviews,
  );

export const makeSelectProfilePageWorkerReviews = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.workerReviews,
  );
