import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconWithNumber from 'elements/molecules/IconWithNumber';
import Avatar from 'elements/molecules/Avatar';
import StarRating from 'elements/molecules/StarRating';
import CenteredDiv from 'elements/atoms/CenteredDiv';
import FullName from 'elements/molecules/FullName';
import OnlineStatus from 'elements/molecules/OnlineStatus';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenterDiv = styled(CenteredDiv)`
  flex-grow: ${props => props.grow};
`;

const ProfileName = styled(FullName)`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 0 0 0;
`;

const UserOnlineStatus = styled(OnlineStatus)`
  margin-bottom: 20px;
`;

const Likes = styled(IconWithNumber)`
  font-size: 1.5rem;
`;

const imgStyle = {
  width: '120px',
  border: '2px solid rgba(228, 222, 153, 0.54)',
};

function ProfileHeader({
  likes,
  dislikes,
  imgSrc,
  isApproved,
  firstName,
  lastName,
  rating,
  className,
  children,
}) {
  return (
    <Container className={className}>
      <UserOnlineStatus online={false} lastSeen={new Date()} />
      <TopContainer>
        <CenterDiv grow="1">
          <Likes iconColor="green" icon="smile" metric={likes} />
        </CenterDiv>
        <CenterDiv grow="2">
          <Avatar imgStyle={imgStyle} imgSrc={imgSrc} isApproved={isApproved} />
        </CenterDiv>
        <CenterDiv grow="1">
          <Likes iconColor="red" icon="frown" metric={dislikes} />
        </CenterDiv>
      </TopContainer>
      <CenterDiv>
        <ProfileName first={firstName} last={lastName} />
        <StarRating score={rating} />
      </CenterDiv>
      {children}
    </Container>
  );
}

ProfileHeader.propTypes = {
  className: PropTypes.string,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  imgSrc: PropTypes.string,
  isApproved: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  rating: PropTypes.number,
  children: PropTypes.any,
};

export default ProfileHeader;
