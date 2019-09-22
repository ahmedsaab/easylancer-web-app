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
  font-weight: bold;
  // text-decoration: underline;
  // color: cadetblue;
  // cursor: pointer;
`;

export const TitleText = styled('div')`
  font-size: 2.2rem;
  line-height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 800;
`;

export const SeenInfo = styled('div')`
  float: right;
  font-size: 22px;
`;

export const SeenIcon = styled(MDBIcon)`
  padding-right: 5px;
`;
