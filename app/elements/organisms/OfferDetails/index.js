/**
 *
 * OfferDetails
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import { MDBBtn, MDBIcon } from 'mdbreact';
import IconWithNumber from 'elements/molecules/IconWithNumber';
import Avatar from 'elements/molecules/Avatar';
import FullName from 'elements/molecules/FullName';
import StarRating from 'elements/molecules/StarRating';

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

const CenterDiv = styled.div`
  flex-grow: ${props => props.grow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WorkerName = styled(FullName)`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 0 0 0;
`;


function OfferDetails({ offer, isLoading, onHireClick }) {
  return (
    <OfferDetailsContainer>
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ fontSize: '0.8rem' }}>
          <MDBIcon style={{ color: 'grey' }} icon="circle" className="mr-1" />
          Offline
        </div>
        <div>
          <small style={{ fontSize: '0.65rem', color: 'grey' }}>
            Jul 27, 2019, 5:24 PM
          </small>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <CenterDiv grow="1">
            <IconWithNumber
              iconColor="green"
              icon="smile"
              metric={offer.workerUser.likes}
            />
          </CenterDiv>
          <CenterDiv grow="2">
            <Avatar
              imgStyle={{
                width: '120px',
                border: '2px solid rgba(228, 222, 153, 0.54)',
              }}
              imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
              isApproved={offer.workerUser.approved}
            />
          </CenterDiv>
          <CenterDiv grow="1">
            <IconWithNumber
              iconColor="red"
              icon="frown"
              metric={offer.workerUser.dislikes}
            />
          </CenterDiv>
        </div>
        <CenterDiv>
          <WorkerName
            first={offer.workerUser.firstName}
            last={offer.workerUser.lastName}
          />
          <StarRating score={9} />
        </CenterDiv>
      </div>
      <div>{JSON.stringify(offer)}</div>
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
