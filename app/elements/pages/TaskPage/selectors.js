import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/TaskPage/reducer';

const selectTaskPageDomain = state => state.taskPage || initialState;
const selectTaskPageTask = state => state.task || initialState.task;
const selectTaskPageOffers = state => state.offers || initialState.offers;

const makeSelectTaskPage = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState,
  );

const makeSelectTaskPageTask = () =>
  createSelector(
    selectTaskPageDomain,
    selectTaskPageTask,
  );

const makeSelectTaskPageTaskStatus = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.task.data.status,
  );

const makeSelectTaskPageTaskAcceptedOffer = () =>
  createSelector(
    selectTaskPageDomain,
    subState => subState.task.data.acceptedOffer,
  );

const makeSelectTaskPageOffers = () =>
  createSelector(
    selectTaskPageDomain,
    selectTaskPageOffers,
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
  makeSelectTaskPageTaskStatus,
  makeSelectTaskPageTaskAcceptedOffer,
};
