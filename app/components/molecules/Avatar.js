import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBAvatar } from 'mdbreact';
import RoundedImage from 'components/atoms/RoundedImage';
import ApprovedIcon from 'components/atoms/ApprovedIcon';

const AvatarContainer = styled(MDBAvatar)`
  position: relative;
  overflow: visible !important;
  border: none !important;
  text-align: center;
  z-index: unset;
`;

const Badge = styled.div`
  background-color: ${props => props.color};
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  position: absolute;
  font-weight: 700;
  top: 80%;
  left: 0;
  right: 0;
  margin: auto 20%;
  text-align: center;
  font-size: ${props => props.fontSize}px;
`;

function Avatar({
  imgSrc,
  isApproved,
  isOwner,
  isWorker,
  className,
  imgStyle,
}) {
  return (
    <AvatarContainer className={className}>
      {isApproved ? <ApprovedIcon icon="check-circle" /> : null}
      {isWorker ? (
        <Badge
          fontSize={Math.round(imgStyle.width.slice(0, -2) / 8)}
          color="#2f5a9a"
        >
          Worker
        </Badge>
      ) : null}
      {isOwner ? (
        <Badge
          fontSize={Math.round(imgStyle.width.slice(0, -2) / 8)}
          color="#DC4646"
        >
          Owner
        </Badge>
      ) : null}
      <RoundedImage style={imgStyle} src={imgSrc} alt="" />
    </AvatarContainer>
  );
}

Avatar.propTypes = {
  imgStyle: PropTypes.object,
  imgSrc: PropTypes.string,
  className: PropTypes.string,
  isApproved: PropTypes.bool,
  isWorker: PropTypes.bool,
  isOwner: PropTypes.bool,
};

export default Avatar;
