import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { currencies } from 'containers/CreateTaskModal/constants';
import PaymentMethodSelector from 'components/molecules/PaymentMethodSelector';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
  },
  row: {
    display: 'flex',
  },
}));

export default function PaymentInput({
  price,
  paymentMethod,
  onUpdatePrice,
  onUpdatePaymentMethod,
}) {
  const classes = useStyles();

  function onChangePrice(event) {
    const newPrice = parseInt(event.target.value, 10);

    if (!newPrice || newPrice > 0) {
      onUpdatePrice(newPrice);
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <div className={classes.row}>
          <TextField
            id="outlined-adornment-amount"
            className={classes.field}
            fullWidth
            error={!price}
            variant="outlined"
            label="Amount"
            type="number"
            value={price || ''}
            onChange={onChangePrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {currencies[0].label}
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <PaymentMethodSelector
          className={classes.field}
          onChange={method => onUpdatePaymentMethod(method)}
          method={paymentMethod}
        />
      </Grid>
    </Grid>
  );
}

PaymentInput.propTypes = {
  price: PropTypes.number,
  paymentMethod: PropTypes.string,
  onUpdatePrice: PropTypes.func,
  onUpdatePaymentMethod: PropTypes.func,
};
