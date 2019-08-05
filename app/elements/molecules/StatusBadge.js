

import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBBadge } from 'mdbreact';

const StatusBadgeContainer = styled(MDBBadge).attrs({
  pill: true,
  className: 'text-capitalize',
  color: props => props.color,
})`
  font-size: 15px;
  padding-bottom: 4px;
  padding-top: 4px;
  box-shadow: none;
`;

function StatusBadge({ status }) {
  let color;

  switch (status) {
    case 'open':
      color = 'green';
      break;
    case 'assigned':
      color = 'blue';
      break;
    case 'in-progress':
      color = 'warning';
      break;
    case 'done':
      color = 'grey';
      break;
    case 'not-done':
      color = 'danger';
      break;
    case 'cancelled':
      color = 'grey';
      break;
    default:
      color = 'default';
  }
  return (
    <StatusBadgeContainer color={color}>
      {status.replace(/-/g, ' ')}
    </StatusBadgeContainer>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf([
    'open',
    'assigned',
    'in-progress',
    'done',
    'not-done',
    'cancelled',
  ]),
};

export default StatusBadge;
