import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import Avatar from 'components/molecules/Avatar';
import PriceTag from 'components/molecules/PriceTag';
import LikesMetric from 'components/molecules/LikesMetric';
import RatingStars from 'components/molecules/RatingStars';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FullName from 'components/molecules/FullName';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

const MiddleContainer = styled.div.attrs(() => ({
  className: 'flex-grow-1',
}))`
  padding-left: 20px;
  padding-right: 10px;
  font-size: 1rem;
`;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 2),
    cursor: 'pointer',
  },
  rating: {
    float: 'left',
    paddingRight: theme.spacing(2),
  },
  likes: {
    marginTop: theme.spacing(0.5),
    float: 'left',
    fontSize: '12px',
  },
  price: {
    fontSize: '1rem',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },
  paymentMethod: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(1),
    },
  },
  priceContainer: {
    minWidth: '50px',
  },
  name: {
    fontSize: '14px',
  },
  assigned: {
    '&::after': {
      content: "''",
      position: 'absolute',
      top: '0',
      right: '0',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderRadius: '0',
      borderWidth: '1em',
      borderRightColor: '#2196F3',
      borderTopColor: '#2196F3',
    },
  },
}));

const imgStyle = {
  width: '60px',
  height: '60px',
  objectFit: 'cover',
  border: '2px solid white',
};

function OfferListItem({ offer, isSelected, isAssigned, onClick, disabled }) {
  const classes = useStyles();

  return (
    <ListItem
      selected={isSelected}
      onClick={!disabled ? onClick : () => {}}
      className={clsx(classes.container, isAssigned ? classes.assigned : null)}
    >
      <div className="flex-shrink-1">
        <Avatar
          imgStyle={imgStyle}
          imgSrc={offer.workerUser.imageUrl}
          isApproved={offer.workerUser.approved}
        />
      </div>
      <MiddleContainer>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <FullName user={offer.workerUser} className={classes.name} />
          </Grid>
          {offer.workerUser.ratings.value ? (
            <Grid item xs={12} sm={6}>
              <RatingStars
                fontSize="15px"
                value={
                  offer.workerUser.ratings.value /
                  offer.workerUser.ratings.count
                }
                className={classes.rating}
                count={offer.workerUser.ratings.count}
              />
            </Grid>
          ) : null}
          <Grid item xs={12} sm={6}>
            <LikesMetric
              className={classes.likes}
              rating={offer.workerUser.ratings.worker}
            />
          </Grid>
        </Grid>
      </MiddleContainer>
      <div className={classes.priceContainer}>
        <PriceTag
          className={classes.price}
          price={offer.price}
          paymentMethod={offer.paymentMethod}
          classes={{ method: classes.paymentMethod }}
        />
      </div>
    </ListItem>
  );
}

OfferListItem.propTypes = {
  disabled: PropTypes.bool,
  offer: PropTypes.object,
  isSelected: PropTypes.bool,
  isAssigned: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OfferListItem;
