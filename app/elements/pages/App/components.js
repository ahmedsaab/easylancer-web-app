import styled from 'styled-components';
import { MDBContainer, MDBRow } from 'mdbreact';

export const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

export const ContentRow = styled(MDBRow)`
  overflow-y: hidden;
  margin-top: 60px;
  margin-bottom: 15px;
  margin-left: 235px;
  @media (max-width: 1200px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

export const Container = styled(MDBContainer).attrs(props => ({ fluid: true }))`
  @media (max-width: 1200px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;
