import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { MDBBtn, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { updateModal } from 'containers/Modal/actions';
import {
  selectTaskPageOfferData,
  selectTaskPageTaskData,
  selectTaskPageOfferSendError,
} from 'containers/TaskPage/selectors';
import 'containers/TaskPage/TaskAssignedModal/styles.css';

function TaskAssignedModal({ error, task, offer, onClickOkay }) {
  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
  }
  return (
    <div>
      <MDBModalHeader
        toggle={onClickOkay}
        className="task-assigned-modal-close"
      >
        Task Assigned to {offer.workerUser.firstName}
      </MDBModalHeader>
      <MDBModalBody>{JSON.stringify(task)}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn outline block onClick={onClickOkay}>
          Close
        </MDBBtn>
      </MDBModalFooter>
    </div>
  );
}

TaskAssignedModal.propTypes = {
  error: PropTypes.object,
  offer: PropTypes.object,
  task: PropTypes.object,
  onClickOkay: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offer: selectTaskPageOfferData,
  task: selectTaskPageTaskData,
  error: selectTaskPageOfferSendError,
});

const mapDispatchToProps = dispatch => ({
  onClickOkay: () => {
    dispatch(updateModal(null));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskAssignedModal);
