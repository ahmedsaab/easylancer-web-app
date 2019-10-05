import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettingsPageDomain = state => state.settingsPage || initialState;

const makeSelectSettingsPageSettings = () =>
  createSelector(
    selectSettingsPageDomain,
    subState => subState.settings,
  );

export const makeSelectSettingsPageSettingsLoading = () =>
  createSelector(
    makeSelectSettingsPageSettings(),
    subState => subState.loading,
  );

export const makeSelectSettingsPageSettingsError = () =>
  createSelector(
    makeSelectSettingsPageSettings(),
    subState => subState.error,
  );

export const makeSelectSettingsPageSettingsData = () =>
  createSelector(
    makeSelectSettingsPageSettings(),
    subState => subState.data,
  );
