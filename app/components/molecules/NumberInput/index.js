/**
 *
 * NumberInput
 *
 */

import React from 'react';
import 'components/molecules/NumberInput/styles.css';
import * as PropTypes from 'prop-types';
// import styled from 'styled-elements';

function NumberInput({ value, onUpdate, stepSize = 1 }) {
  return (
    <div className="input-group">
      <input
        type="button"
        defaultValue="-"
        className="button-minus"
        data-field="quantity"
        onClick={() => onUpdate(value - stepSize)}
      />
      <input
        type="number"
        value={value}
        onChange={event => {
          const val = parseInt(event.target.value, 10);
          onUpdate(val || 0);
        }}
        name="quantity"
        className="quantity-field"
      />
      <input
        type="button"
        defaultValue="+"
        className="button-plus"
        data-field="quantity"
        onClick={() => onUpdate(value + stepSize)}
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
