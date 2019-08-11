import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ActionButtons from 'components/molecules/ActionButtons';
import {
  makeSelectOfferIsAssigned,
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageOfferActions,
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import { acceptOffer } from 'containers/TaskPage/actions';

function OfferActionButtons({
  offer,
  task,
  actions,
  isAssignedOffer,
  isTaskOwner,
  containerRef,
  onAcceptOffer,
}) {
  const buttons = [];
  const disabled = Object.values(actions).includes('loading');

  if (task.status === 'open' && isTaskOwner) {
    buttons.push(
      {
        color: 'green',
        disabled,
        icon: 'check',
        text: 'Hire Now',
        isLoading: actions.hire === 'loading',
        onClick: () => onAcceptOffer(offer.id),
      },
      {
        color: 'primary',
        disabled,
        icon: 'envelope',
        text: 'Message',
        onClick: () => {
          alert('message action clicked');
        },
      },
    );
  }

  if (!isAssignedOffer && !isTaskOwner) {
    buttons.push({
      color: 'danger',
      disabled,
      icon: 'trash',
      text: 'Withdraw',
      isLoading: actions.withdraw === 'loading',
      onClick: () => {
        alert('withdraw offer action clicked');
      },
    });
  }

  if (
    isTaskOwner &&
    isAssignedOffer &&
    (task.status === 'assigned' || task.status === 'in-progress')
  ) {
    buttons.push(
      {
        color: 'green',
        disabled,
        icon: 'phone',
        text: 'Call',
        onClick: () => {
          alert('call worker action clicked');
        },
      },
      {
        color: 'primary',
        disabled,
        icon: 'envelope',
        text: 'Message',
        onClick: () => {
          alert('message action clicked');
        },
      },
    );
  }

  return (
    <ActionButtons
      whenToBlock={Number.MAX_SAFE_INTEGER}
      whenToStick={768}
      relativeStyleRef={containerRef}
      buttons={buttons}
    />
  );
}

OfferActionButtons.propTypes = {
  isTaskOwner: PropTypes.bool,
  isAssignedOffer: PropTypes.bool,
  offer: PropTypes.object,
  task: PropTypes.object,
  containerRef: PropTypes.object,
  onAcceptOffer: PropTypes.func,
  actions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
  isAssignedOffer: makeSelectOfferIsAssigned(),
  task: selectTaskPageTaskData,
  offer: selectTaskPageOfferData,
  actions: selectTaskPageOfferActions,
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: offerId => dispatch(acceptOffer(offerId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferActionButtons);
