/**
 *
 * ProfileCard
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';

import {
  ApprovedIcon,
  LikesMetric,
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileCardBody,
  ProfileCardContainer,
  GoToProfileButton,
  ProfileCardHeader,
  ViewProfileLink,
} from 'components/ProfileCard/components';
import RightPaddedIcon from 'components/RightPaddedIcon';
import LeftPaddedIcon from 'components/LeftPaddedIcon';

function ProfileCard({ user }) {
  return (
    <ProfileCardContainer>
      <ProfileAvatarContainer className="mx-auto white">
        <ApprovedIcon icon="check-circle" />
        <ProfileAvatar>
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
            alt=""
          />
        </ProfileAvatar>
      </ProfileAvatarContainer>
      <ProfileCardBody>
        <ProfileCardHeader>
          <div>
            <RightPaddedIcon size="2x" fab icon="codiepie" />
            <RightPaddedIcon size="2x" fab icon="connectdevelop" />
            <RightPaddedIcon size="2x" fab icon="codepen" />
          </div>
          <h4 className="card-title">
            {user.firstName} {user.lastName}
          </h4>
        </ProfileCardHeader>
        <GoToProfileButton>
          <MDBIcon icon="chevron-right" />
        </GoToProfileButton>
        <div>
          <LikesMetric>
            <RightPaddedIcon style={{ color: 'green' }} far icon="smile" />
            {user.likes}
          </LikesMetric>
          <LikesMetric>
            <RightPaddedIcon style={{ color: 'red' }} far icon="frown" />
            {user.dislikes}
          </LikesMetric>
        </div>
        <div>
          <ViewProfileLink>
            <h5>
              View profile
              <LeftPaddedIcon icon="angle-double-right" />
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
