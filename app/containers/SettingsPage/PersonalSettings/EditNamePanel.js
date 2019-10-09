import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Panel } from 'containers/SettingsPage/PersonalSettings/Panel';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
    flex: 1,
  },
  input: {
    padding: '14px',
  },
  textFields: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
}));

export function EditNamePanel({
  settings,
  form,
  isLoading,
  onUpdateField,
  onSave,
}) {
  const classes = useStyles();
  const isInvalid = !(form.firstName && form.lastName);

  return (
    <Panel
      isLoading={isLoading}
      onSave={onSave}
      settings={settings}
      form={form}
      isInvalid={isInvalid}
    >
      <div className={classes.textFields}>
        <TextField
          label="First Name"
          className={classes.field}
          value={form.firstName}
          onChange={event => {
            onUpdateField('firstName', event.target.value);
          }}
          margin="none"
          variant="outlined"
          fullWidth
          inputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Last Name"
          className={classes.field}
          value={form.lastName}
          onChange={event => {
            onUpdateField('lastName', event.target.value);
          }}
          margin="none"
          variant="outlined"
          fullWidth
          inputProps={{
            className: classes.input,
          }}
        />
      </div>
    </Panel>
  );
}

EditNamePanel.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onUpdateField: PropTypes.func,
};
