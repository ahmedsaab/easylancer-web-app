import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';
import { makeStyles } from '@material-ui/core';
import Review from 'containers/TaskPage/TaskReview/Review';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  review: {
    padding: '20px',
    margin: '0 0 20px 0',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
    outline: 0,
  },
  divider: {
    margin: theme.spacing(4, 0),
  },
}));

/**
 * @return {null}
 */
function TaskReview({ task }) {
  const classes = useStyles();

  if (!task.creatorRating || !task.workerRating) {
    return null;
  }

  return (
    <Paper elevation={0} className={classes.review}>
      <Review isOwner user={task.creatorUser} review={task.creatorRating} />
      <Divider className={classes.divider} orientation="horizontal" />
      <Review user={task.workerUser} review={task.workerRating} />
    </Paper>
  );
}

TaskReview.propTypes = {
  task: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskReview);
