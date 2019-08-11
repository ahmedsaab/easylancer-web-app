import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { getWindowWidth } from 'utils/stylesHelper';

const ActionButton = styled(MDBBtn)`
  font-size: 16px;
  margin: 10px 5px 10px 5px !important;
  @media screen and (max-width: ${props => props.whenToBlock}px) {
    display: block;
    width: 100%;
  }
`;

const ActionButtonsContainer = styled('div')`
  margin-top: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: ${props => props.whenToStick}px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    padding-right: 25px;
    padding-left: 25px;
    background: #ffffffcf;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #d0d0d0;
    z-index: 300;
    margin-bottom: 0;
  }
`;

const setMarginOnRelative = (relativeComponent, whenToBlock, component) => {
  if (getWindowWidth() < whenToBlock) {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = window
      .getComputedStyle(component.current)
      .getPropertyValue('height');
  } else {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = 0;
  }
};

/**
 * @return {null}
 */
function ActionButtons({
  buttons,
  relativeStyleRef,
  whenToStick,
  whenToBlock,
  className,
  style,
}) {
  useEffect(() => {
    if (buttons.length) {
      window.addEventListener('resize', () => {
        setMarginOnRelative(relativeStyleRef, whenToStick, ref);
      });
      setMarginOnRelative(relativeStyleRef, whenToStick, ref);
    }
  });

  const ref = useRef(null);
  const buttonComponents = buttons.map(button => (
    <ActionButton
      style={button.style}
      color={button.color}
      disabled={button.disabled}
      onClick={button.onClick}
      whenToBlock={whenToBlock}
      key={button.text}
      className="btn btn-rounded waves-effect"
    >
      {button.isLoading ? (
        <MDBIcon style={{ paddingTop: '2px' }} icon="spinner" pulse fixed />
      ) : (
        <div>
          <MDBIcon className="mr-2" far={button.far} icon={button.icon} />
          {button.text}
        </div>
      )}
    </ActionButton>
  ));

  return buttonComponents.length ? (
    <ActionButtonsContainer
      whenToStick={whenToStick}
      className={className}
      style={style}
      ref={ref}
    >
      {buttonComponents}
    </ActionButtonsContainer>
  ) : null;
}

ActionButtons.propTypes = {
  relativeStyleRef: PropTypes.object,
  buttons: PropTypes.array,
  className: PropTypes.string,
  whenToBlock: PropTypes.number,
  whenToStick: PropTypes.number,
  style: PropTypes.object,
};

export default ActionButtons;
