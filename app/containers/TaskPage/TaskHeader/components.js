import styled from 'styled-components';
import { MDBIcon } from 'mdbreact';
import Location from '../../../components/molecules/Location';

export const StatusTime = styled('div')`
  font-size: 15px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
  color: grey;
  padding-left: 3px;
`;

export const LocationText = styled(Location)`
  padding-top: 4px;
  padding-bottom: 4px;
  font-weight: 550;
  // text-decoration: underline;
  // color: cadetblue;
  // cursor: pointer;
`;

export const TitleText = styled('div')`
  font-size: 2.2rem;
  line-height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
`;

export const PriceTagContainer = styled('div')`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 2.5rem;
  @media (min-width: 1240px) {
    float: right;
  }
`;

export const SeenInfo = styled('div')`
  float: right;
  font-size: 22px;
`;

export const SeenIcon = styled(MDBIcon)`
  padding-right: 5px;
`;
