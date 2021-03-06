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
    paddingTop: theme.spacing(1),
    fontSize: '14px',
    fontStyle: 'italic',
  },
  rating: {
    display: 'inline-block',
  },
  noRating: {
    display: 'inline-block',
    fontSize: '0.9rem',
    color: 'grey',
    fontStyle: 'italic',
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
    cursor: 'pointer',
  },
  hiddenOverflow: {
    overflow: 'hidden',
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
    fontSize: '14px',
  },
}));

export default function Review({ user, isOwner, review, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.review} onClick={onClick}>
      <div className={classes.imageAndName}>
        <Avatar
          imgSrc={user.imageUrl}
          imgStyle={{ width: '60px', height: '60px', objectFit: 'cover' }}
          isOwner={isOwner}
          isWorker={!isOwner}
        />
        <FullName
          className={classes.name}
          user={{ firstName: user.firstName }}
        />
      </div>
      <div className={classes.ratingAndText}>
        <div className={classes.hiddenOverflow}>
          {review.rating > 0 ? (
            <RatingStars
              fontSize="20px"
              value={review.rating}
              className={classes.rating}
            />
          ) : (
            <div className={classes.noRating}>Unrated</div>
          )}
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
  onClick: PropTypes.func,
};
