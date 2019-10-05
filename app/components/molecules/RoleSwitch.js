import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { blue, red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  footerControls: {
    display: 'flex',
  },
  roleSwitch: {
    margin: 'auto 0 auto auto',
  },
  toggleLabel: {
    fontSize: '0.6rem',
  },
}));

const ModeSwitch = withStyles({
  switchBase: {
    color: red[500],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: red[500],
  },
})(Switch);

export default function RoleSwitch({ role, onUpdate }) {
  const classes = useStyles();
  const { toggleLabel } = classes;

  return (
    <FormControlLabel
      className={classes.roleSwitch}
      value="bottom"
      control={
        <ModeSwitch
          checked={role === 'WORKER'}
          onChange={onUpdate}
          color="primary"
        />
      }
      label={role}
      labelPlacement="bottom"
      classes={{ label: toggleLabel }}
    />
  );
}

RoleSwitch.propTypes = {
  role: PropTypes.string,
  onUpdate: PropTypes.func,
};
