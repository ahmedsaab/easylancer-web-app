import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'block',
    height: '5px',
  },
}));

export function LoadingBar({ isLoading, className }) {
  const classes = useStyles();

  if (isLoading) {
    return <LinearProgress className={`${classes.loader} ${className}`} />;
  }

  return <div className={`${classes.loader} ${className}`} />;
}

LoadingBar.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};
