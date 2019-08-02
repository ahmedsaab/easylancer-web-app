import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBBtn, MDBIcon } from 'mdbreact';

const ActionButton = styled(MDBBtn)`
  font-size: 16px;
`;

const ActionButtonsContainer = styled('div')`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function ActionButtons({ buttons }) {
  const buttonComponents = buttons.map(button => (
    <ActionButton
      disabled={button.disabled}
      onClick={button.onClick}
      key={button.text}
      className="btn btn-rounded waves-effect"
    >
      <MDBIcon className="mr-2" far={button.far} icon={button.icon} />
      {button.text}
    </ActionButton>
  ));
  return (
    <ActionButtonsContainer className="btn-group btn-block">
      {buttonComponents}
    </ActionButtonsContainer>
  );
}

ActionButtons.propTypes = {
  buttons: PropTypes.array,
};

export default ActionButtons;
