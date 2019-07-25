/**
 *
 * TaskOffers
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TaskOffers() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TaskOffers.propTypes = {};

export default TaskOffers;
