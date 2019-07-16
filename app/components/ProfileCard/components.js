import styled from 'styled-components';
import { MDBAvatar, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

export const ProfileCardContainer = styled(MDBCard).attrs({
  testimonial: true,
})`
  margin-top: 80px;
`;

export const ProfileCardBody = styled(MDBCardBody)`
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
`;

export const ProfileAvatarContainer = styled(MDBAvatar)`
  position: relative;
  overflow: visible !important;
  border: none !important;
`;

export const ProfileAvatar = styled('div')`
  overflow: hidden;
  border-radius: 50%;
  width: 120px;
  overflow: hidden;
  border: 5px solid #fff;
`;

export const ApprovedIcon = styled(MDBIcon)`
  color: green;
  position: absolute;
  top: 8%;
  font-size: 22px;
`;

export const LikesMetric = styled('div')`
  display: inline;
  padding-right: 20px;
  font-size: 22px;
  font-weight: 600;
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
