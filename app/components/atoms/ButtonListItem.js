import styled from 'styled-components';
import { MDBBtn } from 'mdbreact';

export default styled(MDBBtn).attrs(() => ({
  outline: true,
  block: true,
}))`
  :hover {
    color: ${props => (props.selected ? `#2bbbad` : 'black')} !important;
    border-color: ${props => (props.selected ? `#2bbbad` : 'white')} !important;
  }
  text-transform: none;
  border: 2px solid;
  border-color: ${props => (props.selected ? `#2bbbad` : 'white')} !important;
  color: black !important;
  border-radius: 0.6em;
  padding-left: 10px;
  padding-right: 10px;
`;
