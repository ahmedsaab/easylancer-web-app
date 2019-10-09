import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Panel } from 'containers/SettingsPage/PersonalSettings/Panel';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
    flex: 1,
  },
}));

export function BirthdayPanel({
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          autoOk
          className={classes.field}
          fullWidth
          disableFuture
          openTo="year"
          format="DD.MM.YYYY"
          views={['year', 'month', 'date']}
          value={form.birthDate}
          onChange={dateTime => {
            onUpdateField('birthDate', dateTime);
          }}
          inputVariant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <CakeOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiPickersUtilsProvider>
    </Panel>
  );
}

BirthdayPanel.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onUpdateField: PropTypes.func,
};
