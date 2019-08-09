import React from 'react';
import * as PropTypes from 'prop-types';

import BadgesDetails from 'components/molecules/BadgesDetails';
import NumberedTags from 'components/molecules/NumberedTags';
import CenteredDiv from 'components/atoms/CenteredDiv';
import ProfileHeader from 'components/molecules/ProfileHeader';
import styled from 'styled-components';
import Section from 'components/molecules/Section';
import PriceTag from 'components/molecules/PriceTag';

export const OfferDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OfferSection = styled(Section)`
  margin-bottom: 20px;
`;

export const OfferPrice = styled(PriceTag)`
  font-size: 2rem;
  padding: 20px;
`;

export const OfferMessage = styled.div`
  font-size: 0.9rem;
`;

function OfferDetails({ offer, children }) {
  return (
    <OfferDetailsContainer>
      <ProfileHeader
        likes={offer.workerUser.likes}
        dislikes={offer.workerUser.dislikes}
        imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
        isApproved={offer.workerUser.approved}
        firstName={offer.workerUser.firstName}
        lastName={offer.workerUser.lastName}
        rating={9}
        online={false}
        lastSeen={new Date()}
      >
        <CenteredDiv>
          <OfferPrice price={offer.price} paymentMethod={offer.paymentMethod} />
        </CenteredDiv>
      </ProfileHeader>
      <OfferSection title="Message" visible={!!offer.message}>
        <OfferMessage>{offer.message}</OfferMessage>
      </OfferSection>
      <OfferSection title="Badges" visible={!!offer.workerUser.badges.length}>
        <BadgesDetails badges={offer.workerUser.badges} />
      </OfferSection>
      <OfferSection title="Tags" visible={!!offer.workerUser.tags.length}>
        <NumberedTags tags={offer.workerUser.tags} />
      </OfferSection>
      {children}
    </OfferDetailsContainer>
  );
}

OfferDetails.propTypes = {
  offer: PropTypes.object,
  children: PropTypes.any,
};

export default OfferDetails;
