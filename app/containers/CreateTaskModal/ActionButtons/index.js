import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import DialogButton from 'components/atoms/DialogButton';
import MainDialogButton from 'components/atoms/MainDialogButton';
import LoadableMainDialogButton from 'components/hoc/LoadableMainDialogButton';

const useStyles = makeStyles(theme => ({
  dialogActionsLeft: {
    flex: '1',
    display: 'flex',
    marginLeft: theme.spacing(1),
  },
  dialogActionsRight: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export function ActionButtons({
  disabled,
  forwardDisabled,
  canGoBack,
  canGoForward,
  onCancel,
  onBack,
  onNext,
  onFinish,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.dialogActionsLeft}>
        <DialogButton disabled={disabled} onClick={onCancel}>
          Cancel
        </DialogButton>
      </div>
      <div className={classes.dialogActionsRight}>
        {canGoBack ? (
          <DialogButton disabled={disabled} onClick={onBack}>
            Back
          </DialogButton>
        ) : null}
        {canGoForward ? (
          <MainDialogButton
            disabled={forwardDisabled}
            color="primary"
            onClick={onNext}
          >
            Next
          </MainDialogButton>
        ) : (
          <LoadableMainDialogButton
            loading={disabled}
            disabled={disabled}
            onClick={onFinish}
          >
            Create
          </LoadableMainDialogButton>
        )}
      </div>
    </Fragment>
  );
}

ActionButtons.propTypes = {
  disabled: PropTypes.bool,
  forwardDisabled: PropTypes.bool,
  canGoBack: PropTypes.bool,
  canGoForward: PropTypes.bool,
  onCancel: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onFinish: PropTypes.func,
};
