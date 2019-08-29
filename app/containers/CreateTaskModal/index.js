import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import Stepper from 'components/organisms/Stepper';
import { SummarySection } from 'containers/CreateTaskModal/SummarySection';
import { DetailsSection } from 'containers/CreateTaskModal/DetailsSection';
import { PaymentSection } from 'containers/CreateTaskModal/PaymentSection';
import { LocationSection } from 'containers/CreateTaskModal/LocationSection';
import { DateTimeSection } from 'containers/CreateTaskModal/DateTimeSection';
import { TagsSection } from 'containers/CreateTaskModal/TagsSection';
import { updateModal } from 'containers/Modal/actions';
import {
  makeSelectCreateTaskModalError,
  makeSelectCreateTaskModalFrom,
  makeSelectCreateTaskModalLoading,
  makeSelectCreateTaskModalStep,
} from 'containers/CreateTaskModal/selectors';
import {
  sendTaskModal,
  updateTaskModalFormCountry,
  updateTaskModalFormGeneral,
  updateTaskModalFormLocation,
  updateTaskModalPushTag,
  updateTaskModalRemoveTag,
  fetchAndSetTags,
  updateTaskModalStep,
  updateTaskModalReset,
} from 'containers/CreateTaskModal/actions';
import { useInjectSaga } from 'utils/injectSaga';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import saga from './saga';
import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  cancelBtn: {
    color: theme.status.danger,
  },
  dialogActions: {
    justifyContent: 'unset',
    display: 'flex',
  },
  forwardBtn: {
    minWidth: '130px',
  },
  actionBtn: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
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

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(3),
    color: theme.palette.grey[500],
  },
});

const CustomDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

