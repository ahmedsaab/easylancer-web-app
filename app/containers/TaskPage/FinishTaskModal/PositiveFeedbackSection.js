import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import RatingStars from 'components/molecules/RatingStars';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  question: {
    fontSize: '1.4rem',
    paddingBottom: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  criteriaSection: {
    paddingTop: '5px',
    '&:last-child': {
      paddingTop: '0',
    },
  },
  criteriaTitle: {
    fontSize: '1.1rem',
    paddingBottom: '5px',
    fontWeight: 'bold',
  },
  userName: {
    display: 'inline',
    fontWeight: 600,
    textDecoration: 'underline',
    color: '#2BBBAD',
    marginLeft: theme.spacing(0.8),
    marginRight: theme.spacing(0.2),
  },
  feedBackText: {
    padding: theme.spacing(0, 3, 3),
    width: '100%',
  },
}));

const feedBackPlaceholder = 'Help others know how did it go';

export default function PositiveFeedbackSection({
  user,
  message,
  rating,
  onUpdateMessage,
  onUpdateRating,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <Divider className={classes.divider} orientation="horizontal" />
      <div className={classes.section}>
        <div className={classes.question}>
          How would you rate
          <div className={classes.userName}>{user.firstName}</div>?
        </div>
        <div className={classes.criteriaSection}>
          <RatingStars
            value={rating.value}
            onChange={onUpdateRating}
            labels={rating.labels}
          />
        </div>
      </div>
      <Divider className={classes.divider} orientation="horizontal" />
      <div className={classes.section}>
        <div className={classes.question}>
          How was your experience with
          <div className={classes.userName}>{user.firstName}</div>?
        </div>
        <div className={classes.feedBackText}>
          <TextField
            placeholder={feedBackPlaceholder}
            value={message}
            onChange={event => onUpdateMessage(event.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows="3"
          />
        </div>
      </div>
    </Fragment>
  );
}

PositiveFeedbackSection.propTypes = {
  user: PropTypes.object,
  message: PropTypes.string,
  rating: PropTypes.object,
  onUpdateMessage: PropTypes.func,
  onUpdateRating: PropTypes.func,
};
