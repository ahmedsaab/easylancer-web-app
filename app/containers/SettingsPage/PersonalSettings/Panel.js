import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { LoadingBar } from 'components/molecules/LoadingBar';
import Button from '@material-ui/core/Button';
import { equal } from 'utils/object';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
    flex: 1,
  },
  input: {
    padding: '14px',
  },
  content: {
    padding: theme.spacing(3),
  },
  textFields: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  container: {
    width: '100%',
  },
  dialogActionsRight: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveButton: {
    padding: theme.spacing(1, 3),
  },
}));

export function Panel({
  settings,
  form,
  isInvalid,
  isLoading,
  children,
  onSave,
}) {
  const classes = useStyles();
  const isDirty = !equal(form, settings);

  return (
    <div className={classes.container}>
      <LoadingBar isLoading={isLoading} />
      <div className={classes.content}>
        {children}
        <div className={classes.dialogActionsRight}>
          <Button
            onClick={onSave}
            color="primary"
            variant="contained"
            disabled={!isDirty || isInvalid || isLoading}
            autoFocus
            className={classes.saveButton}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

Panel.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  isInvalid: PropTypes.bool,
  children: PropTypes.any,
  onSave: PropTypes.func,
};
