import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDBIcon } from 'mdbreact';

export const PaymentPriceNumber = styled('div')`
  display: inline;
  font-weight: 800;
  color: black;
`;

export const PaymentPrice = styled('div')`
  display: inline;
`;

export const PaymentMethod = styled('div')`
  display: inline;
  padding-left: 10px;
  padding-right: 10px;
`;

export const PaymentTag = styled('div')`
  line-height: 125%;
`;

function PriceTag({ price, paymentMethod, style }) {
  return (
    <PaymentTag style={style}>
      <PaymentPrice>
        €<PaymentPriceNumber>{price}</PaymentPriceNumber>
      </PaymentPrice>
      <PaymentMethod>
        {paymentMethod ? <MDBIcon icon="credit-card" /> : ''}
      </PaymentMethod>
    </PaymentTag>
  );
}

PriceTag.propTypes = {
  style: PropTypes.object,
  price: PropTypes.number,
  paymentMethod: PropTypes.oneOf(['card', 'cash']),
};

export default PriceTag;
