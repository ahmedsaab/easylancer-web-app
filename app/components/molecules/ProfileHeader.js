import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconWithNumber from 'components/molecules/IconWithNumber';
import Avatar from 'components/molecules/Avatar';
import CenteredDiv from 'components/atoms/CenteredDiv';
import FullName from 'components/molecules/FullName';
import OnlineStatus from 'components/molecules/OnlineStatus';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { makeStyles } from '@material-ui/core';
import RatingStars from 'components/molecules/RatingStars';

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

const imgStyle = {
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  border: '2px solid rgba(228, 222, 153, 0.54)',
};

const useStyles = makeStyles(theme => ({
  metricIcon: {
    fontSize: '1.2rem',
  },
}));

function ProfileHeader({
  likes,
  dislikes,
  imgSrc,
  isApproved,
  firstName,
  lastName,
  rating,
  className,
  online,
  lastSeen,
  children,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Container className={className} onClick={onClick}>
      {online && lastSeen ? (
        <UserOnlineStatus online={online} lastSeen={lastSeen} />
      ) : null}
      <TopContainer>
        <CenterDiv grow="1">
          <IconWithNumber
            className={classes.metricIcon}
            iconColor="green"
            Icon={ThumbUpAltOutlinedIcon}
            metric={likes}
          />
        </CenterDiv>
        <CenterDiv grow="2">
          <Avatar imgStyle={imgStyle} imgSrc={imgSrc} isApproved={isApproved} />
        </CenterDiv>
        <CenterDiv grow="1">
          <IconWithNumber
            className={classes.metricIcon}
            iconColor="red"
            Icon={ThumbDownOutlinedIcon}
            metric={dislikes}
          />
        </CenterDiv>
      </TopContainer>
      <CenterDiv>
        <ProfileName user={{ firstName, lastName }} />
        {rating.value ? (
          <RatingStars
            fontSize="20px"
            value={rating.value / rating.count}
            className={classes.rating}
            count={rating.count}
          />
        ) : null}
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
  online: PropTypes.bool,
  lastSeen: PropTypes.instanceOf(Date),
  rating: PropTypes.object,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default ProfileHeader;
