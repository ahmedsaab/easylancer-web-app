import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Avatar from 'components/molecules/Avatar';
import FullName from 'components/molecules/FullName';
import RatingStars from 'components/molecules/RatingStars';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles(theme => ({
  imageAndName: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  },
  ratingAndText: {
    display: 'inline-block',
    width: '75%',
    padding: theme.spacing(0, 0, 0, 2),
  },
  message: {
    paddingTop: theme.spacing(2),
    fontSize: '14px',
    fontStyle: 'italic',
  },
  rating: {
    display: 'inline-block',
  },
  like: {
    display: 'inline-block',
    float: 'right',
  },
  likeOk: {
    color: '#47bf49',
  },
  likeNotOk: {
    color: '#dc4646',
  },
  review: {
    display: 'flex',
  },
  quotes: {
    '&::before': {
      fontSize: '25px',
      fontWeight: '700',
      paddingRight: '5px',
    },
    '&::after': {
      visibility: 'hidden',
    },
  },
  name: {
    paddingTop: theme.spacing(2),
    fontWeight: 700,
    fontSize: '12px',
  },
}));

export default function Review({ user, isOwner, review }) {
  const classes = useStyles();

  return (
    <div className={classes.review}>
      <div className={classes.imageAndName}>
        <Avatar
          imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
          imgStyle={{ width: '60px' }}
          isOwner={isOwner}
          isWorker={!isOwner}
        />
        <FullName
          className={classes.name}
          user={{ firstName: user.firstName }}
        />
      </div>
      <div className={classes.ratingAndText}>
        <div>
          {review.rating > 0 ? (
            <RatingStars
              fontSize="20px"
              value={review.rating}
              className={classes.rating}
            />
          ) : null}
          <div className={classes.like}>
            {review.like ? (
              <ThumbUpIcon className={classes.likeOk} />
            ) : (
              <ThumbDownIcon className={classes.likeNotOk} />
            )}
          </div>
        </div>
        <div className={classes.message}>
          <q className={classes.quotes}>{review.description}</q>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
  user: PropTypes.object,
  review: PropTypes.object,
  isOwner: PropTypes.bool,
};
