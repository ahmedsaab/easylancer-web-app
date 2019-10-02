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

export const makeSelectProfilePageReviews = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.reviews,
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

export const makeSelectProfilePageReviewsProp = prop =>
  createSelector(
    makeSelectProfilePageReviews(),
    subState => subState[prop],
  );
