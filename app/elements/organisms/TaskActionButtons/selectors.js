import { createSelector } from 'reselect';
import { initialState } from 'elements/organisms/TaskActionButtons/reducer';

const selectTaskActionButtonsDomain = state =>
  state.taskActionButtons || initialState;

const makeSelectTaskActionButtons = () =>
  createSelector(
    selectTaskActionButtonsDomain,
    substate => substate,
  );

const selectTaskActionButtonsDisabled = () =>
  createSelector(
    selectTaskActionButtonsDomain,
    substate => substate.disabled,
  );

export default makeSelectTaskActionButtons;
export { selectTaskActionButtonsDomain, selectTaskActionButtonsDisabled };
