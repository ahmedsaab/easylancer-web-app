import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSearchPageDomain = state => state.searchPage || initialState;

const makeSelectSearchPage = () =>
  createSelector(
    selectSearchPageDomain,
    subState => subState,
  );

const makeSelectSearchData = () =>
  createSelector(
    selectSearchPageDomain,
    subState => subState.data,
  );

const makeSelectSearchFilters = () =>
  createSelector(
    selectSearchPageDomain,
    subState => subState.filters,
  );

export default makeSelectSearchPage;

export {
  selectSearchPageDomain,
  makeSelectSearchFilters,
  makeSelectSearchData,
};
