/**
 *
 * CreateOfferModal
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
} from 'mdbreact';
import NumberInput from 'elements/organisms/NumberInput';
import { updateModal } from 'elements/pages/Modal/actions';
import { makeSelectTaskPageTask } from 'elements/pages/TaskPage/selectors';
import {
  sendOfferModal,
  updateOfferModalMessage,
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'elements/pages/CreateOfferModal/actions';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'elements/pages/CreateOfferModal/reducer';
import { OfferModalTaskTitle, RadioButtonsGroup } from 'elements/pages/CreateOfferModal/components';
import saga from 'elements/pages/CreateOfferModal/saga';
import {
  makeSelectCreateOfferModalMessage,
  makeSelectCreateOfferModalPayment,
  makeSelectCreateOfferModalPrice, makeSelectCreateOfferModalStatus,
} from 'elements/pages/CreateOfferModal/selectors';

function CreateOfferModal({
  price,
  payment,
  message,
  status,
  task,
  onCloseModal,
  onSendOffer,
  onUpdatePayment,
  onUpdatePrice,
  onUpdateMessage,
}) {
  useInjectReducer({ key: 'createOfferModal', reducer });
  useInjectSaga({ key: 'createOfferModal', saga });

  switch (status) {
    case 'loading':
      return <LoadingIndicator />;
    case 'success':
      return <div>You are god to go :)</div>;
    case 'failed':
      return <div>Something bad happened :(</div>;
    default:
      return (
        <div>
          <MDBModalHeader toggle={onCloseModal}>
            Your offer for
            <OfferModalTaskTitle>{task.title}</OfferModalTaskTitle>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol size={6}>
                <div className="form-group">
                  <label htmlFor="offer-price">Price</label>
                  <NumberInput
                    id="offer-price"
                    value={price}
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
                      checked={payment === 'card'}
                      label="Card"
                      type="radio"
                      id="radio1"
                    />
                    <MDBInput
                      onClick={() => onUpdatePayment('cash')}
                      checked={payment === 'cash'}
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
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn outline color="danger" onClick={onCloseModal}>
              Cancel
            </MDBBtn>
            <MDBBtn outline onClick={onSendOffer}>
              Send <MDBIcon far icon="paper-plane" className="ml-1" />
            </MDBBtn>
          </MDBModalFooter>
        </div>
      );
  }
}

CreateOfferModal.propTypes = {
  price: PropTypes.number,
  payment: PropTypes.oneOf(['cash', 'card']),
  message: PropTypes.string,
  status: PropTypes.string,
  task: PropTypes.object,
  //
  onCloseModal: PropTypes.func,
  onSendOffer: PropTypes.func,
  onUpdatePayment: PropTypes.func,
  onUpdatePrice: PropTypes.func,
  onUpdateMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  price: makeSelectCreateOfferModalPrice(),
  payment: makeSelectCreateOfferModalPayment(),
  message: makeSelectCreateOfferModalMessage(),
  status: makeSelectCreateOfferModalStatus(),
  task: makeSelectTaskPageTask(),
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
