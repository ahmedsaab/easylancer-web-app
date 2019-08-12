import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createTaskModal state domain
 */

const selectCreateTaskModalDomain = state =>
  state.createTaskModal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateTaskModal
 */

const makeSelectCreateTaskModal = () =>
  createSelector(
    selectCreateTaskModalDomain,
    substate => substate,
  );

export default makeSelectCreateTaskModal;
export { selectCreateTaskModalDomain };
