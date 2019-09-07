import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Bold from 'components/atoms/Bold';

const useStyles = makeStyles(theme => ({
  attentionIcon: {
    color: '#bba83c',
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
  attentionPaper: {
    padding: theme.spacing(2, 2, 3, 2),
    margin: theme.spacing(0, 0, 4, 0),
    backgroundColor: 'rgba(255,229,100,0.3)',
    fontSize: '0.8rem',
    borderLeftColor: '#ffe564',
    borderLeftWidth: '9px',
    borderLeftStyle: 'solid',
  },
  attentionHeader: {
    paddingBottom: theme.spacing(1),
    fontSize: '0.9rem',
  },
  contentPaper: {
    padding: theme.spacing(3, 2),
  },
  iconText: {
    verticalAlign: 'text-top',
  },
}));

export default function AttentionSection({ className, children }) {
  const classes = useStyles();

  return (
    <div className={`${classes.attentionPaper} ${className}`}>
      <div className={classes.attentionHeader}>
        <WarningIcon className={classes.attentionIcon} />
        <Bold className={classes.iconText}>Note</Bold>
      </div>
      {children}
    </div>
  );
}

AttentionSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
