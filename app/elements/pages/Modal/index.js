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
import TaskAssignedModalContent from 'elements/organisms/TaskAssignedModalContent';
import './styles.css';

export function Modal({ type, onClose }) {
  useInjectReducer({ key: 'modal', reducer });
  let modalContent;
  let modalSettings = {
    size: 'md',
    className: '',
    contentClassName: '',
    centered: false,
  };

  switch (type) {
    case 'create-offer':
      modalContent = <CreateOfferModal />;
      modalSettings = {
        size: 'lg',
        className: 'full-screen-modal-container',
        contentClassName: 'full-screen-modal-content',
      };
      break;
    case 'message-task-owner':
      modalContent = <CreateOfferModal />;
      break;
    case 'task-assigned-confirmation':
      modalContent = <TaskAssignedModalContent />;
      modalSettings = {
        size: 'md',
        className: 'confirmation-modal-container',
        contentClassName: 'confirmation-modal-content',
        centered: true,
      };
      break;
    default:
      modalContent = null;
  }

  return (
    <MDBModal
      isOpen={modalContent !== null}
      toggle={onClose}
      centered={modalSettings.centered}
      size={modalSettings.size}
      className={modalSettings.className}
      contentClassName={modalSettings.contentClassName}
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
