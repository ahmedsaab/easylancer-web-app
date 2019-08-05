import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBBtn, MDBIcon } from 'mdbreact';

const ActionButton = styled(MDBBtn)`
  font-size: 16px;
`;

const ActionButtonsContainer = styled('div')`
  margin-top: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    padding-right: 25px;
    padding-left: 25px;
    background: #ffffffcf;
    padding-top: 10px;
    border-top: 1px solid #d0d0d0;
    z-index: 300;
    margin-bottom: 0;
  }
`;

const setMarginOnRelative = (relativeComponent, component) => {
  if (
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768
  ) {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.marginBottom = window
      .getComputedStyle(component.current)
      .getPropertyValue('height');
  }
};

/**
 * @return {null}
 */
function ActionButtons({ buttons, relativeStyleRef }) {
  useEffect(() => {
    window.addEventListener('resize', () => {
      setMarginOnRelative(relativeStyleRef, ref);
    });
    setMarginOnRelative(relativeStyleRef, ref);
  });

  const ref = useRef(null);
  const buttonComponents = buttons.map(button => (
    <ActionButton
      style={button.style}
      color={button.color}
      block
      disabled={button.disabled}
      onClick={button.onClick}
      key={button.text}
      className="btn btn-rounded waves-effect"
    >
      <MDBIcon className="mr-2" far={button.far} icon={button.icon} />
      {button.text}
    </ActionButton>
  ));

  return buttonComponents.length ? (
    <ActionButtonsContainer ref={ref}>
      {buttonComponents}
      <hr />
    </ActionButtonsContainer>
  ) : null;
}

ActionButtons.propTypes = {
  relativeStyleRef: PropTypes.instanceOf(Element),
  buttons: PropTypes.array,
};

export default ActionButtons;
