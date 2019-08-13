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
} from 'containers/TaskPage/CreateOfferModal/components';
import { MDBCol, MDBInput, MDBRow } from 'mdbreact';
import NumberInput from 'components/molecules/NumberInput';
import { updateModal } from 'containers/Modal/actions';
import {
  makeSelectCreateTaskModalError,
  makeSelectCreateTaskModalFrom,
  makeSelectCreateTaskModalLoading,
} from 'containers/CreateTaskModal/selectors';
import {
  sendTaskModal,
  updateTaskModalPayment,
  updateTaskModalPrice,
  updateTaskModalTitle,
} from 'containers/CreateTaskModal/actions';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

export function CreateTaskModal({
  form,
  loading,
  error,
  onCloseModal,
  onCreateTask,
  onUpdatePrice,
  onUpdatePayment,
  onUpdateTitle,
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
        <div>
          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              value={form.title}
              onChange={event => onUpdateTitle(event.target.value)}
              className="form-control"
            />
          </div>
          <MDBRow>
            <MDBCol size={6}>
              <div className="form-group">
                <label htmlFor="task-price">Price</label>
                <NumberInput
                  id="task-price"
                  value={form.price}
                  onUpdate={onUpdatePrice}
                  stepSize={10}
                />
              </div>
            </MDBCol>
            <MDBCol size={6}>
              <div className="form-group">
                <label htmlFor="task-payment-method">Payment Method</label>
                <RadioButtonsGroup id="task-payment-method">
                  <MDBInput
                    onClick={() => onUpdatePayment('card')}
                    checked={form.payment === 'card'}
                    label="Card"
                    type="radio"
                    id="radio1"
                  />
                  <MDBInput
                    onClick={() => onUpdatePayment('cash')}
                    checked={form.payment === 'cash'}
                    label="Cash"
                    type="radio"
                    id="radio2"
                  />
                </RadioButtonsGroup>
              </div>
            </MDBCol>
          </MDBRow>
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
  onUpdatePrice: PropTypes.func.isRequired,
  onUpdatePayment: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectCreateTaskModalFrom(),
  loading: makeSelectCreateTaskModalLoading(),
  error: makeSelectCreateTaskModalError(),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(updateModal(null)),
  onCreateTask: () => dispatch(sendTaskModal()),
  onUpdatePrice: price => dispatch(updateTaskModalPrice(price)),
  onUpdatePayment: payment => dispatch(updateTaskModalPayment(payment)),
  onUpdateTitle: title => dispatch(updateTaskModalTitle(title)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTaskModal);
