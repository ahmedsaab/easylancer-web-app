/**
 *
 * OfferList
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import OfferListItem from 'components/OfferListItem';

function OfferList({ offers, label }) {
  const offerComponents = offers.map(offer => (
    <OfferListItem key={offer.id} offer={offer} />
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
