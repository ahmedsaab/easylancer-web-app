import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { updateModal } from 'containers/Modal/actions';
import {
  selectTaskPageTaskData,
  selectTaskPageOfferFormData,
  selectTaskPageOfferFormStatus,
} from 'containers/TaskPage/selectors';
import {
  resetOfferFormModal,
  resetOfferFormStatusModal,
  sendOfferModal,
  updateOfferModalMessage,
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'containers/TaskPage/actions';
import DefaultContent from 'containers/TaskPage/CreateOfferModal/DefaultContent';
import SuccessContent from 'containers/TaskPage/CreateOfferModal/SuccessContent';
import { useSnackbar } from 'notistack';

function CreateOfferModal({
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

  if (status === 'success') {
    return (
      <SuccessContent
        taskOwnerName={task.creatorUser.firstName}
        onClose={onCloseModal}
      />
    );
  }

  if (status === 'failed') {
    enqueueSnackbar('Something bad happened :(', { variant: 'error' });
    removeErrorState();
  }

  return (
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

CreateOfferModal.propTypes = {
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
    dispatch(resetOfferFormModal());
    dispatch(updateModal(null));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateOfferModal);
