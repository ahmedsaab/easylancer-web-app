import styled from 'styled-components';
import EmptyStateContent from 'components/molecules/EmptyStateContent';

export const TaskOffersContainer = styled('div')`
  min-height: 600px;
`;

export const OffersEmptyState = styled(EmptyStateContent)`
  height: 600px;
  margin: 0 -20px -20px -20px;
`;
