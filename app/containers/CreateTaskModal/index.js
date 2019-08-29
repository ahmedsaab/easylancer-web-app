import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DialogContent from '@material-ui/core/DialogContent';

import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import Stepper from 'components/organisms/Stepper';
import { SummarySection } from 'containers/CreateTaskModal/SummarySection';
import { DetailsSection } from 'containers/CreateTaskModal/DetailsSection';
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

import { ActionButtons } from 'containers/CreateTaskModal/ActionButtons';
import CancelableDialogTitle from 'components/molecules/CancelableDialogTitle';
import UnjustifiedDialogFooter from 'components/molecules/UnjustifiedDialogFooter';
import saga from './saga';
import reducer from './reducer';
import PaymentInput from 'components/molecules/PaymentInput';

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
        <PaymentInput
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
      <CancelableDialogTitle onClose={onCloseModal}>
        {"Let's do it!"}
      </CancelableDialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={step} contents={steps} />
      </DialogContent>
      <UnjustifiedDialogFooter>
        <ActionButtons
          disabled={loading}
          canGoBack={step !== 0}
          canGoForward={step < steps.length - 1}
          forwardDisabled={steps[step].disabled}
          onBack={handleBack}
          onCancel={onCloseModal}
          onFinish={onCreateTask}
          onNext={handleNext}
        />
      </UnjustifiedDialogFooter>
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
