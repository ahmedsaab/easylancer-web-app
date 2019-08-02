import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { MDBBtn, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { updateModal } from 'elements/pages/Modal/actions';
import { makeSelectTaskPageTask } from 'elements/pages/TaskPage/selectors';
import {
  makeSelectOfferDetailsOffer,
  makeSelectOfferDetailsendError,
} from 'elements/pages/OfferDetailsModal/selectors';
import './styles.css';

export function TaskAssignedModalContent({ error, task, offer, onClickOkay }) {
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

TaskAssignedModalContent.propTypes = {
  error: PropTypes.object,
  offer: PropTypes.object,
  task: PropTypes.object,
  onClickOkay: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offer: makeSelectOfferDetailsOffer(),
  task: makeSelectTaskPageTask(),
  error: makeSelectOfferDetailsendError(),
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

export default compose(withConnect)(TaskAssignedModalContent);
