/**
 *
 * OfferDetails
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-elements';

import { FormattedMessage } from 'react-intl';
import messages from 'elements/organisms/OfferDetails/messages';

function OfferDetails() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

OfferDetails.propTypes = {};

export default OfferDetails;
