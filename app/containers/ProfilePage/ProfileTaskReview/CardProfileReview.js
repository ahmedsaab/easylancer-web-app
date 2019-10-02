import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import CenteredDiv from 'components/atoms/CenteredDiv';
import Avatar from 'components/molecules/Avatar';
import FullName from 'components/molecules/FullName';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import RatingStars from 'components/molecules/RatingStars';

const useStyles = makeStyles(theme => ({
  name: {
    paddingTop: theme.spacing(0.5),
    fontSize: '10px',
  },
  image: {
    flexShrink: 1,
  },
  centered: {
    flexGrow: 1,
    textAlign: 'center',
    margin: '0 10%',
  },
  like: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  likeOk: {
    color: '#47bf49',
    fontSize: '1rem',
  },
  likeNotOk: {
    color: '#dc4646',
    fontSize: '1rem',
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
  message: {
    paddingTop: theme.spacing(1),
    fontSize: '12px',
    fontStyle: 'italic',
  },
  rating: {
    paddingTop: theme.spacing(1),
  },
}));

export function CardProfileReview({ user, review, onClick }) {
  const classes = useStyles();

  return (
    <div onClick={onClick}>
      <div className={classes.like}>
        {review.like ? (
          <ThumbUpIcon className={classes.likeOk} />
        ) : (
          <ThumbDownIcon className={classes.likeNotOk} />
        )}
      </div>
      <CenteredDiv className={classes.centered}>
        <Avatar
          imgSrc={user.imageUrl}
          imgStyle={{ width: '40px', height: '40px', objectFit: 'cover' }}
          className={classes.image}
        />
        <FullName
          className={classes.name}
          user={{ firstName: user.firstName }}
        />
        {review.rating > 0 ? (
          <RatingStars
            fontSize="16px"
            value={review.rating}
            className={classes.rating}
          />
        ) : null}
        <div className={classes.message}>
          <q className={classes.quotes}>{review.description}</q>
        </div>
      </CenteredDiv>
    </div>
  );
}

CardProfileReview.propTypes = {
  user: PropTypes.object,
  review: PropTypes.object,
  onClick: PropTypes.func,
};
