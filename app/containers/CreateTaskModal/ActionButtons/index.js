import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import CancelButton from 'components/atoms/CancelButton';
import DialogButton from 'components/atoms/DialogButton';
import MainButton from 'components/atoms/MainButton';
import LoadableMainButton from 'components/hoc/LoadableMainButton';

const useStyles = makeStyles(theme => ({
  dialogActionsLeft: {
    flex: '1',
    display: 'flex',
    marginLeft: theme.spacing(3),
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
        <CancelButton disabled={disabled} onClick={onCancel}>
          Cancel
        </CancelButton>
      </div>
      <div className={classes.dialogActionsRight}>
        {canGoBack ? (
          <DialogButton disabled={disabled} onClick={onBack}>
            Back
          </DialogButton>
        ) : null}
        {canGoForward ? (
          <MainButton
            disabled={forwardDisabled}
            color="primary"
            onClick={onNext}
          >
            Next
          </MainButton>
        ) : (
          <LoadableMainButton
            loading={disabled}
            disabled={disabled}
            onClick={onFinish}
          >
            Finish
          </LoadableMainButton>
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
