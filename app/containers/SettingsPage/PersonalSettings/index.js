import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core';
import {
  makeSelectSettingsPageFormData,
  makeSelectSettingsPageFormExpanded,
  makeSelectSettingsPageFormLoading,
  makeSelectSettingsPageSettingsData,
} from 'containers/SettingsPage/selectors';
import { formatProfileCreatedAtDate } from 'utils/date-time-helpers';
import { capitalizeFirst } from 'utils/string';
import { EditNamePanel } from 'containers/SettingsPage/PersonalSettings/EditNamePanel';
import {
  saveUserSettings,
  updateUserSettings,
  updateUserSettingsPanel,
} from 'containers/SettingsPage/actions';
import { useSnackbar } from 'notistack';
import { GenderPanel } from 'containers/SettingsPage/PersonalSettings/GenderPanel';
import ExpandableList from '../ExpandableList';
import { BirthdayPanel } from 'containers/SettingsPage/PersonalSettings/BirthdayPanel';
import { LocationPanel } from 'containers/SettingsPage/PersonalSettings/LocationPanel';

const useStyles = makeStyles(theme => ({
  unset: {
    fontStyle: 'italic',
  },
}));

function getLocationDiv(location, unsetClass) {
  if (location.city && location.country) {
    return <div>{`${location.city}, ${location.country}`}</div>;
  }
  return <div className={unsetClass}>Unset</div>;
}

function getPhoneDiv(phoneNumber, unsetClass) {
  if (phoneNumber) {
    return <div>{phoneNumber}</div>;
  }
  return <div className={unsetClass}>Unset</div>;
}

function PersonalSettings({
  data,
  form,
  loading,
  expanded,
  setExpanded,
  onUpdate,
  onSave,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function createAlertMethod(successMessage) {
    return success => {
      if (success) {
        enqueueSnackbar(successMessage, {
          variant: 'success',
        });
      } else {
        enqueueSnackbar('Something bad happened, please try again later', {
          variant: 'error',
        });
      }
    };
  }

  function onSaveName() {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
    };
    const message = `Nice to meet you ${form.firstName} ${form.lastName}`;

    onSave(payload, createAlertMethod(message));
  }

  function onSaveGender() {
    const payload = {
      gender: form.gender,
    };
    const message = `Good to know`;

    onSave(payload, createAlertMethod(message));
  }

  function onSaveBirthday() {
    const payload = {
      birthDate: form.birthDate,
    };
    const message = `We will make sure to remember that :)`;

    onSave(payload, createAlertMethod(message));
  }

  function onSaveLocation() {
    const payload = {
      location: form.location,
    };
    const message = `${form.location.city} is a great city!`;

    onSave(payload, createAlertMethod(message));
  }

  return (
    <ExpandableList
      expanded={expanded}
      setExpanded={setExpanded}
      panels={[
        {
          key: 'name',
          primaryTitle: 'Name',
          secondaryTitle: `${data.firstName} ${data.lastName}`,
          content: (
            <EditNamePanel
              isLoading={loading}
              settings={{
                firstName: data.firstName,
                lastName: data.lastName,
              }}
              form={{
                firstName: form.firstName,
                lastName: form.lastName,
              }}
              onUpdateField={onUpdate}
              onSave={onSaveName}
            />
          ),
        },
        {
          key: 'gender',
          primaryTitle: 'Gender',
          secondaryTitle: capitalizeFirst(data.gender),
          content: (
            <GenderPanel
              isLoading={loading}
              settings={{ gender: data.gender }}
              form={{ gender: form.gender }}
              onUpdateField={onUpdate}
              onSave={onSaveGender}
            />
          ),
        },
        {
          key: 'birthday',
          primaryTitle: 'Birthday',
          secondaryTitle: formatProfileCreatedAtDate(data.birthDate),
          content: (
            <BirthdayPanel
              isLoading={loading}
              settings={{ birthDate: data.birthDate }}
              form={{ birthDate: form.birthDate }}
              onUpdateField={onUpdate}
              onSave={onSaveBirthday}
            />
          ),
        },
        {
          key: 'location',
          primaryTitle: 'Location',
          secondaryTitle: getLocationDiv(data.location, classes.unset),
          content: (
            <LocationPanel
              isLoading={loading}
              settings={{ location: data.location }}
              form={{ location: form.location }}
              onUpdateField={onUpdate}
              onSave={onSaveLocation}
            />
          ),
        },
        {
          key: 'phone',
          primaryTitle: 'Phone',
          secondaryTitle: getPhoneDiv(data.phoneNumber, classes.unset),
          content: <div>Yo</div>,
        },
      ]}
    />
  );
}

PersonalSettings.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
  expanded: PropTypes.any,
  setExpanded: PropTypes.func,
  onUpdate: PropTypes.func,
  onSave: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSettingsPageSettingsData(),
  form: makeSelectSettingsPageFormData(),
  loading: makeSelectSettingsPageFormLoading(),
  expanded: makeSelectSettingsPageFormExpanded(),
});

const mapDispatchToProps = dispatch => ({
  onUpdate: (key, value) => dispatch(updateUserSettings(key, value)),
  onSave: (payload, onAlert) => dispatch(saveUserSettings(payload, onAlert)),
  setExpanded: panel => dispatch(updateUserSettingsPanel(panel)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PersonalSettings);
