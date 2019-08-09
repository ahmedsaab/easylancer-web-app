import styled from 'styled-components';
import EmptyStateContent from 'components/molecules/EmptyStateContent';

export const TaskOffersContainer = styled('div')`
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 2%;
  padding-right: 2%;
  min-height: 600px;
`;

export const OffersEmptyState = styled(EmptyStateContent)`
  height: 600px;
`;