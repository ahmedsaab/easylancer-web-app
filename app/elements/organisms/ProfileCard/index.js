/**
 *
 * ProfileCard
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';

import {
  ProfileCardBody,
  ProfileCardContainer,
  GoToProfileButton,
  ProfileCardHeader,
  ViewProfileLink,
} from 'elements/organisms/ProfileCard/components';
import Avatar from 'elements/molecules/Avatar';
import LikesMetric from 'elements/molecules/LikesMetric';

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
