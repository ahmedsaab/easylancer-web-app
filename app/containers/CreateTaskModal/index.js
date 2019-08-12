/**
 *
 * CreateTaskModal
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCreateTaskModal from './selectors';
import reducer from './reducer';
import messages from './messages';

export function CreateTaskModal() {
  useInjectReducer({ key: 'createTaskModal', reducer });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

CreateTaskModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createTaskModal: makeSelectCreateTaskModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
