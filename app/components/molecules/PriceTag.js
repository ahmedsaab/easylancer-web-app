import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '120%',
  },
  container: {
    lineHeight: '125%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  method: {
    display: 'inline-block',
    padding: theme.spacing(0, 0, 0, 1),
  },
  price: {
    display: 'inline-block',
  },
  number: {
    display: 'inline-block',
    fontWeight: '700',
  },
}));

function PriceTag({
  price,
  paymentMethod,
  className,
  classes = {
    method: '',
  },
}) {
  const defaultClasses = useStyles();

  return (
    <div className={`${defaultClasses.container} ${className}`}>
      <div className={defaultClasses.price}>
        €<div className={defaultClasses.number}>{price}</div>
      </div>
      <div className={`${defaultClasses.method} ${classes.method}`}>
        {paymentMethod === 'card' ? (
          <PaymentIcon className={defaultClasses.icon} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

PriceTag.propTypes = {
  classes: PropTypes.object,
  price: PropTypes.number,
  paymentMethod: PropTypes.oneOf(['card', 'cash']),
  className: PropTypes.string,
};

export default PriceTag;
