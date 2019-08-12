import styled from 'styled-components';
import CenteredDiv from 'components/atoms/CenteredDiv';
import { MDBModalBody, MDBModalHeader } from 'mdbreact';

export const OfferModalTaskTitle = styled('div')`
  display: inline;
  padding-left: 7px;
  font-weight: 700;
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
  padding: 20px;
`;

export const ModalHeader = styled(MDBModalHeader)`
  flex-shrink: 1;
  button {
    font-size: 40px;
  }
`;

export const ModalBody = styled(MDBModalBody)`
  flex-grow: 1;
`;
