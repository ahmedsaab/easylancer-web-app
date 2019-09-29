import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import styled from 'styled-components';

import {
  selectTaskPageAssignedModalIsOpen,
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import { updateAssignedModalIsOpen } from 'containers/TaskPage/actions';
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';
import Bold from 'components/atoms/Bold';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MainDialogButton from 'components/atoms/MainDialogButton';
import { InformativeDiv } from 'containers/TaskPage/CreateOfferModal/SuccessContent';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const imgStyle = {
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  border: '2px solid rgba(228, 222, 153, 0.54)',
};

const WorkerName = styled(FullName)`
  font-size: 1.2rem;
  padding-bottom: 40px;
`;

const Text = styled.div`
  padding-bottom: 20px;
  font-size: 1.2rem;
  text-align: center;
`;

/**
 * @return {null}
 */
function TaskAssignedModal({ isOpen, task, offer, onDismiss }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const formatedDate = moment(task.startDateTime).format(
    'h:mm A [on the] Do of MMM ',
  );

  if (!task || !offer) {
    return null;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onDismiss}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle onClose={onDismiss}>
        <Typography variant="h4">
          Task Assigned to <Bold>{offer.workerUser.firstName}</Bold>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <InformativeDiv>
          <Avatar
            imgStyle={imgStyle}
            imgSrc={offer.workerUser.imageUrl}
            isApproved={offer.workerUser.isApproved || true}
          />
          <WorkerName user={offer.workerUser} />
          <Text>
            The offer price of <Bold>€{offer.price}</Bold> has been deducted
            from your account. The money will be held safely until you confirm
            that the task has been done.
          </Text>
          <Text>
            Your worker will meet you at <Bold>{formatedDate}</Bold> in the
            agreed location to finish the job.
          </Text>
        </InformativeDiv>
      </DialogContent>
      <DialogActions>
        <MainDialogButton onClick={onDismiss}>Got it!</MainDialogButton>
      </DialogActions>
    </Dialog>
  );
}

TaskAssignedModal.propTypes = {
  isOpen: PropTypes.bool,
  offer: PropTypes.object,
  task: PropTypes.object,
  onDismiss: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectTaskPageAssignedModalIsOpen,
  offer: selectTaskPageOfferData,
  task: selectTaskPageTaskData,
});

const mapDispatchToProps = dispatch => ({
  onDismiss: () => {
    dispatch(updateAssignedModalIsOpen(false));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskAssignedModal);
