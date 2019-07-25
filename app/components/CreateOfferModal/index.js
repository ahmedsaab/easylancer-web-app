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

function CreateOfferModal({ isOpen, onClose, onSend, taskTitle }) {
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
            onClick={this.onClick(3)}
            checked={this.state.radio === 3}
            label="Default unchecked disabled"
            disabled
            type="radio"
            id="radio3"
          />
          <MDBInput
            onClick={this.onClick(3)}
            checked={this.state.radio === 2}
            label="Default checked disabled"
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
  taskTitle: PropTypes.string,
};

export default CreateOfferModal;
