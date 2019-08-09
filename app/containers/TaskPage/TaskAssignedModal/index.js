import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import styled from 'styled-components';
import { MDBBtn, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';

import { updateModal } from 'containers/Modal/actions';
import {
  selectTaskPageOfferActionsHire,
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import 'containers/TaskPage/TaskAssignedModal/styles.css';
import CenteredDiv from 'components/atoms/CenteredDiv';
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';

const imgStyle = {
  width: '120px',
  border: '2px solid rgba(228, 222, 153, 0.54)',
};

const CenteredContent = styled(CenteredDiv)`
  padding: 20px 0px 20px 0px;
`;

const WorkerName = styled(FullName)`
  font-size: 1.2rem;
  padding-bottom: 40px;
`;

const Text = styled.div`
  padding-bottom: 20px;
  font-size: 1.2rem;
  text-align: center;
`;

const Bold = styled.div`
  display: inline;
  font-weight: bold;
`;

function TaskAssignedModal({ status, task, offer, onClickOkay }) {
  if (status === 'error') {
    return <div>Something bad happened</div>;
  }

  const formatedDate = moment(task.startDateTime).format(
    'h:mm A [on the] Do of MMM ',
  );

  return (
    <div>
      <MDBModalHeader
        toggle={onClickOkay}
        className="task-assigned-modal-close"
      >
        Task Assigned to <Bold>{offer.workerUser.firstName}</Bold>
      </MDBModalHeader>
      <MDBModalBody>
        <CenteredContent>
          <Avatar
            imgStyle={imgStyle}
            imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
            isApproved={offer.workerUser.isApproved || true}
          />
          <WorkerName user={offer.workerUser} />
          <Text>
            The offer price of <Bold>€{offer.price}</Bold> has been deducted
            from your account. The money will be held safely until you confirm
            that the task has been done.
          </Text>
          <Text>
            Your worker will meet you at <Bold>{formatedDate}</Bold> in the
            agreed location to finish the job.
          </Text>
        </CenteredContent>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn
          style={{ 'font-size': '1rem' }}
          className="btn btn-rounded waves-effect"
          onClick={onClickOkay}
        >
          Got it!
        </MDBBtn>
      </MDBModalFooter>
    </div>
  );
}

TaskAssignedModal.propTypes = {
  status: PropTypes.oneOf(['loading', 'success', 'error']),
  offer: PropTypes.object,
  task: PropTypes.object,
  onClickOkay: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offer: selectTaskPageOfferData,
  task: selectTaskPageTaskData,
  status: selectTaskPageOfferActionsHire,
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
