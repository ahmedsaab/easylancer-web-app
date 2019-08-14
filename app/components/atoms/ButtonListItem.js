import styled from 'styled-components';

const getHoverBorderColor = props => {
  if (props.selected) {
    return '#2bbbad';
  }
  return '#fff';
};

const getBorderColor = props => {
  if (props.selected) {
    return '#2bbbad';
  }
  return '#fff';
};

const getBackgroundColor = props => {
  if (props.assigned) {
    return `#cce5ff5e`;
  }
  return '#fff';
};

export default styled.div.attrs(() => ({
  outline: true,
  block: true,
}))`
  :hover {
    color: black !important;
    border-color: ${props => getHoverBorderColor(props)} !important;
    background-color: ${props => getBackgroundColor(props)} !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
      0 4px 15px 0 rgba(0, 0, 0, 0.15);
    outline: 0;
  }
  text-transform: none;
  border: 2px solid;
  border-color: ${props => (props.selected ? `#2bbbad` : 'white')} !important;
  background-color: ${props => getBackgroundColor(props)} !important;
  border-color: ${props => getBorderColor(props)} !important;
  color: black !important;
  border-radius: 0.6em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  font-size: 0.81rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  white-space: normal;
  word-wrap: break-word;
`;
