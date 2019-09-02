import React from 'react';
import MoneyIcon from '@material-ui/icons/Money';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toggleRoot: {
    height: 'auto',
    padding: '5%',
    width: '75px',
  },
  toggleText: {
    width: '100%',
    textAlign: 'center',
    fontSize: '0.6rem',
  },
  toggleIcon: {
    width: '100%',
  },
}));

export default function PaymentSelector({ className, onChange, method }) {
  const classes = useStyles();
  const children = [
    <ToggleButton key={1} value="card" className={classes.toggleRoot}>
      <div>
        <CreditCardIcon className={classes.toggleIcon} />
        <div className={classes.toggleText}>Card</div>
      </div>
    </ToggleButton>,
    <ToggleButton key={2} value="cash" className={classes.toggleRoot}>
      <div>
        <MoneyIcon className={classes.toggleIcon} />
        <div className={classes.toggleText}>Cash</div>
      </div>
    </ToggleButton>,
  ];

  return (
    <ToggleButtonGroup
      size="large"
      value={method}
      exclusive
      onChange={(event, selectedMethod) => onChange(selectedMethod)}
      className={className}
    >
      {children}
    </ToggleButtonGroup>
  );
}

PaymentSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  method: PropTypes.oneOf(['cash', 'card']),
};
