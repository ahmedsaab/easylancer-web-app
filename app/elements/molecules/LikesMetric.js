import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBAvatar, MDBIcon } from 'mdbreact';

const Metric = styled(MDBAvatar)`
  display: inline;
  padding-right: 20px;
`;

function LikesMetric({ likes, dislikes, style }) {
  return (
    <div style={style}>
      <Metric>
        <MDBIcon className="mr-1" style={{ color: 'green' }} far icon="smile" />
        {likes}
      </Metric>
      <Metric>
        <MDBIcon className="mr-1" style={{ color: 'red' }} far icon="frown" />
        {dislikes}
      </Metric>
    </div>
  );
}

LikesMetric.propTypes = {
  style: PropTypes.object,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default LikesMetric;
