import React from 'react';
import * as PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const animationShow = keyframes`
  0% { top:0; left: 100%; }
  100%  { top:0; left:0; }
`;

const ModalContainer = styled.div`
  position: absolute;
  margin: 0;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: 0;
  z-index: 100;
  display: ${props => (props.isOpen ? 'visible' : 'none')};
  animation-name: ${animationShow};
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
  @media (max-width: 768px) {
    position: fixed !important;
    height: 100vh !important;
    width: 100vw !important;
    z-index: 1000 !important;
  }
`;

function FluidModal({ isOpen, style, children }) {
  return (
    <ModalContainer style={style} isOpen={isOpen}>
      {children}
    </ModalContainer>
  );
}

FluidModal.propTypes = {
  style: PropTypes.object,
  isOpen: PropTypes.bool,
  children: PropTypes.any,
};

export default FluidModal;