export function CreateTaskModal({
  form,
  loading,
  error,
  step,
  onCloseModal,
  onCreateTask,
  onUpdateFormGeneral,
  onUpdateFormLocation,
  onUpdateFormCountry,
  onUpdateFormPushTag,
  onUpdateFormRemoveTag,
  onFetchKeywords,
  onUpdateStep,
}) {
  useInjectReducer({ key: 'createTaskModal', reducer });
  useInjectSaga({ key: 'createTaskModal', saga });
  const classes = useStyles();

  function handleNext() {
    if (step === 1) {
      onFetchKeywords();
    }
    onUpdateStep(step + 1);
  }

  function handleBack() {
    onUpdateStep(step - 1);
  }

  const steps = [
    {
      title: 'What do you want to get done?',
      component: (
        <SummarySection
          category={form.category}
          type={form.type}
          title={form.title}
          onSelectCategory={c => onUpdateFormGeneral('category', c)}
          onSelectType={t => onUpdateFormGeneral('type', t)}
          onUpdateTitle={t => onUpdateFormGeneral('title', t)}
        />
      ),
      disabled: !(form.category && form.title && form.type),
    },
    {
      title: 'Details and photos if any?',
      component: (
        <DetailsSection
          description={form.description}
          images={form.images}
          onUpdateImages={i => onUpdateFormGeneral('images', i)}
          onUpdateDescription={d => onUpdateFormGeneral('description', d)}
        />
      ),
      disabled: !!form.images.find(image => !image.uploaded),
    },
    {
      title: 'How much are you willing to pay?',
      component: (
        <PaymentSection
          price={form.price}
          paymentMethod={form.paymentMethod}
          onUpdatePrice={pr => onUpdateFormGeneral('price', pr)}
          onUpdatePaymentMethod={pm => onUpdateFormGeneral('paymentMethod', pm)}
        />
      ),
      disabled: !(form.price && form.paymentMethod),
    },
    {
      title: 'Where?',
      component: (
        <LocationSection
          country={form.country}
          address={form.address}
          onUpdateAddress={address => onUpdateFormLocation(address, null)}
          onUpdateCountry={onUpdateFormCountry}
          onUpdateLocation={location =>
            onUpdateFormLocation(location.address, location)
          }
        />
      ),
      disabled: !(
        form.location.city &&
        form.country &&
        form.address &&
        form.location.geo
      ),
    },
    {
      title: 'When?',
      component: (
        <DateTimeSection
          dateTime={form.startDateTime}
          onAccept={dateTime => {
            onUpdateFormGeneral('startDateTimeError', null);
            onUpdateFormGeneral('startDateTime', dateTime);
          }}
          onError={err => onUpdateFormGeneral('startDateTimeError', err)}
        />
      ),
      disabled: !form.startDateTime || form.startDateTimeError,
    },
    {
      title: 'Tags',
      component: (
        <TagsSection
          tags={form.tags}
          onAdd={tag => onUpdateFormPushTag(tag)}
          onDelete={(tag, index) => onUpdateFormRemoveTag(index)}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <CustomDialogTitle onClose={onCloseModal}>
        Get shit done!
      </CustomDialogTitle>
      <DialogContent dividers>
        <Stepper
          activeStep={step}
          contents={steps}
          FinishButton={() => (
            <Button
              disabled={loading}
              variant="contained"
              color="secondary"
              onClick={onCreateTask}
            >
              {loading ? (
                <Fragment>
                  <LinearProgress
                    style={{ display: 'block', width: '46px', height: '5px' }}
                  />
                  <br />
                </Fragment>
              ) : (
                'Create'
              )}
            </Button>
          )}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <div className={classes.dialogActionsLeft}>
          <Button onClick={onCloseModal} className={classes.cancelBtn}>
            Cancel
          </Button>
        </div>
        <div className={classes.dialogActionsRight}>
          {step !== 0 ? (
            <Button
              className={classes.actionBtn}
              disabled={loading}
              onClick={handleBack}
            >
              Back
            </Button>
          ) : null}
          {step < steps.length - 1 ? (
            <Button
              className={`${classes.actionBtn} ${classes.forwardBtn}`}
              disabled={steps[step].disabled}
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              className={`${classes.actionBtn} ${classes.forwardBtn}`}
              disabled={loading}
              variant="contained"
              color="secondary"
              onClick={onCreateTask}
            >
              {loading ? (
                <Fragment>
                  <LinearProgress
                    style={{ display: 'block', width: '46px', height: '5px' }}
                  />
                  <br />
                </Fragment>
              ) : (
                'Finish'
              )}
            </Button>
          )}
        </div>
      </DialogActions>
    </Fragment>
  );
}

CreateTaskModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  step: PropTypes.number,
  onCloseModal: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateFormGeneral: PropTypes.func.isRequired,
  onUpdateFormLocation: PropTypes.func.isRequired,
  onUpdateFormCountry: PropTypes.func.isRequired,
  onUpdateFormPushTag: PropTypes.func.isRequired,
  onUpdateFormRemoveTag: PropTypes.func.isRequired,
  onFetchKeywords: PropTypes.func.isRequired,
  onUpdateStep: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectCreateTaskModalFrom(),
  step: makeSelectCreateTaskModalStep(),
  loading: makeSelectCreateTaskModalLoading(),
  error: makeSelectCreateTaskModalError(),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(updateModal(null));
    dispatch(updateTaskModalReset());
  },
  onCreateTask: () => dispatch(sendTaskModal()),
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateTaskModalFormGeneral(key, value)),
  onUpdateFormLocation: (address, location) =>
    dispatch(updateTaskModalFormLocation(address, location)),
  onUpdateFormCountry: country => dispatch(updateTaskModalFormCountry(country)),
  onUpdateFormPushTag: tag => dispatch(updateTaskModalPushTag(tag)),
  onUpdateFormRemoveTag: index => dispatch(updateTaskModalRemoveTag(index)),
  onFetchKeywords: () => dispatch(fetchAndSetTags()),
  onUpdateStep: step => dispatch(updateTaskModalStep(step)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
