import styled from 'styled-components';
import { MDBBadge, MDBIcon } from 'mdbreact';

export const StatusTime = styled('div')`
  font-size: 15px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
  color: grey;
  padding-left: 3px;
`;

export const StatusBadge = styled(MDBBadge).attrs({
  pill: true,
  className: 'text-capitalize',
})`
  font-size: 15px;
  padding-bottom: 4px;
  padding-top: 4px;
  box-shadow: none;
`;

export const LocationText = styled('div')`
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

export const TaskBadge = styled(MDBBadge).attrs({
  color: 'light',
})`
  font-size: 14px;
  margin-right: 10px;
  margin-top: 10px;
  box-shadow: none;
  padding: 8px;
`;
