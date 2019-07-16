import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNavBarDomain = state => state.sideNavBar || initialState;

const makeSelectNavBarVisible = () =>
  createSelector(
    selectNavBarDomain,
    subState => subState.isOpen,
  );

export default selectNavBarDomain;

export { makeSelectNavBarVisible };
