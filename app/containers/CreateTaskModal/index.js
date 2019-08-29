import React, { Fragment, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { compose } from 'redux';

import {
  ModalBody,
  ModalContainer,
  ModalHeader,
} from 'containers/TaskPage/CreateOfferModal/components';
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
} from 'containers/CreateTaskModal/selectors';
import {
  sendTaskModal,
  updateTaskModalFormCountry,
  updateTaskModalFormGeneral,
  updateTaskModalFormLocation,
  updateTaskModalPushTag,
  updateTaskModalRemoveTag,
  fetchAndSetTags,
} from 'containers/CreateTaskModal/actions';
import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';
import reducer from './reducer';

export function CreateTaskModal({
  form,
  loading,
  error,
  onCloseModal,
  onCreateTask,
  onUpdateFormGeneral,
  onUpdateFormLocation,
  onUpdateFormCountry,
  onUpdateFormPushTag,
  onUpdateFormRemoveTag,
  onFetchKeywords,
}) {
  useInjectReducer({ key: 'createTaskModal', reducer });
  useInjectSaga({ key: 'createTaskModal', saga });

  const ref = useRef(null);

  return (
    <ModalContainer ref={ref}>
      <ModalHeader toggle={onCloseModal} />
      <ModalBody>
        <Stepper
          contents={[
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
                  onUpdateDescription={d =>
                    onUpdateFormGeneral('description', d)
                  }
                />
              ),
              disabled: !!form.images.find(image => !image.uploaded),
              sideEffectOnNext: onFetchKeywords,
            },
            {
              title: 'How much are you willing to pay?',
              component: (
                <PaymentSection
                  price={form.price}
                  paymentMethod={form.paymentMethod}
                  onUpdatePrice={pr => onUpdateFormGeneral('price', pr)}
                  onUpdatePaymentMethod={pm =>
                    onUpdateFormGeneral('paymentMethod', pm)
                  }
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
                  onUpdateAddress={address =>
                    onUpdateFormLocation(address, null)
                  }
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
                  onError={err =>
                    onUpdateFormGeneral('startDateTimeError', err)
                  }
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
          ]}
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
      </ModalBody>
    </ModalContainer>
  );
}

CreateTaskModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onCloseModal: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateFormGeneral: PropTypes.func.isRequired,
  onUpdateFormLocation: PropTypes.func.isRequired,
  onUpdateFormCountry: PropTypes.func.isRequired,
  onUpdateFormPushTag: PropTypes.func.isRequired,
  onUpdateFormRemoveTag: PropTypes.func.isRequired,
  onFetchKeywords: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectCreateTaskModalFrom(),
  loading: makeSelectCreateTaskModalLoading(),
  error: makeSelectCreateTaskModalError(),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(updateModal(null)),
  onCreateTask: () => dispatch(sendTaskModal()),
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateTaskModalFormGeneral(key, value)),
  onUpdateFormLocation: (address, location) =>
    dispatch(updateTaskModalFormLocation(address, location)),
  onUpdateFormCountry: country => dispatch(updateTaskModalFormCountry(country)),
  onUpdateFormPushTag: tag => dispatch(updateTaskModalPushTag(tag)),
  onUpdateFormRemoveTag: index => dispatch(updateTaskModalRemoveTag(index)),
  onFetchKeywords: () => dispatch(fetchAndSetTags()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
