import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectTaskPageAcceptedOffer,
  selectTaskPageFinishModalIsLoading,
  selectTaskPageFinishModalIsOpen,
  selectTaskPageFinishModalForm,
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import {
  updateFinishModalIsOpen,
  finishTask,
  updateFinishModalFormGeneral,
} from 'containers/TaskPage/actions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, makeStyles, useTheme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import YesNoSelector from 'containers/TaskPage/FinishTaskModal/YesNoSelector';
import PositiveFeedbackSection from 'containers/TaskPage/FinishTaskModal/PositiveFeedbackSection';
import NegativeFeedbackSection from 'containers/TaskPage/FinishTaskModal/NegativeFeedbackSection';
import Image from '../../../images/grafiti.jpg';

const useStyles = makeStyles(theme => ({
  header: {
    background: `url(${Image})`,
  },
  yesButton: {
    width: '120px',
  },
  question: {
    fontSize: '1.4rem',
    paddingBottom: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const WORKER_LABELS = {
  1: 'Rude',
  2: 'Unkind',
  3: 'Ok',
  4: 'Nice',
  5: 'Very Nice',
};

const OWNER_LABELS = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

/**
 * @return {null}
 */
function FinishTaskModal({
  isOpen,
  isLoading,
  form,
  acceptedOffer,
  task,
  isTaskOwner,
  onSend,
  onCloseModal,
  onUpdateFormGeneral,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  if (!acceptedOffer) {
    return null;
  }

  const isInvalid =
    form.like === null ||
    !form.description ||
    (!form.like && form.description === 'other' && !form.otherReason) ||
    (!form.rating && form.like);
  const userUnderReview = isTaskOwner
    ? acceptedOffer.workerUser
    : task.creatorUser;
  let feedbackContent = null;

  if (!acceptedOffer) {
    return null;
  }

  if (form.like === true) {
    const labels = isTaskOwner ? OWNER_LABELS : WORKER_LABELS;

    feedbackContent = (
      <PositiveFeedbackSection
        message={form.description}
        user={userUnderReview}
        rating={{ value: form.rating, labels }}
        onUpdateMessage={description =>
          onUpdateFormGeneral('description', description)
        }
        onUpdateRating={rating => onUpdateFormGeneral('rating', rating)}
      />
    );
  } else if (form.like === false) {
    feedbackContent = (
      <NegativeFeedbackSection
        isTaskOwner={isTaskOwner}
        message={form.description}
        otherReason={form.otherReason}
        onUpdateMessage={description =>
          onUpdateFormGeneral('description', description)
        }
        onUpdateOtherReason={otherReason =>
          onUpdateFormGeneral('otherReason', otherReason)
        }
      />
    );
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.header}>
        <div />
      </DialogTitle>
      {isLoading ? (
        <LinearProgress style={{ display: 'block', height: '5px' }} />
      ) : (
        <div style={{ display: 'block', height: '5px' }} />
      )}
      <DialogContent dividers>
        <div className={classes.section}>
          <div className={classes.question}>Is the task DONE?</div>
          <YesNoSelector
            answer={form.like}
            onChange={answer => onUpdateFormGeneral('like', answer)}
          />
        </div>
        {feedbackContent}
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={onSend}
          color="primary"
          variant="contained"
          disabled={isLoading || isInvalid}
          className={classes.yesButton}
          autoFocus
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FinishTaskModal.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  task: PropTypes.object,
  isTaskOwner: PropTypes.bool,
  acceptedOffer: PropTypes.object,
  onSend: PropTypes.func,
  onCloseModal: PropTypes.func,
  onUpdateFormGeneral: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectTaskPageFinishModalIsOpen,
  isLoading: selectTaskPageFinishModalIsLoading,
  form: selectTaskPageFinishModalForm,
  acceptedOffer: selectTaskPageAcceptedOffer,
  task: selectTaskPageTaskData,
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(updateFinishModalIsOpen(false));
  },
  onSend: () => {
    dispatch(finishTask());
  },
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateFinishModalFormGeneral(key, value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FinishTaskModal);
