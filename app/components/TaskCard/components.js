import styled from 'styled-components';
import { MDBCard, MDBCardFooter, MDBCardText } from 'mdbreact';

export const CardResp = styled(MDBCard)`
  margin: 4px !important;
  @media screen and (max-width: 552px) {
    .carousel {
      display: none;
    }
    .div-only-mobile {
      display: block;
    }
  }
`;

export const CardTopLine = styled('div')`
  height: 5px;
`;

export const CardFooter = styled(MDBCardFooter)`
  padding: 0.75rem 0.75rem;
`;

export const CardOwnerName = styled('small')`
  max-width: 80%;
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
`;

export const CardOwnerImg = styled('img')`
  max-width: 20%;
`;

export const CardPrice = styled('div')`
  padding-left: 5px;
  font-weight: bold;
  display: inline-block;
`;

export const CardText = styled(MDBCardText)`
  cursor: pointer;
  :hover {
    color: #0d47a1 !important;
    text-decoration: underline;
  }
`;
