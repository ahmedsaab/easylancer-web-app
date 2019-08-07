import styled from 'styled-components';
import Section from 'elements/molecules/Section';
import OnlineStatus from 'elements/molecules/OnlineStatus';
import PriceTag from 'elements/molecules/PriceTag';

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
