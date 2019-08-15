import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import {
  ModalActionButtons,
  ModalBody,
  ModalContainer,
  ModalHeader,
  RadioButtonsGroup,
  FormSelect,
  DatePicker,
  TimePicker,
  Label,
} from 'containers/TaskPage/CreateOfferModal/components';
import { MDBChipsInput, MDBCol, MDBInput, MDBRow } from 'mdbreact';
import NumberInput from 'components/molecules/NumberInput';
import { updateModal } from 'containers/Modal/actions';
import {
  makeSelectCreateTaskModalError,
  makeSelectCreateTaskModalFrom,
  makeSelectCreateTaskModalLoading,
} from 'containers/CreateTaskModal/selectors';
import {
  sendTaskModal,
  updateTaskModalForm,
} from 'containers/CreateTaskModal/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { countries, categories } from 'containers/CreateTaskModal/constants';
import MultiPhotoUploader from 'components/organisms/MultiPhotoUploader';
import PlacesAutoComplete from 'components/organisms/PlacesAutoComplete';
import reducer from './reducer';
import saga from './saga';

export function CreateTaskModal({
  form,
  loading,
  error,
  onCloseModal,
  onCreateTask,
  onUpdateForm,
}) {
  useInjectReducer({ key: 'createTaskModal', reducer });
  useInjectSaga({ key: 'createTaskModal', saga });

  const ref = useRef(null);

  const buttons = [
    {
      color: 'green',
      disabled: loading,
      icon: 'magic',
      text: 'Create',
      style: { padding: '10px 100px' },
      isLoading: loading,
      onClick: onCreateTask,
    },
  ];

  return (
    <ModalContainer ref={ref}>
      <ModalHeader toggle={onCloseModal}>Create a new task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <FormSelect
                color="default"
                label="Category"
                getTextContent={category => onUpdateForm('category', category)}
                selected={form.category}
                options={Object.keys(categories).map(name => ({
                  text: name,
                  value: categories[name].id,
                }))}
              />
            </MDBCol>
            <MDBCol size={6}>
              <FormSelect
                color="default"
                label="Type"
                getTextContent={type => onUpdateForm('type', type)}
                selected={form.type}
                options={categories[form.category].data}
              />
            </MDBCol>
          </MDBRow>
        </div>
        <div className="form-group">
          <MDBInput
            label="Summary"
            value={form.title}
            onChange={event => onUpdateForm('title', event.target.value)}
          />
        </div>
        <div className="form-group">
          <MDBInput
            type="textarea"
            label="Details"
            value={form.description}
            onChange={event => onUpdateForm('description', event.target.value)}
            rows="5"
          />
        </div>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <div>
                <FormSelect
                  color="default"
                  label="Country"
                  getTextContent={country => onUpdateForm('country', country)}
                  selected={form.country}
                  options={Object.keys(countries).map(name => ({
                    text: name,
                    value: countries[name].id,
                  }))}
                />
              </div>
            </MDBCol>
            <MDBCol size={6}>
              <FormSelect
                color="default"
                label="City"
                getTextContent={city => onUpdateForm('city', city)}
                selected={form.city}
                options={countries[form.country].data}
              />
            </MDBCol>
          </MDBRow>
          <div>
            <PlacesAutoComplete
              onLocationChange={location => onUpdateForm('location', location)}
              onLocationError={err => onUpdateForm('location', null)}
            />
          </div>
        </div>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <Label>Price</Label>
              <NumberInput
                id="task-price"
                value={form.price}
                onUpdate={price => onUpdateForm('price', price)}
                stepSize={10}
              />
            </MDBCol>
            <MDBCol size={6}>
              <Label>Payment Method</Label>
              <RadioButtonsGroup id="task-payment-method">
                <MDBInput
                  onClick={() => onUpdateForm('paymentMethod', 'card')}
                  checked={form.paymentMethod === 'card'}
                  label="Card"
                  type="radio"
                  id="radio1"
                />
                <MDBInput
                  onClick={() => onUpdateForm('paymentMethod', 'cash')}
                  checked={form.paymentMethod === 'cash'}
                  label="Cash"
                  type="radio"
                  id="radio2"
                />
              </RadioButtonsGroup>
            </MDBCol>
          </MDBRow>
        </div>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <TimePicker
                color="default"
                label="Time"
                getValue={time => onUpdateForm('time', time)}
              />
            </MDBCol>
            <MDBCol size={6}>
              <DatePicker
                color="default"
                label="Date"
                disablePast
                autoOk
                getValue={date => onUpdateForm('date', date)}
              />
            </MDBCol>
          </MDBRow>
        </div>
        <div className="form-group">
          <Label>Photos</Label>
          <MultiPhotoUploader id="task-photos" />
        </div>
        <div className="form-group">
          <Label>Tags</Label>
          <MDBChipsInput
            placeholder="+ Tag"
            secondaryPlaceholder="Enter a tag"
          />
        </div>
      </ModalBody>
      <ModalActionButtons
        whenToBlock={768}
        whenToStick={768}
        relativeStyleRef={ref}
        buttons={buttons}
      />
    </ModalContainer>
  );
}

CreateTaskModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onCloseModal: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectCreateTaskModalFrom(),
  loading: makeSelectCreateTaskModalLoading(),
  error: makeSelectCreateTaskModalError(),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(updateModal(null)),
  onCreateTask: () => dispatch(sendTaskModal()),
  onUpdateForm: (key, value) => dispatch(updateTaskModalForm(key, value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
