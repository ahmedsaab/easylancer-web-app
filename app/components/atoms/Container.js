import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0.25, 0.25, 0.25, 0.25),
    maxWidth: '1000px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function Container({ children, className }) {
  const classes = useStyles();

  return <div className={clsx(classes.container, className)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
