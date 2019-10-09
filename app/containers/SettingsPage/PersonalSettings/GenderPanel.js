import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SelectDropDown from 'components/molecules/SelectDropDown';
import { Panel } from 'containers/SettingsPage/PersonalSettings/Panel';
import { genders } from '../constants';

const useStyles = makeStyles(theme => ({
  field: {
    width: '100%',
    marginBottom: theme.spacing(3),
    flex: 1,
  },
  input: {
    padding: '14px',
  },
}));

export function GenderPanel({
  settings,
  form,
  isLoading,
  onUpdateField,
  onSave,
}) {
  const classes = useStyles();

  return (
    <Panel
      isLoading={isLoading}
      onSave={onSave}
      settings={settings}
      form={form}
    >
      <SelectDropDown
        onSelect={g => {
          onUpdateField('gender', g.value);
        }}
        selected={genders.find(g => g.value === form.gender)}
        selection={genders}
        className={classes.field}
        inputClassName={classes.input}
      />
    </Panel>
  );
}

GenderPanel.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onUpdateField: PropTypes.func,
};
