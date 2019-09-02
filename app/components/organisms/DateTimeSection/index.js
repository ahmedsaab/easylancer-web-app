import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';

import 'components/organisms/DateTimeSection/style-temp-fix.css';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
  },
}));

export function DateTimeSection({ dateTime, onAccept, onError }) {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        autoOk
        className={classes.field}
        value={dateTime}
        onAccept={onAccept}
        onError={onError}
        onChange={() => {}}
        inputVariant="outlined"
        label="Date & Time"
        clearable
        hideTabs
        minDateMessage="Are you a time traveler?"
        strictCompareDates
        variant="dialog"
        disablePast
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <EventIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

DateTimeSection.propTypes = {
  dateTime: PropTypes.instanceOf(moment),
  onAccept: PropTypes.func,
  onError: PropTypes.func,
};
