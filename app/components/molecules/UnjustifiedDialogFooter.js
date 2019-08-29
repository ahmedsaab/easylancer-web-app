import { withStyles } from '@material-ui/core';
import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';

const styles = () => ({
  root: {
    justifyContent: 'unset',
    display: 'flex',
  },
});

export default withStyles(styles)(props => {
  const { children, classes } = props;

  return <DialogActions className={classes.root}>{children}</DialogActions>;
});
