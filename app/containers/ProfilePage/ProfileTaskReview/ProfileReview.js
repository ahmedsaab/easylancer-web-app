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
    fontSize: '12px',
    fontStyle: 'italic',
  },
  rating: {
    display: 'inline-block',
  },
  noRating: {
    display: 'inline-block',
    fontSize: '0.7rem',
    color: 'grey',
    fontStyle: 'italic',
  },
  like: {
    display: 'inline-block',
    float: 'right',
  },
  likeOk: {
    color: '#47bf49',
    fontSize: '1rem',
  },
  likeNotOk: {
    color: '#dc4646',
    fontSize: '1rem',
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
      fontSize: '18px',
      fontWeight: '700',
      paddingRight: '5px',
    },
    '&::after': {
      visibility: 'hidden',
    },
  },
  name: {
    paddingTop: theme.spacing(0.5),
    fontSize: '10px',
  },
}));

export default function ProfileReview({ user, review, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.review} onClick={onClick}>
      <div className={classes.imageAndName}>
        <Avatar
          imgSrc={user.imageUrl}
          imgStyle={{ width: '40px', height: '40px', objectFit: 'cover' }}
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
              fontSize="16px"
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

ProfileReview.propTypes = {
  user: PropTypes.object,
  review: PropTypes.object,
  onClick: PropTypes.func,
};
