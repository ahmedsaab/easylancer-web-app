import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ActionButtons from 'components/molecules/ActionButtons';
import {
  makeSelectOfferIsAssigned,
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import { acceptOffer } from 'containers/TaskPage/actions';

function OfferActionButtons({
  offer,
  task,
  isAssignedOffer,
  isTaskOwner,
  isLoading = false,
  containerRef,
  onAcceptOffer,
}) {
  const buttons = [];

  if (task.status === 'open' && isTaskOwner) {
    buttons.concat([
      {
        color: 'green',
        disabled: isLoading,
        icon: 'check',
        text: 'Hire Now',
        isLoading,
        onClick: () => onAcceptOffer(offer.id),
      },
      {
        color: 'primary',
        disabled: isLoading,
        icon: 'envelope',
        text: 'Message',
        onClick: () => {
          alert('message action clicked');
        },
      },
    ]);
  }

  if (!isAssignedOffer && !isTaskOwner) {
    buttons.push({
      color: 'danger',
      disabled: isLoading,
      icon: 'trash',
      text: 'Withdraw',
      isLoading,
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
        disabled: isLoading,
        icon: 'phone',
        text: 'Call',
        isLoading,
        onClick: () => {
          alert('call worker action clicked');
        },
      },
      {
        color: 'primary',
        disabled: isLoading,
        icon: 'envelope',
        text: 'Message',
        onClick: () => {
          alert('message action clicked');
        },
      },
    );
  }

  return <ActionButtons relativeStyleRef={containerRef} buttons={buttons} />;
}

OfferActionButtons.propTypes = {
  isTaskOwner: PropTypes.bool,
  isAssignedOffer: PropTypes.bool,
  offer: PropTypes.object,
  task: PropTypes.object,
  containerRef: PropTypes.object,
  onAcceptOffer: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
  isAssignedOffer: makeSelectOfferIsAssigned(),
  task: selectTaskPageTaskData,
  offer: selectTaskPageOfferData,
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: offerId => dispatch(acceptOffer(offerId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferActionButtons);
