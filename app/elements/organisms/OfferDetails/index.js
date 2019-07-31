/**
 *
 * OfferDetails
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import { MDBBtn } from 'mdbreact';

const OfferDetailsContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

function OfferDetails() {
  return (
    <OfferDetailsContainer>
      <FooterContainer>
        <MDBBtn color="success" block className="">
          Accept Offer
        </MDBBtn>
      </FooterContainer>
    </OfferDetailsContainer>
  );
}

OfferDetails.propTypes = {};

export default OfferDetails;
