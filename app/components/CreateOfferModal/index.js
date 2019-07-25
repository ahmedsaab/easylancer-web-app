/**
 *
 * CreateOfferModal
 *
 */

import React from 'react';
import {
  MDBBtn,
  MDBIcon, MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from 'mdbreact';
import * as PropTypes from 'prop-types';
import { OfferModalTaskTitle } from 'components/CreateOfferModal/components';

function CreateOfferModal({
  isOpen,
  onClose,
  onSend,
  onUpdatePaymentMethod,
  paymentMethod,
  taskTitle,
}) {
  return (
    <MDBModal
      isOpen={isOpen}
      toggle={onClose}
      size="lg"
      className="full-screen-modal-container"
      contentClassName="full-screen-modal-content"
      closeAriaLabel="full-screen-modal-close-button"
    >
      <MDBModalHeader toggle={onClose}>
        Your offer for
        <OfferModalTaskTitle>{taskTitle}</OfferModalTaskTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <div>
          <div>Payment Method</div>
          <MDBInput
            onClick={() => onUpdatePaymentMethod('card')}
            checked={paymentMethod === 'card'}
            label="Card"
            disabled
            type="radio"
            id="radio3"
          />
          <MDBInput
            onClick={() => onUpdatePaymentMethod('cash')}
            checked={paymentMethod === 'cash'}
            label="Cash"
            disabled
            type="radio"
            id="radio3"
          />
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn outline color="danger" onClick={onClose}>
          Cancel
        </MDBBtn>
        <MDBBtn outline onClick={onSend}>
          Send <MDBIcon far icon="paper-plane" className="ml-1" />
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}

CreateOfferModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSend: PropTypes.func,
  onUpdatePaymentMethod: PropTypes.func,
  paymentMethod: PropTypes.string,
  taskTitle: PropTypes.string,
};

export default CreateOfferModal;
