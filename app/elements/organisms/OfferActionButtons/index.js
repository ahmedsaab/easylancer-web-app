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

import ActionButtons from 'elements/molecules/ActionButtons';
import { acceptOffer } from 'elements/pages/OfferDetailsModal/actions';
import { TASK_STATUSES } from 'elements/pages/TaskPage/constants';
import {
  makeSelectTaskPageTaskDataStatus,
  makeSelectTaskPageUserIsTaskOwner,
} from 'elements/pages/TaskPage/selectors';
import {
  makeSelectOfferDetailsIsAssigned,
  makeSelectOfferDetailsOffer,
} from 'elements/pages/OfferDetailsModal/selectors';

export function OfferActionButtons({
  offer,
  taskStatus,
  isAssignedOffer,
  isTaskOwner,
  isLoading = false,
  containerRef,
  onAcceptOffer,
}) {
  console.log('.');
  console.log(isAssignedOffer);
  console.log(taskStatus);
  console.log(isTaskOwner);
  console.log(offer);

  const buttons = [
    {
      color: 'primary',
      disabled: isLoading,
      icon: 'envelope',
      text: 'Message',
      onClick: () => {
        alert('message action clicked');
      },
    },
    {
      color: 'green',
      disabled: isLoading,
      icon: 'check',
      text: 'Hire Now',
      isLoading,
      onClick: () => onAcceptOffer(offer.id),
    },
  ];

  return <ActionButtons relativeStyleRef={containerRef} buttons={buttons} />;
}

OfferActionButtons.propTypes = {
  isTaskOwner: PropTypes.bool,
  isAssignedOffer: PropTypes.bool,
  offer: PropTypes.object,
  taskStatus: PropTypes.oneOf(TASK_STATUSES),
  containerRef: PropTypes.object,
  onAcceptOffer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
  isAssignedOffer: makeSelectOfferDetailsIsAssigned(),
  taskStatus: makeSelectTaskPageTaskDataStatus(),
  offer: makeSelectOfferDetailsOffer(),
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: offerId => dispatch(acceptOffer(offerId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferActionButtons);
