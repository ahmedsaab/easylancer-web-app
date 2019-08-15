import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { MDBModal } from 'mdbreact';
import CreateOfferModal from 'containers/TaskPage/CreateOfferModal';
import { makeSelectModalType } from 'containers/Modal/selectors';
import reducer from 'containers/Modal/reducer';
import 'containers/Modal/styles.css';
import TaskAssignedModal from 'containers/TaskPage/TaskAssignedModal';
import CreateTaskModal from 'containers/CreateTaskModal';

export function Modal({ type }) {
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
        size: 'md',
        className: 'full-screen-modal-container',
        contentClassName: 'full-screen-modal-content',
      };
      break;
    case 'create-task':
      modalContent = <CreateTaskModal />;
      modalSettings = {
        size: 'lg',
        className: 'full-screen-modal-container',
        contentClassName: 'full-screen-modal-content',
        centered: true,
      };
      break;
    case 'task-assigned-confirmation':
      modalContent = <TaskAssignedModal />;
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
      toggle={() => {}}
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
    'create-task',
    'task-assigned-confirmation',
  ]),
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectModalType(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Modal);
