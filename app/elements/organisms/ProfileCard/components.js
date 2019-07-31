import styled from 'styled-components';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

export const ProfileCardContainer = styled(MDBCard).attrs({
  testimonial: true,
})`
  margin-top: 80px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const ProfileCardBody = styled(MDBCardBody)`
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
`;

export const GoToProfileButton = styled(MDBBtn).attrs({
  floating: true,
  tag: 'a',
  className: 'ml-auto mr-4 lighten-3',
  action: true,
})`
  margin-bottom: 0.46rem !important;
  margin-left: 75% !important;
`;

export const ProfileCardHeader = styled('div')`
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 20px;
`;

export const ViewProfileLink = styled('a')`
  color: #4cbbad !important;
  float: right;
  padding-top: 10px;
  padding-right: 20px;
`;
