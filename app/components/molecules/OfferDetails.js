import React from 'react';
import * as PropTypes from 'prop-types';

import BadgesDetails from 'components/molecules/BadgesDetails';
import NumberedTags from 'components/molecules/NumberedTags';
import CenteredDiv from 'components/atoms/CenteredDiv';
import ProfileHeader from 'components/molecules/ProfileHeader';
import styled from 'styled-components';
import Section from 'components/molecules/Section';
import PriceTag from 'components/molecules/PriceTag';
import history from 'utils/history';

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

export const OfferHeader = styled(ProfileHeader)`
  cursor: pointer;
  padding-top: 24px;
`;

function OfferDetails({ offer, task, children }) {
  const commonTags = [];

  task.tags.forEach(tag => {
    const existentTagIndex = offer.workerUser.tags.findIndex(
      userTag => userTag.value === tag,
    );

    if (existentTagIndex !== -1) {
      commonTags.push(offer.workerUser.tags[existentTagIndex]);
    }
  });

  return (
    <OfferDetailsContainer>
      <OfferHeader
        imgSrc={offer.workerUser.imageUrl}
        isApproved={offer.workerUser.approved}
        firstName={offer.workerUser.firstName}
        lastName={offer.workerUser.lastName}
        rating={offer.workerUser.ratings.worker}
        online={false}
        lastSeen={new Date()}
        onClick={() => history.push(`/profile/${offer.workerUser.id}/worker`)}
      >
        <CenteredDiv>
          <OfferPrice price={offer.price} paymentMethod={offer.paymentMethod} />
        </CenteredDiv>
      </OfferHeader>
      <OfferSection title="Message" visible={!!offer.message}>
        <OfferMessage>{offer.message}</OfferMessage>
      </OfferSection>
      <OfferSection title="Badges" visible={!!offer.workerUser.badges.length}>
        <BadgesDetails badges={offer.workerUser.badges} />
      </OfferSection>
      <OfferSection title="Tags" visible={!!commonTags.length}>
        <NumberedTags tags={commonTags} />
      </OfferSection>
      {children}
    </OfferDetailsContainer>
  );
}

OfferDetails.propTypes = {
  offer: PropTypes.object,
  task: PropTypes.object,
  children: PropTypes.any,
};

export default OfferDetails;
