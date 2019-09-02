import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { currencies } from 'containers/CreateTaskModal/constants';
import PaymentMethodSelector from 'components/molecules/PaymentMethodSelector';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    width: '150px',
    display: 'block',
  },
}));

export default function PaymentInput({
  price,
  paymentMethod,
  onUpdatePrice,
  onUpdatePaymentMethod,
}) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id="outlined-adornment-amount"
        className={classes.field}
        variant="outlined"
        label="Amount"
        type="number"
        value={price}
        onChange={event => onUpdatePrice(parseInt(event.target.value, 10))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {currencies[0].label}
            </InputAdornment>
          ),
        }}
      />
      <PaymentMethodSelector
        className={classes.field}
        onChange={method => onUpdatePaymentMethod(method)}
        method={paymentMethod}
      />
    </div>
  );
}

PaymentInput.propTypes = {
  price: PropTypes.number,
  paymentMethod: PropTypes.string,
  onUpdatePrice: PropTypes.func,
  onUpdatePaymentMethod: PropTypes.func,
};
