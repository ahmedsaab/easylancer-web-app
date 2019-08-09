import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBAvatar } from 'mdbreact';
import AvatarImage from 'components/atoms/AvatarImage';
import ApprovedIcon from 'components/atoms/ApprovedIcon';

const AvatarContainer = styled(MDBAvatar)`
  position: relative;
  overflow: visible !important;
  border: none !important;
`;

function Avatar({ imgSrc, isApproved, imgStyle }) {
  return (
    <AvatarContainer className="mx-auto">
      {isApproved ? <ApprovedIcon icon="check-circle" /> : null}
      <AvatarImage style={imgStyle} src={imgSrc} alt="" />
    </AvatarContainer>
  );
}

Avatar.propTypes = {
  imgStyle: PropTypes.object,
  imgSrc: PropTypes.string,
  isApproved: PropTypes.bool,
};

export default Avatar;
