import React from 'react';
import * as PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const SvgIcon = styled.svg`
  width: 100px;
  display: block;
  margin: 0 auto 0;
`;

const AnimationDash = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const AnimationDashCheck = keyframes`
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
`;

const PathCircle = styled.circle`
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: ${AnimationDash} 0.9s ease-in-out;
`;

const PathLine = styled.line`
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  stroke-dashoffset: 1000;
  animation: ${AnimationDash} 0.9s 0.35s ease-in-out forwards;
`;

const PathCheck = styled.polyline`
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  stroke-dashoffset: -100;
  animation: ${AnimationDashCheck} 0.9s 0.35s ease-in-out forwards;
`;

const IconText = styled.p.attrs(props => ({
  color: props.status ? '#73af55' : '#d06079',
}))`
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;
  color: ${props => props.color};
`;

function AnimatedStatus({ status, message }) {
  let content = (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <PathCircle
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <PathLine
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="34.4"
        x2="95.8"
        y1="37.9"
        y2="92.3"
      />
      <PathLine
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2"
      />
    </SvgIcon>
  );

  if (status) {
    content = (
      <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <PathCircle
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <PathCheck
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </SvgIcon>
    );
  }

  return (
    <div>
      {content}
      <IconText status={status}>{message}</IconText>
    </div>
  );
}

AnimatedStatus.propTypes = {
  status: PropTypes.bool,
  message: PropTypes.string,
};

export default AnimatedStatus;
