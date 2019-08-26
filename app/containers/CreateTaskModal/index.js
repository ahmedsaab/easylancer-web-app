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
  DatePicker,
  TimePicker,
  Label,
  TagInput,
} from 'containers/TaskPage/CreateOfferModal/components';
import { MDBCol, MDBInput, MDBRow, MDBSelect } from 'mdbreact';
import Stepper from 'components/organisms/Stepper';
import NumberInput from 'components/atoms/NumberInput';
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
} from 'containers/CreateTaskModal/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { countries, categories } from 'containers/CreateTaskModal/constants';
import MultiPhotoUploader from 'components/organisms/MultiPhotoUploader';
import PlacesAutoComplete from 'components/organisms/PlacesAutoComplete';
import SelectDropDown from 'components/molecules/SelectDropDown';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

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
}) {
  useInjectReducer({ key: 'createTaskModal', reducer });
  useInjectSaga({ key: 'createTaskModal', saga });

  const ref = useRef(null);
  const classes = useStyles();
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
      <ModalHeader toggle={onCloseModal} />
      <ModalBody>
        <Stepper
          contents={[
            {
              title: 'What do you want to get done?',
              component: (
                <div>
                  <div style={{ display: 'flex' }}>
                    <SelectDropDown
                      onSelect={category =>
                        onUpdateFormGeneral('category', category)
                      }
                      label="Category"
                      selected={form.category}
                      selection={categories}
                      style={{ flex: 1 }}
                    />
                    <SelectDropDown
                      disabled={!form.category}
                      onSelect={type => onUpdateFormGeneral('type', type)}
                      label="Type"
                      selected={form.type}
                      selection={form.category ? form.category.types : []}
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      placeholder="e.g., Skilled wall painter needed"
                      label="Title"
                      className={classes.textField}
                      value={form.title}
                      onChange={event =>
                        onUpdateFormGeneral('title', event.target.value)
                      }
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows="2"
                    />
                  </div>
                </div>
              ),
              disabled: !(form.category && form.title && form.type),
            },
            {
              title: 'Details and photos if any?',
              component: (
                <div>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      placeholder="e.g., I would like to make my hair exactly like the pictures. I want to also see the brand of the color you will use beforehand. Please show pictures of your work."
                      label="Details"
                      className={classes.textField}
                      value={form.description}
                      onChange={event =>
                        onUpdateFormGeneral('description', event.target.value)
                      }
                      margin="none"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows="5"
                    />
                  </div>
                  <div style={{ display: 'flex', margin: '20px 0px 20px 0px' }}>
                    <MultiPhotoUploader
                      id="task-photos"
                      onUpdateUploadedImages={urls =>
                        onUpdateFormGeneral('imagesUrls', urls)
                      }
                      requestFileUpload={client.requestFileUpload}
                    />
                  </div>
                </div>
              ),
            },
            {
              title: 'How much are you willing to pay?',
              component: (
                <div className="form-group">
                  <div>
                    <Label>Price</Label>
                    <NumberInput
                      id="task-price"
                      value={form.price}
                      onUpdate={price => onUpdateFormGeneral('price', price)}
                      stepSize={10}
                    />
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <RadioButtonsGroup id="task-payment-method">
                      <MDBInput
                        onClick={() =>
                          onUpdateFormGeneral('paymentMethod', 'card')
                        }
                        checked={form.paymentMethod === 'card'}
                        label="Card"
                        type="radio"
                        id="radio1"
                      />
                      <MDBInput
                        onClick={() =>
                          onUpdateFormGeneral('paymentMethod', 'cash')
                        }
                        checked={form.paymentMethod === 'cash'}
                        label="Cash"
                        type="radio"
                        id="radio2"
                      />
                    </RadioButtonsGroup>
                  </div>
                </div>
              ),
            },
            {
              title: 'Where?',
              component: (
                <div>
                  <div className="form-group">
                    <MDBRow>
                      <MDBCol size={6}>
                        <MDBSelect
                          search
                          options={countries}
                          selected="Choose country"
                          label="Country"
                          getTextContent={country =>
                            onUpdateFormCountry(country)
                          }
                        />
                      </MDBCol>
                      <MDBCol size={6}>
                        {form.country ? (
                          <PlacesAutoComplete
                            onSelect={location =>
                              onUpdateFormLocation(location.address, location)
                            }
                            onChange={address =>
                              onUpdateFormLocation(address, null)
                            }
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
                </div>
              ),
            },
            {
              title: 'When?',
              component: (
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
              ),
            },
            {
              title: 'Done',
              component: (
                <div className="form-group">
                  <Label>Tags</Label>
                  <TagInput
                    value={form.tags}
                    onAdd={tag => onUpdateFormPushTag(tag)}
                    onDelete={(tag, index) => onUpdateFormRemoveTag(index)}
                  />
                </div>
              ),
            },
          ]}
        />
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
  onUpdateFormPushTag: PropTypes.func.isRequired,
  onUpdateFormRemoveTag: PropTypes.func.isRequired,
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
