import React from 'react';
import * as PropTypes from 'prop-types';
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

import Avatar from 'components/molecules/Avatar';
import LikesMetric from 'components/molecules/LikesMetric';
import styled from 'styled-components';

const ProfileCardContainer = styled(MDBCard).attrs(props => ({
  testimonial: true,
}))`
  margin-top: 80px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ProfileCardBody = styled(MDBCardBody)`
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
`;

const GoToProfileButton = styled(MDBBtn).attrs(props => ({
  floating: true,
  tag: 'a',
  className: 'ml-auto mr-4 lighten-3',
  action: true,
}))`
  margin-bottom: 0.46rem !important;
  margin-left: 75% !important;
`;

const ProfileCardHeader = styled('div')`
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 20px;
`;

const ViewProfileLink = styled('a')`
  color: #4cbbad !important;
  float: right;
  padding-top: 10px;
  padding-right: 20px;
`;

function ProfileCard({ user }) {
  return (
    <ProfileCardContainer>
      <Avatar
        imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
        isApproved={user.approved}
      />
      <ProfileCardBody>
        <ProfileCardHeader>
          <div>
            <MDBIcon size="2x" className="mr-2" fab icon="codiepie" />
            <MDBIcon size="2x" className="mr-2" fab icon="connectdevelop" />
            <MDBIcon size="2x" className="mr-2" fab icon="codepen" />
          </div>
          <h4 className="card-title">
            {user.firstName} {user.lastName}
          </h4>
        </ProfileCardHeader>
        <GoToProfileButton>
          <MDBIcon icon="chevron-right" />
        </GoToProfileButton>
        <LikesMetric
          style={{
            fontSize: '22px',
            fontWeight: '600',
          }}
          likes={user.likes}
          dislikes={user.dislikes}
        />
        <div>
          <ViewProfileLink>
            <h5>
              View profile
              <MDBIcon className="ml-2" icon="angle-double-right" />
            </h5>
          </ViewProfileLink>
        </div>
      </ProfileCardBody>
    </ProfileCardContainer>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
};

export default ProfileCard;
