import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4, 2, 4, 2),
    fontSize: '2.5rem',
    fontWeight: 500,
  },
}));

export default function Title({ children, className }) {
  const classes = useStyles();

  return <div className={clsx(classes.container, className)}>{children}</div>;
}

Title.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
