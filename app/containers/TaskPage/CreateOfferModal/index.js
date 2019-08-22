import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { MDBCol, MDBInput, MDBRow } from 'mdbreact';

import {
  InformativeDiv,
  ModalContainer,
  ModalHeader,
  ModalBody,
  OfferModalTaskTitle,
  RadioButtonsGroup,
  SecondaryText,
} from 'containers/TaskPage/CreateOfferModal/components';
import NumberInput from 'components/atoms/NumberInput';
import { updateModal } from 'containers/Modal/actions';
import {
  selectTaskPageTaskData,
  selectTaskPageOfferFormData,
  selectTaskPageOfferFormStatus,
} from 'containers/TaskPage/selectors';
import {
  sendOfferModal,
  updateOfferModalMessage,
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'containers/TaskPage/actions';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import ActionButtons from 'components/molecules/ActionButtons';
import AnimatedStatus from 'components/molecules/AnimatedTick';

function CreateOfferModal({
  form,
  task,
  status,
  onCloseModal,
  onSendOffer,
  onUpdatePayment,
  onUpdatePrice,
  onUpdateMessage,
}) {
  let content = null;
  let parentStyle = {};

  const buttons = [];
  const ref = useRef(null);

  switch (status) {
    case 'loading':
      content = <LoadingIndicator />;
      break;
    case 'success':
      content = (
        <InformativeDiv>
          <AnimatedStatus
            status
            message={`Your offer have been sent to ${
              task.creatorUser.firstName
            }`}
          />
          <SecondaryText>
            You will be notified if you get hired for the job.
          </SecondaryText>
        </InformativeDiv>
      );
      buttons.push({
        color: 'green',
        disabled: false,
        text: 'Got it!',
        isLoading: false,
        onClick: onCloseModal,
      });
      parentStyle = { textAlign: 'center' };
      break;
    case 'failed':
      content = (
        <InformativeDiv>
          <AnimatedStatus status={false} message="Whoops!" />
          <SecondaryText>
            Something bad happened, please try again later :(
          </SecondaryText>
        </InformativeDiv>
      );
      buttons.push({
        color: 'danger',
        disabled: false,
        text: '...Okay',
        isLoading: false,
        onClick: onCloseModal,
      });
      parentStyle = { textAlign: 'center' };
      break;
    default:
      buttons.push(
        {
          color: 'green',
          disabled: false,
          icon: 'paper-plane',
          text: 'Send Offer',
          style: { float: 'right' },
          isLoading: false,
          onClick: onSendOffer,
        },
        {
          color: 'danger',
          disabled: false,
          text: 'Cancel',
          isLoading: false,
          style: { float: 'right' },
          onClick: onCloseModal,
        },
      );
      content = (
        <div>
          <MDBRow>
            <MDBCol size={6}>
              <div className="form-group">
                <label htmlFor="offer-price">Price</label>
                <NumberInput
                  id="offer-price"
                  value={form.price}
                  onUpdate={onUpdatePrice}
                  stepSize={10}
                />
              </div>
            </MDBCol>
            <MDBCol size={6}>
              <div className="form-group">
                <label htmlFor="offer-payment-method">Payment Method</label>
                <RadioButtonsGroup id="offer-payment-method">
                  <MDBInput
                    onClick={() => onUpdatePayment('card')}
                    checked={form.payment === 'card'}
                    label="Card"
                    type="radio"
                    id="radio1"
                  />
                  <MDBInput
                    onClick={() => onUpdatePayment('cash')}
                    checked={form.payment === 'cash'}
                    label="Cash"
                    type="radio"
                    id="radio2"
                  />
                </RadioButtonsGroup>
              </div>
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label htmlFor="offer-message">Message</label>
            <input
              id="offer-message"
              onChange={event => onUpdateMessage(event.target.value)}
              className="form-control"
            />
          </div>
        </div>
      );
  }

  return (
    <ModalContainer ref={ref}>
      <ModalHeader toggle={onCloseModal}>
        Your offer for
        <OfferModalTaskTitle>{task.title}</OfferModalTaskTitle>
      </ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ActionButtons
        style={parentStyle}
        whenToBlock={768}
        whenToStick={768}
        relativeStyleRef={ref}
        buttons={buttons}
      />
    </ModalContainer>
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
  onCloseModal: () => dispatch(updateModal(null)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateOfferModal);
