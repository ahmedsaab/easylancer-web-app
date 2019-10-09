import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettingsPageDomain = state => state.settingsPage || initialState;

const makeSelectSettingsPageSettings = () =>
  createSelector(
    selectSettingsPageDomain,
    subState => subState.settings,
  );

const makeSelectSettingsPageFrom = () =>
  createSelector(
    selectSettingsPageDomain,
    subState => subState.form,
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

export const makeSelectSettingsPageFormData = () =>
  createSelector(
    makeSelectSettingsPageFrom(),
    subState => subState.data,
  );


export const makeSelectSettingsPageFormLoading = () =>
  createSelector(
    makeSelectSettingsPageFrom(),
    subState => subState.loading,
  );

export const makeSelectSettingsPageFormExpanded = () =>
  createSelector(
    makeSelectSettingsPageFrom(),
    subState => subState.expanded,
  );
