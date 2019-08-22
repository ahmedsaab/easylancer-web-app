import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as client from 'utils/client';

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
import { MDBChipsInput, MDBCol, MDBInput, MDBRow, MDBSelect } from 'mdbreact';
import NumberInput from 'components/molecules/NumberInput';
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
  onUpdateFormGeneral,
  onUpdateFormLocation,
  onUpdateFormCountry,
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
                getTextContent={category =>
                  onUpdateFormGeneral('category', category)
                }
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
                getTextContent={type => onUpdateFormGeneral('type', type)}
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
            onChange={event => onUpdateFormGeneral('title', event.target.value)}
          />
        </div>
        <div className="form-group">
          <MDBInput
            type="textarea"
            label="Details"
            value={form.description}
            onChange={event =>
              onUpdateFormGeneral('description', event.target.value)
            }
            rows="5"
          />
        </div>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <MDBSelect
                search
                options={countries}
                selected="Choose country"
                label="Country"
                getTextContent={country => onUpdateFormCountry(country)}
              />
            </MDBCol>
            <MDBCol size={6}>
              {form.country ? (
                <PlacesAutoComplete
                  onSelect={location =>
                    onUpdateFormLocation(location.address, location)
                  }
                  onChange={address => onUpdateFormLocation(address, null)}
                  onError={err => console.error(err)}
                  text={form.address}
                  type="address"
                  label="Address"
                  countryISOCode={form.country.value}
                />
              ) : null}
            </MDBCol>
          </MDBRow>
        </div>
        <div className="form-group">
          <MDBRow>
            <MDBCol size={6}>
              <Label>Price</Label>
              <NumberInput
                id="task-price"
                value={form.price}
                onUpdate={price => onUpdateFormGeneral('price', price)}
                stepSize={10}
              />
            </MDBCol>
            <MDBCol size={6}>
              <Label>Payment Method</Label>
              <RadioButtonsGroup id="task-payment-method">
                <MDBInput
                  onClick={() => onUpdateFormGeneral('paymentMethod', 'card')}
                  checked={form.paymentMethod === 'card'}
                  label="Card"
                  type="radio"
                  id="radio1"
                />
                <MDBInput
                  onClick={() => onUpdateFormGeneral('paymentMethod', 'cash')}
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
                getValue={time => onUpdateFormGeneral('time', time)}
              />
            </MDBCol>
            <MDBCol size={6}>
              <DatePicker
                color="default"
                label="Date"
                disablePast
                autoOk
                getValue={date => onUpdateFormGeneral('date', date)}
              />
            </MDBCol>
          </MDBRow>
        </div>
        <div className="form-group">
          <Label>Photos</Label>
          <MultiPhotoUploader
            id="task-photos"
            onUpdateUploadedImages={urls =>
              onUpdateFormGeneral('imagesUrls', urls)
            }
            requestFileUpload={client.requestFileUpload}
          />
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
  onUpdateFormGeneral: PropTypes.func.isRequired,
  onUpdateFormLocation: PropTypes.func.isRequired,
  onUpdateFormCountry: PropTypes.func.isRequired,
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
