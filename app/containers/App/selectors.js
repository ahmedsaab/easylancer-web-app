/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectGlobal = state => state.global || initialState;
const selectGlobalUser = state => state.global.user;
const selectGlobalDisabled = state => state.global.disabled;

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

const makeSelectGlobalSettings = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.settings,
  );

const makeSelectGlobalLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectGlobalUser,
  selectGlobalDisabled,
  makeSelectLoading,
  makeSelectError,
  selectGlobalUser,
  makeSelectGlobalLocation,
  makeSelectGlobalSettings,
};
