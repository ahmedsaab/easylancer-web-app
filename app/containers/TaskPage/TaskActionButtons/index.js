/**
 *
 * TaskActionButtons
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { updateModal } from 'containers/Modal/actions';
import ActionButtons from 'components/molecules/ActionButtons';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import {
  selectTaskPageOffersData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import {
  selectGlobalDisabled,
  selectGlobalUser,
} from 'containers/App/selectors';

function TaskActionButtons({
  task,
  user,
  offers,
  disabled,
  containerRef,
  onCreateOfferButtonClick,
}) {
  if (!task || !user || !offers) {
    return <LoadingIndicator />;
  }

  const actionButtons = [];
  const userIsOwner = task.creatorUser.id === user.id;
  const userIsAssigned = task.workerUser && task.workerUser.id === user.id;
  const userHasApplied = !!offers.find(
    offer => offer.workerUser.id === user.id,
  );

  if (!userIsOwner && !userHasApplied) {
    actionButtons.push({
      disabled,
      icon: 'file-contract',
      text: 'Offer',
      onClick: onCreateOfferButtonClick,
    });
  }

  if (
    !userIsOwner &&
    ((!userIsAssigned && task.status === 'open') ||
      (userIsAssigned && task.status === 'assigned'))
  ) {
    actionButtons.push({
      disabled,
      icon: 'envelope',
      text: 'Message',
      onClick: () => {
        alert('message action clicked');
      },
    });
  }

  if (task.status === 'assigned' && (userIsOwner || userIsAssigned)) {
    actionButtons.push({
      color: 'warning',
      disabled,
      icon: 'clock',
      text: 'Reschedule',
      onClick: () => {
        alert('reschedule action clicked');
      },
    });
  }

  if (task.status === 'in-progress' && (userIsOwner || userIsAssigned)) {
    actionButtons.push({
      disabled,
      color: 'success',
      icon: 'flag-checkered',
      text: 'Finish',
      onClick: () => {
        alert('finish action clicked');
      },
    });
  }

  if (
    task.status === 'done' ||
    task.status === 'not-done' ||
    task.status === 'cancelled'
  ) {
    actionButtons.push({
      disabled,
      icon: 'copy',
      text: 'Create a copy',
      onClick: () => {
        alert('create a copy action clicked');
      },
    });
  }

  if (
    (userIsOwner && (task.status === 'open' || task.status === 'assigned')) ||
    (userIsAssigned && task.status === 'assigned')
  ) {
    actionButtons.push({
      color: 'danger',
      disabled,
      icon: 'times',
      text: 'Cancel',
      onClick: () => {
        alert('cancel action clicked');
      },
    });
  }

  return (
    <ActionButtons
      whenToBlock={Number.MAX_SAFE_INTEGER}
      whenToStick={768}
      relativeStyleRef={containerRef}
      buttons={actionButtons}
    />
  );
}

TaskActionButtons.propTypes = {
  task: PropTypes.object,
  user: PropTypes.object,
  offers: PropTypes.array,
  disabled: PropTypes.bool,
  onCreateOfferButtonClick: PropTypes.func,
  containerRef: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  user: selectGlobalUser,
  offers: selectTaskPageOffersData,
  disabled: selectGlobalDisabled,
});

const mapDispatchToProps = dispatch => ({
  onCreateOfferButtonClick: () => dispatch(updateModal('create-offer')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskActionButtons);
