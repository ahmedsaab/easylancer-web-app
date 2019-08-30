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
import history from 'utils/history';
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';
import { viewOffer } from 'containers/TaskPage/actions';
import { makeStyles } from '@material-ui/core';
import DialogButton from 'components/atoms/DialogButton';

const Container = styled.div`
  color: #004085;
  background-color: #ebf5ff;
  border-color: #b8daff;
  position: relative;
  display: flex;
  padding: 0.4rem 0.75rem;
  margin-bottom: 1rem;
  margin: 35px 0 0 0;
  border: 1px solid;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
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
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const WorkerName = styled(FullName)`
  max-width: 60%;
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
`;

const WorkerAvatarContainer = styled.div`
  display: inline-block;
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  dataContainer: {
    flexGrow: 1,
  },
  avatarContainer: {
    maxWidth: '100%',
  },
  contactButton: {
    lineHeight: '30px',
    padding: '5px 10px',
    margin: '4px 0',
    float: 'right',
    verticalAlign: 'middle',
  },
  buttonContainer: {
    padding: 0,
    flex: '0 0 40%',
    width: '100%',
  },
}));

/**
 * @return {null}
 */
function TaskAssignee({ isTaskOwner, task, offers, onContact }) {
  const classes = useStyles();

  if (task.status === 'assigned' && isTaskOwner) {
    if (offers === null) {
      return <LoadingIndicator />;
    }

    const offer = offers.find(o => o.id === task.acceptedOffer);

    return (
      <Container>
        <WorkerTag>Worker</WorkerTag>
        <div className={classes.dataContainer}>
          <WorkerAvatarContainer>
            <Avatar
              isApproved={offer.workerUser.isApproved}
              imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
              imgStyle={{ width: '50px', border: '1px solid' }}
            />
          </WorkerAvatarContainer>
          <WorkerName user={offer.workerUser} />
        </div>
        <div className={classes.buttonContainer}>
          <DialogButton
            onClick={() => {
              onContact(offer.id, task.id);
            }}
            variant="outlined"
            color="primary"
            className={classes.contactButton}
          >
            Contact
          </DialogButton>
        </div>
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
