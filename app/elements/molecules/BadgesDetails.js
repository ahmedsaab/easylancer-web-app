import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBIcon } from 'mdbreact';

const BadgeRow = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

const BadgeIcon = styled(MDBIcon)`
  font-size: 3rem;
`;

const BadgeDetails = styled.div`
  font-size: 0.8rem;
`;

function BadgesDetails({ badges, className }) {
  const Badges = badges.map(badge => (
    <BadgeRow key={badge.icon}>
      <BadgeIcon fab icon={badge.icon} className="mr-4" />
      <BadgeDetails>{badge.details}</BadgeDetails>
    </BadgeRow>
  ));
  return <div className={className}>{Badges}</div>;
}

BadgesDetails.propTypes = {
  badges: PropTypes.array,
  className: PropTypes.string,
};

export default BadgesDetails;
