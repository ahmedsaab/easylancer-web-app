import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBIcon } from 'mdbreact';

const Container = styled('div')`
  color: #ffc400;
`;

function StarRating({ score, className }) {
  return (
    <Container className={className}>
      {[...Array(Math.floor(score / 2))].map(() => (
        <MDBIcon icon="star" />
      ))}
      {score % 2 ? <MDBIcon icon="star-half-alt" /> : null}
      {[...Array(Math.floor((10 - score) / 2))].map(() => (
        <MDBIcon far icon="star" />
      ))}
    </Container>
  );
}

StarRating.propTypes = {
  score: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  className: PropTypes.string,
};

export default StarRating;
