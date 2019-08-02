/**
 *
 * OfferDetails
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import { MDBBtn, MDBIcon } from 'mdbreact';

const OfferDetailsContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

function OfferDetails({ offer, isLoading, onHireClick }) {
  return (
    <OfferDetailsContainer>
      <div>{JSON.stringify(offer)}</div>
      <FooterContainer>
        <MDBBtn
          onClick={onHireClick}
          disabled={isLoading}
          color="success"
          block
          className=""
        >
          {isLoading ? (
            <MDBIcon style={{ paddingTop: '2px' }} icon="spinner" pulse fixed />
          ) : (
            'Hire now'
          )}
        </MDBBtn>
      </FooterContainer>
    </OfferDetailsContainer>
  );
}

OfferDetails.propTypes = {
  isLoading: PropTypes.bool,
  offer: PropTypes.object,
  onHireClick: PropTypes.func,
};

export default OfferDetails;
