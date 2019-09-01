import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import AnimatedStatus from 'components/molecules/AnimatedTick';
import CancelableDialogTitle from 'components/molecules/CancelableDialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import CenteredDiv from 'components/atoms/CenteredDiv';
import MainButton from 'components/atoms/MainButton';

export const InformativeDiv = styled(CenteredDiv)`
  font-size: 1.4rem;
  text-align: center;
  padding: 0 20px 0 20px;
  height: 100%;
  min-height: ${props => props.height || '450'}px;
`;

export const SecondaryText = styled.div`
  font-size: 0.9rem;
`;

const SuccessContent = ({ taskOwnerName, onClose }) => (
  <Fragment>
    <CancelableDialogTitle onClose={onClose}>
      {"That's it!"}
    </CancelableDialogTitle>
    <DialogContent dividers>
      <InformativeDiv>
        <AnimatedStatus
          status
          message={`Your offer have been sent to ${taskOwnerName}`}
        />
        <SecondaryText>
          You will be notified if you get hired for the job.
        </SecondaryText>
      </InformativeDiv>
    </DialogContent>
    <DialogActions>
      <MainButton onClick={onClose}>Cool!</MainButton>
    </DialogActions>
  </Fragment>
);

SuccessContent.propTypes = {
  taskOwnerName: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessContent;
