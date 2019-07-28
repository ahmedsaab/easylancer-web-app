/**
 *
 * OfferListItem
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
// import styled from 'styled-components';

function OfferListItem({ offer }) {
  return (
    <div>
      <div>
        {offer.workerUser.firstName} {offer.workerUser.lastName}
      </div>
      <div>
        {offer.price}
      </div>
      <div>
        {offer.paymentMethod}
      </div>
    </div>
  );
}

OfferListItem.propTypes = {
  offer: PropTypes.object,
};

export default OfferListItem;
