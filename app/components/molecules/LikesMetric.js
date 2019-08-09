import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconWithNumber from 'components/molecules/IconWithNumber';

const Metric = styled(IconWithNumber)`
  padding-right: 20px;
  display: inline;
`;

function LikesMetric({ likes, dislikes, style }) {
  return (
    <div style={style}>
      <Metric iconColor="green" icon="smile" metric={likes} />
      <Metric iconColor="red" icon="frown" metric={dislikes} />
    </div>
  );
}

LikesMetric.propTypes = {
  style: PropTypes.object,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default LikesMetric;
