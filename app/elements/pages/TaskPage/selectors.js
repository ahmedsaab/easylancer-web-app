import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/TaskPage/reducer';
import { selectGlobalUser } from 'elements/pages/App/selectors';

const selectDomain = state => state.taskPage || initialState;

const selectTaskData = state => state.taskPage.task.data;

const selectTaskDataAcceptedOffer = state =>
  state.taskPage.task.data.acceptedOffer;

//

const makeSelectTaskPage = () =>
  createSelector(
    selectDomain,
    domain => domain,
  );

const makeSelectTaskPageTask = () =>
  createSelector(
    selectDomain,
    domain => domain.task,
  );

const makeSelectTaskPageOffers = () =>
  createSelector(
    selectDomain,
    domain => domain.offers,
  );

const makeSelectTaskPageId = () =>
  createSelector(
    selectDomain,
    domain => domain.id,
  );

const makeSelectTaskPageTaskDataStatus = () =>
  createSelector(
    selectDomain,
    domain => domain.task.data.status,
  );

const makeSelectTaskPageUserIsTaskOwner = () =>
  createSelector(
    selectTaskData,
    selectGlobalUser,
    (task, user) => task && user && task.creatorUser.id === user.id,
  );

const makeSelectTaskPageTaskAcceptedOffer = () =>
  createSelector(
    selectDomain,
    domain => domain.task.data.acceptedOffer,
  );

export default makeSelectTaskPage;

export {
  selectTaskDataAcceptedOffer,
  makeSelectTaskPageTask,
  makeSelectTaskPageId,
  makeSelectTaskPageOffers,
  makeSelectTaskPageTaskDataStatus,
  makeSelectTaskPageTaskAcceptedOffer,
  makeSelectTaskPageUserIsTaskOwner,
};
