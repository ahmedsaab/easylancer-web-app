import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import {
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageOffersData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import { MDBBtn } from 'mdbreact';
import history from 'utils/history';
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';
import { viewOffer } from 'containers/TaskPage/actions';

const Container = styled.div`
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
  position: relative;
  padding: 0.4rem 0.75rem;
  margin-bottom: 1rem;
  margin: 35px 0 0 0;
  border: 1px solid;
  display: flex;
`;

const MiddleContainer = styled.div.attrs(() => ({
  className: 'flex-grow-1',
}))`
  padding-left: 20px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 170px;
}
`;

const ContactButton = styled(MDBBtn).attrs(() => ({
  className: 'btn btn-rounded waves-effect',
  color: 'blue',
}))`
  padding: 0.375rem 0.75rem;
  margin: 0.75rem;
  flex-shrink: 1;
  min-width: 100px;
`;

const WorkerTag = styled.div`
  position: absolute;
  top: -20px;
  width: 70px;
  left: -1px;
  background: #1976d2;
  text-align: center;
  line-height: 18px;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #f0f0f0;
  border: 1px solid #014085;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

/**
 * @return {null}
 */
function TaskAssignee({ isTaskOwner, task, offers, onContact }) {
  if (task.status === 'assigned' && isTaskOwner) {
    if (offers === null) {
      return <LoadingIndicator />;
    }

    const offer = offers.find(o => o.id === task.acceptedOffer);

    return (
      <Container>
        <WorkerTag>Worker</WorkerTag>
        <AvatarContainer className="flex-shrink-1">
          <Avatar
            isApproved={offer.workerUser.isApproved}
            imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
            imgStyle={{ width: '50px', border: '1px solid' }}
          />
        </AvatarContainer>
        <MiddleContainer>
          <FullName user={offer.workerUser} />
        </MiddleContainer>
        <ContactButton
          onClick={() => {
            onContact(offer.id, task.id);
          }}
        >
          Contact
        </ContactButton>
      </Container>
    );
  }

  return null;
}

TaskAssignee.propTypes = {
  task: PropTypes.object,
  offers: PropTypes.array,
  onContact: PropTypes.func,
  isTaskOwner: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  offers: selectTaskPageOffersData,
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
});

const mapDispatchToProps = dispatch => ({
  onContact: (offerId, taskId) => {
    history.push(`/task/${taskId}/offers/${offerId}`);
    dispatch(viewOffer(offerId));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskAssignee);
