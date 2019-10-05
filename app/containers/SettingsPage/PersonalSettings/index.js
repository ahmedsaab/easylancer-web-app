import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core';
import { makeSelectSettingsPageSettingsData } from 'containers/SettingsPage/selectors';
import ExpandableList from '../ExpandableList';

const useStyles = makeStyles(theme => ({}));

function PersonalSettings({ data }) {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    gender,
    phoneNumber,
    birthDate,
    location,
    isApproved,
  } = data;

  return (
    <ExpandableList />
  );
}

PersonalSettings.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSettingsPageSettingsData(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PersonalSettings);
