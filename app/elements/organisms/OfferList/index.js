/**
 *
 * OfferList
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import OfferListItem from 'elements/organisms/OfferListItem';
import { OfferItemContainer } from 'elements/organisms/OfferList/components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { viewOffer } from 'elements/pages/OfferDetailsModal/actions';
import { withRouter } from 'react-router-dom';

function OfferList({
  offers,
  label,
  history,
  location,
  disabled,
  onClickOffer,
}) {
  const offerComponents = offers.map(offer => (
    <OfferItemContainer key={offer.id}>
      <OfferListItem
        isSelected={location.pathname.includes(`offers/${offer.id}`)}
        onClick={() => {
          history.push(`${offer.id}`);
          onClickOffer(offer);
        }}
        offer={offer}
        disabled={disabled}
      />
    </OfferItemContainer>
  ));

  if (offerComponents.length === 0) {
    return null;
  }

  return (
    <div>
      <div>{label}</div>
      <div>{offerComponents}</div>
    </div>
  );
}

OfferList.propTypes = {
  disabled: PropTypes.bool,
  offers: PropTypes.array,
  label: PropTypes.string,
  onClickOffer: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClickOffer: offer => {
    dispatch(viewOffer(offer));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(OfferList));
