import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import FluidModal from 'components/molecules/FluidModal';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import ModalHeader from 'components/atoms/ModalHeader';
import ModalCloseIcon from 'components/atoms/ModalCloseIcon';
import {
  selectTaskPageOfferData,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import OfferDetails from 'components/molecules/OfferDetails';
import OfferActionButtons from 'containers/TaskPage/OfferActionButtons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function OfferModal({ offer, task, isOpen, onClose }) {
  const ref = useRef(null);
  const classes = useStyles();
  let content = null;

  if (!offer) {
    content = <LoadingIndicator />;
  } else if (offer instanceof Error) {
    content = <div>{JSON.stringify(offer)}</div>;
  } else {
    content = (
      <OfferDetails offer={offer} task={task}>
        <OfferActionButtons containerRef={ref} />
      </OfferDetails>
    );
  }

  return (
    <FluidModal className={classes.container} isOpen={isOpen} reference={ref}>
      <ModalHeader>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      {content}
    </FluidModal>
  );
}

OfferModal.propTypes = {
  offer: PropTypes.object,
  task: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offer: selectTaskPageOfferData,
  task: selectTaskPageTaskData,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(withRouter(OfferModal));
