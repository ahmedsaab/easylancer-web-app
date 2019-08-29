import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CreateOfferModal from 'containers/TaskPage/CreateOfferModal';
import CreateTaskModal from 'containers/CreateTaskModal';
import TaskAssignedModal from 'containers/TaskPage/TaskAssignedModal';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectModalType } from 'containers/Modal/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateModal } from 'containers/Modal/actions';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Modal/reducer';

function ResponsiveDialog({ type, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  let modalContent;
  useInjectReducer({ key: 'modal', reducer });

  switch (type) {
    case 'create-offer':
      modalContent = <CreateOfferModal />;
      break;
    case 'create-task':
      modalContent = <CreateTaskModal />;
      break;
    case 'task-assigned-confirmation':
      modalContent = <TaskAssignedModal />;
      break;
    default:
      modalContent = null;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={modalContent !== null}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      {modalContent}
      <div />
    </Dialog>
  );
}

ResponsiveDialog.propTypes = {
  type: PropTypes.oneOf([
    'create-offer',
    'create-task',
    'task-assigned-confirmation',
  ]),
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectModalType(),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(updateModal(null)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ResponsiveDialog);
