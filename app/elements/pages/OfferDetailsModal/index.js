/**
 *
 * OfferDetailsModal
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FluidModal from 'elements/molecules/FluidModal';
import OfferDetails from 'elements/organisms/OfferDetails';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import {
  makeSelectOfferDetailsIsSending,
  makeSelectOfferDetailsOffer,
} from 'elements/pages/OfferDetailsModal/selectors';
import reducer from 'elements/pages/OfferDetailsModal/reducer';
import saga from 'elements/pages/OfferDetailsModal/saga';
import { acceptOffer } from 'elements/pages/OfferDetailsModal/actions';

export const offerUrlRegex = RegExp(/offers\/[0-9a-f]/i);

export function OfferDetailsModal({
  offer,
  isSending,
  location,
  history,
  onClose,
  onAcceptOffer,
}) {
  useInjectReducer({ key: 'offerDetailsModal', reducer });
  useInjectSaga({ key: 'offerDetailsModal', saga });
  let content = null;

  if (!offer) {
    content = <LoadingIndicator />;
  } else if (offer instanceof Error) {
    content = <div>{JSON.stringify(offer)}</div>;
  } else {
    content = (
      <OfferDetails
        offer={offer}
        isLoading={isSending}
        onHireClick={() => onAcceptOffer(offer.id, history)}
      />
    );
  }

  return (
    <FluidModal
      style={{ padding: '20px' }}
      isOpen={offerUrlRegex.test(location.pathname)}
      onClose={onClose}
    >
      {content}
    </FluidModal>
  );
}

OfferDetailsModal.propTypes = {
  offer: PropTypes.object,
  isSending: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onClose: PropTypes.func,
  onAcceptOffer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isSending: makeSelectOfferDetailsIsSending(),
  offer: makeSelectOfferDetailsOffer(),
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: (offerId, history) => dispatch(acceptOffer(offerId, history)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(OfferDetailsModal));
