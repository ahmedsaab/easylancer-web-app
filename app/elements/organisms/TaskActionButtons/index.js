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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { selectTaskActionButtonsDisabled } from 'elements/organisms/TaskActionButtons/selectors';
import reducer from 'elements/organisms/TaskActionButtons/reducer';
import saga from 'elements/organisms/TaskActionButtons/saga';
import { makeSelectGlobalUser } from 'elements/pages/App/selectors';
import {
  makeSelectTaskPageOffers,
  makeSelectTaskPageTask,
} from 'elements/pages/TaskPage/selectors';
import { updateModal } from 'elements/pages/Modal/actions';
import ActionButtons from 'elements/molecules/ActionButtons';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';

export function TaskActionButtons({
  task,
  user,
  offers,
  disabled,
  onCreateOfferButtonClick,
}) {
  useInjectReducer({ key: 'taskActionButtons', reducer });
  useInjectSaga({ key: 'taskActionButtons', saga });

  // eslint-disable-next-line no-param-reassign
  task = task.data;
  // eslint-disable-next-line no-param-reassign
  offers = offers.data;

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

  return <ActionButtons buttons={actionButtons} />;
}

TaskActionButtons.propTypes = {
  task: PropTypes.object,
  user: PropTypes.object,
  offers: PropTypes.object,
  disabled: PropTypes.bool,
  onCreateOfferButtonClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTaskPageTask(),
  user: makeSelectGlobalUser(),
  offers: makeSelectTaskPageOffers(),
  disabled: selectTaskActionButtonsDisabled(),
});

const mapDispatchToProps = dispatch => ({
  onCreateOfferButtonClick: () => dispatch(updateModal('create-offer')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskActionButtons);
