import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/Modal/reducer';

/**
 * Direct selector to the modal state domain
 */

const selectModalDomain = state => state.modal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Modal
 */

const makeSelectModal = () =>
  createSelector(
    selectModalDomain,
    substate => substate,
  );

const makeSelectModalType = () =>
  createSelector(
    selectModalDomain,
    substate => substate.type,
  );

export default makeSelectModal;
export { selectModalDomain, makeSelectModalType };
