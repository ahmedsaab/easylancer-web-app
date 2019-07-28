/**
 *
 * Modal
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { MDBModal } from 'mdbreact';
import CreateOfferModal from 'containers/CreateOfferModal';
import { updateModal } from 'containers/Modal/actions';
import { makeSelectModalType } from './selectors';
import reducer from './reducer';

export function Modal({ type, onClose }) {
  useInjectReducer({ key: 'modal', reducer });
  let modalContent;

  switch (type) {
    case 'create-offer':
      modalContent = <CreateOfferModal />;
      break;
    case 'message-task-owner':
      modalContent = <CreateOfferModal />;
      break;
    default:
      modalContent = null;
  }

  return (
    <MDBModal
      isOpen={modalContent !== null}
      toggle={onClose}
      size="lg"
      className="full-screen-modal-container"
      contentClassName="full-screen-modal-content"
      closeAriaLabel="full-screen-modal-close-button"
    >
      {modalContent}
    </MDBModal>
  );
}

Modal.propTypes = {
  type: PropTypes.oneOf(['create-offer', 'message-task-owner']),
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectModalType(),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(updateModal(null)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Modal);
