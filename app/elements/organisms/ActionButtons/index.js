/**
 *
 * ActionButtons
 *
 */

import React from 'react';
import RightPaddedIcon from 'elements/organisms/RightPaddedIcon';
import * as PropTypes from 'prop-types';
import {
  ActionButton,
  ActionButtonsContainer,
} from 'elements/organisms/ActionButtons/components';

function ActionButtons({ buttons }) {
  const buttonComponents = buttons.map(button => (
    <ActionButton
      onClick={button.onClick}
      key={button.text}
      className="btn btn-rounded waves-effect"
    >
      <RightPaddedIcon far={button.far} icon={button.icon} />
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
