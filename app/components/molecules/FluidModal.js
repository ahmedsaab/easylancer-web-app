import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  getWindowWidth,
} from 'utils/stylesHelper';

const animationShow = keyframes`
  0% { top:0; left: 100%; }
  100%  { top:0; left:0; }
`;

const ModalContainer = styled.div`
  position: relative;
  margin: 0;
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
    overflow-y: scroll;
    border: 0 !important;
  }
`;

const handleBodyScroll = isOpen => {
  if (isOpen && getWindowWidth() < 768) {
    disableBodyScroll();
  } else {
    enableBodyScroll();
  }
};

function FluidModal({ isOpen, className, children, reference }) {
  useEffect(() => {
    window.addEventListener('resize', () => {
      handleBodyScroll(isOpen);
    });
    handleBodyScroll(isOpen);
  });

  return (
    <ModalContainer ref={reference} className={className} isOpen={isOpen}>
      {children}
    </ModalContainer>
  );
}

FluidModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.any,
  reference: PropTypes.object,
};

export default FluidModal;
