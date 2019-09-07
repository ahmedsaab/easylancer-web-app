import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Bold from 'components/atoms/Bold';
import Attention from 'components/molecules/Attention';
import moment from 'moment';

const useStyles = makeStyles({
  attention: {
    margin: '-0.5rem -15px 10px -15px',
  },
});

/**
 * @return {null}
 */
export default function AttentionHeader({ task }) {
  const classes = useStyles();

  if (task.status !== 'pending') {
    return null;
  }

  const creatorLike = task.creatorRating && task.creatorRating.like;
  const workerLike = task.workerRating && task.workerRating.like;
  const forecastStatus = creatorLike || workerLike ? 'Done' : 'Not Done';
  const pendingUser = task.creatorRating ? 'Worker' : 'Owner';

  let forecastDate = moment(
    (task.creatorRating && task.creatorRating.createdAt) ||
      (task.workerRating && task.workerRating.createdAt),
  )
    .add(2, 'days')
    .diff(moment(), 'hours');

  if (forecastDate > 1) {
    forecastDate += ' hours';
  } else {
    forecastDate += ' hour';
  }

  return (
    <Attention className={classes.attention}>
      This task will automatically updated to <Bold>{forecastStatus}</Bold> if
      no review received from the <Bold>{pendingUser}</Bold> in{' '}
      <Bold>{forecastDate}</Bold>.
    </Attention>
  );
}

AttentionHeader.propTypes = {
  task: PropTypes.object,
};
