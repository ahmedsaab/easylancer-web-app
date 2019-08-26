import styled from 'styled-components';
import CenteredDiv from 'components/atoms/CenteredDiv';
import ChipInput from 'material-ui-chip-input';
import {
  MDBDatePicker,
  MDBModalBody,
  MDBModalHeader,
  MDBSelect,
  MDBTimePicker,
} from 'mdbreact';
import ActionButtons from 'components/molecules/ActionButtons';
import React from 'react';
import grafitiImg from 'images/grafiti.jpg';

export const OfferModalTaskTitle = styled('div')`
  display: inline;
  padding-left: 7px;
  font-weight: bolder;
`;

export const RadioButtonsGroup = styled('div')`
  margin-top: -15px;
`;

export const InformativeDiv = styled(CenteredDiv)`
  font-size: 1.4rem;
  text-align: center;
  padding: 0 20px 0 20px;
  height: 100%;
`;

export const SecondaryText = styled.div`
  font-size: 0.9rem;
`;

export const ModalContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  padding: 0;
  label {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }
`;

export const ModalHeader = styled(MDBModalHeader)`
  flex-shrink: 1;
  background: url(${grafitiImg});
  button {
    font-size: 40px;
    opacity: 1;
    color: white;
    :hover {
      color: white;
    }
  }
`;

export const ModalBody = styled(MDBModalBody)`
  flex-grow: 1;
  padding: 3% 6% 1.5%;
  overflow-y: auto;
  label {
    color: grey;
    font-weight: bolder;
  }
`;

export const ModalActionButtons = styled(ActionButtons)`
  padding-right: 20px;
  padding-left: 20px;
  border-top: 1px solid #d0d0d0;
  text-align: center;
`;

export const Label = styled.label`
  font-size: 0.8rem;
`;

const FormContainer = styled.div``;

export const FormSelect = props => (
  <FormContainer>
    <MDBSelect {...props} />
  </FormContainer>
);

const TimePickerContainer = styled.div``;

export const TimePicker = props => (
  <TimePickerContainer>
    <MDBTimePicker {...props} />
  </TimePickerContainer>
);

export const TagInput = styled(ChipInput)`
  width: 100%;
`;

export const DatePicker = styled(MDBDatePicker).attrs(() => ({
  theme: {
    palette: {
      primary: {
        main: '#2bbbad',
      },
      secondary: {
        main: '#FF8800',
        contrastText: '#ffcc00',
      },
    },
    typography: {
      useNextVariants: true,
    },
  },
}))`
  label {
    transform: translateY(-14px) scale(0.8);
    margin-top: 6px;
  }
  input {
    margin-top: -8px;
  }
  div {
    width: 100%;
  }
`;
