import styled from 'styled-components';
import { MDBCardGroup } from 'mdbreact';

export const CardDeckResp = styled(MDBCardGroup)`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0.5rem;
  margin-right: 0px;
  margin-left: 0px;
`;
