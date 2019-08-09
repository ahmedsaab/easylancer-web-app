import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div').attrs(() => ({
  className: 'text-truncate',
}))`
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
`;

function FullName({ user, className }) {
  return (
    <Container className={className}>
      {user.firstName} {user.lastName}
    </Container>
  );
}

FullName.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default FullName;
