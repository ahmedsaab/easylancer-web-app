import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfilePageDomain = state => state.profilePage || initialState;

export const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState,
  );

export const makeSelectProfilePageProfile = () =>
  createSelector(
    selectProfilePageDomain,
    subState => subState.profile,
  );

export const makeSelectProfilePageProfileProp = prop =>
  createSelector(
    makeSelectProfilePageProfile(),
    subState => subState[prop],
  );
