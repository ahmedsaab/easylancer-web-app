import React from 'react';
import * as PropTypes from 'prop-types';

import BadgesDetails from 'elements/molecules/BadgesDetails';
import NumberedTags from 'elements/molecules/NumberedTags';
import CenteredDiv from 'elements/atoms/CenteredDiv';
import ProfileHeader from 'elements/molecules/ProfileHeader';
import {
  OfferDetailsContainer,
  OfferMessage,
  OfferPrice,
  OfferSection,
} from 'elements/organisms/OfferDetails/components';

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
