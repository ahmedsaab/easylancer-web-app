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
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const ActionButton = styled(MDBBtn).attrs({
  rounded: true,
  block: true,
  color: props => props.color,
  onClick: props => props.onClick,
  disabled: props => props.disabled,
})`
  margin-top: 10px !Important;
`;

function OfferDetails({ offer, isLoading, onHireClick }) {
  return (
    <OfferDetailsContainer>
      <div>{JSON.stringify(offer)}</div>
      <FooterContainer>
        <ActionButton color="primary" disabled={isLoading}>
          Message
        </ActionButton>
        <ActionButton color="green" onClick={onHireClick} disabled={isLoading}>
          {isLoading ? (
            <MDBIcon style={{ paddingTop: '2px' }} icon="spinner" pulse fixed />
          ) : (
            'Hire now'
          )}
        </ActionButton>
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
