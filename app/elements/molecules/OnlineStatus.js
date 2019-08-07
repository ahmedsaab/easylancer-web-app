import { MDBIcon } from 'mdbreact';
import React from 'react';

import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const Status = styled.div`
  font-size: 0.8rem;
`;

const LastSeen = styled.div`
  font-size: 0.65rem;
  color: grey;
`;

function OnlineStatus({ online, lastSeen, className }) {
  return (
    <div className={className}>
      <Status>
        <MDBIcon
          style={{ color: online ? 'green' : 'grey' }}
          icon="circle"
          className="mr-1"
        />
        {online ? 'Online' : 'Offline'}
      </Status>
      {online === false ? (
        <LastSeen>{moment(lastSeen).format('hh:mm A, MMM DD, YYYY')}</LastSeen>
      ) : null}
    </div>
  );
}

OnlineStatus.propTypes = {
  online: PropTypes.bool,
  lastSeen: PropTypes.instanceOf(Date),
  className: PropTypes.string,
};

export default OnlineStatus;
