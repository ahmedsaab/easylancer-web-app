import React, { Fragment, useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PaymentInput from 'components/molecules/PaymentInput';
import TextField from '@material-ui/core/TextField';
import CancelableDialogTitle from 'components/molecules/CancelableDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import LoadableMainDialogButton from 'components/hoc/LoadableMainDialogButton';
import DialogButton from 'components/atoms/DialogButton';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
  },
  row: {
    display: 'flex',
  },
  dialogActionsLeft: {
    flex: '1',
    display: 'flex',
    marginLeft: theme.spacing(1),
  },
  dialogActionsRight: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
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
  const [dirty, setDirty] = useState({
    message: false,
  });

  return (
    <Fragment>
      <CancelableDialogTitle onClose={onClose}>
        {'Create Offer'}
      </CancelableDialogTitle>
      <DialogContent dividers>
        <PaymentInput
          price={price}
          paymentMethod={paymentMethod}
          onUpdatePrice={onUpdatePrice}
          onUpdatePaymentMethod={onUpdatePaymentMethod}
        />
        <div className={classes.row}>
          <TextField
            error={!message && dirty.message}
            placeholder={exampleMessage}
            label="Message"
            className={classes.field}
            value={message}
            onChange={event => {
              setDirty({ ...message, message: true });
              onUpdateMessage(event.target.value);
            }}
            margin="none"
            variant="outlined"
            fullWidth
            multiline
            rows="5"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className={classes.dialogActionsLeft}>
          <DialogButton disabled={sending} onClick={onClose}>
            Cancel
          </DialogButton>
        </div>
        <div className={classes.dialogActionsRight}>
          <LoadableMainDialogButton
            loading={sending}
            disabled={sending || !price || !message || !paymentMethod}
            onClick={onSend}
          >
            Send
          </LoadableMainDialogButton>
        </div>
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
