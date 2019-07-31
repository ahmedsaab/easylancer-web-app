import styled from 'styled-components';
import { MDBBtn } from 'mdbreact';

export default styled(MDBBtn).attrs({
  outline: true,
  block: true,
})`
  :hover {
    border-color: ${props => (props.selected ? `default` : `white`)} !important;
  }
  text-transform: none;
  border-color: ${props => (props.selected ? `default` : `white`)} !important;
  border-radius: 0.3em;
  padding-left: 10px;
  padding-right: 10px;
  color: ${props => (props.selected ? `default` : `black`)} !important;
`;
