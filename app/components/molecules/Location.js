import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Container = styled('div').attrs(() => ({}))`
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
`;

function Location({ location, className }) {
  return (
    <Container className={className}>
      {capFirst(location.city)}, {capFirst(location.country)}
    </Container>
  );
}

Location.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object,
};

export default Location;
