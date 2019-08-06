import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div').attrs({
  className: 'text-truncate',
})`
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
`;

function FullName({ first, last, className }) {
  return (
    <Container className={className}>
      {first} {last}
    </Container>
  );
}

FullName.propTypes = {
  className: PropTypes.string,
  first: PropTypes.string,
  last: PropTypes.string,
};

export default FullName;
