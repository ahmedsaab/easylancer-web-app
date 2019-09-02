import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LoadingIndicator from 'components/molecules/LoadingIndicator';
import {
  selectTaskPageOffersData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import {
  selectGlobalDisabled,
  selectGlobalUser,
} from 'containers/App/selectors';
import StickyBottom from 'components/molecules/StickyBottom';
import ActionButton from 'components/atoms/ActionButton';
import MessageIcon from '@material-ui/icons/Message';
import WorkIcon from '@material-ui/icons/Work';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  updateCancelModalIsOpen, updateEditModalIsOpen,
  updateOfferFormModalIsOpen,
} from 'containers/TaskPage/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

function TaskActionButtons({
  task,
  user,
  offers,
  disabled,
  containerRef,
  onCreateOfferButtonClick,
  onCancelTaskButtonClick,
  onEditTaskButtonClick,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));

  if (!task || !user || !offers) {
    return <LoadingIndicator />;
  }

  let sticky = null;
  const userIsOwner = task.creatorUser.id === user.id;
  const userIsAssigned = task.workerUser && task.workerUser.id === user.id;
  const userHasApplied = !!offers.find(
    offer => offer.workerUser.id === user.id,
  );

  const canOffer = !userIsOwner && !userHasApplied;
  const canMessage =
    !userIsOwner &&
    ((!userIsAssigned && task.status === 'open') ||
      (userIsAssigned && task.status === 'assigned') ||
      (userIsAssigned && task.status === 'in-progress'));
  const canReschedule =
    task.status === 'assigned' && (userIsOwner || userIsAssigned);
  const canFinish =
    task.status === 'in-progress' && (userIsOwner || userIsAssigned);
  const canCopy =
    task.status === 'done' ||
    task.status === 'not-done' ||
    task.status === 'cancelled';
  const canEdit = task.status === 'open' && userIsOwner;
  const canCancel =
    (userIsOwner && (task.status === 'open' || task.status === 'assigned')) ||
    (userIsAssigned && task.status === 'assigned');

  if (canCancel && canMessage && canReschedule) {
    if (compact) {
      sticky = (
        <Fragment>
          <ActionButton
            disabled={disabled}
            flex={1}
            color="primary"
            variant="outlined"
          >
            <MessageIcon />
          </ActionButton>
          <ActionButton variant="outlined" color="secondary" flex={1}>
            <UpdateIcon />
          </ActionButton>
          <ActionButton
            flex={1}
            variant="outlined"
            onClick={onCancelTaskButtonClick}
          >
            <CancelIcon />
          </ActionButton>
        </Fragment>
      );
    } else {
      sticky = (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <ActionButton variant="outlined" color="secondary" flex={2}>
              <UpdateIcon className={classes.leftIcon} />
              Reschedule
            </ActionButton>
            <ActionButton
              disabled={disabled}
              flex={1}
              color="primary"
              variant="outlined"
            >
              <MessageIcon />
            </ActionButton>
          </div>
          <div style={{ display: 'flex', paddingTop: '10px' }}>
            <ActionButton
              flex={1}
              variant="outlined"
              onClick={onCancelTaskButtonClick}
            >
              <CancelIcon className={classes.leftIcon} />
              Cancel
            </ActionButton>
          </div>
        </div>
      );
    }
  } else if (canCancel && canReschedule) {
    sticky = (
      <Fragment>
        <ActionButton variant="outlined" color="secondary" flex={2}>
          <UpdateIcon className={classes.leftIcon} />
          Reschedule
        </ActionButton>
        <ActionButton
          flex={1}
          onClick={onCancelTaskButtonClick}
          variant="outlined"
        >
          Cancel
        </ActionButton>
      </Fragment>
    );
  } else if (canOffer && canMessage) {
    sticky = (
      <Fragment>
        <ActionButton
          flex={2}
          color="primary"
          onClick={onCreateOfferButtonClick}
        >
          <WorkIcon className={classes.leftIcon} />
          Offer
        </ActionButton>
        <ActionButton
          disabled={disabled}
          flex={1}
          color="primary"
          variant="outlined"
        >
          <MessageIcon />
        </ActionButton>
      </Fragment>
    );
  } else if (canMessage && canReschedule) {
    sticky = (
      <Fragment>
        <ActionButton variant="outlined" color="secondary" flex={2}>
          <UpdateIcon className={classes.leftIcon} />
          Reschedule
        </ActionButton>
        <ActionButton
          disabled={disabled}
          flex={1}
          color="primary"
          variant="outlined"
        >
          <MessageIcon />
        </ActionButton>
      </Fragment>
    );
  } else if (canFinish && canMessage) {
    sticky = (
      <Fragment>
        <ActionButton flex={2} color="primary">
          <AssistantPhotoIcon className={classes.leftIcon} />
          Finish
        </ActionButton>
        <ActionButton
          disabled={disabled}
          flex={1}
          color="primary"
          variant="outlined"
        >
          <MessageIcon />
        </ActionButton>
      </Fragment>
    );
  } else if (canCancel && canEdit) {
    sticky = (
      <Fragment>
        <ActionButton
          variant="outlined"
          flex={2}
          color="primary"
          onClick={onEditTaskButtonClick}
        >
          <EditIcon className={classes.leftIcon} />
          Edit
        </ActionButton>
        <ActionButton
          flex={1}
          variant="outlined"
          onClick={onCancelTaskButtonClick}
        >
          Cancel
        </ActionButton>
      </Fragment>
    );
  } else if (canCopy) {
    sticky = (
      <Fragment>
        <ActionButton color="default" variant="outlined">
          Create similar task
        </ActionButton>
      </Fragment>
    );
  } else if (canMessage) {
    sticky = (
      <Fragment>
        <ActionButton variant="outlined" color="primary">
          <MessageIcon className={classes.leftIcon} />
          Message
        </ActionButton>
      </Fragment>
    );
  } else if (canFinish) {
    sticky = (
      <Fragment>
        <ActionButton color="primary">
          <AssistantPhotoIcon className={classes.leftIcon} />
          Finish
        </ActionButton>
      </Fragment>
    );
  }

  return (
    <div>
      <StickyBottom whenToStick={768} relativeStyleRef={containerRef}>
        {sticky}
      </StickyBottom>
    </div>
  );
}

TaskActionButtons.propTypes = {
  task: PropTypes.object,
  user: PropTypes.object,
  offers: PropTypes.array,
  disabled: PropTypes.bool,
  onCreateOfferButtonClick: PropTypes.func,
  onCancelTaskButtonClick: PropTypes.func,
  onEditTaskButtonClick: PropTypes.func,
  containerRef: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  user: selectGlobalUser,
  offers: selectTaskPageOffersData,
  disabled: selectGlobalDisabled,
});

const mapDispatchToProps = dispatch => ({
  onCreateOfferButtonClick: () => dispatch(updateOfferFormModalIsOpen(true)),
  onCancelTaskButtonClick: () => dispatch(updateCancelModalIsOpen(true)),
  onEditTaskButtonClick: () => dispatch(updateEditModalIsOpen(true)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskActionButtons);
