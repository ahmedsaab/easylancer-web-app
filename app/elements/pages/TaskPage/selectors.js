import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/TaskPage/reducer';

const selectTaskPageDomain = state => state.taskPage || initialState;

const makeSelectTaskPage = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState,
  );

const makeSelectTaskPageTask = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.task,
  );

const makeSelectTaskPageOffers = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.offers,
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
  makeSelectTaskPageId,
  makeSelectTaskPageOffers,
};
