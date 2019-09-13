import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyTasksPageDomain = state => state.myTasksPage || initialState;

export const makeSelectMyTasksData = () =>
  createSelector(
    selectMyTasksPageDomain,
    state => state.data,
  );

export const makeSelectMyTasksLoading = () =>
  createSelector(
    selectMyTasksPageDomain,
    state => state.loading,
  );

export const makeSelectMyTasksError = () =>
  createSelector(
    selectMyTasksPageDomain,
    state => state.error,
  );
