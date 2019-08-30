import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectTaskPageTaskData,
  selectTaskPageOfferFormData,
  selectTaskPageOfferFormStatus,
  selectTaskPageOfferFormIsOpen,
} from 'containers/TaskPage/selectors';
import {
  updateOfferFormModalIsOpen,
  resetOfferFormStatusModal,
  sendOfferModal,
  updateOfferModalMessage,
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'containers/TaskPage/actions';
import DefaultContent from 'containers/TaskPage/CreateOfferModal/DefaultContent';
import SuccessContent from 'containers/TaskPage/CreateOfferModal/SuccessContent';
import { useSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

function CreateOfferModal({
  isOpen,
  form,
  task,
  status,
  onCloseModal,
  onSendOffer,
  onUpdatePayment,
  onUpdatePrice,
  onUpdateMessage,
  removeErrorState,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  let content = null;

  if (status === 'success') {
    content = (
      <SuccessContent
        taskOwnerName={task.creatorUser.firstName}
        onClose={onCloseModal}
      />
    );
  } else if (status === 'failed') {
    enqueueSnackbar('Something bad happened :(', { variant: 'error' });
    removeErrorState();
  } else {
    content = (
      <DefaultContent
        sending={status === 'loading'}
        message={form.message}
        price={form.price}
        paymentMethod={form.payment}
        onUpdatePrice={onUpdatePrice}
        onUpdatePaymentMethod={onUpdatePayment}
        onUpdateMessage={onUpdateMessage}
        onSend={onSendOffer}
        onClose={onCloseModal}
      />
    );
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      {content}
    </Dialog>
  );
}

CreateOfferModal.propTypes = {
  isOpen: PropTypes.bool,
  form: PropTypes.object,
  task: PropTypes.object,
  status: PropTypes.string,
  onCloseModal: PropTypes.func,
  onSendOffer: PropTypes.func,
  onUpdatePayment: PropTypes.func,
  onUpdatePrice: PropTypes.func,
  onUpdateMessage: PropTypes.func,
  removeErrorState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectTaskPageOfferFormIsOpen,
  form: selectTaskPageOfferFormData,
  status: selectTaskPageOfferFormStatus,
  task: selectTaskPageTaskData,
});

const mapDispatchToProps = dispatch => ({
  onUpdatePrice: price => dispatch(updateOfferModalPrice(price)),
  onUpdatePayment: payment => dispatch(updateOfferModalPayment(payment)),
  onUpdateMessage: message => dispatch(updateOfferModalMessage(message)),
  onSendOffer: () => dispatch(sendOfferModal()),
  removeErrorState: () => dispatch(resetOfferFormStatusModal()),
  onCloseModal: () => {
    dispatch(updateOfferFormModalIsOpen(false));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateOfferModal);
