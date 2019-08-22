import styled from 'styled-components';
import React from 'react';
import * as PropTypes from 'prop-types';

const Spinner = ({ margin = '40px', dimension = '50px' }) => (
  <StyledSpinner margin={margin} dimension={dimension} viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="2"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: ${props => props.margin};
  width: ${props => props.dimension};
  height: ${props => props.dimension};

  & .path {
    stroke: #4cbbad;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

Spinner.propTypes = {
  margin: PropTypes.string,
  dimension: PropTypes.string,
};

export default Spinner;
