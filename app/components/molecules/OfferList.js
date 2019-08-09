import React from 'react';
import * as PropTypes from 'prop-types';
import OfferListItem from 'components/molecules/OfferListItem';
import SectionLabel from 'components/atoms/SectionLabel';
import styled from 'styled-components';

export const OfferItemContainer = styled('div')`
  padding-bottom: 10px;
`;

function OfferList({ offers, selectedOfferId, label, disabled, onClickOffer }) {
  const offerComponents = offers.map(offer => (
    <OfferItemContainer key={offer.id}>
      <OfferListItem
        isSelected={offer.id === selectedOfferId}
        onClick={() => onClickOffer(offer)}
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
      <SectionLabel>{label}</SectionLabel>
      <div>{offerComponents}</div>
    </div>
  );
}

OfferList.propTypes = {
  disabled: PropTypes.bool,
  offers: PropTypes.array,
  label: PropTypes.string,
  onClickOffer: PropTypes.func,
  selectedOfferId: PropTypes.string,
};

export default OfferList;
