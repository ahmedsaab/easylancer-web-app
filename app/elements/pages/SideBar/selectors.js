import { createSelector } from 'reselect';
import { initialState } from 'elements/pages/SideBar/reducer';

const selectNavBarDomain = state => state.sideNavBar || initialState;

const makeSelectNavBarVisible = () =>
  createSelector(
    selectNavBarDomain,
    subState => subState.isOpen,
  );

export default selectNavBarDomain;

export { makeSelectNavBarVisible };
