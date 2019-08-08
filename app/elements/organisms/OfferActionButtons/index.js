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
import reducer from 'elements/organisms/TaskActionButtons/reducer';
import saga from 'elements/organisms/TaskActionButtons/saga';
import { makeSelectGlobalUser } from 'elements/pages/App/selectors';
import {
  makeSelectTaskPageTaskAcceptedOffer,
  makeSelectTaskPageTaskStatus,
} from 'elements/pages/TaskPage/selectors';
import ActionButtons from 'elements/molecules/ActionButtons';
import { makeSelectOfferDetailsOfferId } from 'elements/pages/OfferDetailsModal/selectors';
import { acceptOffer } from 'elements/pages/OfferDetailsModal/actions';
import { TASK_STATUSES } from 'elements/pages/TaskPage/constants';

export function OfferActionButtons({
  isLoading = false,
  containerRef,
  onAcceptOffer,
  user,
  offerId,
  taskStatus,
}) {
  useInjectReducer({ key: 'offerActionButtons', reducer });
  useInjectSaga({ key: 'offerActionButtons', saga });

  console.log(user.id);
  console.log(taskStatus);

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
      onClick: () => onAcceptOffer(offerId),
    },
  ];

  return <ActionButtons relativeStyleRef={containerRef} buttons={buttons} />;
}

OfferActionButtons.propTypes = {
  user: PropTypes.object,
  offerId: PropTypes.string,
  taskStatus: PropTypes.oneOf(TASK_STATUSES),
  containerRef: PropTypes.object,
  onAcceptOffer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectGlobalUser(),
  offerId: makeSelectOfferDetailsOfferId(),
  taskStatus: makeSelectTaskPageTaskStatus(),
  acceptedOfferId: makeSelectTaskPageTaskAcceptedOffer(),
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: offerId => dispatch(acceptOffer(offerId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferActionButtons);
