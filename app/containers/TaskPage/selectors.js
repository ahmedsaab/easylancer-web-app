import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTaskPageDomain = state => state.taskPage || initialState;

const makeSelectTaskPage = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState,
  );

const makeSelectTaskPageTask = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.data,
  );

const makeSelectTaskPageError = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.error,
  );

const makeSelectTaskPageLoading = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.loading,
  );

const makeSelectTaskPageId = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.id,
  );

export default makeSelectTaskPage;

export {
  selectTaskPageDomain,
  makeSelectTaskPageTask,
  makeSelectTaskPageError,
  makeSelectTaskPageLoading,
  makeSelectTaskPageId,
};
