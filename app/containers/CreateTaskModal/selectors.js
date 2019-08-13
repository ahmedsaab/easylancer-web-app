import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateTaskModalDomain = state =>
  state.createTaskModal || initialState;

const makeSelectCreateTaskModalFrom = () =>
  createSelector(
    selectCreateTaskModalDomain,
    state => state.form,
  );

const makeSelectCreateTaskModalLoading = () =>
  createSelector(
    selectCreateTaskModalDomain,
    state => state.loading,
  );

const makeSelectCreateTaskModalError = () =>
  createSelector(
    selectCreateTaskModalDomain,
    state => state.error,
  );

export {
  makeSelectCreateTaskModalFrom,
  makeSelectCreateTaskModalLoading,
  makeSelectCreateTaskModalError,
};
