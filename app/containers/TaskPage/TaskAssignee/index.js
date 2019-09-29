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
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';
import { makeStyles } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';

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
  width: 100%;
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/**
 * @return {null}
 */
function TaskAssignee({ isTaskOwner, task, offers }) {
  const classes = useStyles();

  if (
    (task.status === 'assigned' || task.status === 'in-progress') &&
    isTaskOwner
  ) {
    if (offers === null) {
      return <LoadingIndicator />;
    }

    const offer = offers.find(o => o.id === task.acceptedOffer);

    if (offer) {
      return (
        <Container>
          <WorkerTag>Worker</WorkerTag>
          <div className={classes.dataContainer}>
            <WorkerAvatarContainer>
              <Avatar
                isApproved={offer.workerUser.isApproved}
                imgSrc={offer.workerUser.imageUrl}
                imgStyle={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  border: '1px solid',
                }}
              />
            </WorkerAvatarContainer>
            <WorkerName user={offer.workerUser} />
          </div>
          <div className={classes.buttonContainer}>
            <IconButton color="primary" aria-label="message">
              <MessageIcon />
            </IconButton>
            <IconButton color="primary" aria-label="call">
              <CallIcon />
            </IconButton>
          </div>
        </Container>
      );
    }
  }

  return null;
}

TaskAssignee.propTypes = {
  task: PropTypes.object,
  offers: PropTypes.array,
  isTaskOwner: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  offers: selectTaskPageOffersData,
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskAssignee);
