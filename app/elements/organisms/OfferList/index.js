/**
 *
 * OfferList
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import OfferListItem from 'elements/organisms/OfferListItem';
import { OfferItemContainer } from 'elements/organisms/OfferList/components';

function OfferList({ offers, label }) {
  const offerComponents = offers.map(offer => (
    <OfferItemContainer key={offer.id}>
      <OfferListItem offer={offer} />
    </OfferItemContainer>
  ));

  return (
    <div>
      <div>{label}</div>
      <div>{offerComponents}</div>
    </div>
  );
}

OfferList.propTypes = {
  offers: PropTypes.array,
  label: PropTypes.string,
};

export default OfferList;
