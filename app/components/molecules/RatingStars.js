import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Rating from 'react-rating';

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  ratingIcon: {
    fontSize: props => props.fontSize || '40px',
  },
  ratingLabel: {
    fontSize: '14px',
  },
  fullRatingIcon: {
    color: '#FFB400',
  },
  emptyRatingIcon: {
    color: 'grey',
  },
});

export default function RatingStars({
  classes,
  className,
  value,
  fontSize,
  onChange,
  labels,
}) {
  const defaultClasses = useStyles({ fontSize });

  if (!classes) {
    // eslint-disable-next-line no-param-reassign
    classes = {};
  }

  return (
    <div className={`${defaultClasses.root} ${className} ${classes.root}`}>
      <Rating
        initialRating={value}
        emptySymbol={
          <StarBorderRoundedIcon
            className={`${defaultClasses.ratingIcon} ${classes.ratingIcon} ${
              defaultClasses.emptyRatingIcon
            }`}
          />
        }
        fullSymbol={
          <StarRoundedIcon
            className={`${defaultClasses.ratingIcon} ${classes.ratingIcon} ${
              defaultClasses.fullRatingIcon
            }`}
          />
        }
        readonly={!onChange}
        onChange={onChange}
      />
      {labels ? (
        <Box className={defaultClasses.ratingLabel}>{labels[value] || '•'}</Box>
      ) : null}
    </div>
  );
}

RatingStars.propTypes = {
  classes: PropTypes.object,
  fontSize: PropTypes.string,
  labels: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
