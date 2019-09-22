import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyTasksPageDomain = state => state.myTasksPage || initialState;

export const makeSelectMyTasksByList = list =>
  createSelector(
    selectMyTasksPageDomain,
    state => state[list],
  );
