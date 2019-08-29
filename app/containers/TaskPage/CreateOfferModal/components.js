import styled from 'styled-components';
import CenteredDiv from 'components/atoms/CenteredDiv';
import ChipInput from 'material-ui-chip-input';
import { MDBModalBody, MDBModalHeader } from 'mdbreact';
import ActionButtons from 'components/molecules/ActionButtons';
import wallpaper from 'images/grafiti.jpg';

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
  background: url(${wallpaper});
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
