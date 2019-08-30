import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PaymentInput from 'components/molecules/PaymentInput';
import TextField from '@material-ui/core/TextField';
import CancelableDialogTitle from 'components/molecules/CancelableDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CancelButton from 'components/atoms/CancelButton';
import LoadableMainButton from 'components/hoc/LoadableMainButton';

const useStyles = makeStyles(theme => ({
  field: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  row: {
    display: 'flex',
  },
}));

const exampleMessage =
  'e.g., I am a hairdresser with 5 years of experience bla bla bla';

const DefaultContent = ({
  sending,
  price,
  paymentMethod,
  message,
  onUpdatePrice,
  onUpdatePaymentMethod,
  onUpdateMessage,
  onClose,
  onSend,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CancelableDialogTitle onClose={onClose}>
        {"Sure, so what's up?"}
      </CancelableDialogTitle>
      <DialogContent dividers>
        <PaymentInput
          price={price}
          paymentMethod={paymentMethod}
          onUpdatePrice={onUpdatePrice}
          onUpdatePaymentMethod={onUpdatePaymentMethod}
        />
        <TextField
          placeholder={exampleMessage}
          label="Message"
          className={classes.field}
          value={message}
          onChange={event => onUpdateMessage(event.target.value)}
          margin="none"
          variant="outlined"
          fullWidth
          multiline
          rows="5"
        />
      </DialogContent>
      <DialogActions>
        <CancelButton disabled={sending} onClick={onClose}>
          Cancel
        </CancelButton>
        <LoadableMainButton
          loading={sending}
          disabled={sending || !price || !message || !paymentMethod}
          onClick={onSend}
        >
          Send
        </LoadableMainButton>
      </DialogActions>
    </Fragment>
  );
};

DefaultContent.propTypes = {
  sending: PropTypes.bool,
  price: PropTypes.number,
  paymentMethod: PropTypes.string,
  message: PropTypes.string,
  onUpdatePrice: PropTypes.func,
  onUpdatePaymentMethod: PropTypes.func,
  onUpdateMessage: PropTypes.func,
  onClose: PropTypes.func,
  onSend: PropTypes.func,
};

export default DefaultContent;
