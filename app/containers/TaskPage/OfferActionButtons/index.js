import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  makeSelectOfferIsAssigned,
  makeSelectTaskPageUserIsTaskOwner,
  selectTaskPageOfferActions,
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import {
  acceptOffer,
  updateWithdrawModalIsOpen,
} from 'containers/TaskPage/actions';
import StickyBottom from 'components/molecules/StickyBottom';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import MessageIcon from '@material-ui/icons/Message';
import LoadableActionButton from 'components/hoc/LoadableActionButton';
import ActionButton from 'components/atoms/ActionButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CallIcon from '@material-ui/icons/Call';

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

/**
 * @return {null}
 */
function OfferActionButtons({
  offer,
  task,
  actions,
  isAssignedOffer,
  isTaskOwner,
  containerRef,
  onAcceptOffer,
  onWithdrawOffer,
}) {
  const classes = useStyles();
  const disabled = Object.values(actions).includes('loading');
  let sticky = null;

  if (task.status === 'open' && isTaskOwner) {
    sticky = (
      <Fragment>
        <LoadableActionButton
          first
          onClick={() => onAcceptOffer(offer.id)}
          color="primary"
          disabled={disabled}
          flex={2}
          loading={actions.hire === 'loading'}
        >
          <CheckIcon className={classes.leftIcon} />
          Hire Now
        </LoadableActionButton>
        <ActionButton
          last
          disabled={disabled}
          flex={1}
          color="primary"
          variant="outlined"
        >
          <MessageIcon />
        </ActionButton>
      </Fragment>
    );
  } else if (!isAssignedOffer && !isTaskOwner) {
    sticky = (
      <Fragment>
        <LoadableActionButton
          color="secondary"
          variant="outlined"
          disabled={disabled}
          onClick={onWithdrawOffer}
          loading={actions.withdraw === 'loading'}
        >
          <DeleteIcon className={classes.leftIcon} />
          Withdraw
        </LoadableActionButton>
      </Fragment>
    );
  } else if (
    isTaskOwner &&
    isAssignedOffer &&
    (task.status === 'assigned' || task.status === 'in-progress')
  ) {
    sticky = (
      <Fragment>
        <ActionButton
          first
          color="primary"
          disabled={disabled}
          flex={2}
          variant="outlined"
        >
          <CallIcon className={classes.leftIcon} />
          Call
        </ActionButton>
        <ActionButton
          last
          disabled={disabled}
          flex={1}
          color="primary"
          variant="outlined"
        >
          <MessageIcon />
        </ActionButton>
      </Fragment>
    );
  }

  if (!sticky) {
    return null;
  }

  return (
    <StickyBottom whenToStick={768} relativeStyleRef={containerRef}>
      {sticky}
    </StickyBottom>
  );
}

OfferActionButtons.propTypes = {
  isTaskOwner: PropTypes.bool,
  isAssignedOffer: PropTypes.bool,
  offer: PropTypes.object,
  task: PropTypes.object,
  containerRef: PropTypes.object,
  onAcceptOffer: PropTypes.func,
  onWithdrawOffer: PropTypes.func,
  actions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isTaskOwner: makeSelectTaskPageUserIsTaskOwner(),
  isAssignedOffer: makeSelectOfferIsAssigned(),
  task: selectTaskPageTaskData,
  offer: selectTaskPageOfferData,
  actions: selectTaskPageOfferActions,
});

const mapDispatchToProps = dispatch => ({
  onAcceptOffer: offerId => dispatch(acceptOffer(offerId)),
  onWithdrawOffer: () => dispatch(updateWithdrawModalIsOpen(true)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferActionButtons);
