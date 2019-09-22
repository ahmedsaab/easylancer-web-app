import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import Bold from 'components/atoms/Bold';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'left',
    fontSize: '0.8rem',
    color: '#5f5f5f',
    lineHeight: '35px',
  },
  number: {
    padding: theme.spacing(0, 0.5),
    color: 'black',
  },
}));

export function StatisticFooter({ number, status }) {
  const classes = useStyles();
  let message = '';

  if (number && status === 'OPEN') {
    message = (
      <div>
        You have received<Bold className={classes.number}>{number}</Bold>offer
        {number > 1 ? 's' : ''} so far.
      </div>
    );
  } else if (number) {
    message = (
      <div>
        You received a total of<Bold className={classes.number}>{number}</Bold>
        offer{number > 1 ? 's' : ''} on this task.
      </div>
    );
  } else if (status === 'OPEN') {
    message = 'You have not received any offer yet.';
  } else {
    message = 'You did not received any offers.';
  }

  return <div className={classes.container}>{message}</div>;
}

StatisticFooter.propTypes = {
  number: PropTypes.number,
  status: PropTypes.string,
};
