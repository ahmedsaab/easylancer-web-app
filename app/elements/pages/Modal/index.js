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
import CreateOfferModal from 'elements/pages/CreateOfferModal';
import { updateModal } from 'elements/pages/Modal/actions';
import { makeSelectModalType } from 'elements/pages/Modal/selectors';
import reducer from 'elements/pages/Modal/reducer';
import 'elements/pages/Modal/styles.css';

export function Modal({ type, onClose }) {
  useInjectReducer({ key: 'modal', reducer });
  let modalContent;
  let modalSettings;

  switch (type) {
    case 'create-offer':
      modalContent = <CreateOfferModal />;
      modalSettings = {

      };
      break;
    case 'message-task-owner':
      modalContent = <CreateOfferModal />;
      break;
    case 'task-assigned-confirmation':
      modalContent = <CreateOfferModal />;
      modalSettings = {

      };
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
  type: PropTypes.oneOf([
    'create-offer',
    'message-task-owner',
    'task-assigned-confirmation',
  ]),
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
