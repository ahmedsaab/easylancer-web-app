import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectTaskPageTaskData,
  selectTaskPageWithdrawModalIsLoading,
  selectTaskPageWithdrawModalIsOpen,
} from 'containers/TaskPage/selectors';
import {
  updateWithdrawModalIsOpen,
  withdrawOffer,
} from 'containers/TaskPage/actions';
import Bold from 'components/atoms/Bold';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { InformativeDiv } from 'containers/TaskPage/CreateOfferModal/SuccessContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Image from '../../../images/grafiti.jpg';

const useStyles = makeStyles(theme => ({
  text: {
    paddingBottom: '20px',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  header: {
    background: `url(${Image})`,
  },
  yesButton: {
    width: '120px',
  },
}));

/**
 * @return {null}
 */
function WithdrawConfirmationModal({
  isOpen,
  isLoading,
  task,
  onConfirm,
  onDismiss,
}) {
  const classes = useStyles();

  if (!task) {
    return null;
  }

  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      onClose={onDismiss}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.header} />
      {isLoading ? (
        <LinearProgress style={{ display: 'block', height: '5px' }} />
      ) : (
        <div style={{ display: 'block', height: '5px' }} />
      )}
      <DialogContent dividers>
        <InformativeDiv height={200}>
          <div className={classes.text}>
            Are you sure you want to withdraw your offer to{' '}
            <Bold>{task.title}</Bold> ?
          </div>
        </InformativeDiv>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isLoading}
          onClick={onDismiss}
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="secondary"
          disabled={isLoading}
          className={classes.yesButton}
        >
          Withdraw
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WithdrawConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  task: PropTypes.object,
  onDismiss: PropTypes.func,
  onConfirm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectTaskPageWithdrawModalIsOpen,
  isLoading: selectTaskPageWithdrawModalIsLoading,
  task: selectTaskPageTaskData,
});

const mapDispatchToProps = dispatch => ({
  onDismiss: () => {
    dispatch(updateWithdrawModalIsOpen(false));
  },
  onConfirm: () => {
    dispatch(withdrawOffer());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WithdrawConfirmationModal);
