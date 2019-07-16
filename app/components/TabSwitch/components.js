import styled from 'styled-components';
import { MDBNav, MDBNavLink } from 'mdbreact';

export const TabNav = styled(MDBNav)`
  border-bottom: 3px solid #dee2e6;
`;

export const TabNavLink = styled(MDBNavLink)`
  color: #4cbbad;
  margin-top: 28px;
  font-weight: 520;
  font-size: 1.2rem;
  &.active {
    background-color: #fafafa !important;
    border-color: #dee2e6 #dee2e6 #fafafa !important;
    border: solid 3px;
    margin-bottom: -2px;
    border-bottom: 3px solid;
  }
`;

export const TabContent = styled('div')`
  border-left: 3px solid #dee2e6;
  border-right: 3px solid #dee2e6;
  border-bottom: 3px solid #dee2e6;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  margin-bottom: 20px;
  margin-top: -3px;
`;
