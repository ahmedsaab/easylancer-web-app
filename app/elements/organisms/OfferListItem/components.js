import styled from 'styled-components';
import StarRating from 'elements/molecules/StarRating';

export const PriceTagContainer = styled.div.attrs({
  className: 'flex-shrink-1',
})`
  font-size: 1.3rem;
`;

export const MiddleContainer = styled.div.attrs({
  className: 'flex-grow-1',
})`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1rem;
`;

export const WorkerRating = styled(StarRating)`
  float: left;
  padding-right: 20px;
`;
