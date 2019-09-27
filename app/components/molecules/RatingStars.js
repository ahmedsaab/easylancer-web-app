import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Rating from 'react-rating';

import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import Box from '@material-ui/core/Box';

function getNumberAndUnit(string) {
  return {
    number: string.match(/\d+/g).map(Number),
    unit: string.replace(/[0-9]/g, ''),
  };
}

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
  count: {
    fontSize: props =>
      `${Math.round(getNumberAndUnit(props.fontSize).number * 0.7)}${
        getNumberAndUnit(props.fontSize).unit
      }` || '40px',
    color: 'grey',
    display: 'inline-block',
    paddingLeft: '4px',
  },
});

export default function RatingStars({
  classes,
  className,
  value,
  fontSize,
  onChange,
  labels,
  count,
}) {
  const defaultClasses = useStyles({ fontSize });

  if (!classes) {
    // eslint-disable-next-line no-param-reassign
    classes = {};
  }

  return (
    <div className={`${defaultClasses.root} ${className} ${classes.root}`}>
      <Rating
        initialRating={Math.round(value * 2) / 2}
        fractions={onChange ? 1 : 2}
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
      {count ? <div className={defaultClasses.count}>({count})</div> : null}
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
  count: PropTypes.number,
  onChange: PropTypes.func,
};
