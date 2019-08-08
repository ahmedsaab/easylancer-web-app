/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/App/reducer';

const selectGlobal = state => state.global || initialState;
const selectGlobalUser = state => state.global.user;

const selectRouter = state => state.router;

const makeSelectGlobalUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectGlobalLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectGlobalUser,
  makeSelectLoading,
  makeSelectError,
  selectGlobalUser,
  makeSelectGlobalLocation,
};
