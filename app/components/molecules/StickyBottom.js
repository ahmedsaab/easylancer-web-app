import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { getWindowWidth } from 'utils/stylesHelper';

const Container = styled('div')`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  @media screen and (max-width: ${props => props.whenToStick}px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    padding-right: 10px;
    padding-left: 10px;
    background: #ffffffcf;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #d0d0d0;
    z-index: 300;
    margin-bottom: 0;
  }
`;

const setMarginOnRelative = (relativeComponent, whenToBlock, component) => {
  if (getWindowWidth() < whenToBlock && component.current) {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = window
      .getComputedStyle(component.current)
      .getPropertyValue('height');
  } else {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = 0;
  }
};

function ActionButtons({ relativeStyleRef, whenToStick, className, children }) {
  useEffect(() => {
    window.addEventListener('resize', () => {
      setMarginOnRelative(relativeStyleRef, whenToStick, ref);
    });
    setMarginOnRelative(relativeStyleRef, whenToStick, ref);
  });

  const ref = useRef(null);

  return (
    <Container whenToStick={whenToStick} className={className} ref={ref}>
      {children}
    </Container>
  );
}

ActionButtons.propTypes = {
  relativeStyleRef: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  whenToStick: PropTypes.number,
};

export default ActionButtons;
