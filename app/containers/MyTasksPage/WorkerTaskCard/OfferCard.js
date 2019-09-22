import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import CenteredDiv from 'components/atoms/CenteredDiv';
import PriceTag from 'components/molecules/PriceTag';

const useStyles = makeStyles(() => ({
  message: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    '&::before': {
      fontSize: '20px',
      fontWeight: '700',
      paddingRight: '5px',
    },
    '&::after': {
      visibility: 'hidden',
    },
  },
  header: {
    fontSize: '0.8rem',
    color: '#9e9595',
  },
  price: {
    flexGrow: 1,
  },
}));

export function OfferCard({ offer }) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.header}>Your Offer</div>
      <q className={classes.message}>{offer.message}</q>
      <CenteredDiv className={classes.price}>
        <PriceTag price={offer.price} paymentMethod={offer.paymentMethod} />
      </CenteredDiv>
    </Fragment>
  );
}

OfferCard.propTypes = {
  offer: PropTypes.object,
};
