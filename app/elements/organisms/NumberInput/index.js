/**
 *
 * NumberInput
 *
 */

import React from 'react';
import 'elements/organisms/NumberInput/styles.css';
import * as PropTypes from 'prop-types';
// import styled from 'styled-elements';

function NumberInput({ value, onUpdate, stepSize = 1 }) {
  return (
    <div className="def-number-input number-input">
      <button
        type="button"
        onClick={() => onUpdate(value - stepSize)}
        className="minus"
      />
      <input
        className="quantity"
        name="quantity"
        value={value}
        onChange={event => onUpdate(event.target.value)}
        type="number"
      />
      <button
        type="button"
        onClick={() => onUpdate(value + stepSize)}
        className="plus"
      />
    </div>
  );
}

NumberInput.propTypes = {
  value: PropTypes.number,
  onUpdate: PropTypes.func,
  stepSize: PropTypes.number,
};

export default NumberInput;
