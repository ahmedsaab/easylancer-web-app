import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const PlusMinusButton = styled.button`
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
  background-color: #eeeeee;
  min-width: 40px;
  width: auto;
  transition: all 300ms ease;
  font-weight: bold;
  height: 80px;
  padding: 0;
  position: relative;
  font-size: 30px;
  flex-grow: 1;
`;

const Container = styled.div`
  clear: both;
  margin: 0;
  position: relative;
  display: flex;
`;

const AmountTextArea = styled.input.attrs(() => ({
  type: 'number',
}))`
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  padding: 10px;
  position: relative;
  height: 80px;
  font-size: 18px;
  left: 0px;
  text-align: center;
  width: 62px;
  display: inline-block;
  margin: 0 0 5px;
  resize: vertical;
  flex-grow: 2;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

function NumberInput({ value, onUpdate, stepSize = 1 }) {
  return (
    <Container>
      <PlusMinusButton onClick={() => onUpdate(value - stepSize)}>
        -
      </PlusMinusButton>
      <AmountTextArea
        value={value}
        onChange={event => {
          const val = parseInt(event.target.value, 10);
          onUpdate(val || 0);
        }}
      />
      <PlusMinusButton onClick={() => onUpdate(value + stepSize)}>
        +
      </PlusMinusButton>
    </Container>
  );
}

NumberInput.propTypes = {
  value: PropTypes.number,
  onUpdate: PropTypes.func,
  stepSize: PropTypes.number,
};

export default NumberInput;
