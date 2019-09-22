import { makeStyles } from '@material-ui/core';
import PriceTag from 'components/molecules/PriceTag';
import * as PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  header: {
    fontSize: '0.8rem',
    color: '#9e9595',
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
  },
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
  price: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

export function OfferFooter({ offer }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>Your Offer</div>
      <div className={classes.data}>
        <q className={classes.message}>{offer.message}</q>
        <PriceTag
          className={classes.price}
          price={offer.price}
          paymentMethod={offer.paymentMethod}
        />
      </div>
    </div>
  );
}

OfferFooter.propTypes = {
  offer: PropTypes.object,
};
