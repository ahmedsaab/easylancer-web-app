import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FluidModal from 'elements/molecules/FluidModal';
import OfferDetails from 'elements/organisms/OfferDetails';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import {
  makeSelectOfferDetailsIsSending,
  makeSelectOfferDetailsOffer,
} from 'elements/pages/OfferDetailsModal/selectors';
import reducer from 'elements/pages/OfferDetailsModal/reducer';
import saga from 'elements/pages/OfferDetailsModal/saga';
import ModalHeader from 'elements/atoms/ModalHeader';
import ModalCloseIcon from 'elements/atoms/ModalCloseIcon';
import {
  makeSelectTaskPageTaskAcceptedOffer,
  makeSelectTaskPageTaskStatus,
} from 'elements/pages/TaskPage/selectors';
import OfferActionButtons from 'elements/organisms/OfferActionButtons';

export const offerUrlRegex = RegExp(/offers\/[0-9a-f]/i);

export function OfferDetailsModal({ offer, location, onClose }) {
  useInjectReducer({ key: 'offerDetailsModal', reducer });
  useInjectSaga({ key: 'offerDetailsModal', saga });

  const ref = useRef(null);
  let content = null;

  if (!offer) {
    content = <LoadingIndicator />;
  } else if (offer instanceof Error) {
    content = <div>{JSON.stringify(offer)}</div>;
  } else {
    content = (
      <OfferDetails offer={offer}>
        <OfferActionButtons containerRef={ref} />
      </OfferDetails>
    );
  }

  return (
    <FluidModal
      style={{ padding: '20px', margin: '0 0 40px 0' }}
      isOpen={offerUrlRegex.test(location.pathname)}
      onClose={onClose}
      reference={ref}
    >
      <ModalHeader>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      {content}
    </FluidModal>
  );
}

OfferDetailsModal.propTypes = {
  offer: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isSending: makeSelectOfferDetailsIsSending(),
  offer: makeSelectOfferDetailsOffer(),
  taskStatus: makeSelectTaskPageTaskStatus(),
  acceptedOfferId: makeSelectTaskPageTaskAcceptedOffer(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(withRouter(OfferDetailsModal));
